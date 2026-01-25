# 🚀 DevProject Lab — AI-Powered Project-Based Learning Platform

DevProject Lab is a platform that helps developers grow their technical and soft skills by working on realistic, AI-generated corporate-style projects.

The goal is simple:

> Learn by building.  
> Build like in real companies.  
> Grow faster.

---

## ✨ Why DevProject Lab?

Many developers struggle with:

- ❌ Tutorial hell  
- ❌ Toy projects that don't reflect real-world work  
- ❌ Lack of portfolio credibility  
- ❌ No structured progression  
- ❌ Difficulty proving skills to recruiters  

DevProject Lab solves this by providing:

- ✅ Realistic project briefs  
- ✅ Automated GitHub repositories  
- ✅ Structured task breakdown  
- ✅ Progress tracking  
- ✅ Portfolio-ready projects  

---

## 🎯 Project Vision

This platform aims to become:

- A **learning accelerator** for developers  
- A **talent pool** for companies and ESNs  
- A **tracking tool** for schools and bootcamps  

Current focus: **validate developer value first (MVP).**

---

## 🧩 Core Features (MVP)

### 👤 Authentication
- GitHub OAuth via Supabase

### 📄 Project Generation
- AI-generated project brief  
- Technical stack  
- Functional requirements  
- Deliverables  
- Milestones  

### 🐙 GitHub Automation
- Repository creation  
- README generation  
- Issues/tasks creation  
- Project scaffolding  

### 📊 Progress Tracking
- Task completion rate  
- Repository status  
- Project lifecycle  

### 🧠 Portfolio Building
- Project history  
- Public links  
- Exportable references (coming soon)  

---

## 🏗️ Tech Stack

### Frontend / Backend
- Next.js 16 (App Router)  
- TypeScript  
- Server Actions  

### Auth & Database
- Supabase  
- PostgreSQL  

### AI
- OpenAI / compatible LLM API  
- Zod for output validation  

### Integrations
- GitHub API  

### Tooling
- ESLint  
- Prettier  
- Vitest (planned)  

---

## 📁 Project Structure

```

/
├─ app/              # Next.js routes (App Router)
├─ actions/          # Server Actions
├─ services/         # Business logic (AI, tracking, etc.)
├─ lib/              # External clients (Supabase, GitHub)
├─ types/            # Shared types
├─ utils/            # Helpers
├─ docs/             # Architecture & decisions
└─ .agent.md         # AI workflow rules

````

The architecture is intentionally simple and monolithic to ensure:

- High readability  
- Easy onboarding  
- Low cognitive load  
- Fast iteration  

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devproject-lab.git
cd devproject-lab
````

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=

GITHUB_TOKEN=
```

---

### 4. Run the project

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🚧 Roadmap

### Phase 1 — MVP (Current)

* Auth
* Project generator
* GitHub automation
* Basic tracking
* Beta testing

### Phase 2 — Engagement

* Gamification
* Badges
* Ranking
* Social sharing

### Phase 3 — Talent Platform

* Company access
* Skill matching
* Talent pools
* Hiring dashboards

---

## 🤝 Contributing

This project is currently in early-stage development.

Contributions are welcome after MVP validation.

If you want to contribute:

1. Fork the repo
2. Create a branch
3. Open a PR
4. Describe clearly what you improved

---

## 📝 Feedback & Beta

We are actively looking for beta testers.

If you want to test the platform:

👉 Contact via GitHub issues
👉 Or LinkedIn (link coming soon)

Feedback is highly valuable and directly influences the roadmap.

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

Built by **Rémi Sulpice**

Senior Full-Stack Engineer
Product-Oriented Developer
Developer Educator

Passionate about building tools that help developers grow.

---

> "Build real things. Learn real skills."
