import React, {Component} from 'react';
import { Text, Button, View, TextInput, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RandomGuess extends Component {
    constructor(props) {
        super(props)
        this.state = {numbers: [], question: 0, score: 0, guess: 0};
    }

    getData(){
        let url = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=10'
        return fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then((data) => {this.setState({numbers: data})});
        
    }

    componentDidMount(){
        this.getData();
        this.beginGame();
    }

    beginGame(){
        let intro = "Welcome to the game. I have 10 numbers between 1 and 100. You must guess each number. The closer you are, the more points you get!";
        Speech.speak(intro);
    }

    takeGuess(){
        alert("into TakeGuess, numbers: " + this.state.numbers[0]);

        let score = this.state.score;
        let answer = this.state.numbers[this.state.question];
        let guess = this.state.guess;
        
        alert("guess: " + guess);
        alert("answer: " + answer);
        if(guess == answer){
            Speech.speak("Correct! You earned 10 points!");
            score += 10;
        } else if (guess >= answer-10 && guess <= answer+10){
            Speech.speak("So close! The correct answer was " + answer.toString() + ". You earned 5 points!");
            score += 5;
        } else if (guess >= answer-20 && guess <= answer+20){
            Speech.speak("You got the right idea. The correct answer was " + answer.toString() + ". You earned 2 points!");
            score += 2;
        } else if (guess >= answer-25 && guess <= answer+25){
            Speech.speak("You were in the ballpark. The correct answer was " + answer.toString() + ". You earned 1 point!");
            score += 1;
        } else {
            Speech.speak("Sorry, nowhere close. The correct answer was " + answer.toString() + ". Let's try the next one.");
        }

        let q = this.state.question + 1;
        alert("q with let: " + q);
        this.setState({question: this.state.question+1});
        this.setState({score: score});

        alert("q with state: " + this.state.question);

        if(q == 2){
            let highscore = parseInt(AsyncStorage.getItem("highscore"));
            alert("load highscore: " + highscore);
            Speech.speak("That's the game! Your final score was " + this.state.score.toString() + " out of 100.");
            if(this.state.score > highscore){
                AsyncStorage.setItem('highscore', this.state.score.toString());
                console.log("set highscore: " + this.state.score.toString());
                Speech.speak("That's a new high score!")
            }
            Speech.speak("I'll get some new numbers in case you want to play again.");
            this.getData();
            this.setState({question: 0, score: 0});
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput placeholder='guess' keyboardType='numeric' onChangeText={newText => this.setState({guess: Math.floor(parseInt(newText))})} />
                <Button title='take a guess' onPress={() => this.takeGuess()}/>
                <Text>Score: {this.state.score}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});