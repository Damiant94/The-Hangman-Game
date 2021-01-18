import React, {Component, Fragment} from 'react';
import classes from './Game.module.css';
import Header from '../../Components/Header/Header';
import Lives from '../../Components/Lives/Lives';
import Sentence from '../../Components/Sentence/Sentence';
import Letters from '../../Components/Letters/Letters';
import Reset from '../../Components/Reset/Reset';

import words from '../../utils/words';

class Game extends Component {
  constructor() {
    super();
    const sentence = words[Math.floor(Math.random() * words.length)].toUpperCase().split("");
    let currentSentence = "";
    for (const letter of sentence) {
      if (letter === " ") {
        currentSentence += " ";
      } else {
        currentSentence += "-";
      }
    }

    this.state = {
      sentence: sentence,
      currentSentence: currentSentence,
      lives: 9,
      win: undefined
    };
  }

  letterClickHandler = (clickedLetter) => {
    clickedLetter.disabled = true;
    const letterStr = clickedLetter.innerHTML;
    if (this.state.sentence.includes(letterStr)) {
      clickedLetter.className = classes.green
      let newCurrentSentence = "";
      for (const letter of this.state.sentence) {
        if (letter === letterStr || letter === " " || this.state.currentSentence.includes(letter)) {
          newCurrentSentence += letter;
        } else {
          newCurrentSentence += "-";
        }
      }
      this.setState({currentSentence: newCurrentSentence}, () => {
        if (!this.state.currentSentence.includes("-")) {
          this.setState({win: true});
        }
      });
    } else {
      clickedLetter.className = classes.red
      this.setState((prevState) => {
        return {lives: prevState.lives - 1}
      }, () => {
        if (this.state.lives === 0) {
          this.setState({win: false});
        }
      });
    }
  };

  showResult = (win=false) => {
    let message;
    let classColor;
    if (win===true) {
      message = "You won!";
      classColor = "greenResult";
    } else {
      message = "You lose.";
      classColor = "redResult";
    }
    return (      
      <div className={classes.results}>
        <p className={classes[classColor]}>{message}</p>
        <p>Correct answer:</p> 
        <p className={classes.greenResult}>{this.state.sentence.join("")}</p>
        <button type="button" onClick={() => {window.location.reload()}}>Try again</button>
      </div>
    )
  }

  render() {
    let result;
    if (this.state.win === true) {
      result = this.showResult(true);
    } else if (this.state.win === false) {
      result = this.showResult();
    } else {
      result = (
        <Fragment>
          <Sentence 
          currentSentence={this.state.currentSentence} />
          <Letters clickHandle={this.letterClickHandler} />
          <Reset />
        </Fragment>
      );
    }

    return (
      <div className={classes.Game}>
        <Header />
        <Lives lives={this.state.lives} />
        {result}
      </div>
    );
  }

}

export default Game;
