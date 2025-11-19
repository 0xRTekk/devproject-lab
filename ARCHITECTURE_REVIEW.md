# DevBrief Backend Architecture Review

## Current State Summary
- `chat.ts` orchestrates CLI parsing, OpenAI prompting, JSON validation, Supabase inserts, and file output within one script, tightly coupling policy, infrastructure, and delivery responsibilities.@src/chat.ts#1-151
- Domain concepts (`Brief`, `UserStory`) are represented only as Zod schemas with no encapsulated domain behaviour or invariants beyond schema validation.@src/schema/brief.ts#3-28
- Prompt building is treated as part of the application core rather than an infrastructure concern, leading to leakage of provider-specific formatting into higher layers.@src/prompts.ts#3-113

## Key Issues by Severity
1. **Critical – Layer entanglement**: `chat.ts` violates clean architecture and DDD boundaries by performing CLI IO, domain decisions, and persistence directly. This hinders testability and evolution.@src/chat.ts#1-151
2. **High – Missing domain layer**: There are no explicit domain entities or value objects to capture business rules (e.g., story ordering, tech focus enum semantics). Schema validation alone cannot express richer invariants or behaviour.@src/schema/brief.ts#3-28
3. **Medium – Infrastructure leakage**: Prompt templates and Supabase-specific column shapes reside beside orchestration logic, so any provider change forces rewrites across the codebase.@src/chat.ts#69-121@src/prompts.ts#3-113
4. **Medium – Transactional gaps**: Brief insertion and user-story insertion are separate operations without protection against partial failure, risking orphaned records.@src/chat.ts#69-121
5. **Low – Operational concerns**: Logging, configuration, and error handling are interwoven with application logic, reducing observability consistency and making retries/backoff unstructured.@src/chat.ts#124-149

## Target Architecture (DDD + Clean Architecture)
```
src/
  domain/
    briefs/
      Brief.ts
      UserStory.ts
      BriefFactory.ts
      BriefPolicies.ts
  application/
    briefs/
      commands/GenerateBriefCommand.ts
      useCases/GenerateAndPersistBrief.ts
    ports/
      BriefRepository.ts
      BriefVectorStore.ts
      PromptGenerator.ts
      LanguageModelClient.ts
  infrastructure/
    persistence/
      supabase/
        SupabaseBriefRepository.ts
        SupabaseVectorStore.ts
    llm/
      OpenAIPromptGenerator.ts
      OpenAILanguageModelClient.ts
    filesystem/
      JsonBriefWriter.ts
    config/
      EnvConfigProvider.ts
  interface/
    cli/
      CliController.ts
      CliParser.ts (wraps current `cliArgs` logic)
  shared/
    logging/
      Logger.ts
    utils/
      Result.ts
```
- **Domain Layer**: Pure TypeScript classes/value objects encapsulating invariants. Example: `Brief` ensures exactly three ordered `UserStory` instances.
- **Application Layer**: Orchestrates use cases through ports, transforming DTOs to domain entities, coordinating repositories, and emitting events.
- **Infrastructure Layer**: Implements ports via Supabase, OpenAI, filesystem, configuration, logging. All third-party SDKs live here.
- **Interface Layer**: Entry points (CLI, HTTP, workers) translating external requests into application commands.

## Domain Modelling Recommendations
- Replace raw Zod schemas with domain entities constructed via factories; use Zod at boundaries for DTO validation.
- Create value objects for enums (`Level`, `TechFocus`, `CompanySize`, `Complexity`) to centralize mapping between domain values and DB enum types.
- Encapsulate user-story ordering and acceptance-criteria requirements inside `Brief` aggregate to guarantee consistency before persistence.

## Application Use Cases
- `GenerateAndPersistBrief`: Coordinates prompt generation, LLM call, DTO validation, entity creation, repository persistence, vector upsert, and output writing. Accepts `GenerateBriefCommand` containing CLI parameters.
- `PersistBrief`: Separate use case for inserting externally provided briefs, enabling reuse/testing without LLM dependency.
- Return structured `Result` objects (success/failure) to the interface layer for uniform error handling.

## Infrastructure Guidance
- **Supabase Repository**: Implement `BriefRepository` with transactional guarantees (using RPC or Supabase `pg` transaction) to insert brief + stories atomically.
- **OpenAI Adapters**: Isolate prompt template generation and model invocation. Provide retries/backoff and translate provider errors into domain-friendly failures.
- **Filesystem Writer**: Keep `writeBriefsToFile` behind an interface for easier testing and alternative persistence strategies.
- **Configuration**: Centralize `.env` parsing and validation via a config provider, injected where needed.

## Interface Layer Improvements
- Move CLI parsing into `interface/cli`; transform CLI args into a domain command object.
- Keep the `main` entrypoint minimal: resolve dependencies, build the use case, execute, and handle success/failure output.

## Cross-Cutting Concerns
- Introduce a lightweight logging abstraction (`Logger` interface) with implementations for console or structured logging.
- Adopt a `Result`/`Either` utility to propagate errors without throwing across layers.
- Define error hierarchies (e.g., `DomainError`, `ApplicationError`, `InfrastructureError`) to simplify handling downstream.

## Stepwise Refactor Plan
1. **Extract domain models**: Create `Brief` aggregate and `UserStory` entity; ensure all invariants live there. Update Zod schema usage to map into domain types.
2. **Introduce ports**: Define repository and LLM interfaces in the application layer; adapt current Supabase/OpenAI code behind temporary adapters.
3. **Rebuild use case**: Implement `GenerateAndPersistBrief` orchestrating domain + ports. Replace logic inside `chat.ts` with a composition root that wires dependencies.
4. **Modularize prompts**: Move prompt builders into an infrastructure adapter that implements `PromptGenerator`.
5. **Transactional persistence**: Update Supabase adapter to handle brief + stories in one unit of work (consider REST RPC or serverless function).
6. **CLI interface**: Refactor entrypoint to parse args, instantiate use case, and handle success/errors consistently.
7. **Testing**: Add unit tests for domain entities and use cases; integration tests for Supabase adapter and OpenAI adapter (with mocks).

## Next Steps
- Prioritize domain modelling and port definitions—they unlock the rest of the clean architecture migration.
- Establish dependency injection (manual or minimal container) for composing adapters.
- Gradually move existing functionality into the new structure, keeping legacy `chat.ts` as a façade until the refactor is complete.
