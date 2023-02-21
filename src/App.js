import React, { useState } from 'react';

import StartQuiz from './components/StartQuiz';
import AnswerPage from './components/AnswerPage';

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div>
            {
                !gameStarted ? <StartQuiz startQuiz={() => setGameStarted(true)} /> : <AnswerPage />
            }
        </div>
    )
}