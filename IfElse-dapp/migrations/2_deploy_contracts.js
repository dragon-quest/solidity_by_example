var IfElseContract = artifacts.require("./IfElse.sol");

module.exports = function(deployer) {
  deployer.deploy(IfElseContract);
};
