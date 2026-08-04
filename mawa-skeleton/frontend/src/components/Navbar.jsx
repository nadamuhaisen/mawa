import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "./Logo.jsx";
import Button from "./Button.jsx";

import "../Styles/Navbar.css";

const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "عقارات", href: "/listings" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <Logo />
        </Link>

        {/* Links */}
        <nav className={`navbar__links ${isMenuOpen ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="navbar__link"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="navbar__auth navbar__auth--mobile">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="ghost" size="sm">
                تسجيل الدخول
              </Button>
            </Link>

            <Link to="/signup" onClick={closeMenu}>
              <Button variant="primary" size="sm">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="navbar__auth navbar__auth--desktop">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              تسجيل الدخول
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="primary" size="sm">
              إنشاء حساب
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar__toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="فتح القائمة"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
