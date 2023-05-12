首先，确保已经安装了 Node.js 和 npm。然后，创建一个新的目录并在其中创建一个名为 `package.json` 的文件，内容如下：

```json
{
  "name": "balance-token-distribution",
  "version": "1.0.0",
  "description": "A script to call distributeTokens every 2 minutes",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "web3": "^1.6.1"
  }
}
```

接下来，在同一目录中创建一个名为 `index.js` 的文件，内容如下：

```javascript
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
```

请将 `YOUR-PROJECT-ID` 替换为你的 Infura 项目 ID，将 `YOUR-PRIVATE-KEY` 替换为用于签名交易的私钥，将 `YOUR-CONTRACT-ADDRESS` 替换为 BalanceToken 合约的地址，将 `YOUR-ACCOUNT-ADDRESS` 替换为你的 Ethereum 账户地址。

在 `index.js` 文件所在的目录中运行 `npm install` 安装依赖项。然后，使用 `npm start` 命令运行脚本。它将每两分钟调用一次 `distributeTokens` 函数。

请注意，这个脚本在本地运行，需要保管好私钥和 Infura 项目 ID。在实际生产环境中，你可能需要考虑使用更安全的方式来存储和管理这些敏感信息，例如使用环境变量或秘密管理系统。
