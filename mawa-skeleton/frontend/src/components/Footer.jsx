import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Logo from "./Logo";
import "../Styles/Footer.css";
import { GAZA_CITIES } from "../data/mockListings";
import { Link } from "react-router-dom";

function Footer() {
  const links = [
    { text: "الرئيسية", href: "/" },
    { text: "العقارات", href: "/listings" },
    { text: "من نحن", href: "/about" },
    { text: "اتصل بنا", href: "/contact" },
  ];

  return (
    <footer className="footer" id="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <Logo size="sm" />

          <p>
            منصة عقارات قطاع غزة الأولى لمساعدتك في إيجاد منزلك أو استثمارك
            العقاري بسهولة وثقة.
          </p>

          <div className="footer__socials">
            <a href="#">
              <Facebook size={16} />
            </a>

            <a href="#">
              <Instagram size={16} />
            </a>

            <a href="#">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>روابط سريعة</h4>

          <ul>
        {links.map((link) => {
          return (
            <li key={link.text}>
              <Link to={link.href}>{link.text}</Link>
            </li>
          );
        })}
      </ul>
        </div>

        <div className="footer__col">
          <h4>المدن</h4>

          <ul>
            {GAZA_CITIES.slice(0, 4).map((city) => (
              <li key={city}>
                <a href="#listings">{city}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>تواصل معنا</h4>

          <ul className="footer__contact">
            <li>
              <Phone size={15} />
              <span>970-599-000000+</span>
            </li>

            <li>
              <Mail size={15} />
              <span>info@mawa-palestine.com</span>
            </li>

            <li>
              <MapPin size={15} />
              <span>غزة، فلسطين</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 مأوى - عقارات قطاع غزة. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}

export default Footer;
