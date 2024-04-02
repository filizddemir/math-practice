//Aziz Yıldırım
//211504026
import React, { useState, useEffect } from 'react';
import './App.css';

function MathGame() {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});

    useEffect(() => {
        displayQuestion(); // when refresh the site or initialize the site insert new question
    }, []);

    useEffect(() => {
        displayQuestion(); //when you update the score insert new question
    }, [score]);
  // function that provide Random Number 0 to 100 //
    function randomNumber() {
        return Math.floor(Math.random() * 101);
    }
    // function that check in the substruction operation where num1 is bigger than num 2 //
    function subsCheck() {
        let num1 = randomNumber();
        let num2 = randomNumber();
        return {
            num1: Math.max(num1, num2),
            num2: Math.min(num1, num2)
        };
    }
      // function that check in the division section where second number is not zero //
    function divCheck() {
        let num1 = randomNumber();
        let num2 = randomNumber();

        while (num1 % num2 !== 0 || num2 === 0) {
            num1 = randomNumber();
            num2 = randomNumber();
        }

        return {
            num1: num1,
            num2: num2
        };
    }
   // function that do the operations add,divide,substract,
    function questions(operating) {
        let num1, num2, trueAnswer;

        switch (operating) {
            case "+":
                num1 = randomNumber();
                num2 = randomNumber();
                trueAnswer = num1 + num2;
                break;
            case "-":
                const subsCheckRes = subsCheck();
                num1 = subsCheckRes.num1;
                num2 = subsCheckRes.num2;
                trueAnswer = num1 - num2;
                break;
            case "/":
                const divCheckRes = divCheck();
                num1 = divCheckRes.num1;
                num2 = divCheckRes.num2;
                trueAnswer = Math.floor(num1 / num2);
                break;
            case "*":
                num1 = randomNumber();
                num2 = randomNumber();
                trueAnswer = num1 * num2;
                break;
            default:
                break;
        }
        return {
            num1: num1,
            num2: num2,
            trueAnswer: trueAnswer
        };
    }
   //function that display the question
    function displayQuestion(operating) {
        const operations = ["+", "-", "/", "*"];
        if (!operating) {
            operating = operations[Math.floor(Math.random() * operations.length)];
        }
        const question = questions(operating);
        setCurrentQuestion(question);
        const questionText = question.num1 + " " + operating + " " + question.num2 + " ?";
        document.getElementById("Questions").innerText = questionText;
    }
   // function that  check the answer and update score //
    function checkAnswer(userInput, trueAnswer, score) {
        if (parseInt(userInput) === trueAnswer) {
            return score + 3;
        } else {
            score=Math.max(score-1,0);
        }
        return score;
    }
    //processes the user's answer, updates the score, clears the input field
    function handleUserInput() {
        const userInput = document.getElementById("answer").value;
        const userScore = checkAnswer(userInput, currentQuestion.trueAnswer, score);
        setScore(userScore);
        document.getElementById("answer").value = ""; // Clear input field
        displayQuestion(); // Display a new question
    }
    
    return (
        //when you touch the button this function is called
        <div>
            <h1>Math Game</h1>
            <div id="Operations">
                <p id="Questions"></p>
                <input type="number" id="answer" placeholder="Enter Your Answer " />
                <button id="submitButton" onClick={handleUserInput}>Submit</button>
            </div>

            <div id="Operants">
                <button onClick={() => displayQuestion("+")}>Addition</button>
                <button onClick={() => displayQuestion("-")}>Substraction</button>
                <button onClick={() => displayQuestion("/")}>Division</button>
                <button onClick={() => displayQuestion("*")}>Multiplication</button>
            </div>
            <p id="score">Score : {score}</p>
        </div>
    );
}

export default MathGame;
