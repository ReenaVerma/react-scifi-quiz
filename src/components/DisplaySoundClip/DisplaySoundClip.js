const DisplaySoundClip = ( { gameStarted, onClick } ) => {
	return (
		<div>
			<button className={gameStarted ? "animate delay-4" : ""} onClick={onClick}>
				<i className="fa fa-music" aria-hidden="true"></i>
				soundclip
			</button>
		</div>
	);
};

export default DisplaySoundClip;