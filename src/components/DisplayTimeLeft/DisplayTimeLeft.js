const DisplayTimeLeft = ( { time } ) => {
	return (
		<div className="animate delay-3">
			<i className="fa fa-rocket" aria-hidden="true"></i><span className="delay-3">Time Remaining:</span> {time} seconds
		</div>
	);
};

export default DisplayTimeLeft;