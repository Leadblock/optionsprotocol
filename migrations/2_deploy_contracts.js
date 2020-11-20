const OptionsFactory = artifacts.require('OptionsFactory.sol');
const StringComparator = artifacts.require('StringComparator.sol');
const OptionsExchange = artifacts.require('OptionsExchange.sol');
const MockOracle = artifacts.require('MockOracle');
const Oracle = artifacts.require('Oracle');
// const MockUniswapFactory = artifacts.require('MockUniswapFactory');

const deploymentConfig = require("./deployment-config.json");

module.exports = function(deployer, network) {
  deployer.then(async () => {
    let deployconf;

    if (network == 'kovan') {
      deployconf = deploymentConfig.KOVAN
    }

    await deployer.deploy(StringComparator);
    await deployer.link(StringComparator, OptionsFactory);
    
    let uniswapFactoryAddr = deployconf.uniswapFactoryAddr;
    let compoundOracleAddress = deployconf.compoundOracleAddress;

    // compoundOracle = await Oracle.at('0x317166AB2bF19152D16871C8Cf1B33583e26932B');
    // let compoundOracle = await deployer.deploy(MockOracle);
    // compoundOracle = await Oracle.at('0x317166AB2bF19152D16871C8Cf1B33583e26932B');
    compoundOracle = await deployer.deploy(Oracle, compoundOracleAddress);
    console.log("Oracle Address ", compoundOracle.address.toString());

    const optionsExchange = await deployer.deploy(OptionsExchange, uniswapFactoryAddr);
    console.log("Options Exchange ", optionsExchange.address.toString());

    await deployer.deploy(OptionsFactory, optionsExchange.address, compoundOracle.address);
    console.log("Options Factory ", OptionsFactory.address.toString());
  });
};
