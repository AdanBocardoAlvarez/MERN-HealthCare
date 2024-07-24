import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import ToggleLang from "./ToggleLang";

const WebLogo = ({ src = null, alt = "logo", width = 120, height = 80, className = '', showLang = true }) => {

    const { web_logo } = useSelector((state: AppState) => state.webSettings);
    if (src === null) src = web_logo;

    return <div className="d-flex justify-content-between align-items-center">
        <Link to='/' className={`logo ${className}`}><img src={src} alt={alt} width={width} height={height} className="logo-img" /></Link>
        {showLang ? <ToggleLang /> : null}
    </div>
}

export default WebLogo