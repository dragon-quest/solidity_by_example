const MappingContract = artifacts.require("Mapping");

contract("Mapping", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await MappingContract.new();
  });

  describe("mapping set get remove", () => {
    it("return the default value", async () => {
      let value = await instance.get(accounts[0]);

      assert.equal(value, 0, "return the default value should match");
    });

    it("mapping always returns a value", async () => {
      const setVal = 100;
      await instance.set(accounts[0], setVal);
      let value = await instance.get(accounts[0]);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );
    });

    it("update the value at this address", async () => {
      const setVal = 1000;
      await instance.set(accounts[0], setVal);
      let value = await instance.get(accounts[0]);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );

      const updateVal = 123;
      await instance.set(accounts[0], updateVal);
      let updateValue = await instance.get(accounts[0]);

      assert.equal(
        updateValue,
        updateVal,
        "update the value at this address should match"
      );
    });

    it("reset the value to the default value", async () => {
      const setVal = 23456;
      await instance.set(accounts[0], setVal);
      let value = await instance.get(accounts[0]);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );

      await instance.remove(accounts[0]);
      let defaultValue = await instance.get(accounts[0]);

      assert.equal(
        defaultValue,
        0,
        "reset the value to the default value should match"
      );
    });
  });
});

const NestedMappingContract = artifacts.require("NestedMapping");

contract("NestedMapping", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await NestedMappingContract.new();
  });

  describe("mapping set get remove", () => {
    it("return the default value", async () => {
      let value = await instance.get(accounts[0], 0);

      assert.equal(value, false, "return the default value should match");
    });

    it("mapping always returns a value", async () => {
      const setVal = true;
      await instance.set(accounts[0], 3, setVal);
      let value = await instance.get(accounts[0], 3);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );
    });

    it("update the value at this address", async () => {
      const setVal = true;
      await instance.set(accounts[0], 2, setVal);
      let value = await instance.get(accounts[0], 2);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );

      const updateValue = false;
      await instance.set(accounts[0], 2, updateValue);
      let returnValue = await instance.get(accounts[0], 2);

      assert.equal(
        updateValue,
        returnValue,
        "update the value at this address should match"
      );
    });

    it("reset the value to the default value", async () => {
      const setVal = true;
      await instance.set(accounts[0], 100, setVal);
      let value = await instance.get(accounts[0], 100);

      assert.equal(
        value,
        setVal,
        "mapping always returns a value should match"
      );

      await instance.remove(accounts[0], 100);
      let defaultValue = await instance.get(accounts[0], 100);

      assert.equal(
        defaultValue,
        false,
        "reset the value to the default value should match"
      );
    });
  });
});
