
describe("testing typescript with jest", () => {
  it('adds 1 + 2 to equal 3 in TScript', () => {
    const sum = require('./sum').default;
    expect(sum(1, 2)).toBe(3);
  });
})


