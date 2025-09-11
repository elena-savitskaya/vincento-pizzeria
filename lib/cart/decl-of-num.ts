export function declOfNum(n: number, titles: [string, string, string]) {
  // titles = ['товар', 'товари', 'товарів']
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return titles[2];
  if (n1 > 1 && n1 < 5) return titles[1];
  if (n1 === 1) return titles[0];
  return titles[2];
}
