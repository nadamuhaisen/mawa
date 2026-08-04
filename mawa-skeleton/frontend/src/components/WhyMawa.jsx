import { ShieldCheck, SearchCheck, Building2 } from 'lucide-react';
import '../Styles/WhyMawa.css';

const FEATURES = [
  { icon: ShieldCheck, title: 'موثوق وآمن', description: 'إعلانات موثقة ومعلومات دقيقة لضمان تجربة آمنة لكل مستخدم.' },
  { icon: SearchCheck, title: 'بحث سهل وسريع', description: 'أدوات فلترة متقدمة تساعدك على إيجاد العقار المناسب في دقائق.' },
  { icon: Building2, title: 'آلاف العقارات', description: 'مجموعة واسعة من العقارات في جميع أنحاء قطاع غزة تحت سقف واحد.' },
];

function WhyMawa() {
  return (
    <section className="why-mawa section" id="why-us">
      <div className="container">
        <div className="section-heading">
          <h2>لماذا مأوى؟</h2>
          <p>نساعدك في العثور على العقار المثالي بسهولة وأمان</p>
        </div>

        <div className="why-mawa__grid">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div className="why-mawa__card" key={title}>
              <div className="why-mawa__icon"><Icon size={26} strokeWidth={2} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMawa;
