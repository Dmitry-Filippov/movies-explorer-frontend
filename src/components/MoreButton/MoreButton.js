import "./MoreButton.css";

function MoreButton({handleMoreButtonClick}) {
	return (
		<div className="more-button">
			<button className="more-button__item" onClick={handleMoreButtonClick} >Ещё</button>
		</div>
	)
};

export default MoreButton;