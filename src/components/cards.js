import React from "react";
import { connect } from "react-redux";
import { saveCards, updateBest } from "../redux/actions";
import "./button.css";
import "./cards.css";
import classNames from "classnames";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      cardFlippedOver: null,
      tries: 0,
      pairsFound: 0
    };
    this.timerIsActive = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== this.state.cards) {
      this.setState({ cards: this.props.cards });
    }
    if (this.state.pairsFound === this.props.numberOfPairs) {
      this.setState({
        tries: 0,
        pairsFound: 0,
        cardFlippedOver: null
      });
    }
  }

  onCardSelect(card) {
    if (card.clicked === 1 || this.timerIsActive) {
      return;
    }
    card.clicked++;
    if (this.state.cardFlippedOver) {
      this.setState({ tries: this.state.tries + 1 }, () => {
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
          this.setState(
            {
              cardFlippedOver: null,
              pairsFound: this.state.pairsFound + 1
            },
            () => {
              if (this.props.numberOfPairs === this.state.pairsFound) {
                console.log("END OF GAME");
                if (this.state.tries < this.props.best) {
                  this.props.updateBest(this.state.tries);
                }
              }
            }
          );
        }
      });
    } else {
      this.setState({ cardFlippedOver: card });
    }
    this.props.saveCards(this.state.cards);
  }

  render() {
    const items = this.state.cards.map(card => (
      <div
        className={classNames("card", {
          "card-hidden": !card.clicked
        })}
        key={card.key}
        onClick={this.onCardSelect.bind(this, card)}
      >
        <img
          className={classNames("image", {
            hidden: !card.clicked
          })}
          src={card.image}
          alt=""
        />
      </div>
    ));
    return (
      <div>
        <div className="scores">
          <div className="box tries align-left">
            Current tries: {this.state.tries}
          </div>
          <div className="box best align-center">Best: {this.props.best}</div>
          <div className="box restart align-right">
            <button className="btn restart-btn">RESTART</button>
          </div>
        </div>
        <div className="card-wrapper">{items}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards, numberOfPairs, best } = state.cardsStore;
  return {
    cards,
    numberOfPairs,
    best
  };
}

export default connect(
  mapStateToProps,
  { saveCards, updateBest }
)(Cards);
