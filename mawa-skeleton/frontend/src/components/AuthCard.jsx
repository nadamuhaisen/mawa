import AuthModeTabs from './AuthModeTabs.jsx';
import '../Styles/AuthCard.css';

/**
 * Shared white card shell used by both Login and Signup.
 * Holds the heading, tagline, and the login/signup pill tabs —
 * everything else (role switch, form fields) is passed as children.
 */
function AuthCard({ heading, tagline, mode, children }) {
  return (
    <div className="auth-card">
      <h2 className="auth-card__heading">{heading}</h2>
      <p className="auth-card__tagline">{tagline}</p>
      <AuthModeTabs mode={mode} />
      {children}
    </div>
  );
}

export default AuthCard;
