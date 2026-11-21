# Repository Guidelines

## Project Structure

This is a React and TypeScript task-list app built with Vite. Start at `src/main.tsx`, which mounts `src/App.tsx`. Keep shared task state, derived counts, and browser persistence in `App.tsx`. Put UI components in `src/components/` and shared models such as `Task` and `Priority` in `src/types/index.ts`. Global styles live in `src/index.css`, source assets in `src/assets/`, and static assets such as the favicon in `public/`.

## Build, Test, and Development Commands

- `npm ci` installs dependencies from the committed lockfile.
- `npm run dev` starts the Vite development server.
- `npm run lint` checks the code with Oxlint using `.oxlintrc.json`.
- `npm run build` runs TypeScript checks and writes the production bundle to `dist/`.
- `npm run preview` serves the built bundle locally after a successful build.

## Coding Style and Naming

Use two-space indentation and match the surrounding file’s quote and semicolon style. Use PascalCase for component files, components, and props interfaces, as in `TaskForm.tsx` and `TaskFormProps`. Use camelCase for handlers and callbacks, such as `handleSubmit` and `onAddTask`. Use type-only imports for types and follow existing CSS class patterns such as `task-form__input`. Keep user-facing copy in Ukrainian.

## Testing Guidelines

The project currently has no automated test runner or coverage target. Run lint and build before submitting changes, then verify affected flows in the browser. For form or persistence changes, check that the form rejects task text shorter than three characters after trimming, that adding a valid task updates the list and counts and returns focus to the text input, and that reloading restores the task.

## Commits and Pull Requests

Git history uses short, lowercase subjects such as `initial project` and `level 2`. Keep subjects brief and name the change. In pull requests, summarize the behavior changed, list the checks you ran, link the relevant issue or lesson when applicable, and include screenshots for visible UI changes.
