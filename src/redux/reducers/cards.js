const initialState = {
  cards: []
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
