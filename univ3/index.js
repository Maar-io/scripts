const { getPrice } = require('./getPrice');
const { findProfitableSwaps } = require('./profit');


const ASTR = '0xdf41220C7e322bFEF933D85D01821ad277f90172'
const USDC = '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035'
const HAHA = '0xA84DBE4602cBAcfe8Cd858Fe910b88ba0e8b8B18'
const WBTC = '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1'
const ETH = '0xE9CC37904875B459Fa5D0FE37680d36F1ED55e38'
const vASTR = '0x7746ef546d562b443AE4B4145541a3b1a3D75717'

const QUICKSWAP = { address: '0x56c2162254b0E4417288786eE402c2B41d4e181e', name: "QUICKSWAP" }; // QuickSwap Factory
const L2X = { address: '0x350B0F09EE6659e18a2642d6B25b909d59271e3c', name: "L2X" }; // L2X Factory
const ARTHSWAP = { address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720', name: "ARTHSWAP" }; // ArthSwap Factory

entries = [
    // { id: QUICKSWAP.name + "-ASTR-USDC", dex: QUICKSWAP.address, in: ASTR, out: USDC, comission: 3000 },
    // { id: QUICKSWAP.name + "-ASTR-USDC", dex: QUICKSWAP.address, in: ASTR, out: USDC, comission: 10000 },
    // { id: QUICKSWAP.name + "-ASTR-ETH", dex: QUICKSWAP.address, in: ASTR, out: ETH, comission: 10000 },
    // { id: QUICKSWAP.name + "-ASTR-ETH", dex: QUICKSWAP.address, in: ASTR, out: ETH, comission: 500 },
    // { id: QUICKSWAP.name + "-ASTR-WBTC", dex: QUICKSWAP.address, in: ASTR, out: WBTC, comission: 500 },
    // { id: QUICKSWAP.name + "-vASTR-ASTR", dex: QUICKSWAP.address, in: ASTR, out: vASTR, comission: 500 },
    { id: QUICKSWAP.name + "-USDC-ETH", dex: QUICKSWAP.address, in: USDC, out: ETH, comission: 3000 },
    // { id: L2X.name + "-ASTR-USDC", dex: L2X.address, in: ASTR, out: USDC, comission: 3000 },
    // { id: L2X.name + "-ASTR-ETH", dex: L2X.address, in: ASTR, out: ETH, comission: 3000 },
    // { id: L2X.name + "-ASTR-ETH", dex: L2X.address, in: ASTR, out: ETH, comission: 10000 },
    // { id: L2X.name + "-ASTR-vASTR", dex: L2X.address, in: ASTR, out: ETH, comission: 500 },
    { id: L2X.name + "-USDC-ETH", dex: L2X.address, in: USDC, out: ETH, comission: 3000 },
    // { id: ARTHSWAP.name + "-ASTR-USDC", dex: ARTHSWAP.address, in: ASTR, out: USDC, comission: 3000 },
    // { id: ARTHSWAP.name + "-ASTR-ETH", dex: ARTHSWAP.address, in: ASTR, out: ETH, comission: 3000 },
    // { id: ARTHSWAP.name + "-ASTR-vASTR", dex: ARTHSWAP.address, in: ASTR, out: vASTR, comission: 500 },
    // { id: ARTHSWAP.name + "-ASTR-WBTC", dex: ARTHSWAP.address, in: ASTR, out: WBTC, comission: 3000 },
    { id: ARTHSWAP.name + "-USDC-ETH", dex: ARTHSWAP.address, in: USDC, out: ETH, comission: 3000 },
];

// run getPrice for each entry
(async () => {
    try {
        const promises = entries.map(entry => getPrice(entry.id, entry.dex, entry.in, entry.out, entry.comission).catch(console.error));
        const result = await Promise.all(promises);
        console.log(result);

        const profitable = findProfitableSwaps(result, 1000);
        if (profitable.length === 0) {
            console.log("No profitable swaps found");
        }
        console.log(profitable);
    }
    catch (error) {
        console.error(error);
    }
})();

