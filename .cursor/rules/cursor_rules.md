# Cursor Project Rules — Pure Engineering (Lean Version)

## 1. Project Overview

- **Name:** Pure Engineering
- **Mission:** Build production-ready AI/ML guides with clarity, trust, and minimalism.
- **Tone:** Authoritative, structured, clear.

## 2. Technical Setup

- **Next.js 15**, TypeScript
- **Animation**, Framer motion
- **TailwindCSS**, `shadcn/ui`
- **Data:** axios + @tanstack/react-query
- **Architecture:** Feature-based
- **Light-mode first**, use `:root` CSS variables

## 3. Design Tokens

- All colors, radii, and borders use `:root` variables.
- Example tokens: `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`.
- Avoid hardcoding colors.

## 4. Component Rules

- Tailwind-only classes, use theme tokens.
- Type all props.
- Rounded corners with `--radius`.
- Compose from `shadcn/ui`.
- Include skeletons for async content.
- Accessible (`aria-*`, keyboard support).

## 5. Layout & Pages

- Standard page: `<Header /><MainContent>{children}</MainContent><Sidebar/><Footer/>`
- Responsive, typed, and consistent spacing.
- Core pages: Home, Guides List, Guide Detail, Community, Author Dashboard, Admin Review.

## 6. Data & Hooks

- Services in `features/<feature>/services/`
- Hooks in `features/<feature>/hooks/`
- Use axios + react-query with proper typing.
- Example:

```ts
// service
export const getGuides = async () => (await axios.get("/guides")).data;
// hook
export const useGuides = () => useQuery(["guides"], getGuides);
```

## 7. Copy & Voice

- Confident, precise, mentor-like.
- Clear CTAs: `Submit Guide`, `Start Review`.
- Avoid marketing fluff or vague promises.
- Placeholder content should be realistic.

## 8. Cursor Behavior

- Generate inside `features/` unless specified.
- Follow Next.js 15 App Router conventions.
- Typed components/hooks/services.
- No hardcoded colors; use theme variables.
- Include error/loading states.
- Keep files focused: 1 component/hook per file.
- Include realistic placeholders and optional JSDoc comments.

## 9. Example Prompt Patterns

**Page:** Guides List page with search, filter, grid of `GuideCard`, responsive.
**Component:** `GuideCard` with props (title, author, difficulty, rating), uses Card, skeleton variant.
**Service + Hook:** `guides.service.ts` + `useGuides.ts` with axios + react-query.
**Admin Panel:** List pending guides, Accept/Reject actions, confirmation modals, update cache.
