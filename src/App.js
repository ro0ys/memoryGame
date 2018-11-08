import React, { Component } from 'react'
import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF} from './HallOfFame'
import shuffle from 'lodash.shuffle'


const VISUAL_PAUSE_MSECS = 1000
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿🍔';

class App extends Component {
	
	generateCards() {
		const result = [];
    	const size = 28;
    	const candidates = shuffle(SYMBOLS);
    	while (result.length < size) {
	      	const card = candidates.pop();
	      	result.push(card, card);
    	}
    	return shuffle(result);
	}

	state = {
		cards: this.generateCards(),
		currentPair: [],
		guesses: 0,
		matchedCardIndices: [],
	}

	handleCardClick = index => {
		const { cards, guesses, matchedCardIndices} = this.state
		if (matchedCardIndices.length === cards.length) {
			return
		}
		const { currentPair} = this.state
		console.log(index);
		if (currentPair.length === 2) {
			return
		}

		if (currentPair.length === 0) {
			this.setState({ currentPair: [index] })
			return
		}
		this.handleNewPairClosedBy(index)
	}

	handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

	getFeedbackForCard(index) {
		const { currentPair, matchedCardIndices } = this.state
		const indexMatched = matchedCardIndices.includes(index)
	
		if (currentPair.length < 2) {
			return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
		}
	
		if (currentPair.includes(index)) {
			return indexMatched ? 'justMatched' : 'justMismatched'
		}
	
		return indexMatched ? 'visible' : 'hidden'
	}

  render() {
		const { cards, guesses, matchedCardIndices} = this.state
  	const won = matchedCardIndices.length === cards.length
    return (
			<div className="container">
				<GuessCount guesses={guesses}/>
				<div className="memory row">
						{
							cards.map((card, index) => (
							<Card 
								card={card} 
								feedback={this.getFeedbackForCard(index)} 
								index={index}
								key = {index}
								onClick={this.handleCardClick} 
							/>
							))
						}
						{won && <HallOfFame entries={FAKE_HOF} />}
				</div>
			</div>
    )
  }
}

export default App