import "../Styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // مكتبة جاهزة بتخلينا نوجه المستخدم من صفحة ل صفحة حسب دوره
import { LogIn } from "lucide-react";
import AuthHero from "../components/AuthHero.jsx";
import AuthCard from "../components/AuthCard.jsx";
import RoleSwitch from "../components/RoleSwitch.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  //بناء الstates
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      //عشان نبعت الداتا للباك
      // لو كلو صح بيوجه المستخدم حسب دوره
      const user = await login({ phone, password });

      navigate(`/${user.role}/dashboard`);

    } catch (err) {
      setError("رقم الهاتف او كلمة المرور خاطئة ");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <AuthHero
        title="مرحباً بك في مأوى"
        subtitle="سجل دخولك أو أنشئ حساب جديد"
      />

      <div className="auth-page__stage">

        <AuthCard
          heading="الحساب"
          tagline="سجل دخولك للوصول إلى العقارات المفضلة والمزيد"
          mode="login"
        >

          <div className="auth-card__role">

            <span className="auth-card__role-label">
              الدخول باسم
            </span>

            {/* عدّلت: كانت أزرار عادية، استبدلتها بـ RoleSwitch المستورد أصلاً وما كان مستخدم */}
            <RoleSwitch
              value={role}
              onChange={setRole}
            />

          </div>

          <form
            className="auth-card__form"
            onSubmit={handleSubmit}
          >

            <label
              className="auth-card__label"
              htmlFor="phone"
            >
              رقم الهاتف
            </label>

            <input
              id="phone"
              type="text"
              className="auth-card__input"
              placeholder="0599123456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label
              className="auth-card__label"
              htmlFor="password"
            >
              كلمة المرور
            </label>

            <input
              id="password"
              type="password"
              className="auth-card__input" // إضافة
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="auth-card__error">
                {error}
              </p>
            )}

            {/* عدّلت: كان زر <button> عادي، استبدلته بـ Button المستورد أصلاً */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<LogIn size={17} />}
              disabled={loading}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </Button>

          </form>

        </AuthCard>

      </div>

    </div>
  );
}