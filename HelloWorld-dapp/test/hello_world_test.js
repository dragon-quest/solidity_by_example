const HelloWorldContract = artifacts.require("HelloWorld");

contract("HelloWorld", accounts => {
    let helloWorld;
    beforeEach(async () => {
        helloWorld = await HelloWorldContract.new();
    });

    describe("greeter", () => {
        it("get greet", async () => {
            const greet = await helloWorld.greet();
            assert.equal(greet, "Hello World!", "greet should match");
        });
    });
});