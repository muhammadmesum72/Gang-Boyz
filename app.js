let web3;
let selectedAccount;

const web3Modal = new Web3Modal({
  network: "mainnet", // You can specify the desired network here
  cacheProvider: true,
  providerOptions: {}, // Optional: add provider options
});

async function connectWallet() {
    try {
        const provider = await web3Modal.connect();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];
        console.log("Connected to:", selectedAccount);
    } catch (error) {
        console.error("Error connecting to the wallet:", error);
    }
}


// Replace 'YourContractAddress' and 'YourContractABI' with actual values
const contractAddress = "0x6470f6236f959cEfE96C3661E9E086101fD99371";
const contractABI = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "uint256", name: "_totalSupply", type: "uint256" },
      { internalType: "uint256", name: "_commission", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "implementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintNFT() {
  if (!selectedAccount) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const transaction = await contract.methods
      .mintNFT(selectedAccount)
      .send({ from: selectedAccount });
    console.log("Transaction Details:", transaction);
    alert("NFT Minted Successfully!");
  } catch (error) {
    console.error("Error minting NFT:", error);
    alert("Error occurred while minting NFT.");
  }
}
