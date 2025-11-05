# TODO

## 1. Keep one source of truth for the schema  
- Extract the Zod schema presently in [validateDataset.ts](cci:7://file:///home/rtekk/code/DevBrief-Generator-backend/src/validateDataset.ts:0:0-0:0) into a shared module (e.g. `src/schema/brief.ts`) so both the generator and validator rely on the same definition. Right now the schema is defined only inside the validator @src/validateDataset.ts#5-18. Export both `briefSchema` and [ProjectBrief](cci:2://file:///home/rtekk/code/DevBrief-Generator-backend/src/validateDataset.ts:21:0-21:48) so the generator can type-check its output and run `briefSchema.parse(...)` before printing.

## 2. Prompt engineering geared to “real world” briefs  
- In the system message, spell out the business tone you want (“Describe a realistic project scoped for {level} developers working in {domain}…”) and insist on credible context (industry constraints, stakeholders, success metrics).  
- Include **field-by-field instructions**: e.g. “Fill `business_problem` with a sentence describing the market pain point; keep `goals` focused on measurable deliverables; keep `stack` to actual tools”.  
- Feed concrete examples from [briefs_dataset.json](cci:7://file:///home/rtekk/code/DevBrief-Generator-backend/src/briefs_dataset.json:0:0-0:0) when prompting so the model mirrors the tone/structure found there @src/briefs_dataset.json#1-223.  
- Collect all user inputs (level, domain, focus, duration, etc.) and insert them into the prompt so the model can tailor its answer.

## 3. Enforce JSON output through the API  
- Switch to the Responses API (or Chat Completions with `response_format`) and define the JSON schema that exactly mirrors your Zod schema. Example:

```ts
const response = await client.responses.create({
  model: targetModel,
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "project_brief",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [...],
        properties: { ... }  // align with briefSchema
      }
    }
  },
  input: [
    {
      role: "system",
      content: "You are a product lead producing realistic project briefs..."
    },
    {
      role: "user",
      content: buildPromptFromInputs(...)
    }
  ]
});
```

- If you still need streaming, buffer the stream and parse once complete; otherwise disable streaming for this call to simplify strict JSON parsing.  
- After receiving the raw text, run `JSON.parse` followed by `briefSchema.parse` to guarantee the structure before printing.

## 4. Validate before emitting  
- Immediately validate the parsed object with the shared Zod schema. If validation fails, log the validation errors and consider re-prompting or exiting with a non-zero status.  
- This mirrors what your existing validation script already does @src/validateDataset.ts#27-61.

## 5. Production-ready flow in [chat.ts](cci:7://file:///home/rtekk/code/DevBrief-Generator-backend/src/chat.ts:0:0-0:0)  
1. Parse CLI options (level, domain, etc.).  
2. Build a structured prompt.  
3. Call OpenAI with JSON schema enforcement.  
4. Parse/validate (`briefSchema.parse`).  
5. Pretty-print or save the validated object.

Add strong runtime error handling (try/catch with friendly messages). You can also log the prompt plus LLM response when validation fails to help debugging.

## 6. Additional quality checks  
- Add a unit/integration test that mocks the OpenAI client and ensures the generator refuses invalid payloads.  
- Optionally append a post-generation pass that flags vague copy (e.g. checks `goals` contain verbs, etc.).  
- Store generated briefs and run `npm run validate` (added by you) so that the dataset never regresses.

By hard-wiring the schema into the prompt, relying on OpenAI’s JSON schema enforcement, and validating with Zod before output, the script will consistently emit realistic, schema-conformant briefs ready for developers to practice with.