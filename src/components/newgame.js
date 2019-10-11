import React from "react";
import { connect } from "react-redux";
import { saveCards, updateNumberOfPairs } from "../redux/actions";
import angular from "../cards/angular.png";
import d3 from "../cards/d3.png";
import jenkins from "../cards/jenkins.png";
import postcss from "../cards/postcss.png";
import react from "../cards/react.png";
import redux from "../cards/redux.png";
import sass from "../cards/sass.png";
import ts from "../cards/ts.png";
import webpack from "../cards/webpack.png";
import "./button.css";
import "./newgame.css";

class Newgame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberOfCards: props.numberOfPairs, cards: props.cards };
  }

  onCardNumberChanges(event) {
    const numberOfCards = parseInt(event.target.value, 10)
      ? parseInt(event.target.value, 10)
      : null;
    if (numberOfCards) {
      this.setState({ numberOfCards });
      this.props.updateNumberOfPairs(numberOfCards);
    }
  }

  onNewGame() {
    const images = [
      angular,
      d3,
      jenkins,
      postcss,
      react,
      redux,
      sass,
      ts,
      webpack
    ];
    const selectedImages = images.splice(0, this.state.numberOfCards);
    const pairs = [...selectedImages, ...selectedImages];
    const randomPairs = [];
    while (pairs.length) {
      const index = Math.floor(Math.random() * pairs.length);
      randomPairs.push(pairs.splice(index, 1)[0]);
    }
    const cards = randomPairs.map((path, index) => ({
      key: `id_${index}`,
      image: path,
      clicked: 0
    }));
    this.props.saveCards(cards);
  }

  render() {
    return (
      <div className="page-header">
        <div className="brand"></div>
        <div className="title">MEMORY GAME</div>
        <div className="center-block">
          <input
            type="text"
            className="form-control"
            onChange={this.onCardNumberChanges.bind(this)}
          />
          <button
            className="btn newgame-btn"
            onClick={this.onNewGame.bind(this)}
          >
            START NEW GAME
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards, numberOfPairs } = state.cardsStore;
  return { cards, numberOfPairs };
}

export default connect(
  mapStateToProps,
  { saveCards, updateNumberOfPairs }
)(Newgame);
