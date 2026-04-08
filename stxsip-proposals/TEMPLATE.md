# STXSIP-XXX: [Title of Proposal]

## Preamble

- **STXSIP Number:** #XXX
- **Title:** [Clear, Concise Title]
- **Status:** [Draft / Review / Ratified / Rejected]
- **Creation Date:** [YYYY-MM-DD]
- **Author:** [Your Name or GitHub Handle]

## Abstract

A short technical summary (approx. 200 words) of the proposed change or addition to the STX20 protocol.

## Motivation

Why is this change necessary? Explain the problem it solves (e.g., gas efficiency, new use cases like gaming, or metadata expansion).

## Specification

The technical details of the implementation.

### Memo Structure
If this introduces a new operation, define the character-by-character breakdown to ensure it fits the **34-character limit**.

- **Format:** `{op}{ticker}{amount}`
- **Example:** `mbtcn100`

### Indexing Rules
Explain how indexers should interpret this data.
- What makes a transaction invalid?
- How is ownership determined?

## Backwards Compatibility

Will this change affect existing tokens or indexers? If it is a new operation type, state how older indexers should handle or ignore these transactions.

## Activation

Proposed block height for activation or dependencies on other upgrades (e.g., Nakamoto Upgrade).

## API Endpoints (Optional)

If new endpoints are required for the `api.stx20.com` service:
- `GET /v1/your-feature/{address}`

## Acknowledgments

Credit any community members, contributors, or external projects (like Xlink or Stacks) that influenced this proposal.
