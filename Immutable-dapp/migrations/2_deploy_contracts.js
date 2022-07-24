var ImmutableContract = artifacts.require("./Immutable.sol");

module.exports = function(deployer) {
  deployer.deploy(ImmutableContract, 100);
};
