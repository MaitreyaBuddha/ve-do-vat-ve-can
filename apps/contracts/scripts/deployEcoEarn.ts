import { updateConfig, config } from '@repo/config-contract';
import { ethers } from 'hardhat';
/**
 * Deploys the EcoEarn contract and updates the configuration with the deployed contract address.
 *
 * @returns {Promise<void>} A promise that resolves when the deployment is complete.
 */
async function deployMugshot() {
    const [owner] = await ethers.getSigners();

    const ecoEarn = await ethers.getContractFactory('EcoEarn');

    const ecoEarnInstance = await ecoEarn.deploy(
        owner,
        config.TOKEN_ADDRESS,
        config.CYCLE_DURATION,
        config.MAX_SUBMISSIONS_PER_CYCLE,
    );

    const ecoEarnAddress = await ecoEarnInstance.getAddress();

    console.log(`EcoEarn deployed to: ${ecoEarnAddress}`);

    updateConfig({
        ...config,
        CONTRACT_ADDRESS: ecoEarnAddress,
    });
}

deployMugshot()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
