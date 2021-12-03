import "./HeaderRegLog.css";
import '../Header/Header.css';
import { Link } from "react-router-dom";

function HeaderRegLog(props) {
  return (
		<header className="header-reg-log">
			<Link className="header__logo" to="/"></Link>
			{/* <div className="header__logo"></div> */}
			<h1 className="header-reg-log__title">{props.title}</h1>
		</header>
	)
};

export default HeaderRegLog;