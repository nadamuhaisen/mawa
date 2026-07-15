import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import Button from "./Button.jsx";
import "../Styles/Navbar.css";

const NAV_LINKS = [
  { label: "الرئيسية", href: "#top" },
  { label: "عقارات", href: "#listings" },
  { label: "من نحن", href: "#why-us" },
  { label: "اتصل بنا", href: "#footer" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      id="top"
    >
      <div className="container navbar__inner">
        <Logo />

        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__auth">
          <Button variant="ghost" size="sm">
            تسجيل الدخول
          </Button>
          <Button variant="primary" size="sm">
            إنشاء حساب
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;