// const ethers = require("ethers");
const fs = require("fs");
const ethers = require("ethers");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0xb7ea3b19c718183d95a6f861a1197b0570b7ea2cf7f5cd726130e1a3571114c9",
    provider
  );

  const abi = fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi", "utf-8");

  const binary = fs.readFileSync("./simpleStorage_sol_SimpleStorage", "utf-8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying a contract, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
