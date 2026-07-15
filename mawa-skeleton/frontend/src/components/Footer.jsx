import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";
// import { cities } from "../data/mockListings";
import "../Styles/Footer.css";

function Footer() {

  const links = [
    { text: "الرئيسية", href: "#home" },
    { text: "العقارات", href: "#listings" },
    { text: "من نحن", href: "#why-us" },
    { text: "اتصل بنا", href: "#footer" },
  ];

  return (
    <footer className="footer" id="footer">
      <div className="container footer__grid">

        <div className="footer__col footer__brand">
          <Logo size="sm" />

          <p>
            منصة عقارات قطاع غزة الأولى لمساعدتك في إيجاد منزلك أو استثمارك العقاري بسهولة وثقة.
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
                  <a href={link.href}>{link.text}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer__col">
          <h4>المدن</h4>

          {/* <ul>
            {cities.slice(0, 4).map((city) => {
              return (
                <li key={city}>
                  <a href="#listings">{city}</a>
                </li>
              );
            })}
          </ul> */}
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
