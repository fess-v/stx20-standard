# STX20 Protocol: Innovating Inscriptions on Stacks

The STX20 protocol introduces a novel approach to creating and sharing digital artifacts on the Stacks blockchain.
It leverages the transaction `memo` field to offer a more efficient, gas-saving alternative to conventional smart contracts for specific use cases.
This method not only requires less computational effort but also pays homage to Bitcoin culture. 
The anticipated Nakamoto upgrade is set to enhance Stacks' decentralization and integration with the Bitcoin network, highlighting the importance of an inscription standard like STX20 on Stacks.

## How It Works

STX20 embeds protocol information within the metadata of STX token transfers. This data is then utilized by indexers to determine the state using deterministic protocol rules.

### Memo Field Approach

The STX20 protocol is crafted to efficiently use the 34-symbol limit of the Stacks Blockchain's transaction memos. This constraint necessitates a concise approach:

- **Tailored Data Inscription:** We've designed STX20 to fit snugly within the Stacks' memo limit, focusing on essential transaction details.

- **Streamlined Format:** Eschewing the more verbose JSON format of Bitcoin, our protocol adopts a compact structure to encapsulate key information within the limited memo space.

This refined strategy ensures STX20's compatibility with Stacks' specifications, maintaining data integrity in a restricted environment.

## Protocol Specifications

- Simple STX transfers initiate the process; the transferred amount is negligible, therefore can be even `0.000001`.
- Inscriptions are constrained to 34 symbols.
- Tickers range from 3 to 8 uppercase alphabetic characters. The first ticker issuance reserves its claim.
- The protocol currently does not support decimals but is open to future enhancements.
- Transfers and mints are done in a single transaction.
- Transaction order within a block determines prioritization.
- The first mint exceeding maximum supply is partially honored.
- No tokens are transferred or minted in the deployment transaction.
- Inscriptions adhere to Stacks network's standard base64 format.
- The recipient of the STX transfer transaction is the designated receiver for mints and transfers.
- Mints or transfers beyond limits are marked as failed.
- The first lowercase letter in the memo indicates the operation type.

### Operations

#### Deploy

Structure: `{operation}{ticker}{total_supply};{limit_per_mint}`

- Example: `dstxs21000000;1000`

#### Mint

Structure: `{operation}{ticker}{amount}`

- Example: `mstxs1000`

#### Transfer

Structure: `{operation}{ticker}{amount}`

- Example: `tstxs90`

### Future Developments

The protocol is designed for expansion with additional operation types planned.
Additional protocol improvements are published under the `stxsip-proposals` directory.
Currently, `Stxsip` proposals lack a standardized format, but there are plans to establish a uniform structure in the future.

Ratified proposals:
- `.stxs` domain name system - [#000](stxsip-proposals/stxsip-000_stxs-domain-name-system.md)
- `Stxmap` project - [#001](stxsip-proposals/stxsip-001_stxmap.md)
- Transfers through smart contracts - [#002](stxsip-proposals/stxsip-002_batch-transfers.md)

### Security

- **Immutable Records:** Leveraging the inherent security of the Stacks blockchain, every transaction and inscription is permanently recorded, ensuring transparency and traceability.
- **Open-source Rules:** The protocol's rules are openly available for review and scrutiny. This transparency allows for community oversight, encouraging continuous improvement and trust.
- **User Empowerment:** Users can independently verify transactions and inscriptions. This self-verification process eliminates reliance on third parties, enhancing security.

### Decentralization at its Core

STX20 embodies the principle of decentralization:

- **No Central Control:** Unlike smart contracts, which can be governed by a DAO, the STX20 protocol operates independently of centralized control.
- **Indexer as a Viewer:** The indexer's role is limited to providing a view of the blockchain data. It does not possess the ability to alter or manipulate this data, thus maintaining the integrity and decentralization of the protocol.
- **Community-driven Development:** The development and future enhancements of the STX20 protocol are community-driven, fostering a decentralized and democratic process for protocol evolution.

### Trading

- Decentralized trading features are in development.

## Current indexer API

### Base URL

`https://api.stx20.com/api/v1`

### API Endpoints

- Get address balance: `/balance/{address}`
- Token details: `/token/{ticker}`
- Deployed tokens with pagination: `/token?page={page}&limit={limit}`

### Open Source Commitment

- Indexer, inscription tool, and explorer will be open-sourced soon.


## Links

- Explorer & inscription tools - https://stx20.com
- Discord - https://discord.gg/stx20
- Twitter - https://twitter.com/stx20stacks, `https://twitter.com/fess_v_`


