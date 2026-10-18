# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A course lab (Lemoncode "Front-end moderno con IA", módulo 02 · JavaScript y TypeScript): a set of short, independent **katas** over a shared dataset — the coffee catalogue of "Tueste". The full spec, with the exact expected output for every kata, is in `docs/enunciado_proyecto.md`; read the relevant section before writing or changing a kata. `docs/repo_modulo_lengujes.txt` links to the module's lesson notes (the "tema NN" numbers the spec refers to).

There is no app UI: each kata prints with `console.log`, and the output has to match the spec.

## Commands

```powershell
npm run dev          # Vite dev server; output appears in the browser DevTools console
npx tsx src/main.ts  # alternative: run with Node and see the output in the terminal
npx tsc              # type check — must be clean before submitting (no output = OK)
npm run build        # tsc && vite build
```

**Vite strips types without checking them**, so a running page doesn't mean the code type-checks. Always run `npx tsc` to verify.

There is no test runner yet. Vitest is optional kata P1 (`npm install -D vitest`); once added, run one file with `npx vitest run <file>`.

## Structure

- `src/data.ts` — given by the course, copied **verbatim** (`coffees`, `customers`). Don't edit it; the expected outputs depend on it.
- `src/types.ts` — kata O1: `Roast`, `Coffee`, `Customer` (and `Address`). `data.ts` won't compile until these exist.
- One file per kata: `src/o02-funciones.ts`, `src/o03-destructuring.ts`, … `o11-immer.ts`; optional katas `P1–P7` and challenges `D1–D5`.
- `src/main.ts` only side-effect-imports each kata file (`import "./o02-funciones";`) so they all run.
- Helpers shared between katas (e.g. `formatPrice`, `coffeeCard`, `finalPrice`) are `export`ed from their kata file and imported where needed.
- `README.md` (kata O12) and `bitacora.md`: how to run it, a console screenshot, answers to the 📝/🔍 questions, a checklist, and an AI log with at least 3 "Prompt / Qué me dio / Qué corregí y por qué" entries.

## Rules every kata must follow

These are enforced by the strict `tsconfig.json` or required by the course:

- No `any`, no `var`, no `enum` (`erasableSyntaxOnly`). Use literal-type unions instead.
- Import types with `import type { … }` (`verbatimModuleSyntax`).
- `noUnusedLocals` / `noUnusedParameters` are on: unused variables or parameters are errors.
- **Don't mutate inputs**: no `push`/`sort`/`splice`/`prop = …` on anything a function receives. Use `toSorted`, `map`, spread, `with`, and so on (ES2023 lib). In the immutable cart (O6), items that don't change must keep the same reference.
- Annotate parameters and return types; let TypeScript infer everything else (don't write `const n: number = 3`).
- Put a comment with the expected output under every `console.log`: `// → "14.90 €"`.
- Several katas ask you to cause an error on purpose, or make a change and then undo it (🔍), and to leave the TypeScript message or an explanation as a comment. Keep those comments.
- Use `unknown` plus type guards instead of `as` assertions.
- Code comments and console strings are in Spanish, matching the spec.

The student has to be able to explain every line in a live review ("¿por qué `??` y no `||`?", "¿este `map` muta el carrito?"). Keep solutions simple and idiomatic for the topic each kata covers, and explain non-obvious choices instead of just handing over code.
