import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import '../Styles/AuthModeTabs.css';

function AuthModeTabs({ mode }) {
  return (
    <div className="auth-mode-tabs">
      <Link
        to="/login"
        className={`auth-mode-tabs__tab ${mode === 'login' ? 'is-active' : ''}`}
      >
        <LogIn size={15} />
        تسجيل الدخول
      </Link>
      <Link
        to="/signup"
        className={`auth-mode-tabs__tab ${mode === 'signup' ? 'is-active' : ''}`}
      >
        <UserPlus size={15} />
        حساب جديد
      </Link>
    </div>
  );
}

export default AuthModeTabs;
