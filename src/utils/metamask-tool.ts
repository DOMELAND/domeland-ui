/**
 * 判断metamask是否安装
 * @returns { Boolean }
 */
function checkMetaMask() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log("Metamask enabled");
    return true;
  } else {
    window.$message.warning("Please install metamask");
    return false;
  }
}

/**
 * 获取账户余额
 * @param account
 */
function getChainBalance(account: string) {
  return new Promise((resolve) => {
    const web3 = new Web3(window.ethereum);
    web3.eth.getBalance(account).then((res) => {
      const balance = web3.utils.fromWei(res);
      console.log("balance", balance);
      resolve(balance);
    });
  });
}

/**
 * 切换账户
 */
function changeChainAccount() {
  return new Promise((resolve) => {
    window.ethereum.on("accountsChanged", (accounts: [string]) => {
      console.log(accounts[0]);
      if (accounts[0]) {
        resolve(accounts[0]);
      } else {
        window.$message.warning("Please connect to MetaMask");
      }
    });
  });
}

/**
 * 连接MetaMask, 成功后resolve账户地址
 */
function connectMetaMask() {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: [string]) => {
        if (!accounts.length) {
          window.$message.warning("Please connect to MetaMask.");
          reject();
        } else if (accounts[0]) {
          resolve(accounts[0]);
        }
      })
      .catch((err) => {
        if (err.code === 4001) {
          // If this happens, the user rejected the connection request.
          window.$message.warning("You refused to connect Metamask");
        } else {
          console.error(err);
        }
        reject(err);
      });
  });
}

export { checkMetaMask, changeChainAccount, getChainBalance, connectMetaMask };
