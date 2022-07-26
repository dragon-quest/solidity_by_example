const EtherUnitsContract = artifacts.require("EtherUnits");

contract("EtherUnits", accounts => {
    let counter;
    beforeEach(async () => {
        counter = await EtherUnitsContract.new();
    });

    describe("ether units", () => {
        it("get oneWei", async () => {
            const oneWei = await counter.oneWei();
            assert.equal(oneWei, 1, "oneWei should match");
        });

        it("isOneWei", async () => {
            const isOneWei = await counter.isOneWei();
            assert.equal(isOneWei, true, "isOneWei should match");
        });

        it("get oneEther", async () => {
            const oneEther = await counter.oneEther();
            assert.equal(oneEther, 1000000000000000000, "oneEther should match");
        });

        it("isOneEther", async () => {
            const isOneEther = await counter.isOneEther();
            assert.equal(isOneEther, true, "isOneEther should match");
        });
    });
});