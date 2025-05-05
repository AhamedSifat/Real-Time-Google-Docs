<div align="center">
  <img src="https://via.placeholder.com/1000x400?text=Real-Time+Google+Docs+Clone+Screenshot" alt="Google Docs Clone Screenshot" />
</div>

<h1 align="center">📝 Real-Time Google Docs Clone</h1>

<p align="center">
  A powerful and collaborative document editing tool inspired by Google Docs.<br/>
  Built with <strong>Next.js 15</strong>, <strong>React 19</strong>, and <strong>Convex</strong> for real-time performance.
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</div>

---

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🔧 Getting Started](#-getting-started)
- [🔑 Environment Variables](#environment-variables)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### ✍️ Core Editing

- Rich text editing with **Markdown** shortcuts
- Preserves styling (fonts, colors, layout)
- Smart paste from web/docs
- Image uploads, dynamic tables & charts
- Infinite undo/redo, checklists

### 🤝 Collaboration

- Real-time multi-user editing
- Live cursors, selections & presence
- Inline comments and **@mentions**
- Team invites, document templates, workspaces

### 📤 Export & Integration

- Export to **PDF**, **HTML**, **TXT**, **JSON**
- Smart link previews, checklists, notifications

### 🔐 Security & Management

- Auth via **Clerk**
- Role-based access control
- Fully mobile-responsive
- API support for developers

---

## 🛠️ Tech Stack

| Layer              | Technologies                                                              |
| ------------------ | ------------------------------------------------------------------------- |
| **Frontend**       | Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI, TipTap Editor |
| **Realtime & DB**  | Convex (DB + real-time), Liveblocks, WebSockets                           |
| **Auth & Storage** | Clerk, AWS S3                                                             |

---

## 🔧 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- npm / yarn / bun

> ⚠️ **React 19 (RC)** note:  
> Use `--legacy-peer-deps` when installing via npm, as some packages may not officially support React 19 yet.  
> `bun` users can install normally.

### 🚀 Installation

```bash
git clone https://github.com/yourusername/google-docs-clone.git
cd google-docs-clone
npm install --legacy-peer-deps
# or
bun install
```
