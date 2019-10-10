import React from "react";
import { connect } from "react-redux";
import { saveCards } from "../redux/actions";
import "./cards.css";
import classNames from "classnames";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      cardFlippedOver: null
    };
    this.timerIsActive = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== this.state.cards) {
      this.setState({ cards: this.props.cards });
    }
  }

  onCardSelect(card) {
    if (card.clicked === 1 || this.timerIsActive) {
      return;
    }
    card.clicked++;
    if (this.state.cardFlippedOver) {
      if (this.state.cardFlippedOver.image !== card.image) {
        this.timerIsActive = true;
        setTimeout(() => {
          card.clicked = 0;
          const { cardFlippedOver } = this.state;
          cardFlippedOver.clicked = 0;
          this.setState({ cardFlippedOver: null });
          this.props.saveCards(this.state.cards);
          this.timerIsActive = false;
        }, 2000);
      } else {
        this.setState({ cardFlippedOver: null });
      }
    } else {
      this.setState({ cardFlippedOver: card });
    }
    this.props.saveCards(this.state.cards);
  }

  render() {
    const items = this.state.cards.map(card => (
      <div
        className="card"
        key={card.key}
        onClick={this.onCardSelect.bind(this, card)}
      >
        <img
          className={classNames("image", {
            hidden: !card.clicked
          })}
          src={card.image}
          alt="dsfs"
        />
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
