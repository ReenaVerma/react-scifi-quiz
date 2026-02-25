import "./DisplayPuzzle.scss";
import { useMemo, useState } from "react";
import game from "../../data/GameData";

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

const DisplayPuzzle = ({ score, setScore, puzzleIndex, setPuzzleIndex }) => {
	const [answer, setAnswer] = useState("");
	const [isCorrect, setIsCorrect] = useState(false);

	// Shuffle the images once when the component mounts
	const shuffledImages = useMemo(
		() => Shuffle([...game[puzzleIndex].images]),
		[puzzleIndex]
	);

	const handleChange = (e) => {
		setAnswer(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cleanAnswer(answer) === cleanAnswer(game[puzzleIndex].answer)) {
			setIsCorrect(true);
			setScore(score + 1);

			setTimeout(() => {
				setIsCorrect(false);
				setAnswer("");
				setPuzzleIndex(puzzleIndex + 1);

			}, 3000);
		} else {
			alert("Try again!");
		}
	};

	return (
		<div className="puzzle animate delay-1">
			{(isCorrect ? game[puzzleIndex].images : shuffledImages).map(
				(image, index) => (
					<img key={index} src={image} alt="Puzzle slice" />
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
