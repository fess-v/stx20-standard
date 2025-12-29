# Bulk Minting Operations for STX20 Tokens

## Introduction

- **STXSIP Number:** #003
- **Title:** Bulk Minting Operations
- **Status:** Proposed
- **Date Created:** 2024-12-29
- **Activation block:** TBD

## Overview

The STX20 protocol currently supports individual minting operations. This proposal introduces bulk minting functionality, allowing users to mint multiple tokens of the same ticker in a single transaction. This enhancement improves efficiency for large minting operations while maintaining the protocol's core principles.

## Motivation

Currently, users must perform separate transactions for each minting operation, which can be inefficient and costly when minting multiple tokens. Bulk minting addresses this by allowing:

1. **Cost Efficiency**: Reduced transaction fees for batch operations
2. **Scalability**: Support for large-scale minting events
3. **User Experience**: Simplified minting process for multiple tokens
4. **Integration**: Better support for automated systems and airdrops

## Specifications

### 3.1. Scope

This proposal applies exclusively to minting operations within the STX20 protocol. Deploy and transfer operations remain unchanged.

### 3.2. Bulk Minting Structure

The bulk minting operation uses the memo field with the following structure:

```
{operation}{ticker}{total_amount}
```

Where:
- `{operation}`: `b` (lowercase 'b' for bulk mint)
- `{ticker}`: 3-8 uppercase alphabetic characters (same as standard mint)
- `{total_amount}`: Total amount to mint across all recipients

### 3.3. Transaction Requirements

- **Memo Format**: `b{ticker}{total_amount}`
- **STX Amount**: Must be at least `0.000001` STX
- **Recipients**: Multiple recipients supported via smart contract integration
- **Validation**: All individual mints within the batch must be valid

### 3.4. Smart Contract Integration

Bulk minting can be implemented via smart contracts similar to batch transfers. The contract must ensure:

1. All individual mints conform to protocol rules
2. Total amount doesn't exceed available supply
3. Each mint is properly recorded by indexers
4. Atomic execution (all succeed or all fail)

### 3.5. Indexing Considerations

Indexers must:
- Parse bulk mint memos correctly
- Validate each individual mint within the batch
- Update balances and supply appropriately
- Handle partial failures according to protocol rules

## Example Usage

### Direct Memo Approach

```
Memo: "bstxs1000"
Amount: 0.000001 STX
Recipient: User Address
```

This would mint 1000 STXS tokens to the recipient in a single transaction.

### Smart Contract Approach

```clarity
;; Bulk mint contract example
(define-public (bulk-mint-stxs (recipients (list 100 principal)) (amounts (list 100 uint)))
  (let
    (
      (total-amount (fold + amounts u0))
      (memo (concat "bSTXS" (to-ascii total-amount)))
    )
    (asserts! (is-eq (len recipients) (len amounts)) (err u1))
    ;; Execute bulk mint via memo transfers
    (try! (bulk-transfer-with-memo recipients amounts memo))
    (ok total-amount)
  )
)
```

## Implementation Examples

### JavaScript Integration

```javascript
// Bulk mint using the protocol
async function bulkMintSTXS(amount) {
  const memo = `bSTXS${amount}`;
  const txOptions = {
    recipient: userAddress,
    amount: 1000, // 0.000001 STX in microSTX
    memo: memo,
    network: new StacksMainnet()
  };

  return await makeSTXTokenTransfer(txOptions);
}
```

### Indexer Processing

```javascript
// Indexer logic for bulk mint processing
function processBulkMint(memo, amount, recipient) {
  if (memo.startsWith('b')) {
    const ticker = extractTicker(memo);
    const totalAmount = extractAmount(memo);

    // Validate bulk mint
    if (isValidBulkMint(ticker, totalAmount, recipient)) {
      updateBalances(ticker, recipient, totalAmount);
      updateTotalSupply(ticker, totalAmount);
      return true;
    }
  }
  return false;
}
```

## Security Considerations

1. **Supply Limits**: Bulk mints must respect per-mint and total supply limits
2. **Validation**: Each individual mint within the batch must be validated
3. **Atomicity**: Either all mints in the batch succeed or all fail
4. **Rate Limiting**: Indexers should implement appropriate rate limiting
5. **Memo Validation**: Strict validation of memo format to prevent exploits

## Backwards Compatibility

This proposal is fully backwards compatible with existing STX20 operations. Existing mint operations continue to work unchanged.

## Future Extensions

This proposal can be extended to support:
- Mixed ticker bulk operations
- Conditional bulk minting based on external criteria
- Time-locked bulk minting
- Integration with other STX20 operations

## Activation

This proposal will be activated after community review and indexer implementation. Target activation block: TBD based on community consensus.

## Acknowledgments

Thanks to the STX20 community for their feedback and support in developing this enhancement.
