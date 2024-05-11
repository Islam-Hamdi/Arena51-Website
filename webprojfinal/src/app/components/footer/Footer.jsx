import "./footer.css"
import { GoArrowUp } from "react-icons/go";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer style={{width: "100%"}}>
                <div class="footer-nav ">
                    <a href="#top" style={{display: "flex", alignItems: "center", gap: "0 10px", marginLeft: "10px"}}><GoArrowUp size={20} color="#68C301" /> Back to Top</a>
                    <div class="social-media">
                        <FaFacebook size={25} color="#68C301" />
                        <FaInstagram size={25} color="#68C301" />
                        <FaTwitter size={25} color="#68C301" />
                    </div>
                    <div class="footer-links">
                        <ul>
                            <li><a href="#">Internet Service Terms</a></li>
                            <li><a href="#">Arena 51 Terms & Conditions</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div class="languages-region">
                        <div class="languages">
                            <ul>
                                <li><a href="#">En (US)</a></li>
                                <li><a href="#">Ar</a></li>
                            </ul>
                        </div>
                        <div class="region">
                            <select>
                                <option value="north-america">North America</option>
                                <option value="europe">Europe</option>
                                <option value="asia">Asia</option>
                                <option value="south-america">South America</option>
                                <option value="north-america">North America</option>
                                <option value="africa">Africa</option>
                            </select>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer