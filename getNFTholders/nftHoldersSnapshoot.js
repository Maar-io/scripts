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


const abi = [
  "function ownerOf(uint256 tokenId) external view returns (address owner)"
];
contractAddress = '0xd59fC6Bfd9732AB19b03664a45dC29B8421BDA9a'
totalSupply = 10000;

const snapshoot = async () => {
  console.log(`reading token holders for contract ${contractAddress} on ${providerRPC.mainnet.name}` );

  const contract = new ethers.Contract(contractAddress, abi, provider);
  for (let i=1; i<totalSupply; i++) {
    const tokenBalance = await contract.ownerOf(i);
    // console.log(`The holder for tokenID=${i} is ${tokenBalance}`);
    console.log(tokenBalance);
  }
}

snapshoot()