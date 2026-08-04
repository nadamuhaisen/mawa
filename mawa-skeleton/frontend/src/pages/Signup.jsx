import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import AuthHero from "../components/AuthHero.jsx";
import AuthCard from "../components/AuthCard.jsx";
import RoleSwitch from "../components/RoleSwitch.jsx";
import Button from "../components/Button.jsx";

import { signupRequest } from "../services/authService.js";

//import "../pages/Signup.css";

const TOTAL_STEPS = 3;

const initialForm = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "renter",
};

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleNextStep(e) {
    e.preventDefault();

    setError("");

    // الانتقال بين الخطوات
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);

      return;
    }

    // التأكد من تطابق كلمات المرور
    if (form.password !== form.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");

      return;
    }

    handleSignup();
  }

  async function handleSignup() {
    setLoading(true);

    try {
      const user = await signupRequest(form);

      navigate(`/${user.role}/dashboard`);

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      setError(
        err.response?.data?.message || "حدث خطأ"
      );

    } finally {
      setLoading(false);
    }
  }

  function handleBackStep() {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="auth-page">

      <AuthHero
        title="انضم إلى مأوى"
        subtitle="أنشئ حسابك كمستأجر أو مالك عقار خلال دقيقة"
      />

      <div className="auth-page__stage">

        <AuthCard
          heading="إنشاء الحساب"
          tagline="أنشئ حساباً جديداً للوصول إلى خدمات مأوى"
          mode="signup"
        >

          <form
            className="auth-card__form"
            onSubmit={handleNextStep}
          >

            <p className="auth-card__step">
              الخطوة {step} من {TOTAL_STEPS}
            </p>

            {step === 1 && (
              <>
                <label className="auth-card__label">
                  الاسم الكامل
                </label>

                <input
                  className="auth-card__input"
                  placeholder="مثال: محمد يوسف"
                  value={form.name}
                  onChange={(e) =>
                    updateForm("name", e.target.value)
                  }
                />

                <label className="auth-card__label">
                  رقم الهاتف
                </label>

                <input
                  className="auth-card__input"
                  placeholder="059XXXXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    updateForm("phone", e.target.value)
                  }
                />
              </>
            )}

            {step === 2 && (
              <>
                <label className="auth-card__label">
                  كلمة المرور
                </label>

                <input
                  type="password"
                  className="auth-card__input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    updateForm("password", e.target.value)
                  }
                />

                <label className="auth-card__label">
                  تأكيد كلمة المرور
                </label>

                <input
                  type="password"
                  className="auth-card__input"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateForm(
                      "confirmPassword",
                      e.target.value
                    )
                  }
                />
              </>
            )}

            {step === 3 && (
              <div className="auth-card__role">

                <span className="auth-card__role-label">
                  إنشاء حساب كـ
                </span>

                <RoleSwitch
                  value={form.role}
                  onChange={(value) =>
                    updateForm("role", value)
                  }
                />

                <p>
                  اخترت: {form.role === "renter" ? "مستأجر" : "مالك عقار"}
                </p>

              </div>
            )}

            {error && (
              <p className="auth-card__error">
                {error}
              </p>
            )}

            <div className="auth-card__actions">

              {step > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBackStep}
                >
                  رجوع
                </Button>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={<UserPlus size={17} />}
                disabled={loading}
              >
                {
                  step < TOTAL_STEPS
                    ? "التالي"
                    : loading
                      ? "جارٍ الإنشاء..."
                      : "إنشاء الحساب"
                }
              </Button>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}

export default Signup;