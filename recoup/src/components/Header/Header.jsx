import { useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/bolt_icon.svg"

const Header = () => {
    const userId = localStorage.getItem("user_id")
    const navigate = useNavigate();
    const handleLogoNav = () => {
        navigate(`/profile/${userId}`)
    }

    return ( 
        <header className="header">
            <div className="header__logo-container">
                <img 
                className="header__logo-image" 
                src={logo} 
                alt={"green lighting bolt"}
                onClick={handleLogoNav}
                />
            </div>
        </header>
     );
}
 
export default Header;