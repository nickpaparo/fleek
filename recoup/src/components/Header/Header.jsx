import "./Header.scss";
import logo from "../../assets/bolt_icon.svg"

const Header = () => {
    return ( 
        <header className="header">
            <div className="header__logo-container">
                <img className="header__logo-image" src={logo} alt={"green lighting bolt"}/>
            </div>
        </header>
     );
}
 
export default Header;