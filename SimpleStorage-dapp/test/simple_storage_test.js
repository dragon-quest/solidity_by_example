const SimpleStorageContract = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
    let counter;
    beforeEach(async () => {
        counter = await SimpleStorageContract.new();
    });

    describe("simple storage", () => {
        it("get num", async () => {
            const num = await counter.get();
            assert.equal(num, 0, "num should match");
        });

        it("set num", async () => {
            await counter.set(1000);
            const num = await counter.get();
            assert.equal(num, 1000, "num should match");
        });
    });
});