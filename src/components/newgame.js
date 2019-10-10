import React from "react";
import { connect } from "react-redux";

class Newgame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: props.cards };
  }

  render() {
    const cards = this.state.cards.map(card => (
      <span key={card.key}>{card.clicked + ", "}</span>
    ));
    return (
      <div>
        {"Newgame Component"}
        {cards}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards } = state.cardsStore;
  return { cards };
}

export default connect(mapStateToProps)(Newgame);
