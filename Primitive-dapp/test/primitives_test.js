const PrimitivesContract = artifacts.require("Primitives");

contract("Primitives", accounts => {
    let primitives;
    beforeEach(async () => {
        primitives = await PrimitivesContract.new();
    });

    describe("primitives", () => {
        it("is bool true", async () => {
            const boo = await primitives.boo();
            assert.equal(boo, true, "is bool true should match");
        });

        it("is uint8 1", async () => {
            const u8 = await primitives.u8();
            assert.equal(u8, 1, "is uint8 1 should match");
        });

        it("is uint 456", async () => {
            const u256 = await primitives.u256();
            assert.equal(u256, 456, "is uint 456 should match");
        });

        it("is uint 123", async () => {
            const u = await primitives.u();
            assert.equal(u, 123, "is uint 123 should match");
        });

        it("is int8 -1", async () => {
            const boo = await primitives.boo();
            assert.equal(boo, true, "is int8 -1 should match");
        });

        it("is int 456", async () => {
            const i256 = await primitives.i256();
            assert.equal(i256, 456, "is int 456 should match");
        });

        it("is int -123", async () => {
            const i = await primitives.i();
            assert.equal(i, -123, "is int -123 should match");
        });

        it("is int minInt", async () => {
            const minInt = await primitives.minInt();
            assert.equal(minInt, -57896044618658097711785492504343953926634992332820282019728792003956564819968, "is int minInt should match");
        });

        it("is int maxInt", async () => {
            const maxInt = await primitives.maxInt();
            assert.equal(maxInt, 57896044618658097711785492504343953926634992332820282019728792003956564819967, "is int maxInt should match");
        });

        it("is address 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c", async () => {
            const addr = await primitives.addr();
            assert.equal(addr, 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c, "is address 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c should match");
        });

        it("is bytes1 0xb5", async () => {
            const a = await primitives.a();
            assert.equal(a, 0xb5, "is bytes1 0xb5 should match");
        });

        it("is bytes1 0x56", async () => {
            const b = await primitives.b();
            assert.equal(b, 0x56, "is bytes1 0x56 should match");
        });

        it("is default bool", async () => {
            const defaultBoo = await primitives.defaultBoo();
            assert.equal(defaultBoo, false, "is default bool should match");
        });

        it("is default uint", async () => {
            const defaultUint = await primitives.defaultUint();
            assert.equal(defaultUint, 0, "is default uint should match");
        });

        it("is default int", async () => {
            const defaultInt = await primitives.defaultInt();
            assert.equal(defaultInt, 0, "is default int should match");
        });

        it("is default address", async () => {
            const defaultAddr = await primitives.defaultAddr();
            assert.equal(defaultAddr, 0x0000000000000000000000000000000000000000, "is default address should match");
        });
    });
});