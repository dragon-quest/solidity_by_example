var ConstantsContract = artifacts.require("./Constants.sol");

module.exports = function(deployer) {
  deployer.deploy(ConstantsContract);
};
