# Stxmap Project: Enhancing Digital Real Estate on Stacks

## Introduction

- **STXSIP Number:** #001
- **Title:** Stxmap Project
- **Status:** Ratified
- **Date Created:** 2024-01-06

## Overview

Stxmap introduces a groundbreaking consensus standard for claiming digital 'real estate' within Stacks Blocks.
It employs STX20 Stxmap Inscriptions, enabling individuals to inscribe `{blockNumber}.stxmap` on a Stacks Block, thereby integrating it into the burgeoning Metaverse.
Inspired by the original Bitmap concept for Bitcoin blocks by [@blockamoto](https://twitter.com/blockamoto), Stxmap utilizes data's inherent ability to be interpreted in multiple ways, thus empowering block owners with development rights.
This innovative method promotes open-source development and offers digital creators and users exciting opportunities.
Block ownership in Stxmap translates into a creative platform within the Metaverse, encouraging community engagement and vibrant digital environments.

The Stxmap project's detailed description and objectives will be outlined separately. This STXSIP focuses primarily on addressing the initial challenges in claiming and transferring block ownership.

To preserve the Stxmap project's value and exclusivity on the Stacks blockchain, the latest valid block for Stxmap will be aligned with the Nakamoto mainnet upgrade block.

## Specifications

The proposal maintains consistency with the initial STX transfer memo protocol.

### Operational Guidelines

#### Mint/Transfer Process

Both minting and transferring are based on the same format. The first wallet to claim a specific Stxmap block will secure its ownership to the designated transfer address.

Format: `{blockNumber}.stxmap`, for example, `1.stxmap`. The `.stxmap` part is case-insensitive.

The `blockNumber` should be an integer, with the upper limit being the block number where the mint transaction for claiming the Stxmap block ownership occurs. Wallet owners can hold multiple Stxmap blocks.

## Activation

Following comprehensive discussions within the community, it has been decided that STXSIP #000 and #001 will be retrospectively activated, aligning with the initial STX20 activation block at 132354.

## API Endpoints

Base URL: `https://api.stx20.com/api/v1`

- Get Stxmap blocks: `/stxmap?address={address}&page={page}&limit={limit}`
- Stxmap block details: `/stxmap/{blockNumber}`

## Acknowledgments

Special thanks to the community members for their invaluable contributions and active participation in the STXSIP discussions.
