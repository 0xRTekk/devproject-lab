## Architecture finale cible (simple + solide)
```text
src/
├─ app/
│  ├─ (auth)/
│  │   └─ login/page.tsx
│  │
│  ├─ dashboard/
│  │   └─ page.tsx
│  │
│  ├─ api/
│  │   └─ webhooks/
│  │       └─ github/route.ts
│  │
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ actions/
│  ├─ auth.actions.ts
│  └─ projects.actions.ts
│
├─ services/
│  ├─ project.service.ts
│  ├─ user.service.ts
│  └─ github.service.ts
│
├─ lib/
│  ├─ supabase.server.ts
│  ├─ supabase.client.ts
│  ├─ ai.ts
│  ├─ github.ts
│  └─ env.ts
│
├─ types/
│  ├─ project.ts
│  └─ user.ts
│
└─ utils/
   └─ validators.ts
```

## Règle d’or des responsabilités
| Dossier  | Rôle            |
| -------- | --------------- |
| app/api  | HTTP uniquement |
| actions  | Server Actions  |
| services | Métier          |
| lib      | Infra           |
| types    | Types           |
| utils    | Helpers         |

## Quand utiliser API Routes vs Server Actions

### 👉 Server Actions → par défaut

Pour :
- formulaires
- boutons
- actions user

Ex :
```typescript
"use server";

export async function generateProject() {}
```

Simple, rapide.

### 👉 API Routes → seulement si :

- webhoo
- externe
- cron
- REST public

Ex :

```text
/api/github/webhook
```

## Ton workflow idéal

À partir de maintenant :

1. Tu designs
→ papier / Notion / Obsidian

2. Tu codes squelette
→ dossiers vides

3. Tu demandes à l’IA
→ “Complète ce service”

4. Tu reviews
5. Tu merges

Comme un lead.
