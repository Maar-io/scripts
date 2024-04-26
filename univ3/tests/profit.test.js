import { findProfitableSwaps } from '../profit.js';

describe('findProfitableSwaps', () => {
  it('should find profitable swaps', () => {
    const entries = 
    [
        {
          id: 'QUICKSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000316478',
          token1Price: '3159.78',
          liquidity: '66666318797565'
        },
        {
          id: 'L2X-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000315666',
          token1Price: '3167.9',
          liquidity: '59489440207896'
        },
        {
          id: 'ARTHSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000316749',
          token1Price: '3157.07',
          liquidity: '149447942641111'
        }
      ]

    const result = findProfitableSwaps(entries);

    expect(result).toEqual([
        {
          entry1: {
            id: 'QUICKSWAP-ASTR-USDC-3000',
            token0Symbol: 'USDC',
            token1Symbol: 'ASTR',
            token0Price: '9.60961',
            token1Price: '0.12',
            liquidity: '4660950318635340'
          },
          entry2: {
            id: 'L2X-USDC-ASTR-3000',
            token0Symbol: 'USDC',
            token1Symbol: 'ASTR',
            token0Price: '9.60942',
            token1Price: '0.104065',
            liquidity: '228560328795427049'
          },
          profit: 0.0001899999999999993,
        },
      ]);
  });
});