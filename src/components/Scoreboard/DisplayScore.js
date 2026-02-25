const DisplayScore = ({ score, gameStarted, animateScore }) => {
	return (
		<h3
			className={`puzzle-score ${gameStarted ? "animate delay-2" : ""}`}
		>
			<i className={`fa fa-clock-o ${animateScore ? "blink-soft" : ""}`} aria-hidden="true"></i>
			<span className={animateScore ? "blink-soft" : ""}>
				Score: {score}
			</span>
		</h3>
	);
};

export default DisplayScore;
