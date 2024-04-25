const { ethers } = require('ethers');
const { Pool, Route, priceToClosestTick } = require('@uniswap/v3-sdk');
const { Token } = require('@uniswap/sdk-core');
// const { IUniswapV3Factory } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json');

// const { NonfungiblePositionManager } = require('@uniswap/v3-periphery');
const FACTORY_ABI = require("./abi/factory.json");
const POOL_ABI = require("./abi/pool.json");
const ERC20_ABI = require("./abi/ERC20.json");

require("dotenv").config();

const ZKASTAR_MAINNET = 3776;

// Swap usdc/astr on QS
// https://astar-zkevm.explorer.startale.com/tx/0xc0ab00fc49ccc8e7778fa5b0527079304d9258f81480f6ec1a65763a1a1d29df

// Swap astr/usdc on QS
// https://astar-zkevm.explorer.startale.com/tx/0xe1f7c32a0e4a9be94a66377b2d92fd5c2c6ef8611c9d70b2bf0783f6d6fe3cad

async function getPrice(factory, tokenInContractAddress, tokenOutContractAddress, commission) {
  const chainId = ZKASTAR_MAINNET;
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.startale.com/astar-zkevm', ZKASTAR_MAINNET);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // create token contracts and related objects
  const contractIn = new ethers.Contract(tokenInContractAddress, ERC20_ABI, signer);
  const contractOut = new ethers.Contract(tokenOutContractAddress, ERC20_ABI, signer);

  const getTokenAndBalance = async function (contract) {
    var [dec, symbol, name] = await Promise.all(
      [
        contract.decimals(),
        contract.symbol(),
        contract.name(),
      ]);

    return [new Token(chainId, contract.address, dec, symbol, name)];
  }

  const [tokenIn] = await getTokenAndBalance(contractIn);
  const [tokenOut] = await getTokenAndBalance(contractOut);

  console.log(`   Input: ${tokenIn.symbol} (${tokenIn.name})`);
  console.log(`   Output: ${tokenOut.symbol} (${tokenOut.name})`);
  console.log("");

  // Get the pair pool address
  console.log("Loading pool information...");
  const factoryContract = new ethers.Contract(factory, FACTORY_ABI, provider);
  const poolAddress = await factoryContract.getPool(
    tokenIn.address,
    tokenOut.address,
    commission);  // 3% = 3000

  if (Number(poolAddress).toString() === "0") // there is no such pool for provided In-Out tokens.
    throw `Error: No pool ${tokenIn.symbol}-${tokenOut.symbol}`;
  else console.log(`${tokenIn.symbol}-${tokenOut.symbol} Pool address: ${poolAddress}, commission=${commission/10000}%`);

  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);

  const getPoolState = async function () {
    const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()]);

    return {
      liquidity: liquidity,
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    }
  }

  const getPoolImmutables = async function () {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

    return {
      factory: factory,
      token0: token0,
      token1: token1,
      fee: fee,
      tickSpacing: tickSpacing,
      maxLiquidityPerTick: maxLiquidityPerTick,
    }
  }
  // loading immutable pool parameters and its current state (variable parameters)
  const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()]);

  const pool = new Pool(
    tokenIn,
    tokenOut,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );

  // print token prices in the pool
  console.log("Token prices in pool:");
  console.log(`   1 ${pool.token0.symbol} = ${pool.token0Price.toSignificant()} ${pool.token1.symbol}`);
  console.log(`   1 ${pool.token1.symbol} = ${pool.token1Price.toSignificant()} ${pool.token0.symbol}`);
  console.log(`Pool liquidity: ${pool.liquidity}`);
  console.log('');
}

const ASTR_ADDRESS = '0xdf41220C7e322bFEF933D85D01821ad277f90172'
const USDC_ADDRESS = '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035'
const UNISWAP_FACTORY_ADDRESS = '0x56c2162254b0E4417288786eE402c2B41d4e181e'; // QuickSwap
const COMMISSION = 100

getPrice(UNISWAP_FACTORY_ADDRESS, ASTR_ADDRESS, USDC_ADDRESS, COMMISSION)
  .catch(console.error);