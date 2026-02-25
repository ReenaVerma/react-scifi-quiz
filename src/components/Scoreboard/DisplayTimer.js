import './DisplayTimer.scss';

import { useState, useEffect } from 'react';
import Intro from '../Intro';
import DisplayPuzzle from '../MoviePuzzle/DisplayPuzzle';
import DisplayScore from './DisplayScore';

const CountdownTimer = () => {
	const [time, setTime] = useState(60);
	const [isRunning, setIsRunning] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [score, setScore] = useState(0);
	const [animateScore, setAnimateScore] = useState(false);
	const [puzzleIndex, setPuzzleIndex] = useState(0);

	function handleStart() {
		setGameStarted(true);

		const timer = setInterval(() => {
			setIsRunning(true);

			setTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					setIsRunning(false);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
	}

	useEffect(() => {
		if (time === 0) {
			setTime(60);
		}
	}, [time]);

	useEffect(() => {
		setAnimateScore(true);

		const timer = setTimeout(() => {
			setAnimateScore(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [score]);

	return (
		<main>
			<Intro gameStarted={gameStarted} />

			{!gameStarted && <button
				className="play-button animate-button"
				onClick={handleStart}
				style={{ display: isRunning ? 'none' : 'block' }}
			>
				play now
			</button>}

			<div className="puzzle-container">
				{gameStarted && <h2 className="slide-right">Round {puzzleIndex + 1}/10</h2>}
				{gameStarted &&
				<DisplayPuzzle
					score={score}
					setScore={setScore}
					puzzleIndex={puzzleIndex}
					setPuzzleIndex={setPuzzleIndex}
				/>}
				{gameStarted &&
					<div className="scoreboard">
						<DisplayScore
							score={score} setScore={setScore}
							gameStarted={gameStarted}
							animateScore={animateScore}
						/>
						<h3 className="animate delay-3">
							<i className="fa fa-rocket" aria-hidden="true"></i>Time Remaining: {time} seconds
						</h3>
						<h3 className={gameStarted ? "animate delay-4" : ""}>
							<i className="fa fa-music" aria-hidden="true"></i>soundclip
						</h3>
					</div>
				}
			</div>
		</main>
	);
};

export default CountdownTimer;
