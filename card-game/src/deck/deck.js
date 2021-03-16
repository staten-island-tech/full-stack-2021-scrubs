const deck = {
  SA: {
    code: "AS",
    image: require("@/deck/images/AS.png"),
    value: "ACE",
    blackjack: 1 || 11,
    suit: "SPADES",
  },
  S2: {
    code: "2S",
    image: require("@/deck/images/2S.png"),
    value: "2",
    blackjack: 2,
    suit: "SPADES",
  },
  S3: {
    code: "3S",
    image: require("@/deck/images/3S.png"),
    value: "3",
    blackjack: 3,
    suit: "SPADES",
  },
  S4: {
    code: "4S",
    image: require("@/deck/images/4S.png"),
    value: "4",
    blackjack: 4,
    suit: "SPADES",
  },
  S5: {
    code: "5S",
    image: require("@/deck/images/5S.png"),
    value: "5",
    blackjack: 5,
    suit: "SPADES",
  },
  S6: {
    code: "6S",
    image: require("@/deck/images/6S.png"),
    value: "6",
    blackjack: 6,
    suit: "SPADES",
  },
  S7: {
    code: "7S",
    image: require("@/deck/images/7S.png"),
    value: "7",
    blackjack: 7,
    suit: "SPADES",
  },
  S8: {
    code: "8S",
    image: require("@/deck/images/8S.png"),
    value: "8",
    blackjack: 8,
    suit: "SPADES",
  },
  S9: {
    code: "9S",
    image: require("@/deck/images/9S.png"),
    value: "9",
    blackjack: 9,
    suit: "SPADES",
  },
  S0: {
    code: "0S",
    image: require("@/deck/images/0S.png"),
    value: "10",
    blackjack: 10,
    suit: "SPADES",
  },
  SJ: {
    code: "JS",
    image: require("@/deck/images/JS.png"),
    value: "JACK",
    blackjack: 10,
    suit: "SPADES",
  },
  SQ: {
    code: "QS",
    image: require("@/deck/images/QS.png"),
    value: "JACK",
    blackjack: 10,
    suit: "SPADES",
  },
  SK: {
    code: "KS",
    image: require("@/deck/images/KS.png"),
    value: "JACK",
    blackjack: 10,
    suit: "SPADES",
  },
  //   AD: {
  //     code: "AD",
  //     image: require("@/deck/images/AD.png"),
  //     value: "ACE",
  //     blackjack: 1 || 11,
  //     suit: "DIAMONDS",
  //   },
  //   "2D": {
  //     code: "2D",
  //     image: require("@/deck/images/2D.png"),
  //     value: "2",
  //     blackjack: 2,
  //     suit: "DIAMONDS",
  //   },
  //   "3D": {
  //     code: "3D",
  //     image: require("@/deck/images/3D.png"),
  //     value: "3",
  //     blackjack: 3,
  //     suit: "DIAMONDS",
  //   },
  //   "4D": {
  //     code: "4D",
  //     image: require("@/deck/images/4D.png"),
  //     value: "4",
  //     blackjack: 4,
  //     suit: "DIAMONDS",
  //   },
  //   "5D": {
  //     code: "5D",
  //     image: require("@/deck/images/5D.png"),
  //     value: "5",
  //     blackjack: 5,
  //     suit: "DIAMONDS",
  //   },
  //   "6D": {
  //     code: "6D",
  //     image: require("@/deck/images/6D.png"),
  //     value: "6",
  //     blackjack: 6,
  //     suit: "DIAMONDS",
  //   },
  //   "7D": {
  //     code: "7D",
  //     image: require("@/deck/images/7D.png"),
  //     value: "7",
  //     blackjack: 7,
  //     suit: "DIAMONDS",
  //   },
  //   "8D": {
  //     code: "8D",
  //     image: require("@/deck/images/8D.png"),
  //     value: "8",
  //     blackjack: 8,
  //     suit: "DIAMONDS",
  //   },
  //   "9D": {
  //     code: "9D",
  //     image: require("@/deck/images/9D.png"),
  //     value: "9",
  //     blackjack: 9,
  //     suit: "DIAMONDS",
  //   },
  //   "0D": {
  //     code: "0D",
  //     image: require("@/deck/images/0D.png"),
  //     value: "10",
  //     blackjack: 10,
  //     suit: "DIAMONDS",
  //   },
  //   JD: {
  //     code: "JD",
  //     image: require("@/deck/images/JD.png"),
  //     value: "JACK",
  //     blackjack: 10,
  //     suit: "DIAMONDS",
  //   },
  //   QD: {
  //     code: "QD",
  //     image: require("@/deck/images/QD.png"),
  //     value: "QUEEN",
  //     blackjack: 10,
  //     suit: "DIAMONDS",
  //   },
  //   KD: {
  //     code: "KD",
  //     image: require("@/deck/images/KD.png"),
  //     value: "KING",
  //     blackjack: 10,
  //     suit: "DIAMONDS",
  //   },
  //   AC: {
  //     code: "AC",
  //     image: require("@/deck/images/AC.png"),
  //     value: "ACE",
  //     blackjack: 1 || 11,
  //     suit: "CLUBS",
  //   },
  //   "2C": {
  //     code: "2C",
  //     image: require("@/deck/images/2C.png"),
  //     value: "2",
  //     blackjack: 2,
  //     suit: "CLUBS",
  //   },
  //   "3C": {
  //     code: "3C",
  //     image: require("@/deck/images/3C.png"),
  //     value: "3",
  //     blackjack: 3,
  //     suit: "CLUBS",
  //   },
  //   "4C": {
  //     code: "4C",
  //     image: require("@/deck/images/4C.png"),
  //     value: "4",
  //     blackjack: 4,
  //     suit: "CLUBS",
  //   },
  //   "5C": {
  //     code: "5C",
  //     image: require("@/deck/images/5C.png"),
  //     value: "5",
  //     blackjack: 5,
  //     suit: "CLUBS",
  //   },
  //   "6C": {
  //     code: "6C",
  //     image: require("@/deck/images/6C.png"),
  //     value: "6",
  //     blackjack: 6,
  //     suit: "CLUBS",
  //   },
  //   "7C": {
  //     code: "7C",
  //     image: require("@/deck/images/7C.png"),
  //     value: "7",
  //     blackjack: 7,
  //     suit: "CLUBS",
  //   },
  //   "8C": {
  //     code: "8C",
  //     image: require("@/deck/images/8C.png"),
  //     value: "8",
  //     blackjack: 8,
  //     suit: "CLUBS",
  //   },
  //   "9C": {
  //     code: "9C",
  //     image: require("@/deck/images/9C.png"),
  //     value: "9",
  //     blackjack: 9,
  //     suit: "CLUBS",
  //   },
  //   "0C": {
  //     code: "0C",
  //     image: require("@/deck/images/0C.png"),
  //     value: "10",
  //     blackjack: 10,
  //     suit: "CLUBS",
  //   },
  //   JC: {
  //     code: "JC",
  //     image: require("@/deck/images/JC.png"),
  //     value: "JACK",
  //     blackjack: 10,
  //     suit: "CLUBS",
  //   },
  //   QC: {
  //     code: "QC",
  //     image: require("@/deck/images/QC.png"),
  //     value: "QUEEN",
  //     blackjack: 10,
  //     suit: "CLUBS",
  //   },
  //   KC: {
  //     code: "KC",
  //     image: require("@/deck/images/KC.png"),
  //     value: "KING",
  //     blackjack: 10,
  //     suit: "CLUBS",
  //   },
  //   AH: {
  //     code: "AH",
  //     image: require("@/deck/images/AH.png"),
  //     value: "ACE",
  //     blackjack: 1 || 11,
  //     suit: "HEARTS",
  //   },
  //   "2H": {
  //     code: "2H",
  //     image: require("@/deck/images/2H.png"),
  //     value: "2",
  //     blackjack: 2,
  //     suit: "HEARTS",
  //   },
  //   "3H": {
  //     code: "3H",
  //     image: require("@/deck/images/3H.png"),
  //     value: "3",
  //     blackjack: 3,
  //     suit: "HEARTS",
  //   },
  //   "4H": {
  //     code: "4H",
  //     image: require("@/deck/images/4H.png"),
  //     value: "4",
  //     blackjack: 4,
  //     suit: "HEARTS",
  //   },
  //   "5H": {
  //     code: "5H",
  //     image: require("@/deck/images/5H.png"),
  //     value: "5",
  //     blackjack: 5,
  //     suit: "HEARTS",
  //   },
  //   "6H": {
  //     code: "6H",
  //     image: require("@/deck/images/6H.png"),
  //     value: "6",
  //     blackjack: 6,
  //     suit: "HEARTS",
  //   },
  //   "7H": {
  //     code: "7H",
  //     image: require("@/deck/images/7H.png"),
  //     value: "7",
  //     blackjack: 7,
  //     suit: "HEARTS",
  //   },
  //   "8H": {
  //     code: "8H",
  //     image: require("@/deck/images/8H.png"),
  //     value: "8",
  //     blackjack: 8,
  //     suit: "HEARTS",
  //   },
  //   "9H": {
  //     code: "9H",
  //     image: require("@/deck/images/9H.png"),
  //     value: "9",
  //     blackjack: 9,
  //     suit: "HEARTS",
  //   },
  //   "0H": {
  //     code: "0H",
  //     image: require("@/deck/images/0H.png"),
  //     value: "10",
  //     blackjack: 10,
  //     suit: "HEARTS",
  //   },
  //   JH: {
  //     code: "JH",
  //     image: require("@/deck/images/JH.png"),
  //     value: "JACK",
  //     blackjack: 10,
  //     suit: "HEARTS",
  //   },
  //   QH: {
  //     code: "QH",
  //     image: require("@/deck/images/QH.png"),
  //     value: "QUEEN",
  //     blackjack: 10,
  //     suit: "HEARTS",
  //   },
  //   KH: {
  //     code: "KH",
  //     image: require("@/deck/images/KH.png"),
  //     value: "KING",
  //     blackjack: 10,
  //     suit: "HEARTS",
  //   },
};
export { deck };
// const deck = [{
//         code: "AS",
//         image: require('@/deck/images/AS.png'),
//         value: "ACE",
//         blackjack: 1 || 11,
//         suit: "SPADES"
//     },
//     {
//         code: "2S",
//         image: require('@/deck/images/2S.png'),
//         value: "2",
//         blackjack: 2,
//         suit: "SPADES"
//     },
//     {
//         code: "3S",
//         image: require('@/deck/images/3S.png'),
//         value: "3",
//         blackjack: 3,
//         suit: "SPADES"
//     },
//     {
//         code: "4S",
//         image: require('@/deck/images/4S.png'),
//         value: "4",
//         blackjack: 4,
//         suit: "SPADES"
//     },
//     {
//         code: "5S",
//         image: require('@/deck/images/5S.png'),
//         value: "5",
//         blackjack: 5,
//         suit: "SPADES"
//     },
//     {
//         code: "6S",
//         image: require('@/deck/images/6S.png'),
//         value: "6",
//         blackjack: 6,
//         suit: "SPADES"
//     },
//     {
//         code: "7S",
//         image: require('@/deck/images/7S.png'),
//         value: "7",
//         blackjack: 7,
//         suit: "SPADES"
//     },
//     {
//         code: "8S",
//         image: require('@/deck/images/8S.png'),
//         value: "8",
//         blackjack: 8,
//         suit: "SPADES"
//     },
//     {
//         code: "9S",
//         image: require('@/deck/images/9S.png'),
//         value: "9",
//         blackjack: 9,
//         suit: "SPADES"
//     },
//     {
//         code: "0S",
//         image: require('@/deck/images/0S.png'),
//         value: "10",
//         blackjack: 10,
//         suit: "SPADES"
//     },
//     {
//         code: "JS",
//         image: require('@/deck/images/JS.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "SPADES"
//     },
//     {
//         code: "QS",
//         image: require('@/deck/images/QS.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "SPADES"
//     },
//     {
//         code: "KS",
//         image: require('@/deck/images/KS.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "SPADES"
//     },
//     {
//         code: "AD",
//         image: require('@/deck/images/AD.png'),
//         value: "ACE",
//         blackjack: 1 || 11,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "2D",
//         image: require('@/deck/images/2D.png'),
//         value: "2",
//         blackjack: 2,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "3D",
//         image: require('@/deck/images/3D.png'),
//         value: "3",
//         blackjack: 3,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "4D",
//         image: require('@/deck/images/4D.png'),
//         value: "4",
//         blackjack: 4,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "5D",
//         image: require('@/deck/images/5D.png'),
//         value: "5",
//         blackjack: 5,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "6D",
//         image: require('@/deck/images/6D.png'),
//         value: "6",
//         blackjack: 6,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "7D",
//         image: require('@/deck/images/7D.png'),
//         value: "7",
//         blackjack: 7,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "8D",
//         image: require('@/deck/images/8D.png'),
//         value: "8",
//         blackjack: 8,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "9D",
//         image: require('@/deck/images/9D.png'),
//         value: "9",
//         blackjack: 9,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "0D",
//         image: require('@/deck/images/0D.png'),
//         value: "10",
//         blackjack: 10,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "JD",
//         image: require('@/deck/images/JD.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "QD",
//         image: require('@/deck/images/QD.png'),
//         value: "QUEEN",
//         blackjack: 10,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "KD",
//         image: require('@/deck/images/KD.png'),
//         value: "KING",
//         blackjack: 10,
//         suit: "DIAMONDS"
//     },
//     {
//         code: "AC",
//         image: require('@/deck/images/AC.png'),
//         value: "ACE",
//         blackjack: 1 || 11,
//         suit: "CLUBS"
//     },
//     {
//         code: "2C",
//         image: require('@/deck/images/2C.png'),
//         value: "2",
//         blackjack: 2,
//         suit: "CLUBS"
//     },
//     {
//         code: "3C",
//         image: require('@/deck/images/3C.png'),
//         value: "3",
//         blackjack: 3,
//         suit: "CLUBS"
//     },
//     {
//         code: "4C",
//         image: require('@/deck/images/4C.png'),
//         value: "4",
//         blackjack: 4,
//         suit: "CLUBS"
//     },
//     {
//         code: "5C",
//         image: require('@/deck/images/5C.png'),
//         value: "5",
//         blackjack: 5,
//         suit: "CLUBS"
//     },
//     {
//         code: "6C",
//         image: require('@/deck/images/6C.png'),
//         value: "6",
//         blackjack: 6,
//         suit: "CLUBS"
//     },
//     {
//         code: "7C",
//         image: require('@/deck/images/7C.png'),
//         value: "7",
//         blackjack: 7,
//         suit: "CLUBS"
//     },
//     {
//         code: "8C",
//         image: require('@/deck/images/8C.png'),
//         value: "8",
//         blackjack: 8,
//         suit: "CLUBS"
//     },
//     {
//         code: "9C",
//         image: require('@/deck/images/9C.png'),
//         value: "9",
//         blackjack: 9,
//         suit: "CLUBS"
//     },
//     {
//         code: "0C",
//         image: require('@/deck/images/0C.png'),
//         value: "10",
//         blackjack: 10,
//         suit: "CLUBS"
//     },
//     {
//         code: "JC",
//         image: require('@/deck/images/JC.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "CLUBS"
//     },
//     {
//         code: "QC",
//         image: require('@/deck/images/QC.png'),
//         value: "QUEEN",
//         blackjack: 10,
//         suit: "CLUBS"
//     },
//     {
//         code: "KC",
//         image: require('@/deck/images/KC.png'),
//         value: "KING",
//         blackjack: 10,
//         suit: "CLUBS"
//     },
//     {
//         code: "AH",
//         image: require('@/deck/images/AH.png'),
//         value: "ACE",
//         blackjack: 1 || 11,
//         suit: "HEARTS"
//     },
//     {
//         code: "2H",
//         image: require('@/deck/images/2H.png'),
//         value: "2",
//         blackjack: 2,
//         suit: "HEARTS"
//     },
//     {
//         code: "3H",
//         image: require('@/deck/images/3H.png'),
//         value: "3",
//         blackjack: 3,
//         suit: "HEARTS"
//     },
//     {
//         code: "4H",
//         image: require('@/deck/images/4H.png'),
//         value: "4",
//         blackjack: 4,
//         suit: "HEARTS"
//     },
//     {
//         code: "5H",
//         image: require('@/deck/images/5H.png'),
//         value: "5",
//         blackjack: 5,
//         suit: "HEARTS"
//     },
//     {
//         code: "6H",
//         image: require('@/deck/images/6H.png'),
//         value: "6",
//         blackjack: 6,
//         suit: "HEARTS"
//     },
//     {
//         code: "7H",
//         image: require('@/deck/images/7H.png'),
//         value: "7",
//         blackjack: 7,
//         suit: "HEARTS"
//     },
//     {
//         code: "8H",
//         image: require('@/deck/images/8H.png'),
//         value: "8",
//         blackjack: 8,
//         suit: "HEARTS"
//     },
//     {
//         code: "9H",
//         image: require('@/deck/images/9H.png'),
//         value: "9",
//         blackjack: 9,
//         suit: "HEARTS"
//     },
//     {
//         code: "0H",
//         image: require('@/deck/images/0H.png'),
//         value: "10",
//         blackjack: 10,
//         suit: "HEARTS"
//     },
//     {
//         code: "JH",
//         image: require('@/deck/images/JH.png'),
//         value: "JACK",
//         blackjack: 10,
//         suit: "HEARTS"
//     },
//     {
//         code: "QH",
//         image: require('@/deck/images/QH.png'),
//         value: "QUEEN",
//         blackjack: 10,
//         suit: "HEARTS"
//     },
//     {
//         code: "KH",
//         image: require('@/deck/images/KH.png'),
//         value: "KING",
//         blackjack: 10,
//         suit: "HEARTS"
//     }
// ];
// export {
//     deck
// };
