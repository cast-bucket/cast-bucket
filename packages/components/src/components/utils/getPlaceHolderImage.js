const cards = [];
const numberOfImages = 4;

for (let i = 1; i <= numberOfImages; i++) {
  cards.push(require(`../../assets/images/cards/pattern-${i}.png`));
}

export default stringId => {
  let count = 0;
  for (const char of stringId) count += char.charCodeAt(0);

  return cards[count % numberOfImages];
};
