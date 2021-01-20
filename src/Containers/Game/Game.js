import React, {Component, Fragment} from 'react';
import Header from '../../Components/Header/Header';
import Hearts from '../../Components/Hearts/Hearts';
import Sentence from '../../Components/Sentence/Sentence';
import Letters from '../../Components/Letters/Letters';
import Reset from '../../Components/Reset/Reset';
import Result from '../../Components/Result/Result';

import classes from './Game.module.css';
import classesHeart from '../../Components/Hearts/Heart/Heart.module.css';
import classesLetter from '../../Components/Letters/Letter/Letter.module.css';

import words from '../../utils/js/words';

class Game extends Component {
  constructor() {
    super();

    this.state = this.getFreshState();
  }

  getFreshState = () => {
    const [sentence, currentSentence] = this.createSentence();
    return {
      sentence: sentence,
      currentSentence: currentSentence,
      lives: 9,
      win: null
    }
  };

  createSentence = () => {
    const sentence = words[Math.floor(Math.random() * words.length)].toUpperCase().split("");
    let currentSentence = "";
    for (const letter of sentence) {
      if (letter === " ") {
        currentSentence += " ";
      } else {
        currentSentence += "-";
      }
    }
    return [sentence, currentSentence];
  };

  restart = () => {
    this.setState(this.getFreshState());

    for (const button of document.querySelectorAll(`.${classesLetter.Green}, .${classesLetter.Red}`)) {
      button.className = classesLetter.Letter;
      button.disabled = false;
    }

    for (const heart of document.querySelectorAll(`.${classesHeart.HeartLost}`)) {
      heart.className = classesHeart.Heart;
    }
  };

  letterClickHandler = (clickedLetter) => {
    clickedLetter.disabled = true;
    const letterStr = clickedLetter.innerHTML;
    if (this.state.sentence.includes(letterStr)) {
      clickedLetter.classList.add(classesLetter.Green);
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
      clickedLetter.classList.add(classesLetter.Red);
      document.querySelector(`[data-heart="${this.state.lives}"]`).className = classesHeart.HeartLost;
      this.setState((prevState) => {
        return {lives: prevState.lives - 1}
      }, () => {
        if (this.state.lives === 0) {
          this.setState({win: false});
        }
      });
    }
  };

  render() {
    let view;
    if (this.state.win === null) {
      view = (
        <Fragment>
          <Sentence currentSentence={this.state.currentSentence} />
          <Letters clickHandle={this.letterClickHandler} />
          <Reset clickHandle={this.restart} />
        </Fragment>
      );
    } else {
      let message, classColor;
      if (this.state.win) {
        message = "You won!";
        classColor = "Win";
      } else {
        message = "You lose.";
        classColor = "Lose";
      }
      view = (
        <Result 
          message={message} 
          classColor={classColor}
          restart={this.restart} 
          sentence={this.state.sentence}
        />
      )
    }
  
    return (
      <div className={classes.Game}>
        <Header />
        <Hearts />
        {view}
      </div>
    );
  }
}

export default Game;
