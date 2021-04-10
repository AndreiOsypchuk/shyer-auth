const sum = (a: number, b: number) => a + b;

test('adds two numbers', () => {
  const res = sum(1, 2);
  expect(res).toBe(3);
});
