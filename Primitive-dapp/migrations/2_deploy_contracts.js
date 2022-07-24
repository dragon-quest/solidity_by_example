var PrimitivesContract = artifacts.require("./Primitives.sol");

module.exports = function(deployer) {
  deployer.deploy(PrimitivesContract);
};
