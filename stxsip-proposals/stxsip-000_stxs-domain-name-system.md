# STXS Domain Name System Proposal

## Preamble

- **STXSIP Number:** #000
- **Title:** STXS Domain Name System
- **Status:** Ratified
- **Creation Date:** 2024-01-06

## Abstract

The Bitcoin Name System (BNS) operates as a decentralized network system, linking Stacks usernames to off-chain states without relying on centralized control. Further details about BNS can be found in the [Stacks Academy documentation](https://docs.stacks.co/docs/stacks-academy/bns#:~:text=Bitcoin%20Name%20System%20(BNS)%20is,loaded%20during%20the%20genesis%20block.).

Key Characteristics of BNS:
- **Global Uniqueness:** Each name is one-of-a-kind.
- **User-Defined:** Names are meaningful and chosen by their creators.
- **Strong Ownership:** Only the owner can alter the associated state.

BNS Potential Use Cases:
- **Simplified Cryptocurrency Transactions:** BNS enables user-friendly transactions with memorable names instead of complex addresses.
- **Decentralized Websites:** Facilitates hosting and accessing websites on the blockchain, enhancing security and censorship resistance.
- **Identity Verification:** Offers a reliable method for digital identity verification through blockchain-based human-readable names.
- **Blockchain Interoperability:** Eases cross-chain transactions by translating addresses between different blockchains.
- **DApps Integration:** Simplifies finding and interacting with Decentralized Applications using straightforward names.
- **Domain Name Management:** Similar to DNS, BNS allows ownership, sale, and transfer of domain names on the blockchain.
- **Integration with Conventional Internet Services:** Bridges decentralized blockchain technologies with traditional internet services for innovative applications.

To enhance the value and scarcity of the BNS implementation within the protocol, initially only `.stxs` domain names will be supported. The possibility of including a variety of other domain names will be considered for future expansions.

## Specification

This proposal adheres to the initial protocol STX transfer memo structure.

### Operations

#### Mint/Transfer

Both minting and transferring follow the same format, except the first wallet to claim a specific domain name secures its ownership to the transfer destination address.

Format: `{domainName}.stxs` (e.g., `fess-v.stxs`). `.stxs` is case-insensitive.

Domain names can include `-`, `_`, English letters, and numbers. The length should be between 0 and 25 characters. Wallets may possess multiple domain names. If any uppercase letters are used, they will be converted and indexed as lowercase letters

## Activation

Following comprehensive discussions within the community, it has been decided that STXSIP #000 and #001 will be retrospectively activated, aligning with the initial STX20 activation block at 132354.

## API Endpoints

Base URL: `https://api.stx20.com/api/v1`

- Get domains: `/domain?address={address}&page={page}&limit={limit}`
- Domain details: `/domain/{domain}`

## Acknowledgments

A heartfelt thank you to all community members who contributed their ideas and engaged in the `.stxs` domain name system discussions.
