var EtherUnitsContract = artifacts.require("./EtherUnits.sol");

module.exports = function(deployer) {
  deployer.deploy(EtherUnitsContract);
};
