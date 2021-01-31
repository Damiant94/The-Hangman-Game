import React, {Component, Fragment} from 'react';
import Header from '../../Components/Header/Header';
import Hearts from '../../Components/Hearts/Hearts';
import Sentence from '../../Components/Sentence/Sentence';
import Letters from '../../Components/Letters/Letters';
import Reset from '../../Components/Reset/Reset';
import Result from '../../Components/Result/Result';
import Spinner from '../../Components/Spinner/Spinner';
import Backdrop from '../../Components/Backdrop/Backdrop';
import Translation from '../../Components/Translation/Translation';

import classes from './Game.module.css';
import classesHeart from '../../Components/Hearts/Heart/Heart.module.css';
import classesLetter from '../../Components/Letters/Letter/Letter.module.css';

import axios from 'axios';

import words from '../../utils/js/words';

const randomWordUrl = 'https://random-word-api.herokuapp.com/word?number=1';
const translationUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

class Game extends Component {
  constructor() {
    super();

    this.state = this.getFreshState();
  }

  getFreshState = () => {
    return {
      sentence: null,
      currentSentence: null,
      definitions: null,
      currentDefinition: null,
      lives: 9,
      win: null,
      backdrop: false
    }
  };

  setSentence = (sentence) => {
    let currentSentence = "";
    for (const letter of sentence) {
      if (letter === " ") {
        currentSentence += " ";
      } else {
        currentSentence += "-";
      }
    }
    this.setState({
      sentence: sentence,
      currentSentence: currentSentence
    }, () => {
      this.setDefinitions(sentence.join(""));
    });
  };

  createSentence = () => {
    axios.get(randomWordUrl)
      .then(response => {
        const sentence = response.data[0].toUpperCase().split("");
        this.setSentence(sentence);
        // this.setSentence(["G", "O"]);
        console.log("word taken from api");
      })
      .catch(() => {
        const sentence = words[Math.floor(Math.random() * words.length)].toUpperCase().split("");
        this.setSentence(sentence);
        console.log("word taken from frontend");
      });
  };

  setDefinitions = (word) => {
    axios.get(translationUrl + word)
      .then(response => {
        const definitions = response.data[0].meanings
          .reduce((acc, meaning) => {
            return acc.concat(meaning.definitions)
            }, [])
          .map(element => element.definition);
        this.setState({definitions: definitions, currentDefinition: definitions[0]});
      })
      .catch(() => {
        const message = "Sorry, couldn't find a definition";
        this.setState({definitions: [message], currentDefinition: message});
      })
  };

  componentDidMount() {
    this.createSentence();
  }

  restart = () => {
    this.setState(this.getFreshState());
    this.createSentence();

    for (const button of document.querySelectorAll(`.${classesLetter.Correct}, .${classesLetter.Wrong}`)) {
      button.className = classesLetter.Letter;
      button.disabled = false;
    }

    for (const heart of document.querySelectorAll(`.${classesHeart.HeartLost}`)) {
      heart.className = classesHeart.Heart;
    }
  };

  correctLetterHandle = (clickedLetter) => {
    clickedLetter.classList.add(classesLetter.Correct);
    let newCurrentSentence = "";
    for (const letter of this.state.sentence) {
      if (letter === clickedLetter.innerHTML || letter === " " || this.state.currentSentence.includes(letter)) {
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
  };

  wrongLetterHandle = (clickedLetter) => {
    clickedLetter.classList.add(classesLetter.Wrong);
    document.querySelector(`[data-heart="${this.state.lives}"]`).className = classesHeart.HeartLost;
    this.setState((prevState) => {
      return {lives: prevState.lives - 1}
    }, () => {
      if (this.state.lives === 0) {
        this.setState({win: false});
      }
    });
  };

  letterClickHandler = (clickedLetter) => {
    clickedLetter.disabled = true;
    if (this.state.sentence.includes(clickedLetter.innerHTML)) {
      this.correctLetterHandle(clickedLetter);
    } else {
      this.wrongLetterHandle(clickedLetter);
    }
  };

  showDefinitionsHandler = () => {
    this.setState({backdrop: true});
  };

  hideDefinitionsHandler = () => {
    this.setState({backdrop: false});
  }

  changeDefinitionHandler = () => {
    this.setState((prevState) => {
      const definitionsNumber = prevState.definitions.length;
      const currentDefinitionIndex = prevState.definitions.indexOf(prevState.currentDefinition);
      const newDefinitionIndex = definitionsNumber - 1 !== currentDefinitionIndex ? currentDefinitionIndex + 1 : 0;
      return {
        currentDefinition: prevState.definitions[newDefinitionIndex]
      };
    })
  };

  render() {
    let view = null;
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
        <Fragment>
          <Translation 
            definition={this.state.currentDefinition}
            definitionsNumber={this.state.definitions.length} 
            show={this.state.backdrop}
            change={this.changeDefinitionHandler}
            hide={this.hideDefinitionsHandler}
            sentence={this.state.sentence.join("")}/>
          <Backdrop show={this.state.backdrop}/>
          <Result 
            message={message} 
            classColor={classColor}
            restart={this.restart} 
            sentence={this.state.sentence.join("")}
            resultClicked={this.showDefinitionsHandler}
          />
        </Fragment>

      )
    }
  
    return (
      <div className={classes.Game}>
        <Header />
        <Hearts />
        {this.state.sentence ? view : <Spinner />}
      </div>
    );
  }
}

export default Game;
