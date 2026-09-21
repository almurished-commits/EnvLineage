# Contributing

Thanks for helping improve EnvLineage. Keep changes focused, include a minimal fixture for parser/rule behavior, and update documentation when user-visible behavior changes.

## Setup

Node.js 22+ is required. Run `npm run typecheck`, `npm test`, and `npm run pack:check` before opening a PR.

## Pull requests

Explain the problem, the supported semantics, and why the change does not create misleading certainty. Never include real secrets in tests or issue reproductions. New source semantics should include positive, negative, and ambiguous fixtures where relevant.
