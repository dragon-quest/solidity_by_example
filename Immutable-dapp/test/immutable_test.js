const ImmutableContract = artifacts.require("Immutable");

contract("Immutable", accounts => {
    let immutable;
    beforeEach(async () => {
        immutable = await ImmutableContract.new(100);
    });

    describe("immutable", () => {
        it("immutable MY_ADDRESS", async () => {
            const myAddress = await immutable.MY_ADDRESS();
            assert.equal(myAddress, accounts[0], "immutable MY_ADDRESS should match");
        });

        it("immutable MY_UINT", async () => {
            const myUint = await immutable.MY_UINT();
            assert.equal(myUint, 100, "immutable MY_UINT should match");
        });
    });
});