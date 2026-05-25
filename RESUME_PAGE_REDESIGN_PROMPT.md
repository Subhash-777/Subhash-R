# CONTINUATION MASTER PROMPT
## SubhashOS Portfolio — Resume Page Smart Redesign
### Dynamic Project Selection + ATS-Optimised PDF Export

---

> **Context:** This is a continuation prompt for the SubhashOS portfolio project (Next.js 14, TypeScript, Tailwind CSS, GSAP, Framer Motion, Anime.js). The existing project structure, global OS shell, boot animation, and all other pages (Home, Projects, Research, Contact) are already implemented as described in `DESIGN.md`. This prompt focuses exclusively on **redesigning the `/resume` page** with a new smart, interactive, job-application-aware system.
>
> **Attached reference files for this task (reference them throughout):**
> - `Resume.pdf` — The finalized one-page ATS-optimised resume (visual + content reference)
> - `Resume.tex` — The full LaTeX source code (Sourabh Bajaj style, used on Overleaf) — the PDF must be generated in this exact format and layout
> - `ProjectBank_ATS_Strategy.md` — The complete project swap bank, ATS keyword lists, role-combination table, and resume strategy guide

---

## PART 1 — PROBLEM STATEMENT & CORE IDEA

Subhash R is actively applying for internships and full-time roles across multiple engineering disciplines (Full Stack, Backend, AI/ML, Computer Vision, NLP, Robotics, Data Engineering, Research). His resume is a single-page LaTeX document, and **the only section that changes between applications is the Projects section** — specifically which 3 projects (out of 18+ in his GitHub portfolio) are shown.

Currently, every role change requires:
1. Opening Overleaf
2. Manually editing the `.tex` file
3. Swapping project entries and bullet points
4. Recompiling to PDF
5. Downloading and renaming

**This is the problem the new Resume Page solves.** The portfolio's resume page becomes a **live, interactive resume builder** where Subhash can:

1. **View mode** — See his resume displayed in the same visual style as the OS portfolio theme
2. **Edit mode** — Select exactly 3 projects from his entire project bank, with ATS guidance built in
3. **Preview mode** — See the final one-page resume preview before exporting
4. **Export** — Download a pixel-perfect PDF that matches his `Resume.tex` layout and format, named correctly per role (e.g., `SubhashR_Backend_Engineer_2026.pdf`)

---

## PART 2 — PERSONAL DETAILS & CONSTANT RESUME CONTENT

> **Reference `Resume.pdf` and `Resume.tex` for exact formatting of all sections below. These sections are CONSTANT across all resume variants — they never change regardless of project selection.**

### Header Information (constant)
```
Name:      Subhash R
Portfolio: subhash-777.github.io
GitHub:    github.com/Subhash-777
LinkedIn:  linkedin.com/in/subhash-r-b21137393/
LeetCode:  leetcode.com/Subhash-777
Email:     subhashravichandran7432@gmail.com
Mobile:    +91 9962187680
Location:  Chennai, Tamil Nadu, India

One-line title (dynamically changes per role — see Part 5):
Default: "Full Stack Developer · Backend Systems · AI Integration · Published IEEE Researcher"
```

### Education (constant)
```
Institution: Amrita Vishwa Vidyapeetham
Location:    Chennai, India
Degree:      B.Tech in Computer Science and Engineering (AI)
GPA:         7.43 / 10
Duration:    Aug. 2023 – May 2027
Coursework:  Data Structures & Algorithms, DBMS, Operating Systems,
             Computer Networks, Machine Learning
```

### Technical Skills (constant — all 7 categories always shown)
```
Languages:        Python, JavaScript, TypeScript, Java, SQL, C++
Frontend:         React.js, Next.js, React Native, Vite, Tailwind CSS, Responsive UI Design
Backend:          Node.js, Express.js, FastAPI, REST APIs, WebSockets, JWT Authentication, OAuth 2.0
Databases:        PostgreSQL, MongoDB, MySQL, Redis
DevOps & Cloud:   Docker, Git, GitHub Actions, CI/CD, AWS (S3, EC2), Linux
Data & Streaming: Apache Kafka, Apache Spark, Hadoop, HDFS, Real-Time Analytics
AI & LLM:         Ollama, LangChain, OpenAI API, OCR, Prompt Engineering
```

### Publications (constant — both always shown)
```
[C.1] Subhash R. (2024). QR Code Encryption Using LU Decomposition and PCA.
      IConSCEPT 2024, IEEE. Best Research Paper Award.
      DOI: 10.1109/IConSCEPT61884.2024.10627798

[C.2] Subhash R. (2025). GAM Oversampling and GMM-Based Resampling for
      Imbalanced Credit Data Classification. IEEE InC 2025.
      DOI: 10.1109/InC465408.2025.11256257
```

### Achievements (constant — all 3 always shown)
```
1. Best Research Paper Award | IConSCEPT 2024, IEEE International Conference, NIT-PY, India | 2024
   - Recognized for original cryptographic research among 200+ submitted papers across
     IEEE signal processing tracks.

2. 2nd Place — Coders of the Black Pearl | Neuroinx Club (KVB), Amrita Vishwa Vidyapeetham | 2024
   - Secured 2nd place among 80+ participants demonstrating algorithmic problem-solving
     under competitive time constraints.

3. Top 4 Finalist — Shaastra Robosoccer | Shaastra 2025, IIT Madras | Jan 2025
   - Placed among the top 4 of 100+ national university teams; built autonomous navigation
     and real-time object-tracking systems.
```

### Certifications & Memberships (constant)
```
- ML, Data Science & AI Engineering with Python — Udemy
- TensorFlow Deep Learning Bootcamp — Udemy
- Machine Learning Certification — Corizo (Jul 2024)
- Other Certifications — [View Credentials link]
- IEEE Member, ID: 100981642 (Jan 2025 – Present)
```

---

## PART 3 — THE COMPLETE PROJECT BANK

> **Reference `ProjectBank_ATS_Strategy.md` for all bullet points, ATS keywords, and priority tier data. Store the complete bank in `src/data/projectBank.ts`.**

The project bank contains **15 projects** across all engineering domains. Each project entry in `projectBank.ts` must contain:

```typescript
// src/data/projectBank.ts
export interface ProjectBankEntry {
  id: string;                    // Unique slug e.g. "focus-flow-ai"
  title: string;                 // Display name
  stack: string;                 // Tech stack string (shown in resume under title)
  date: string;                  // Date range string
  githubUrl: string;             // GitHub link
  bullets: string[];             // Exactly 2 ATS-optimised bullet points
  atsKeywords: string[];         // Array of ATS trigger keywords
  priorityTier: 1 | 2 | 3;      // ATS priority tier (1 = strongest)
  roleFit: string[];             // Array of role categories this fits
  swapRecommendation: string;    // When to use / swap guidance
  status: 'active' | 'swap';    // Active in current resume or swap candidate
  domain: ProjectDomain[];       // Domain tags
}

export type ProjectDomain =
  | 'full-stack'
  | 'backend'
  | 'frontend'
  | 'ai-ml'
  | 'nlp'
  | 'computer-vision'
  | 'data-engineering'
  | 'robotics'
  | 'mobile'
  | 'iot'
  | 'research';
```

### Complete Project List (reference `ProjectBank_ATS_Strategy.md` for all bullets):

| # | Project ID | Status | Domain(s) |
|---|-----------|--------|-----------|
| 1 | `focus-flow-ai` | ✅ ACTIVE | full-stack, ai-ml |
| 2 | `smart-city-traffic` | ✅ ACTIVE | backend, data-engineering |
| 3 | `ecommerce-compliance` | ✅ ACTIVE | full-stack, backend |
| 4 | `async-ride-boost` | 🔄 SWAP | backend |
| 5 | `scan-scavvy` | 🔄 SWAP | full-stack, mobile |
| 6 | `rubik-solver-ai` | 🔄 SWAP | full-stack, computer-vision |
| 7 | `smart-ev` | 🔄 SWAP | backend, iot, data-engineering |
| 8 | `meld-dmc-fusion` | 🔄 SWAP | ai-ml, nlp |
| 9 | `emotion-aware-va` | 🔄 SWAP | ai-ml, nlp |
| 10 | `rgb-thermal-detection` | 🔄 SWAP | computer-vision, research |
| 11 | `hsi-fm-detection` | 🔄 SWAP | computer-vision, research |
| 12 | `memory-augmented-localization` | 🔄 SWAP | robotics, research |
| 13 | `robot-fault-detection` | 🔄 SWAP | robotics, ai-ml |
| 14 | `indian-artwork-classifier` | 🔄 SWAP | ai-ml, computer-vision |
| 15 | `glacier-movement-prediction` | 🔄 SWAP | research, ai-ml |

### Role-to-Project Combination Map (from `ProjectBank_ATS_Strategy.md` Part B)

Store this as `ROLE_COMBINATIONS` in `projectBank.ts` — used by the "Smart Suggest" feature:

```typescript
export const ROLE_COMBINATIONS: Record<string, [string, string, string]> = {
  'Full Stack Developer':           ['focus-flow-ai', 'ecommerce-compliance', 'async-ride-boost'],
  'Full Stack (Current Live)':      ['focus-flow-ai', 'smart-city-traffic', 'ecommerce-compliance'],
  'Backend Engineer':               ['smart-city-traffic', 'async-ride-boost', 'ecommerce-compliance'],
  'Frontend Engineer':              ['focus-flow-ai', 'ecommerce-compliance', 'rubik-solver-ai'],
  'Data Engineer':                  ['smart-city-traffic', 'smart-ev', 'focus-flow-ai'],
  'AI/ML Engineer':                 ['meld-dmc-fusion', 'emotion-aware-va', 'smart-city-traffic'],
  'NLP / LLM Engineer':             ['meld-dmc-fusion', 'emotion-aware-va', 'focus-flow-ai'],
  'Computer Vision Engineer':       ['rgb-thermal-detection', 'hsi-fm-detection', 'indian-artwork-classifier'],
  'Robotics / Autonomous Systems':  ['rgb-thermal-detection', 'memory-augmented-localization', 'robot-fault-detection'],
  'Research Internship':            ['rgb-thermal-detection', 'meld-dmc-fusion', 'glacier-movement-prediction'],
  'Mobile / Cross-Platform':        ['focus-flow-ai', 'scan-scavvy', 'ecommerce-compliance'],
  'IoT / EV / Mobility Tech':       ['smart-city-traffic', 'smart-ev', 'focus-flow-ai'],
  'SaaS / Product Startup':         ['focus-flow-ai', 'ecommerce-compliance', 'async-ride-boost'],
};
```

### ATS Role Titles & File Names (from `ProjectBank_ATS_Strategy.md` Part G)

```typescript
export const ROLE_FILENAMES: Record<string, string> = {
  'Full Stack Developer':           'SubhashR_FullStack_SWE_2026.pdf',
  'Backend Engineer':               'SubhashR_Backend_Engineer_2026.pdf',
  'AI/ML Engineer':                 'SubhashR_ML_Engineer_2026.pdf',
  'NLP / LLM Engineer':             'SubhashR_NLP_Engineer_2026.pdf',
  'Computer Vision Engineer':       'SubhashR_CV_Engineer_2026.pdf',
  'Robotics / Autonomous Systems':  'SubhashR_Robotics_Engineer_2026.pdf',
  'Research Internship':            'SubhashR_Research_Intern_2026.pdf',
  'Data Engineer':                  'SubhashR_DataEngineer_2026.pdf',
  'General / Cold Apply':           'SubhashR_Software_Engineer_2026.pdf',
};
```

---

## PART 4 — RESUME PAGE LAYOUT (VIEW MODE)

The **View Mode** is the default state of the resume page. It maintains the SubhashOS OS aesthetic (glass cards, dark theme, monospace fonts) while displaying resume content in a structured, readable format. It must respect the existing three-column layout pattern used across all other pages.

### Layout Structure (View Mode)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         TASKBAR (persistent)                         │
├─────────────────┬────────────────────────────┬────────────────────────┤
│  LEFT PANEL     │     MAIN CONTENT AREA      │   RIGHT PANEL          │
│  (Resume Nav)   │     (Resume Display)       │   (Profile Sidebar)    │
│                 │                            │                        │
│  overview.md    │  [Header + Links]          │  Profile Summary       │
│  education.json │  [One-line title]          │  Status: Available     │
│  projects/ 18   │  [Education section]       │  Specialization        │
│  publications/2 │  [Skills section]          │  Location              │
│  skills.yaml    │  [Projects section] ←KEY   │  Experience            │
│  achievements.  │  [Publications]            │  Languages             │
│  certifications │  [Achievements]            │                        │
│  memberships.   │  [Certifications]          │  Quick Actions         │
│  download.pdf   │                            │  (LinkedIn, GitHub..)  │
│                 │                            │                        │
│  ────────────── │                            │  System Summary        │
│  RESUME MODES   │                            │  (boot log style)      │
│  [Recruiter]    │                            │                        │
│  [Developer]    │                            │  ── ── ── ── ──        │
│  [Researcher]   │                            │  ATS Score Widget      │
│                 │                            │  (for selected role)   │
│  ── ── ── ──   │                            │                        │
│  [✏️ Edit Mode] │                            │  Role Fit Badges       │
│  [⬇️ Download]  │                            │                        │
├─────────────────┴────────────────────────────┴────────────────────────┤
│                         BOTTOM DOCK (persistent)                     │
└──────────────────────────────────────────────────────────────────────┘
```

### Left Panel — Resume Navigator (`ResumeNav.tsx` — existing, extend this)

The file-tree navigator already exists. **Add the following new items to it:**
- `projects/` folder — show badge count `18` (total project bank size)
- A pulsing `●` green dot next to `overview.md` (always active file)
- `[✏️ Edit Mode]` button — prominent, violet-outlined, at the bottom of the nav panel. Clicking this triggers the **Edit Mode overlay**.
- `[⬇️ Download PDF]` button — below Edit Mode. Opens the **Export Modal**.

### Main Content Area — Resume Display (`ResumeContent.tsx` — existing, rebuild)

In View Mode, the main content renders the resume in OS-themed sections. Each section is a **glass card** with a monospace terminal-style section header:

```
──── EDUCATION ────────────────────────────────────
  Amrita Vishwa Vidyapeetham           Chennai, India
  B.Tech CSE (AI)  GPA: 7.52/10     Aug 2023 – May 2027
  › Relevant Coursework: DSA, DBMS, OS, CN, ML

──── TECHNICAL SKILLS ─────────────────────────────
  Languages:   Python · JavaScript · TypeScript · Java · SQL · C++
  Frontend:    React.js · Next.js · React Native · Vite · Tailwind CSS
  Backend:     Node.js · Express.js · FastAPI · REST APIs · WebSockets
  ...

──── PROJECTS ──────────────────────────────────────
  [Currently showing 3 selected projects]
  [Click "Edit Mode" to swap projects]

  ■ Focus Flow AI: Productivity Intelligence Platform
    Next.js · TypeScript · FastAPI · Ollama · Firebase · Docker
    Dec 2025 – Jan 2026
    › Architected a full-stack AI productivity platform...
    › Engineered a Dockerized multi-service stack...

  ■ [Project 2]...
  ■ [Project 3]...

──── PUBLICATIONS ──────────────────────────────────
  [C.1]  QR Code Encryption Using LU Decomposition and PCA
         IConSCEPT 2024, IEEE  •  Best Research Paper Award
         DOI: 10.1109/IConSCEPT61884.2024.10627798

  [C.2]  GAM Oversampling and GMM-Based Resampling...
         IEEE InC 2025
         DOI: 10.1109/InC465408.2025.11256257

──── ACHIEVEMENTS ──────────────────────────────────
  Best Research Paper Award | IConSCEPT 2024, NIT-PY         2024
  › Recognized for original cryptographic research...

  2nd Place — Coders of the Black Pearl | Amrita            2024
  › Secured 2nd place among 80+ participants...

  Top 4 Finalist — Shaastra Robosoccer | IIT Madras     Jan 2025
  › Placed among the top 4 of 100+ national teams...

──── CERTIFICATIONS & MEMBERSHIPS ──────────────────
  ML, Data Science & AI Engineering — Udemy
  TensorFlow Deep Learning Bootcamp — Udemy
  Machine Learning Certification — Corizo (Jul 2024)
  IEEE Member, ID: 100981642  (Jan 2025 – Present)
```

**Styling rules for View Mode:**
- Section headers: uppercase monospace, with a full-width `──` rule, violet color
- Company/institution names: bold white
- Dates: right-aligned, `text-gray-400`, monospace
- Bullet points: prefix with `›` in violet, `text-gray-300`
- Tech stack chips: inline `<Badge>` components with subtle violet border
- DOI links: violet underline, open in new tab
- The Projects section has a subtle **animated shimmer** on the project cards to draw attention to the editable area

### Right Panel — Profile Sidebar (extend `ProfileSidebar.tsx`)

Add two new widgets to the existing sidebar:

**1. ATS Score Widget** (new):
```
┌─────────────────────────┐
│  ATS MATCH SCORE        │
│                         │
│  ████████░░  78%        │
│  Full Stack Developer   │
│                         │
│  ✓ Node.js found        │
│  ✓ FastAPI found        │
│  ✓ Docker found         │
│  ○ Kubernetes missing   │
└─────────────────────────┘
```
- Displays the estimated ATS keyword match for the currently selected role
- Score is computed client-side by counting how many of the selected role's top ATS keywords (from `ProjectBank_ATS_Strategy.md` Part C) appear across the selected 3 projects' `atsKeywords` arrays
- Animated circular/bar progress using Framer Motion when role or projects change
- Bullet list shows top 4 matched keywords (green checkmark) and top 2 missing ones (grey circle)

**2. Role Fit Badges** (new):
```
Current Role:
[Full Stack Developer] ×

Suggested role combos:
[Backend Engineer] [AI/ML Engineer]
[Computer Vision] [Research Intern]
```
- Shows the current selected role as a dismissible badge
- Below: 3–4 suggested role tags the user can click to instantly load the recommended project combination for that role

---

## PART 5 — EDIT MODE (The Core New Feature)

When "✏️ Edit Mode" is clicked, a **full-screen overlay** slides in from the bottom (Framer Motion `y: '100%' → 0`, spring physics), transforming the resume page into an interactive project configurator.

### Edit Mode Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  ✏️ RESUME EDITOR                              [Preview] [✕ Close]  │
│  Select exactly 3 projects for your resume                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ROLE SELECTOR ──────────────────────────────────────────────────    │
│  Applying for: [Full Stack Developer ▾]     [🎯 Smart Suggest]       │
│                                                                       │
│  ROLE TITLE: "Full Stack Developer · Backend Systems · Published..." │
│  (editable inline — updates the resume header one-line title)        │
│                                                                       │
│  ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──   │
│                                                                       │
│  SELECTED PROJECTS (3/3) ─────────────────────────────────────────   │
│                                                                       │
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────┐  │
│  │ SLOT 1               │ │ SLOT 2               │ │ SLOT 3      │  │
│  │ ■ Focus Flow AI  ×  │ │ ■ Smart City Traffic │ │ ■ E-Comm... │  │
│  │ Tier 1 · Full Stack │ │ Tier 1 · Backend     │ │ Tier 1 · FS │  │
│  │ ████ ATS: 94%       │ │ ████ ATS: 87%        │ │ ████ 91%    │  │
│  └──────────────────────┘ └──────────────────────┘ └─────────────┘  │
│                                                                       │
│  [🔀 Drag to reorder] — Order = order in the final resume            │
│                                                                       │
│  ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──   │
│                                                                       │
│  ALL PROJECTS ────────────────────────────────────────────────────   │
│                                                                       │
│  Filter: [All] [Full Stack] [Backend] [AI/ML] [CV] [NLP] [Robotics]│
│          [Data Eng] [Research] [Mobile] [IoT]                        │
│                                                                       │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │ ✅ Focus Flow AI             │  │ 🔄 Async Ride Boost          │ │
│  │ Next.js · FastAPI · Ollama  │  │ Node.js · Redis · WebSockets │ │
│  │ Dec 2025 – Jan 2026         │  │ 2025                         │ │
│  │ Tier 1  [Full Stack][AI/ML] │  │ Tier 1  [Backend]            │ │
│  │ ATS: 94%  [Selected ✓]      │  │ ATS: 82%  [+ Add]            │ │
│  │                              │  │                              │ │
│  │ › Architected a full-stack  │  │ › Engineered a high-concurr.│ │
│  │   AI productivity platform..│  │   ride-hailing backend...    │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│  ...  (scrollable grid of all 15 projects)                           │
│                                                                       │
│  ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──   │
│                                                                       │
│  COMBINED ATS SCORE ──────────────────────────────────────────────   │
│  Selected combo: Focus Flow AI + Smart City + E-Commerce            │
│  Total ATS score for "Full Stack Developer": ██████████ 91%         │
│  Matched: 34/37 key terms    Missing: Kubernetes, GraphQL           │
│                                                                       │
│           [👁 Preview Resume]          [⬇️ Export PDF]              │
└──────────────────────────────────────────────────────────────────────┘
```

### Edit Mode — Component Breakdown

#### A. Role Selector

A styled dropdown (custom, not native `<select>`) populated with all roles from `ROLE_COMBINATIONS`. Selecting a role:
1. Updates the "Combined ATS Score" widget
2. Does NOT auto-change the selected projects (user must click "Smart Suggest" for that)
3. Updates the `Role Fit Badges` in the right sidebar
4. Changes the "Applying for" label in the export filename preview

**Smart Suggest Button** (`🎯 Smart Suggest`): When clicked, instantly swaps the 3 selected slots to the recommended combination for the chosen role from `ROLE_COMBINATIONS`. Uses a GSAP card-flip/swap animation — the old project cards flip out (rotateY) and the new ones flip in.

#### B. One-Line Resume Title Editor

A small inline-editable text field showing the current resume subheading (e.g., "Full Stack Developer · Backend Systems · AI Integration · Published IEEE Researcher"). User can:
- Click to edit it directly (becomes a `contentEditable` or `<input>`)
- Or choose from preset titles mapped to each role (from `ProjectBank_ATS_Strategy.md` LinkedIn Headline Options section, adapted for resume)
- The edited title is used in the PDF header

#### C. Selected Project Slots (3 Slots)

Three card slots at the top of the editor. Each slot shows:
- Project name + remove (`×`) button
- Priority tier badge
- Domain tags
- Mini ATS score bar for that individual project
- Slot is empty state: dotted border with "Drop a project here" + slot number

**Drag-and-drop reordering:** Implement with `@dnd-kit/core` + `@dnd-kit/sortable`. The order of the 3 slots is the order they appear in the final PDF.

#### D. Project Browser Grid

Scrollable grid of all 15 projects from `projectBank.ts`. Each project card shows:
- Status badge: `✅ ACTIVE` or `🔄 SWAP`
- Project title + stack line
- Date range
- Domain filter tags (clickable to filter)
- Priority tier (Tier 1 in bright green, Tier 2 yellow, Tier 3 grey)
- ATS score for currently selected role (recalculates when role changes)
- Both bullet points (collapsed by default, expand on hover with Framer Motion)
- `[+ Add]` button — disabled and grayed if already selected or if 3 slots are full, otherwise violet

**Filter bar:** Pill-shaped filter buttons. Clicking a domain tag filters the grid. Active filter: violet fill. Multiple filters can be active simultaneously (AND logic).

**Sort options:** Sort by ATS Score (default), by Priority Tier, by Date.

#### E. Combined ATS Score Panel

At the bottom of the editor. Real-time calculation:
- Fetches the ATS keyword list for the currently selected role from `ProjectBank_ATS_Strategy.md` Part C
- Counts how many of those keywords appear in the union of `atsKeywords` arrays of the 3 selected projects
- Displays: percentage score, number matched, and up to 3 missing keywords

Score thresholds:
- 90%+ : "Excellent Match" (green)
- 75–89%: "Good Match" (yellow)
- < 75% : "Consider Swapping" (orange) + highlights lowest-scoring project slot

#### F. Preview Resume Button

Opens the **Resume Preview Panel** — a modal that renders the resume exactly as it will look in the PDF, using the same CSS layout as `Resume.pdf`. Uses `@react-pdf/renderer` or HTML-to-canvas approach to render a live preview. The preview is pixel-accurate to the LaTeX layout.

---

## PART 6 — RESUME PREVIEW PANEL

A full-screen modal (dark overlay, 90vh × 70vw centered panel) with:
- **Left:** Live rendered resume preview (A4 format, white background, exactly matching `Resume.tex` layout — see below for LaTeX-to-web mapping)
- **Right:** Quick summary panel

```
┌────────────────────────────────────────────────────────────────┐
│  👁 RESUME PREVIEW              [← Back to Editor] [⬇️ Export] │
├──────────────────────┬─────────────────────────────────────────┤
│                      │  EXPORT OPTIONS                         │
│  [A4 White preview   │                                         │
│   of the resume —   │  Role: [Full Stack Developer ▾]         │
│   exact LaTeX style] │                                         │
│                      │  File name:                             │
│  Subhash R           │  SubhashR_FullStack_SWE_2026.pdf       │
│  ──────────────────  │  (auto-generated from role)             │
│  Education           │                                         │
│  Technical Skills    │  Format: PDF (LaTeX-matched)            │
│  Projects ← 3 shown │                                         │
│  Publications        │  Page count: 1                          │
│  Achievements        │  ATS Score: 91%                         │
│  Certifications      │                                         │
│                      │  ─────────────────                      │
│  [← →] Zoom controls│  [⬇️ Download PDF]                      │
│                      │                                         │
│                      │  [📋 Copy LaTeX Code]                   │
│                      │                                         │
│                      │  [🔗 Share Link] (generates a unique    │
│                      │   temp URL showing this resume variant) │
└──────────────────────┴─────────────────────────────────────────┘
```

---

## PART 7 — PDF GENERATION SYSTEM

> **Reference `Resume.tex` for ALL formatting details. The PDF output must be identical in structure, typography, margins, and layout to the existing LaTeX-compiled PDF (`Resume.pdf`).**

### Approach — Two-Path PDF Generation

Implement **both paths** and let the system use whichever succeeds:

#### Path A — LaTeX Template Injection + Server Compilation (Primary, if server allows)

1. Store the full `Resume.tex` content as a template string in `src/lib/resumeTemplate.ts`
2. In the template, replace the `Projects` section and the header one-line title with template variables:
   ```
   {{PROJECT_1_TITLE}}, {{PROJECT_1_STACK}}, {{PROJECT_1_DATE}}, {{PROJECT_1_URL}}
   {{PROJECT_1_BULLET_1}}, {{PROJECT_1_BULLET_2}}
   {{PROJECT_2_...}}, {{PROJECT_3_...}}
   {{RESUME_TITLE_LINE}}
   ```
3. Create a Next.js API route `POST /api/resume/generate`:
   - Receives: `{ selectedProjectIds: [id1, id2, id3], roleTitle: string, fileName: string }`
   - Fetches project data from `projectBank.ts`
   - Injects data into LaTeX template
   - Compiles using `node-latex` npm package (wraps pdflatex) or calls an external LaTeX compilation service (e.g., `latex.js` or a Docker container with `texlive`)
   - Returns the compiled PDF as a binary stream
   - Client downloads it with the role-specific filename from `ROLE_FILENAMES`

#### Path B — @react-pdf/renderer (Fallback / Default for production without LaTeX)

Use `@react-pdf/renderer` to recreate the exact visual layout of `Resume.tex`:

```
src/lib/pdf/
├── ResumePDF.tsx           # Main PDF document component
├── PDFStyles.ts            # StyleSheet matching LaTeX layout
├── PDFSections/
│   ├── PDFHeader.tsx       # Header with name, links, contact
│   ├── PDFEducation.tsx    # Education section
│   ├── PDFSkills.tsx       # Technical skills
│   ├── PDFProjects.tsx     # Dynamic projects section (3 selected)
│   ├── PDFPublications.tsx # Publications
│   ├── PDFAchievements.tsx # Achievements
│   └── PDFCertifications.tsx
```

**Layout matching `Resume.tex` (reference the LaTeX code for exact values):**
```typescript
// PDFStyles.ts — must match Resume.tex geometry and formatting
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',   // LaTeX default (or Helvetica for screen-readable)
    fontSize: 10.5,              // matches documentclass[10.5pt]
    paddingTop: 32,              // top=0.45in
    paddingBottom: 32,           // bottom=0.45in
    paddingLeft: 36,             // left=0.50in
    paddingRight: 36,            // right=0.50in
    color: '#000000',
  },
  sectionHeader: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 4,
    marginTop: 8,
  },
  // ... all styles matching LaTeX commands exactly
  // Reference: \resumeSubheading, \resumeProjectHeading, \resumeItem
  // from Resume.tex for exact spacing values
});
```

**Dynamic PDF generation client-side:**
```tsx
// In ExportModal component
import { PDFDownloadLink } from '@react-pdf/renderer';

<PDFDownloadLink
  document={<ResumePDF selectedProjects={selectedProjects} roleTitle={roleTitle} />}
  fileName={ROLE_FILENAMES[selectedRole] || 'SubhashR_Resume_2026.pdf'}>
  {({ loading }) => (
    <button className="...">
      {loading ? 'Generating...' : '⬇️ Download PDF'}
    </button>
  )}
</PDFDownloadLink>
```

#### Path C — Copy LaTeX Code (Always Available)

A "📋 Copy LaTeX Code" button generates the filled `.tex` source and copies it to clipboard. This lets Subhash paste it directly into Overleaf for compilation — zero friction for the Overleaf workflow.

```typescript
// src/lib/generateLatex.ts
export function generateLatex(
  selectedProjects: ProjectBankEntry[],
  roleTitle: string
): string {
  // Take the full Resume.tex template string
  // Inject the 3 selected projects' LaTeX-formatted content
  // Return the complete .tex source
}
```

---

## PART 8 — STATE MANAGEMENT

Extend `src/store/app.ts` (Zustand) with a new `resumeSlice`:

```typescript
// Add to src/store/app.ts

interface ResumeState {
  // View mode
  activeResumeSection: string;        // Currently highlighted section in left nav
  resumeMode: 'recruiter' | 'developer' | 'researcher'; // Existing modes

  // Edit mode
  isEditModeOpen: boolean;
  selectedRole: string;               // Currently selected role from dropdown
  selectedProjectIds: [string, string, string] | string[]; // 3 selected project IDs
  customRoleTitle: string;            // Editable one-line resume title
  activeFilter: string[];             // Active domain filter tags

  // Export
  isPreviewOpen: boolean;
  isExporting: boolean;

  // Actions
  openEditMode: () => void;
  closeEditMode: () => void;
  setSelectedRole: (role: string) => void;
  applySuggestedCombo: (role: string) => void; // Smart Suggest
  addProject: (projectId: string) => void;
  removeProject: (projectId: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  setCustomRoleTitle: (title: string) => void;
  setFilter: (domain: string) => void;
  openPreview: () => void;
  closePreview: () => void;
  exportPDF: () => Promise<void>;
}
```

**Persist** the `selectedProjectIds`, `selectedRole`, and `customRoleTitle` in `localStorage` so Subhash's last selection is remembered between sessions.

---

## PART 9 — ANIMATION SPECIFICATIONS

All new animations must match the SubhashOS motion system (GSAP + Framer Motion + Anime.js).

### Edit Mode Open/Close
```typescript
// Framer Motion — Edit Mode overlay slide-up
const editModeVariants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:    { y: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};
```

### Smart Suggest Card Swap
```typescript
// GSAP — Cards flip out when Smart Suggest loads a new combo
gsap.to('.selected-project-slot', {
  rotateY: 90, opacity: 0, stagger: 0.08, duration: 0.2, ease: 'power2.in',
  onComplete: () => {
    // Update project data in state
    gsap.fromTo('.selected-project-slot',
      { rotateY: -90, opacity: 0 },
      { rotateY: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: 'back.out(1.4)' }
    );
  }
});
```

### Project Card Add/Remove
```typescript
// Framer Motion — project added to slot
const slotVariants = {
  empty:    { scale: 1, borderColor: 'rgba(255,255,255,0.1)' },
  filled:   { scale: 1, borderColor: 'rgba(124,58,237,0.5)' },
  entering: { scale: [0.8, 1.05, 1], transition: { duration: 0.4, ease: 'easeOut' } },
};
```

### ATS Score Counter
```typescript
// GSAP — ATS score animates when projects change
gsap.fromTo('#ats-score-value',
  { textContent: previousScore },
  { textContent: newScore, snap: { textContent: 1 }, duration: 0.8, ease: 'power2.out' }
);
```

### Project Browser Filter
```typescript
// Framer Motion — grid reflows when filter changes
// Use layout animation on each card
<motion.div layout layoutId={project.id}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}>
```

### Preview Modal Open
```typescript
// Framer Motion
const previewVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,
             transition: { type: 'spring', stiffness: 400, damping: 25 } },
  exit:    { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
};
```

### Export Loading Animation
When PDF is generating, show a terminal-style progress animation:
```
> Building resume...
> Injecting Focus Flow AI...
> Injecting Smart City Traffic...
> Injecting E-Commerce Compliance...
> Compiling PDF...
> Optimizing for ATS...
> Done. SubhashR_FullStack_SWE_2026.pdf ready.
```
Lines appear with GSAP `TextPlugin` stagger. Each line types out, then the file downloads automatically.

---

## PART 10 — NEW & UPDATED PROJECT STRUCTURE

```
subhashos/
├── src/
│   ├── app/
│   │   └── resume/
│   │       ├── page.tsx                    # Resume page (updated — new layout wrapper)
│   │       └── api/                        # NEW: API routes for PDF generation
│   │           └── generate/
│   │               └── route.ts            # POST /api/resume/generate (LaTeX compilation)
│   │
│   ├── components/
│   │   └── resume/
│   │       ├── ResumeNav.tsx               # EXISTING — extend with Edit Mode button
│   │       ├── ResumeContent.tsx           # EXISTING — rebuild for new View Mode
│   │       ├── ResumeModes.tsx             # EXISTING — keep Recruiter/Dev/Researcher
│   │       ├── ProfileSidebar.tsx          # EXISTING — add ATS widget + Role Fit Badges
│   │       │
│   │       ├── EditMode/                   # NEW: Edit Mode overlay system
│   │       │   ├── EditModeOverlay.tsx     # Full-screen overlay container
│   │       │   ├── RoleSelector.tsx        # Role dropdown + Smart Suggest button
│   │       │   ├── RoleTitleEditor.tsx     # Inline editable one-line title
│   │       │   ├── SelectedSlots.tsx       # 3 selected project slots (drag+drop)
│   │       │   ├── ProjectBrowser.tsx      # Scrollable grid of all 15 projects
│   │       │   ├── ProjectBrowserCard.tsx  # Individual project card in browser
│   │       │   ├── DomainFilter.tsx        # Filter pill buttons
│   │       │   └── CombinedATSScore.tsx    # Real-time ATS score panel
│   │       │
│   │       ├── Preview/                    # NEW: Resume Preview system
│   │       │   ├── PreviewModal.tsx        # Preview modal container
│   │       │   ├── ResumePreviewPane.tsx   # Left pane: rendered resume
│   │       │   └── ExportOptions.tsx       # Right pane: export controls
│   │       │
│   │       └── ATSWidget.tsx               # NEW: ATS Score Widget (right sidebar)
│   │
│   ├── data/
│   │   ├── projects.ts                     # EXISTING (portfolio display data)
│   │   ├── research.ts                     # EXISTING
│   │   ├── skills.ts                       # EXISTING
│   │   ├── resume.ts                       # EXISTING — add constant sections
│   │   └── projectBank.ts                  # NEW: Complete 15-project bank with all
│   │                                       #      ATS data from ProjectBank_ATS_Strategy.md
│   │
│   ├── lib/
│   │   ├── animations.ts                   # EXISTING
│   │   ├── constants.ts                    # EXISTING
│   │   ├── gsap.ts                         # EXISTING
│   │   ├── generateLatex.ts                # NEW: LaTeX template injection function
│   │   ├── resumeTemplate.ts               # NEW: Full Resume.tex as template string
│   │   └── atsScorer.ts                    # NEW: ATS score calculation logic
│   │
│   ├── lib/pdf/                            # NEW: PDF generation via @react-pdf/renderer
│   │   ├── ResumePDF.tsx                   # Root PDF document component
│   │   ├── PDFStyles.ts                    # StyleSheet (matches Resume.tex exactly)
│   │   └── sections/
│   │       ├── PDFHeader.tsx               # Header section
│   │       ├── PDFEducation.tsx
│   │       ├── PDFSkills.tsx
│   │       ├── PDFProjects.tsx             # Dynamic — receives 3 selected projects
│   │       ├── PDFPublications.tsx
│   │       ├── PDFAchievements.tsx
│   │       └── PDFCertifications.tsx
│   │
│   ├── hooks/
│   │   ├── useBattery.ts                   # EXISTING
│   │   ├── useBootComplete.ts              # EXISTING
│   │   ├── useLiveClock.ts                 # EXISTING
│   │   ├── useMusicPlayer.ts               # EXISTING
│   │   ├── usePageTransition.ts            # EXISTING
│   │   ├── useATSScore.ts                  # NEW: ATS score calculation hook
│   │   └── useResumeExport.ts              # NEW: PDF export orchestration hook
│   │
│   └── store/
│       └── app.ts                          # EXISTING — add resumeSlice (see Part 8)
│
├── package.json                            # Add new deps (see Part 11)
└── ... (all other existing files unchanged)
```

---

## PART 11 — NEW DEPENDENCIES TO INSTALL

```bash
# Drag-and-drop for project slot reordering
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# PDF generation (React-based, no server needed)
npm install @react-pdf/renderer

# LaTeX compilation (optional — only if server-side path is used)
npm install node-latex  # requires pdflatex on server

# Clipboard API helper
npm install copy-to-clipboard

# Fuzzy search for project browser
npm install fuse.js
```

---

## PART 12 — `src/lib/atsScorer.ts` Implementation

```typescript
// src/lib/atsScorer.ts
import { ProjectBankEntry } from '@/data/projectBank';

// ATS keyword lists per role category
// Reference: ProjectBank_ATS_Strategy.md Part C
const ROLE_KEYWORDS: Record<string, string[]> = {
  'Full Stack Developer': [
    'REST API', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Docker',
    'PostgreSQL', 'MongoDB', 'FastAPI', 'OAuth 2.0', 'full-stack',
    'microservices', 'CI/CD', 'WebSockets', 'JWT', 'Express.js', 'Vite',
    'Tailwind CSS', 'Firebase', 'Redis', 'RBAC', 'containerization', ...
  ],
  'Backend Engineer': [
    'Node.js', 'Express.js', 'REST API', 'WebSockets', 'Redis', 'MongoDB',
    'Docker', 'JWT', 'RBAC', 'high-concurrency', 'async processing',
    'Apache Kafka', 'distributed systems', 'PostgreSQL', 'MySQL', 'FastAPI', ...
  ],
  // ... all roles from ProjectBank_ATS_Strategy.md Part C
};

export function calculateATSScore(
  selectedProjects: ProjectBankEntry[],
  role: string
): {
  score: number;             // 0–100
  matched: string[];         // keywords found
  missing: string[];         // top missing keywords
  label: 'Excellent Match' | 'Good Match' | 'Consider Swapping';
} {
  const keywords = ROLE_KEYWORDS[role] ?? [];
  const allProjectKeywords = new Set(
    selectedProjects.flatMap(p => p.atsKeywords.map(k => k.toLowerCase()))
  );

  const matched = keywords.filter(k => allProjectKeywords.has(k.toLowerCase()));
  const missing = keywords.filter(k => !allProjectKeywords.has(k.toLowerCase())).slice(0, 5);
  const score = Math.round((matched.length / keywords.length) * 100);

  const label =
    score >= 90 ? 'Excellent Match' :
    score >= 75 ? 'Good Match' :
    'Consider Swapping';

  return { score, matched, missing, label };
}
```

---

## PART 13 — `src/lib/generateLatex.ts` Implementation

```typescript
// src/lib/generateLatex.ts
// Reference Resume.tex for the exact LaTeX command structure

import { ProjectBankEntry } from '@/data/projectBank';
import { RESUME_TEMPLATE } from './resumeTemplate';

function escapeLatex(str: string): string {
  return str
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\$/g, '\\$')
    .replace(/\^/g, '\\^{}')
    .replace(/~/g, '\\~{}')
    .replace(/</g, '\\textless{}')
    .replace(/>/g, '\\textgreater{}');
}

function formatProjectLatex(project: ProjectBankEntry): string {
  return `
\\resumeProjectHeading
  {\\textbf{${escapeLatex(project.title)}} \\\\
   \\small\\textit{${escapeLatex(project.stack)}}
   \\href{${project.githubUrl}}{\\, \\small[\\faGithub]}}{${escapeLatex(project.date)}}
\\resumeItemListStart
  \\resumeItem{${escapeLatex(project.bullets[0])}}
  \\resumeItem{${escapeLatex(project.bullets[1])}}
\\resumeItemListEnd
`;
}

export function generateLatex(
  selectedProjects: ProjectBankEntry[],
  roleTitle: string
): string {
  const projectsLatex = selectedProjects.map(formatProjectLatex).join('\n');

  return RESUME_TEMPLATE
    .replace('{{ROLE_TITLE_LINE}}', escapeLatex(roleTitle))
    .replace('{{PROJECTS_CONTENT}}', projectsLatex);
}
```

---

## PART 14 — IMPLEMENTATION NOTES & RULES

1. **All constant resume sections** (Education, Skills, Publications, Achievements, Certifications) must be hardcoded from `Resume.pdf` and `Resume.tex`. Reference those files for exact wording, punctuation, formatting, and metrics. Do not paraphrase.

2. **All project bullet points** must be sourced verbatim from `ProjectBank_ATS_Strategy.md`. These are pre-optimised ATS bullets — do not rephrase, shorten, or alter them in any way.

3. **PDF layout must match `Resume.tex` exactly** — same margins (`top/bottom: 0.45in, left/right: 0.50in`), font size (`10.5pt`), section formatting (`\scshape`, `\titlerule`), and command structure (`\resumeSubheading`, `\resumeProjectHeading`, `\resumeItem`).

4. **The Edit Mode is only accessible to the portfolio owner** — it is not a public feature. Add a simple PIN gate (4-digit code stored in env variable `NEXT_PUBLIC_EDIT_PIN`) before the Edit Mode overlay opens. This prevents visitors from accidentally triggering it.

5. **Selected state persists in localStorage** — use Zustand's `persist` middleware to save `selectedProjectIds`, `selectedRole`, and `customRoleTitle`. On next visit, the last-used resume configuration is restored.

6. **Smart Suggest is animated** — when the button is clicked, the 3 slot cards visually "swap out" (GSAP rotateY flip) before being replaced. This gives clear feedback that something changed.

7. **File naming is always role-based** — the exported PDF filename is always pulled from `ROLE_FILENAMES` in `projectBank.ts`. If the user selected a custom role title not in the map, default to `SubhashR_Software_Engineer_2026.pdf`. Never use `resume.pdf` or `cv.pdf`.

8. **The LaTeX "Copy Code" path must always work** — even if the PDF renderer fails, Subhash can always copy the generated `.tex` and paste it into Overleaf. This is the zero-dependency fallback.

9. **The page must remain 100% within the SubhashOS design system** — dark background, glass cards, violet accents, monospace fonts, GSAP/Framer Motion animations. The Edit Mode overlay should feel like a new "application window" opening on top of the desktop.

10. **ATS Score is always visible** — once a role is selected, the ATS score updates in real-time as projects are added/removed. It should never require a manual "calculate" step.

---

## PART 15 — QUICK REFERENCE: KEY FILE PATHS

| File | Purpose |
|------|---------|
| `Resume.pdf` | Visual reference — exact layout, typography, whitespace to match in PDF output |
| `Resume.tex` | Source template — inject into `resumeTemplate.ts`; all LaTeX commands reference this |
| `ProjectBank_ATS_Strategy.md` | All bullet points for `projectBank.ts`; role combinations for `ROLE_COMBINATIONS`; ATS keywords for `atsScorer.ts`; file names for `ROLE_FILENAMES` |
| `src/data/projectBank.ts` | Central source of truth for all 15 projects (new file to create) |
| `src/lib/resumeTemplate.ts` | Full `Resume.tex` as a TypeScript template string with `{{PLACEHOLDER}}` slots |
| `src/lib/generateLatex.ts` | Fills the template, returns complete `.tex` source |
| `src/lib/atsScorer.ts` | Calculates ATS match score for any role + project combo |
| `src/lib/pdf/ResumePDF.tsx` | `@react-pdf/renderer` document matching the LaTeX layout |
| `src/store/app.ts` | Zustand store — add `resumeSlice` with all Edit Mode state |
| `src/app/resume/api/generate/route.ts` | Optional server-side LaTeX compilation endpoint |
