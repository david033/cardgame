import React from "react";
import { connect } from "react-redux";
import { saveCards } from "../redux/actions";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    };
  }

  onCardSelect(card) {
    card.clicked++;
    this.props.saveCards(this.state.cards);
  }

  render() {
    const items = this.state.cards.map(card => (
      <div key={card.key} onClick={this.onCardSelect.bind(this, card)}>
        {card.image}
      </div>
    ));
    return (
      <div>
        {"Cards Component"}
        {items}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards } = state.cardsStore;
  return {
    cards
  };
}

export default connect(
  mapStateToProps,
  { saveCards }
)(Cards);
