import 'dotenv/config';
import OpenAI from 'openai';
import { parseCliArgs } from './cliArgs.js';
import { buildSystemPrompt, buildUserPrompt } from './prompts.js';
import { writeBriefsToFile } from './outputWriter.js';
import { createOpenAIClient } from './openaiClient.js';
import { createSupabaseClient } from './supabaseClient.js';
import { briefSchema } from './schema/brief.js';

async function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Set it in your environment or .env file.');
  }
  return createOpenAIClient(apiKey);
}

function getSupabaseClient() {
  const supabaseProjectUrl = process.env.SUPABASE_PROJECT_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseProjectUrl || !supabaseAnonKey) {
    throw new Error('Missing SUPABASE_PROJECT_URL or SUPABASE_ANON_KEY. Set them in your environment or .env file.');
  }
  return createSupabaseClient(supabaseProjectUrl, supabaseAnonKey);
}

async function getResponseFromOpenAI(client: OpenAI, userPrompt: string, systemPrompt: string, targetModel: string) {
  const responsePayload = {
    model: targetModel,
    temperature: 0.3,
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  } as any;

  const response = await client.responses.create(responsePayload);

  const rawJson = response.output_text;

  if (!rawJson) {
    throw new Error('No content received from OpenAI response.');
  }

  return JSON.parse(rawJson);
}

async function writeBriefsToFilepath(briefs: unknown) {
  const filePath = await writeBriefsToFile(briefs);
  console.log(`Briefs saved to ${filePath}`);
  return filePath;
}

async function validateJsonFormat(json: unknown): Promise<void> {
  if (Array.isArray(json)) {
    for (const item of json) {
      await validateJsonFormat(item);
    }
    return;
  }

  const result = briefSchema.safeParse(json);
  if (!result.success) {
    throw new Error(`Invalid JSON format: ${result.error.message}`);
  }
}

async function main() {
  const supabaseClient = getSupabaseClient();
  const cliArgs = parseCliArgs();
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(cliArgs);
  const targetModel = 'gpt-4o-mini';

  const client = await getOpenAIClient();
  const jsonParsedResponse = await getResponseFromOpenAI(client, userPrompt, systemPrompt, targetModel);
  await validateJsonFormat(jsonParsedResponse);
  await writeBriefsToFilepath(jsonParsedResponse);
}

main().catch((err) => {
  console.error('Error:', err?.response?.data || err?.message || err);
  process.exit(1);
});
