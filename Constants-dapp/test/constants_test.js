const ConstantsContract = artifacts.require("Constants");

contract("Constants", accounts => {
    let constants;
    beforeEach(async () => {
        constants = await ConstantsContract.new();
    });

    describe("constants", () => {
        it("constant MY_ADDRESS", async () => {
            const myAddress = await constants.MY_ADDRESS();
            assert.equal(myAddress, 0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc, "constant MY_ADDRESS should match");
        });

        it("constant MY_UINT", async () => {
            const myInt = await constants.MY_UINT();
            assert.equal(myInt, 123, "constant MY_UINT should match");
        });

        it("constant MY_UINT + 1", async () => {
            const myInt = Number(await constants.MY_UINT()) + 1;
            const myIntPlus = await constants.myIntPlus();
            assert.equal(myIntPlus, myInt, "myIntPlus should match");
        });
    });
});