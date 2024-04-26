import { findProfitableSwaps } from '../profit.js';

describe('findProfitableSwaps', () => {
  it('should find profitable swaps', () => {
    const entries = [
      { dex: 'dex1', pair: 'astr-usdc', inprice: 1, outprice: 0.1 },
      { dex: 'dex2', pair: 'usdc-astr', inprice: 0.09, outprice: 11 },
      { dex: 'dex3', pair: 'astr-usdc', inprice: 1, outprice: 0.2 },
    ];

    const result = findProfitableSwaps(entries);

    expect(result).toEqual([
      {
        entry1: { dex: 'dex1', pair: 'astr-usdc', inprice: 1, outprice: 0.1 },
        entry2: { dex: 'dex2', pair: 'usdc-astr', inprice: 0.09, outprice: 11 },
        profit: 0.9,
      },
    ]);
  });
});