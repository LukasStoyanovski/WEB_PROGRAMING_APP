import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { ReactComponent as FooterLogo } from "../photos/new_footer_logo.svg"


export const Footer = () => {

    return(
        <div className="footer">

            <Link to='/'>
            <FooterLogo />
            </Link>
        <ul className="footer-links">
            <li><Link className="footer-food-links" to="/breakfast" >Breakfast</Link></li>
            <li><Link className="footer-food-links"  to="/brunch">Brunch</Link></li>
            <li><Link className="footer-food-links" to="/lunch">Lunch</Link></li>
            <li><Link className="footer-food-links"  to="/dinner">Dinner</Link></li>
        </ul>
        <span>Recipe Haven copyright © 2024</span>
        </div>
    )
}