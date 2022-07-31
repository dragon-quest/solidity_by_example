var MappingContract = artifacts.require("./Mapping.sol");
var NestedMappingContract = artifacts.require("./NestedMapping.sol");

module.exports = function (deployer) {
  deployer.deploy(MappingContract);
  deployer.deploy(NestedMappingContract);
};
