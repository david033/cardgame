const initialState = {
  cards: [],
  best: Infinity,
  numberOfPairs: 4
};

export const cardsStore = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_CARDS": {
      return {
        ...state,
        cards: [...action.payload.cards]
      };
    }
    case "UPDATE_BEST": {
      return {
        ...state,
        best: action.payload.best
      };
    }
    case "UPDATE_PAIRNUMBER": {
      return {
        ...state,
        numberOfPairs: action.payload.numberOfPairs
      };
    }
    default: {
      return state;
    }
  }
};
