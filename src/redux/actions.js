export const saveCards = cards => {
  return {
    type: "SAVE_CARDS",
    payload: {
      cards
    }
  };
};

export const updateBest = best => {
  return {
    type: "UPDATE_BEST",
    payload: {
      best
    }
  };
};

export const updateNumberOfPairs = numberOfPairs => {
  return {
    type: "UPDATE_PAIRNUMBER",
    payload: {
      numberOfPairs
    }
  };
};
