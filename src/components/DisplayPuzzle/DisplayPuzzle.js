import "./DisplayPuzzle.scss";
import { useEffect, useMemo, useState } from "react";
import movieClips from "../../assets/data/GameData";

const Shuffle = (array) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

const cleanAnswer = (string) => {
	return string
		.toLowerCase()
		.replace(/\b2\b/g, "")
		.replace(/\bthe\b/g, "")
		.replace(/[\s'!?.,-]/g, "");
};

const DisplayPuzzle = ({ score, setScore, puzzleIndex, setPuzzleIndex, audioRef }) => {
	const [answer, setAnswer] = useState("");
	const [isCorrect, setIsCorrect] = useState(false);
	const [isWrong, setIsWrong] = useState(false);

	// Shuffle the images once when the component mounts
	const shuffledImages = useMemo(
		() => Shuffle([...movieClips[puzzleIndex].images]),
		[puzzleIndex]
	);

	const handleChange = (e) => {
		setAnswer(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cleanAnswer(answer) === cleanAnswer(movieClips[puzzleIndex].answer)) {
			setIsCorrect(true);
			setScore(score + 1);
			setIsWrong(false);  // reset error

			setTimeout(() => {
				setIsCorrect(false);
				setAnswer("");
				setPuzzleIndex(puzzleIndex + 1);

				if (audioRef.current) {
					audioRef.current.pause();
					audioRef.current.currentTime = 0;
				}

			}, 3000);
		} else {
			setIsWrong(true);
		}
	};

	useEffect(() => {
		if (isWrong) {
			audioRef.current = new Audio(require("../../assets/sounds/Incorrect.wav"));
			audioRef.current.play();
		}
	}, [isWrong, audioRef]);

	useEffect(() => {
		if (isCorrect) {
			audioRef.current = new Audio(require("../../assets/sounds/Correct.mp3"));
			audioRef.current.play();
		}
	}, [isCorrect, audioRef]);

	return (
		<div className="puzzle animate delay-1">
			{isWrong && (
				<span className="error">
					epic fail! try again!
				</span>
			)}
			{isCorrect && (
				<span className="correct">
					the force is strong with you! +1 point!
				</span>
			)}
			{(isCorrect ? movieClips[puzzleIndex].images : shuffledImages).map(
				(image, index) => (
					<img key={index} src={image} alt="Puzzle slice" className={isCorrect ? "puzzle-reveal" : ""}/>
				)
			)}
			<form className="puzzle-form" onSubmit={handleSubmit}>
				<input
					id="usertext"
					type="text"
					autoComplete="off"
					onChange={handleChange}
					value={answer}
				/>
				<button type="submit">Go!</button>
			</form>
		</div>
	);
};

export default DisplayPuzzle;
