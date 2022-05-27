const ethers = require('ethers');
const fs = require('fs');

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
  fs.writeFileSync('snapshot.txt', '');

  const contract = new ethers.Contract(contractAddress, abi, provider);
  for (let i=1; i<=totalSupply; i++) {
    await readOwner(contract, i);
  }
}

const readOwner = async (contract, id) => {
  try {
    const tokenBalance = await contract.ownerOf(id);
    const output = `The holder for tokenID=${id.toString().padStart(5, '0')} is ${tokenBalance}`;
    console.log(output);
    fs.appendFileSync('snapshot.txt', output + '\n');
  } catch {
    await readOwner(contract, id);
  }
}

snapshoot()