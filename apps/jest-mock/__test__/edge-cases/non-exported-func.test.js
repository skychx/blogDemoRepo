const rewire = require("rewire");
const rewireModule = rewire("../../src/edge-cases/non-exported-func.js");

describe("non-exported-func", () => {
  it("test saySecret func", () => {
    const saySecret = rewireModule.__get__("saySecret");

    expect(saySecret()).toBe("🤫");
  });
});
