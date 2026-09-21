# Security Policy

EnvLineage treats accidental secret disclosure as a security issue. Please do not open a public issue containing real credentials, tokens, private repository content, or exploit details that would put users at immediate risk.

For the initial release, report sensitive issues privately through GitHub's private vulnerability reporting once enabled on the public repository. Supported security fixes target the latest released minor version until a broader support policy is announced.

EnvLineage scans locally, makes no network calls during `scan`, and does not read real `.env` files by default.
