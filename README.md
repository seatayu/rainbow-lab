# Cloudflare Full-Stack React Boilerplate

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/seatayu/rainbow-lab)

A production-ready boilerplate for building full-stack applications on Cloudflare. Features a modern React frontend with Tailwind CSS and shadcn/ui, powered by Vite for fast development, and a Hono-based API backend running on Cloudflare Workers.

## 🚀 Features

- **Full-Stack Ready**: React frontend + Hono API in Cloudflare Workers
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark mode support
- **TypeScript Everywhere**: End-to-end type safety
- **Performance Optimized**: Vite bundling, TanStack Query for data fetching
- **Developer Experience**: Hot reload, error boundaries, theme toggle
- **Responsive Design**: Mobile-first with sidebar layout
- **Easy API Routes**: Add custom endpoints in `worker/userRoutes.ts`
- **Cloudflare Native**: Deploy with Wrangler, zero-config Pages integration

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Lucide Icons, Sonner (toasts)
- **Backend**: Hono, Cloudflare Workers, TypeScript
- **Utils**: Zustand (state), Zod (validation), Framer Motion (animations), Immer
- **Styling**: Tailwind CSS with CSS variables, animations
- **Tools**: Bun (package manager), Wrangler (deployment)

## ⚡ Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest login`)

### Installation

```bash
bun install
```

### Local Development

Frontend (Vite dev server):
```bash
bun dev
```
Open [http://localhost:3000](http://localhost:3000)

Full-stack with Worker API:
```bash
wrangler dev
```
Open [http://localhost:8787](http://localhost:8787)

Type generation:
```bash
bun cf-typegen
```

Linting:
```bash
bun lint
```

### Build for Production

```bash
bun build
```

## 📚 Project Structure

```
├── src/                 # React frontend
│   ├── components/      # UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (error reporting, cn)
│   ├── pages/           # Route components
│   └── main.tsx         # Entry point
├── worker/              # Cloudflare Worker API
│   ├── index.ts         # Core routing (DO NOT MODIFY)
│   ├── core-utils.ts    # Env types (DO NOT MODIFY)
│   └── userRoutes.ts    # Add your API routes here
├── tailwind.config.js   # Tailwind + shadcn config
└── wrangler.jsonc       # Cloudflare config
```

## 🔌 API Development

Add routes in `worker/userRoutes.ts`:

```ts
import { Hono } from "hono";

export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get("/api/users", (c) => c.json({ users: [] }));
  // Your routes here
}
```

API endpoints available at `/api/*`.

Client error reporting: POST `/api/client-errors`.

## 🚀 Deployment

Deploy to Cloudflare Pages + Workers:

```bash
bun deploy
```

Or manually:
```bash
bun build
wrangler deploy
```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/seatayu/rainbow-lab)

Configure your Cloudflare account in `wrangler.jsonc`.

## 🤝 Contributing

1. Fork the repo
2. `bun install`
3. Create a feature branch (`bun dev`)
4. Commit changes (`bun lint`)
5. Push and open a PR

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare developers. Questions? [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)