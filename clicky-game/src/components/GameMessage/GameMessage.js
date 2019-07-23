import React, {Component} from 'react';
import "./GameMessage.css";

class GameMessage extends Component {

    state = {
        animating: false,
        message: ""
    }

    //Function to run with every state change
    componentDidUpdate(prevProps) {

        //To pass into setState function
        let newState = {
            animating: true
        }

        //To re-do score and topScore from previous state
        const {score, topScore} = prevProps

        //To change message depending on user guess
        if (score === 0 && topScore === 0) {
            newState.message = "";
        } else if (score !== 0 && topScore > 0) {
            newState.message = "correct";
        } else {
            newState.message = "incorrect";
        }

        //To set the state with the new message if the score changes
        if (score !== this.props.score || this.state.message !== newState.message) {
            this.setState(newState);
        }
    }

    //Update the display message based on the message state
    renderMessage = () => {
        switch (this.state.message) {
            case "correct":
                return "You got it right!";
            case "incorrect":
                return "Oops. Incorrect.";
            default:
                return "Click any album to begin!";
        }
    };

    //To add animation when state updates
    addAnimation = () => {
        switch (this.state.message) {
            case "correct":
              return "animated pulse";
            case "incorrect":
              return "animated wobble";
            default:
              return "";
        }
    }

    render() {
        return(
            <li
            className={`
                gameMessage
                ${this.state.animating? this.addAnimation(): ""}
                ${this.state.animating? this.state.message: "black"}
            `}
            id={`${this.state.message}`}
            //To set the animation classes back to false after classes are added
            onAnimationEnd={() => this.setState({animating: false})}
            >
                {this.renderMessage()}
            </li>
        );
    }
}

export default GameMessage;