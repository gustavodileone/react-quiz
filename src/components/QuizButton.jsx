import React from 'react';

export default function QuizButton(props) {
    let finishedClasses = '';
    
    if(props.finishedGame)
        finishedClasses = `${props.answerObj.isCorrect ? 'correct' : 'incorrect'}`;

    return (
        <button
            className={`btn ${props.answerObj.active ? 'active' : ''} ${finishedClasses}`}
            onClick={() => props.handleAnswerClick(props.answerObj.id, props.quizId)}
        >
            {props.answerObj.answer}
        </button>
    )
}