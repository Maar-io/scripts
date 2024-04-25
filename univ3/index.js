const { ethers } = require('ethers');
const { Pool, Token, Route, priceToClosestTick } = require('@uniswap/v3-sdk');
const { Token: TokenV2, ChainId, WETH } = require('@uniswap/sdk-core');
const { NonfungiblePositionManager } = require('@uniswap/v3-periphery');

const ZKASTAR_MAINNET = 3776;
// Swap usdc/astr on QS
// https://astar-zkevm.explorer.startale.com/tx/0xc0ab00fc49ccc8e7778fa5b0527079304d9258f81480f6ec1a65763a1a1d29df

// Swap astr/usdc on QS
// https://astar-zkevm.explorer.startale.com/tx/0xe1f7c32a0e4a9be94a66377b2d92fd5c2c6ef8611c9d70b2bf0783f6d6fe3cad

async function getPrice() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.startale.com/astar-zkevm');

  const ASTR = new TokenV2(ZKASTAR_MAINNET, '0xdf41220C7e322bFEF933D85D01821ad277f90172', 18); // ASTR
  const USDC = new TokenV2(ZKASTAR_MAINNET, '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035', 6); // USDC

  const USDC_ASTR_POOL = '0x8BCbd2b0240C3e54D803E33Ba944Fa98267312fF'; // QS USDC/ASTR UniswapV3Pool
  const ASTR_USDC_POOL = '0x4a3A7559F64f1260EB86dAa7c3928843eD2C29A7'; // QS ASTR/USDC UniswapV3Pool

  const poolContract = new ethers.Contract(ASTR_USDC_POOL, NonfungiblePositionManager.abi, provider);
  const poolData = await poolContract.slot0();

  const pool = new Pool(
    ASTR,
    USDC,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const route = new Route([pool], ASTR, USDC);
  console.log(`1 ${ASTR.symbol} = ${route.midPrice.toSignificant(6)} ${USDC.symbol}`);
}

getPrice().catch(console.error);