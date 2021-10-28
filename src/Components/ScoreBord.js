import "./scoreBord.css"

export default function ScoreBord({score}) {
    return (
        <div className="scoreArea">
            <h2 className='theScore'>Score: {score}</h2>
        </div>
    )
}