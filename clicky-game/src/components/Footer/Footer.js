import React from "react";
import "./Footer.css";

const Footer = () => (
    <footer className="footer">
        <div className="footer-slug">
            <ul id="footer-tags">
                <li><img className='logo' id="react-logo" src={require("../../assets/logos/React.js_logo-512.png")}/>Clicky-Game!</li>
                <li> ©2019, Bill Brasher Coding</li>
                <li><a href="https://github.com/wsbrasher1/Clicky-Game-App" target="blank"><span><img className='logo' alt='github-logo' src={require('../../assets/logos/github-logo.png')}/></span>Github</a></li>
            </ul>
        </div>
    </footer>
)
    
export default Footer;