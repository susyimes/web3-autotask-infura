const Web3 = require('web3');

const provider = 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID';
const privateKey = 'YOUR-PRIVATE-KEY';
const contractAddress = 'YOUR-CONTRACT-ADDRESS';
const accountAddress = 'YOUR-ACCOUNT-ADDRESS';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const abi = [
  // The ABI of your BalanceToken contract
];

const contract = new web3.eth.Contract(abi, contractAddress);

const callDistributeTokens = async () => {
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(accountAddress);

  const tx = {
    from: accountAddress,
    to: contractAddress,
    gas: 1000000, // You may need to adjust this value based on actual gas usage
    gasPrice: gasPrice,
    nonce: nonce,
    data: contract.methods.distributeTokens().encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction sent: ${receipt.transactionHash}`);
};

const main = () => {
  console.log('Starting token distribution...');
  callDistributeTokens();
  setInterval(callDistributeTokens, 2 * 60 * 1000); // Call every 2 minutes
};

main();