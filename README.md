# EnvLineage

**Trace environment variables from code to CI.**

EnvLineage is an open-source CLI that maps environment-variable requirements across JavaScript/TypeScript source code, env templates, Docker/Docker Compose, and GitHub Actions. It shows where variables are consumed, documented, and provided — and reports supported gaps without printing secret values.

## Why

Environment configuration is often split across application code, `.env.example`, containers, and CI. A variable can be required in code, documented locally, and still be absent from a deployment path. EnvLineage models those relationships instead of treating each file as an isolated lint target.

## Quick start

```bash
npm install -g envlineage
envlineage scan .
```

For CI:

```bash
envlineage scan . --format json --severity warning
```

## V0.1 supported sources

- JavaScript/TypeScript static `process.env.NAME` and literal bracket access.
- `.env.example`, `.env.sample`, `.env.template`.
- Dockerfile `ARG`/`ENV` with stage context.
- Docker Compose `environment` and `${...}` interpolation.
- GitHub Actions `env`, `vars.*`, `secrets.*`, and `env.*` references.

## Findings

| ID | Meaning |
|---|---|
| ENV001 | Required by supported code but not documented in a supported env template |
| ENV002 | Documented but no supported consumer was found |
| ENV003 | Required but no supported repository provider was found |
| ENV004 | Inconsistent supported coverage across detected contexts |
| ENV005 | Duplicate declaration in a supported env template |

EnvLineage is deliberately conservative. Dynamic keys and external runtime injection can make a result partial or lower-confidence rather than inventing certainty.

## Privacy

Scanning is local and makes no network calls. EnvLineage does not read real `.env` files by default and does not retrieve GitHub secret values. Output is based on variable names, locations, and configuration relationships.

## Exit codes

- `0`: scan completed and no finding met the configured severity threshold.
- `1`: findings met the threshold.
- `2`: invalid CLI usage.
- `3`: fatal/incomplete scan error.

Default threshold is `error`.

## Limitations

V0.1 is intentionally focused. It does not claim runtime-complete configuration analysis, Kubernetes/cloud-provider support, arbitrary computed environment keys, or non-JS/TS application languages.

## Development

Requires Node.js 22+ and TypeScript available for development.

```bash
npm run typecheck
npm test
npm run pack:check
```

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [CHANGELOG.md](CHANGELOG.md).
