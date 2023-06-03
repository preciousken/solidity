// imports
const { ethers, run, network } = require("hardhat")
require("dotenv").config()

// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()

    // what happens when we deploy to our hardhat network?
    // console.log(network.config)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await SimpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
    // What's the private key?
    // what's the rpc
    console.log(`Deployed contract to: ${SimpleStorage.address}`)
}

// verifying a contract
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
