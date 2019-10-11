import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let usersHighScore = 0;
let message =
  "Click an item to score points, click the same one twice and it's Game Over.";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    correctGuesses,
    usersHighScore,
    message
  };

  setClicked = id => {
    const cards = this.state.cards;
    const clickedCards = cards.filter(match => match.id === id);
    if (clickedCards[0].clicked) {
      console.log(correctGuesses);
      console.log(usersHighScore);
      correctGuesses = 0;
      message = "You've already clicked on this item!";
      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }
      this.setState({ message });
      this.setState({ correctGuesses });
      this.setState({ cards });
    } else if (correctGuesses < 14) {
      clickedCards[0].clicked = true;
      correctGuesses++;
      message = "Good guess, keep it up!";
      if (correctGuesses > usersHighScore) {
        usersHighScore = correctGuesses;
        this.setState({ usersHighScore });
      }
      // Shuffle the array to be rendered in a random order
      cards.sort(function(a, b) {
        return 0.5 - Math.random();
      });
      // Set this.state.cards equal to the new cards array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ message });
    } else {
      // Set its value to true
      clickedCards[0].clicked = true;
      // restart the guess counter
      correctGuesses = 0;
      // Click to play again
      message = "You got them all! Click an item to play again.";
      usersHighScore = 15;
      this.setState({ usersHighScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }
      // Shuffle the array to be rendered in a random order
      cards.sort(function(a, b) {
        return 0.5 - Math.random();
      });
      // Set this.state.cards equal to the new cards array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ message });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="jumbotron">
          <Header>SMB3 React Clicky Game</Header>
          <h3 className="scoreSummary">{this.state.message}</h3>
          <h3 className="cardHeader">
            Correct Guesses: {this.state.correctGuesses}
            <br />
            High Score: {this.state.usersHighScore}
          </h3>
        </div>
        <div className="container">
          <div className="row">
            {this.state.cards.map(match => (
              <Card
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
                name={match.name}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
