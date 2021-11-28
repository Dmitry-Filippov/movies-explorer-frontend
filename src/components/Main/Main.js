import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import HeaderAlt from "../HeaderAlt/HeaderAlt";

function Main({loggedIn}) {
  return (
    <div>
      {loggedIn ? <HeaderAlt /> : <Header />}
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default Main;
