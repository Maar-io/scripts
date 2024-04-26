const {getPrice} = require('./getPrice');



const ASTR = '0xdf41220C7e322bFEF933D85D01821ad277f90172'
const USDC = '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035'
const HAHA = '0xA84DBE4602cBAcfe8Cd858Fe910b88ba0e8b8B18'
const WBTC = '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1'

const QUICKSWAP = '0x56c2162254b0E4417288786eE402c2B41d4e181e'; // QuickSwap Factory
const L2X = '0x350B0F09EE6659e18a2642d6B25b909d59271e3c'; // L2X Factory
const ARTHSWAP = '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720'; // ArthSwap Factory
const COMMISSION = 3000

entries = [
  { dex: QUICKSWAP, in: ASTR, out: USDC, comission: 3000 },
  { dex: L2X, in: ASTR, out: USDC, comission: 3000 },
  { dex: ARTHSWAP, in: ASTR, out: USDC, comission: 3000 },
  { dex: QUICKSWAP, in: USDC, out: ASTR, comission: 3000 },
  { dex: L2X, in: USDC, out: ASTR, comission: 3000 },
  { dex: ARTHSWAP, in: USDC, out: ASTR, comission: 3000 },

];  

// run getPrice for each entry
const result = entries.forEach(entry => getPrice(entry.dex, entry.in, entry.out, entry.comission)
  .catch(console.error));

  console.log(result);

// getPrice(UNISWAP_FACTORY_ADDRESS, USDC_ADDRESS, ASTR_ADDRESS, COMMISSION)
//   .catch(console.error);

// getPrice(L2X_FACTORY_ADDRESS, USDC_ADDRESS, ASTR_ADDRESS, COMMISSION)
//   .catch(console.error);

// getPrice(ARTHSWAP_FACTORY_ADDRESS, USDC_ADDRESS, ASTR_ADDRESS, COMMISSION)
//   .catch(console.error);
