const cards = [
  require(`../assets/images/cards/pattern-1.png`),
  require(`../assets/images/cards/pattern-2.png`),
  require(`../assets/images/cards/pattern-3.png`),
  require(`../assets/images/cards/pattern-4.png`)
];

console.log('cards', cards)
const numberOfImages = cards.length;

export default stringId => {
  let count = 0;
  for (const char of stringId) count += char.charCodeAt(0);

  return cards[count % numberOfImages];
};
