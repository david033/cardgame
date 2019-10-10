import React from "react";
import { connect } from "react-redux";
import { saveCards } from "../redux/actions";
import angular from "../cards/angular.png";
import d3 from "../cards/d3.png";
import jenkins from "../cards/jenkins.png";
import postcss from "../cards/postcss.png";
import react from "../cards/react.png";
import redux from "../cards/redux.png";
import sass from "../cards/sass.png";
import ts from "../cards/ts.png";
import webpack from "../cards/webpack.png";

class Newgame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberOfCards: 4, cards: props.cards };
  }

  onCardNumberChanges(event) {
    this.setState({ numberOfCards: parseInt(event.target.value, 10) });
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
    const cards = images.map(path => ({
      key: path,
      image: path,
      clicked: 0
    }));
    this.props.saveCards(cards);
  }

  render() {
    return (
      <div>
        {"New game"}
        <div>
          <input
            value={this.state.numberOfCards}
            type="text"
            onChange={this.onCardNumberChanges.bind(this)}
          />
          <button onClick={this.onNewGame.bind(this)}>New Game</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards } = state.cardsStore;
  return { cards };
}

export default connect(
  mapStateToProps,
  { saveCards }
)(Newgame);
