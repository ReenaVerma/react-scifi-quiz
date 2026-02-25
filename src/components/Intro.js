const Intro = ( { gameStarted } ) => {
	return (
		<div className="intro">
			<h1>SCI-FI MOVIE QUIZ</h1>
			{!gameStarted && <h2>Think you're an intergalactic movie buff?</h2> }
			{!gameStarted && <h3>You have 60 seconds to guess as many movies as you can!</h3>}
			{!gameStarted && <h3>Use the sound clips for helpful audio hints!</h3>}
		</div>
	);
};

export default Intro;
