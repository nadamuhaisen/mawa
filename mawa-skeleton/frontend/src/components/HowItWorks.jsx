import { Search, MessageCircle, KeyRound } from "lucide-react";
import "../Styles/HowItWorks.css";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "ابحث عن عقار",
    description:
      "استخدم الفلاتر لتحديد المدينة، النوع، والسعر المناسب لك خلال ثوانٍ.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "تواصل مع المالك",
    description: "راسل صاحب العقار مباشرة من داخل المنصة، بدون وسطاء أو تعقيد.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "استأجر بسهولة",
    description:
      "اتفق على التفاصيل وحدد موعد المعاينة، وابدأ حياتك في منزلك الجديد.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works section">
      <div className="container">
        <div className="section-heading reveal-up">
          <h2>كيف تستخدم مأوى؟</h2>
          <p>ثلاث خطوات بسيطة تفصلك عن عقارك الجديد</p>
        </div>

        <div className="how-it-works__timeline">
          {STEPS.map(({ icon: Icon, number, title, description }, index) => (
            <div
              className={`how-step reveal-up reveal-delay-${index + 1}`}
              key={number}
            >
              <div className="how-step__icon">
                <Icon size={24} strokeWidth={2} />
                <span className="how-step__number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              {index < STEPS.length - 1 && (
                <span className="how-step__connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
