import { useChainStore } from "@/stores/chainStore";

const createToken = async () => {
  const chain = useChainStore();

  const web3 = new window.Web3(window.ethereum);

  // getting address from which we will sign message
  const address = (await web3.eth.getAccounts())[0];

  const web3Token = window["web3-token"];

  // generating a token with 1 day of expiration time
  const token = await web3Token.sign(
    (msg) => web3.eth.personal.sign(msg, address),
    "1d"
  );
  chain.$patch({ token });

  return token;
};

export default createToken;
