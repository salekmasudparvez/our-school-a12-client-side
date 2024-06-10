import { Link } from "react-router-dom";
import Logo from "../Navbar/Logo";


const Footer = () => {
    return (
        <footer className="footer p-10 bg-sky-700 text-white">
        <aside>
         <div className="bg-white rounded-md"><Logo></Logo></div>
          <p>Providing reliable tech since 2023</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Services</h6> 
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>

        </nav> 
        
        <nav>
          <h6 className="footer-title">Legal</h6> 
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    );
};

export default Footer;