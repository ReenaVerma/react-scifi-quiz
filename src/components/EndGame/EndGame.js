import "./EndGame.scss";

const EndGame = ({ score}) => {
	return (
		<div className="puzzle-ended">
			<span>You scored {score}/10 points!</span>
			<span>DONE WELL... YOU HAVE...</span>
			<img src={require("../../assets/images/Yoda.jpg")} alt="Yoda" />
		</div>
	);
};

export default EndGame;
