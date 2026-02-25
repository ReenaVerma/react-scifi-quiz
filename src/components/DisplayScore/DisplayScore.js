const DisplayScore = ({ score, gameStarted, animateScore }) => {
	return (
		<div
			className={`puzzle-score ${gameStarted ? "animate delay-2" : ""}`}
		>
			<i className={`fa fa-clock-o ${animateScore ? "blink-soft" : ""}`} aria-hidden="true"></i>
			<span className={animateScore ? "blink-soft" : ""}>
				Score: {score}
			</span>
		</div>
	);
};

export default DisplayScore;
