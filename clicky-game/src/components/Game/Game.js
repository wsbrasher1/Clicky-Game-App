import React, {Component} from 'react';
import Container from "../Container";
import GameCard from "../GameCard";
import Instructions from "../Instructions";
import Header from "../Header";
import Footer from "../Footer";
import data from "../../data";

class Game extends Component {

    state = {
        data,
        score: 0,
        topScore: 0,
        message: "Click as many album covers as you can without repeating"
    };

    //Function that is to be called when the game loads up
    componentDidMount(){
        //To reorder the data array based on state changes
        this.setState({data: this.shuffleDeck(this.state.data)});
    }

    //To shuffle the data array randomly
    shuffleDeck = (data) => {
        let newData = data.sort(function(a,b){return 0.5 - Math.random()});
        return newData;
    };

    //To reset the the deck properties to false
    resetDeck = (data) => {
        const resetData = data.map(item => ({...item, clicked: false}));
        return this.shuffleDeck(resetData);
    };

    //To check and see if score is higher than the Top Score and update
    correctGuess = (newData) => {
        let newScore = this.state.score;
        newScore++
        let newTopScore = Math.max(newScore, this.state.topScore);

        this.setState({
            data: this.shuffleDeck(newData),
            score: newScore,
            topScore: newTopScore,
            animation: "animated swing"
        })
    }
    //To restart the game with new data
    wrongGuess = (newData)=> {
        this.setState({
            data: this.resetDeck(newData),
            score: 0
        })
    }
    //To check if a card has been clicked before and updates the cards clicked property
    gameCardClick = (id) => {
        let guessedCorrectly = false;
        //newData is the data array with updated click properties
        const newData = this.state.data.map(item => {
            if (item.id === id) {
                if (!item.clicked) {
                    item.clicked = true;
                    guessedCorrectly = true;
                }
            }
            return item;
        });
        //If the guessedCorrectly condition is true run the correctGuess function, otherwise
        //run the wrongGuess function
        guessedCorrectly ? this.correctGuess(newData) : this.wrongGuess(newData);
    };

    render() {
        return (
            <div className="animated fadeIn">
                <Header score={this.state.score} topScore = {this.state.topScore} />
                <Instructions message={this.state.message} />
                <Container>
                    {
                        this.state.data.map(item => (
                            <div className="animated rollIn">
                                <GameCard
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    animate={!this.state.score && this.state.topScore}
                                    clicked={item.clicked}
                                    handleClick={this.gameCardClick}
                                    />
                                </div>
                        ))
                    }
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Game;