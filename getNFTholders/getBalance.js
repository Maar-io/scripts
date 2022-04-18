const ethers = require('ethers');

const providerRPC = {
  mainnet: {
    name: 'astar',
    rpc: 'https://astar.api.onfinality.io/public',
    chainId: 592,
    tokenName: 'ASTR'
  }
};
const provider = new ethers.providers.StaticJsonRpcProvider(providerRPC.mainnet.rpc, {
  chainId: providerRPC.mainnet.chainId,
  name: providerRPC.mainnet.name,
});

const myAddress = '0xb7185A33d65b1bd3197779736c6D52Dda0D1E0A1';

const balances = async () => {
  // 4. Fetch balances
  const balanceFrom = ethers.utils.formatEther(await provider.getBalance(myAddress));

  console.log(`The balance of ${myAddress} is: ${balanceFrom} ${providerRPC.mainnet.tokenName}`);
};

// 5. Call the balances function
balances();