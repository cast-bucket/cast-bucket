// tslint:disable
const cards = [
  require(`../assets/images/cards/pattern-1.png`),
  require(`../assets/images/cards/pattern-2.png`),
  require(`../assets/images/cards/pattern-3.png`),
  require(`../assets/images/cards/pattern-4.png`)
];

const numberOfImages = cards.length;

export default (imageId: string) => {
  let count = 0;
  for (const char of imageId) count += char.charCodeAt(0);

  return cards[count % numberOfImages];
};
