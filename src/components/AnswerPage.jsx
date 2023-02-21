import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import QuizCard from './QuizCard';

export default function AnswerPage() {
    const [quizes, setQuizes] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [finishedGame, setFinishedGame] = useState(false);

    useEffect(() => {
        if(finishedGame) return;

        fetch('https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple&encode=url3986')
        .then(res => res.json())
        .then(res => {
            const newQuizes = [];

            res.results.map(result => {
                // Answers
                let answers = [result.correct_answer, ...result.incorrect_answers]
                .map((answer, i) => (
                    {
                        id: nanoid(),
                        answer: decodeURIComponent(answer),
                        active: false,
                        isCorrect: i === 0 ? true : false,
                    }
                ));

                // Rearrange randomly answers order
                const randomIndex = Math.floor(Math.random() * answers.length);
                let correctAnswer = answers[0];
                let selectedIndex = answers[randomIndex]
            
                if(correctAnswer.id !== selectedIndex.id) {
                    answers[randomIndex] = correctAnswer;
                    answers[0] = selectedIndex;
                }

                // Question
                newQuizes.push({
                    id: nanoid(),
                    question: decodeURIComponent(result.question),
                    answers: answers,
                });
            });

            setQuizes(newQuizes)
        });
    }, [finishedGame])

    function handleAnswerClick(id, quizId) {
        if(finishedGame) return;
        
        // Change active answer button
        setQuizes(prevQuizes => (
            prevQuizes.map(quiz => {
                if(quiz.id !== quizId) return quiz;

                const newAnswers = quiz.answers.map(answer => (
                    answer.id === id ? {...answer, active: true} : {...answer, active: false}
                ));

                return {
                    ...quiz,
                    answers: newAnswers
                }
            })
        ))
    }

    function checkAnswers() {
        if(finishedGame) {
            setFinishedGame(false);
            setCorrectAnswers(0);
            return;
        }
        
        quizes.map(quiz => {
            if(quiz.answers.filter(answer => answer.active && answer.isCorrect).length)
                setCorrectAnswers(prevState => prevState + 1);
        })

        setFinishedGame(true);
    }

    return (
        <div className="answer-page">
            {quizes.map(quiz => (
                <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    handleAnswerClick={handleAnswerClick}
                    finishedGame={finishedGame}
                />
            ))}

            <div className="button-container">
                {finishedGame && (
                    <p>
                        You got {correctAnswers}/5 questions right.
                    </p>
                )}
                <button onClick={checkAnswers} className="btn btn-c-primary">
                    {finishedGame ? 'Play again' : 'Check answers'}
                </button>
            </div>
        </div>
    )
}