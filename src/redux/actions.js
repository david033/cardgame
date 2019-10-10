export const saveCards = cards => {
  return {
    type: "SAVE_CARDS",
    payload: {
      cards
    }
  };
};
