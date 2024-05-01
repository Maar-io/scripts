import { findProfitableSwaps } from '../profit.js';

describe('Should not find Profitable Swaps', () => {
  it('should not find profitable swaps', () => {
    const entries = 
    [
        {
          id: 'QUICKSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000320859',
          token1Price: '3116.64',
          fee: '3000',
          liquidity: '70495382874864'
        },
        {
          id: 'L2X-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000320862',
          token1Price: '3116.6',
          fee: '3000',
          liquidity: '63394812235204'
        },
        {
          id: 'ARTHSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000319968',
          token1Price: '3125.31',
          fee: '3000',
          liquidity: '149447942641111'
        }
      ]
    const result = findProfitableSwaps(entries, 1000);

    expect(result).toEqual([
      ]);
  });

  it('should find profitable swaps', () => {
    const entries = 
    [
        {
          id: 'QUICKSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000320859',
          token1Price: '3116.64',
          fee: '3000',
          liquidity: '70495382874864'
        },
        {
          id: 'L2X-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000320862',
          token1Price: '3116.6',
          fee: '3000',
          liquidity: '63394812235204'
        },
        {
          id: 'ARTHSWAP-USDC-ETH-3000',
          token0Symbol: 'USDC',
          token1Symbol: 'WETH',
          token0Price: '0.000319968',
          token1Price: '3170.31',
          fee: '3000',
          liquidity: '149447942641111'
        }
      ]
    const result = findProfitableSwaps(entries, 1000);

    expect(result).toEqual([
      ]);
  });
});