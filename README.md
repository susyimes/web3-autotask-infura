# 自动化调用合约分配代币  

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


要获取Infura ID，请按照以下步骤操作：

1. 访问Infura官方网站：https://infura.io/
2. 单击右上角的“Sign up”，注册一个新的Infura帐户。如果您已经有一个帐户，请单击“Log in”登录。
3. 注册或登录后，您将进入Infura仪表板。在这里，您可以创建和管理项目。
4. 单击“Create new project”按钮以创建一个新项目。在创建项目时，您需要为项目命名。
5. 创建项目后，您将看到项目的详细信息，包括项目的Infura ID。这是一个长串字符，通常以字母和数字组合的形式出现。

请注意，Infura ID是您访问Infura提供的以太坊和IPFS节点的凭据。因此，请确保不要与他人共享您的Infura ID。在使用Infura ID时，请确保遵循Infura的使用条款和政策。  

`YOUR-PRIVATE-KEY` 是指您的以太坊钱包的私钥。私钥是一串由字母和数字组成的长字符串，它用于对您的以太坊地址进行签名和验证交易。请注意，私钥非常重要，不应与他人共享。泄露私钥可能导致您的资金被盗。

以下是获取以太坊私钥的一些建议方法：

1. 使用MetaMask钱包：
   如果您使用MetaMask作为以太坊钱包，可以通过以下步骤获取私钥：
   - 打开MetaMask浏览器扩展程序。
   - 单击右上角的圆形图标，然后选择“Settings”（设置）。
   - 在设置页面中，选择“Security & Privacy”（安全与隐私）。
   - 单击“Reveal Seed Phrase”（显示助记词），然后输入您的MetaMask密码。
   - 复制助记词，并将其导入到其他钱包（如MyEtherWallet）以获取私钥。

2. 使用MyEtherWallet（MEW）：
   如果您使用MyEtherWallet创建了以太坊钱包，可以通过以下步骤获取私钥：
   - 访问MyEtherWallet官方网站：https://www.myetherwallet.com/
   - 单击“Access My Wallet”（访问我的钱包）。
   - 选择访问钱包的方式，如助记词、硬件钱包或Keystore文件。
   - 解锁您的钱包，然后在钱包概览页面中，找到“Private Key”（私钥）部分。

3. 使用其他以太坊钱包：
   不同的以太坊钱包可能有不同的方法来查看或导出私钥。请参阅您所使用钱包的官方文档或帮助中心了解详细信息。

请务必确保在处理私钥时谨慎行事，不要将其泄露给他人。在编写智能合约或与以太坊网络交互时，建议使用专门的开发者地址，并确保不要在公共代码库或其他不安全的地方存储私钥。  


为了生成ABI（Application Binary Interface），你需要使用Solidity编译器。这里，我将为你提供一个在线工具来生成ABI：https://remix.ethereum.org/

请按照以下步骤操作：

1. 打开 https://remix.ethereum.org/。
2. 点击左侧菜单栏的“文件浏览器”图标。
3. 点击“+”图标创建一个新文件，并将文件命名为“BalanceToken.sol”。
4. 将你提供的智能合约代码复制到新创建的文件中。
5. 点击左侧菜单栏的“编译器”图标。
6. 选择合适的编译器版本（在这个例子中，选择0.8.0或更高版本）。
7. 点击“编译 BalanceToken.sol”按钮。
8. 编译完成后，点击左侧菜单栏的“编译详情”图标。
9. 在“编译详情”面板中，你可以找到ABI。点击“ABI”旁边的“复制”按钮，将ABI复制到剪贴板。

现在，你已经成功生成并复制了智能合约的ABI。  
