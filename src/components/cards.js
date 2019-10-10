import React from "react";
import { connect } from "react-redux";
import { saveCards } from "../redux/actions";
import "./cards.css";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== this.state.cards) {
      this.setState({ cards: this.props.cards });
    }
  }

  onCardSelect(card) {
    card.clicked++;
    this.props.saveCards(this.state.cards);
  }

  render() {
    const items = this.state.cards.map(card => (
      <div
        className="card"
        key={card.key}
        onClick={this.onCardSelect.bind(this, card)}
      >
        <img className="image" src={card.image} alt="dsfs" />
      </div>
    ));
    return <div className="card-wrapper">{items}</div>;
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
