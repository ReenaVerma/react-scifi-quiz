import './StartGame.scss';

import { useState, useEffect, useRef } from 'react';
import DisplayIntro 				   from '../DisplayIntro/DisplayIntro';
import DisplayPuzzle 				   from '../DisplayPuzzle/DisplayPuzzle';
import DisplayScore 				   from '../DisplayScore/DisplayScore';
import DisplayTimeLeft 				   from '../DisplayTimeLeft/DisplayTimeLeft';
import DisplaySoundClip				   from '../DisplaySoundClip/DisplaySoundClip';
import movieClips 				   	   from '../../assets/data/GameData';
import EndGame 						   from '../EndGame/EndGame';

const StartGame = () => {
	const audioRef 		  				  = useRef(null);
	const [time, setTime] 				  = useState(60);
	const [isRunning, setIsRunning] 	  = useState(false);
	const [gameStarted, setGameStarted]   = useState(false);
	const [score, setScore] 			  = useState(0);
	const [animateScore, setAnimateScore] = useState(false);
	const [puzzleIndex, setPuzzleIndex]   = useState(0);
	const [isGameEnded, setIsGameEnded]   = useState(false);

	function handleStart() {
		setGameStarted(true);

		// audioRef.current = new Audio(movieClips[puzzleIndex].sound);
		// audioRef.current.play();

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
		if (time === 0) setIsGameEnded(true);
	}, [time]);

	useEffect(() => {
		setAnimateScore(true);

		const timer = setTimeout(() => {
			setAnimateScore(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [score]);

	useEffect(() => {
		if (!gameStarted || isGameEnded) return;

		const audio = new Audio(movieClips[puzzleIndex].sound);
		audioRef.current = audio;

		audio.play().catch(err => {
			console.warn("Playback failed:", err);
		});

		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, [puzzleIndex, gameStarted, isGameEnded]);

	return (
		<main>
			<DisplayIntro gameStarted={gameStarted} />

			{!gameStarted && <button
				className="play-button animate-button"
				onClick={handleStart}
				style={{ display: isRunning ? 'none' : 'block' }}
			>
				play now
			</button>}

			<div className="puzzle-container">
				{gameStarted && !isGameEnded && <h2 className="slide-right">Round {puzzleIndex + 1}/10</h2>}
				{gameStarted && !isGameEnded &&
				<DisplayPuzzle
					score={score}
					setScore={setScore}
					puzzleIndex={puzzleIndex}
					setPuzzleIndex={setPuzzleIndex}
					audioRef={audioRef}
				/>}
				{gameStarted &&
					<div className="scoreboard animate delay-0">
						<DisplayScore
							score={score} setScore={setScore}
							gameStarted={gameStarted}
							animateScore={animateScore}
						/>
						<DisplayTimeLeft time={time} />
						<DisplaySoundClip gameStarted={gameStarted} onClick={() => audioRef.current?.play()} />
					</div>
				}
				{isGameEnded && <EndGame score={score} />}
			</div>
		</main>
	);
};

export default StartGame;
