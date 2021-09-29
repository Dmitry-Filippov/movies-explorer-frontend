import "./HeaderRegLog.css";
import '../Header/Header.css';

function HeaderRegLog(props) {
  return (
		<header className="header-reg-log">
			<div className="header__logo"></div>
			<h1 className="header-reg-log__title">{props.title}</h1>
		</header>
	)
};

export default HeaderRegLog;