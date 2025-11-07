import 'dotenv/config';
import { parseCliArgs } from './cliArgs.js';
import { buildSystemPrompt, buildUserPrompt } from './prompts.js';
import { writeBriefsToFile } from './outputWriter.js';
import { createOpenAIClient } from './openaiClient.js';

async function main() {
  const cliArgs = parseCliArgs();

  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY. Set it in your environment or .env file.');
    process.exit(1);
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(cliArgs);

  const client = createOpenAIClient(process.env.OPENAI_API_KEY);
  const targetModel = 'gpt-4o-mini';

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
    console.error('No content received from OpenAI response.');
    process.exit(1);
  }

  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse JSON response:', err);
    process.exit(1);
  }

  const filePath = await writeBriefsToFile(parsed);

  console.log(`Briefs saved to ${filePath}`);
}

main().catch((err) => {
  console.error('Error:', err?.response?.data || err?.message || err);
  process.exit(1);
});
