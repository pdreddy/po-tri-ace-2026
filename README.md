# Prosper Racquet League Platform Monorepo

A scalable TypeScript monorepo with:
- **backend**: Node.js + Express API
- **mobile**: Expo React Native app
- **shared**: Shared interfaces/types

## Structure

```
.
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/env.ts
│   │   ├── firebase/admin.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── use-cases/
│   │   ├── middlewares/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── mobile/
│   ├── app/index.tsx
│   ├── src/
│   │   ├── config/firebase.ts
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   ├── app.json
│   └── .env.example
├── shared/
│   ├── src/index.ts
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── tsconfig.base.json
├── .eslintrc.cjs
├── .prettierrc
└── .env.example
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env templates:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp mobile/.env.example mobile/.env
   ```
3. Fill in Firebase and environment values.

## Scripts

From repository root:

- `npm run dev` → run backend and mobile in parallel
- `npm run build` → build shared, backend, and mobile
- `npm run start` → start backend from compiled output
- `npm run lint` → lint all workspaces
- `npm run format` → format files with Prettier

Workspace-specific:
- `npm --workspace backend run dev`
- `npm --workspace mobile run dev`
- `npm --workspace shared run build`

## Notes

- Backend Firebase Admin initializes from service account env values.
- Mobile Firebase Client uses Expo `EXPO_PUBLIC_*` env variables.
- `shared` package exposes domain interfaces for cross-platform use.
