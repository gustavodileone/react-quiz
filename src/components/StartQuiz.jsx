export default function StartQuiz(props) {
    return (
        <div className="initial">
            <h1>Historical Quizzical</h1>
            <p>
                Quiz about general historical knowledge.
            </p>
            <button className="btn btn-c-primary" onClick={props.startQuiz}>
                Start quiz
            </button>
        </div>
    )
}