import { Link } from "react-router-dom";

function TopNavBar() {
    return (  
        <>
            <div className="myNavBar">
                <Link to={"./"}>
                    Home
                </Link>
                <Link to={"./Lahetused"}> 
                    Lähetuste nimekiri
                </Link>
            </div>
        </>
    );
}

export default TopNavBar;