import { Home } from "lucide-react";
import "../Styles/Logo.css";

function Logo() {
  return (
    <div className="logo">
      <span className="logo__icon">
        <Home size={20} strokeWidth={2.4} />
      </span>
      <span className="logo__text">مأوى</span>
    </div>
  );
}

export default Logo;
