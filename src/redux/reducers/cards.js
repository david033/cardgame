const initialState = {
  cards: [
    {
      key: "card1",
      image: "path",
      clicked: 0
    },
    {
      key: "card2",
      image: "path1",
      clicked: 0
    },
    {
      key: "card3",
      image: "path2",
      clicked: 0
    }
  ]
};

export const cardsStore = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_CARDS": {
      return { ...state, cards: [...action.payload.cards] };
    }
    default: {
      return state;
    }
  }
};
