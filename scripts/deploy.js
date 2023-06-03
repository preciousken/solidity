// imports
const { ethers } = require("hardhat")

// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    // What's the private key?
    // what's the rpc
    console.log(`Deployed contract to: ${SimpleStorage.address}`)
}

// main
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
