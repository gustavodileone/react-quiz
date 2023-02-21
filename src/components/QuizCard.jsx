import React from 'react';

import QuizButton from './QuizButton';

export default function QuizCard(props) {
    return (
        <div className="quiz-card">
            <h1 className='quiz--title'>
                {props.quiz.question}
            </h1>
            <div className="quiz--answers">
                {props.quiz.answers.map(answerObj => (
                    <QuizButton
                        key={answerObj.id}
                        answerObj={answerObj}
                        quizId={props.quiz.id}
                        finishedGame={props.finishedGame}
                        handleAnswerClick={props.handleAnswerClick}
                    />
                ))}
            </div>
        </div>
    )
}