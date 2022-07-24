const CounterContract = artifacts.require("Counter");

contract("Counter", accounts => {
    let counter;
    beforeEach(async () => {
        counter = await CounterContract.new();
    });

    describe("counter", () => {
        it("get count", async () => {
            const count = await counter.get();
            assert.equal(count, 0, "count should match");
        });

        it("inc count", async () => {
            await counter.inc();
            const count = await counter.get();
            assert.equal(count, 1, "inc count should match");
        });

        it("dec count", async () => {
            await counter.inc();
            await counter.dec();
            const count = await counter.get();
            assert.equal(count, 0, "dec count should match");
        });
    });
});