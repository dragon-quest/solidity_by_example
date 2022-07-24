var CounterContract = artifacts.require("./Counter.sol");

module.exports = function(deployer) {
  deployer.deploy(CounterContract);
};
