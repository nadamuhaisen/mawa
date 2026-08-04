import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../Styles/AuthHero.css';

/**
 * Header used at the top of the Login / Signup pages:
 * a "back to home" link, a big heading, and a subtitle.
 */
function AuthHero({ title, subtitle }) {
  return (
    <div className="auth-hero">
      <Link to="/" className="auth-hero__back">
        العودة للرئيسية
        <ArrowRight size={15} />
      </Link>
      <h1 className="auth-hero__title">{title}</h1>
      <p className="auth-hero__subtitle">{subtitle}</p>
    </div>
  );
}

export default AuthHero;
