const IfElseContract = artifacts.require("IfElse");

contract("IfElse", accounts => {
    let counter;
    beforeEach(async () => {
        counter = await IfElseContract.new();
    });

    describe("if else", () => {
        it("get foo", async () => {
            for (var i = 0; i < 10; i++) {
                let foo = await counter.foo(i);
                assert.equal(foo, 0, "foo eq 0 should match");
            }

            for (var i = 10; i < 20; i++) {
                let foo = await counter.foo(i);
                assert.equal(foo, 1, "foo eq 1 should match");
            }

            for (var i = 20; i < 30; i++) {
                let foo = await counter.foo(i);
                assert.equal(foo, 2, "foo eq 2 should match");
            }
        });

        it("get ternary", async () => {
            for (var i = 0; i < 10; i++) {
                let ternary = await counter.ternary(i);
                assert.equal(ternary, 1, "ternary eq 1 should match");
            }

            for (var i = 10; i < 20; i++) {
                let ternary = await counter.ternary(i);
                assert.equal(ternary, 2, "ternary eq 2 should match");
            }
        });
    });
});