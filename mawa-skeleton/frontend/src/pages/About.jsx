import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Eye,
  Zap,
  MousePointerClick,
  ShieldCheck,
  Users,
  Search,
  MessageCircle,
  BadgeCheck,
  LayoutGrid,
  ArrowLeft,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import '../Styles/About.css';

const VALUES = [
  { icon: HeartHandshake, title: 'الثقة', description: 'نبني علاقة صادقة بين الملاك والمستأجرين أساسها الأمانة في كل تفصيل.' },
  { icon: Eye, title: 'الشفافية', description: 'معلومات واضحة ودقيقة عن كل عقار، بدون أي تفاصيل مخفية عنك.' },
  { icon: Zap, title: 'السرعة', description: 'تجربة بحث وتواصل سريعة توصلك للعقار المناسب بأقل وقت ممكن.' },
  { icon: MousePointerClick, title: 'سهولة الاستخدام', description: 'واجهة بسيطة ومرتبة تناسب الجميع، بدون أي تعقيد.' },
  { icon: ShieldCheck, title: 'الأمان', description: 'نحافظ على خصوصية بياناتك ونتحقق من مصداقية الإعلانات المنشورة.' },
  { icon: Users, title: 'خدمة المجتمع', description: 'منصة محلية هدفها تسهيل حياة الناس وخدمة مجتمعنا الفلسطيني.' },
];

const WHY_MAWA = [
  { icon: Search, title: 'بحث سريع', description: 'فلاتر ذكية توصلك للعقار المناسب خلال ثوانٍ.' },
  { icon: MessageCircle, title: 'تواصل مباشر', description: 'تواصل مباشر مع صاحب العقار بدون وسطاء.' },
  { icon: BadgeCheck, title: 'عقارات موثقة', description: 'كل إعلان يمر بمراجعة قبل نشره على المنصة.' },
  { icon: LayoutGrid, title: 'واجهة سهلة', description: 'تصميم عربي واضح ومريح لكل الأعمار.' },
];



function About() {
  return (
    <>

      <section className="about-hero">
        <div className="container about-hero__inner">
          <h1 className="about-hero__title">من نحن</h1>
          <p className="about-hero__subtitle">
            مأوى منصة عقارية فلسطينية تربط بين ملاك العقارات والمستأجرين بطريقة سهلة وآمنة،
            وتساعدك تلاقي سكنك أو تؤجّر عقارك بأقل جهد ووقت.
          </p>
        </div>
      </section>

      <section className="section about-split">
        <div className="container about-split__grid">
          <div className="about-split__card">
            <h2>رؤيتنا</h2>
            <p>
              نطمح إنه نكون المنصة العقارية الأولى في قطاع غزة، ومرجع يثق فيه كل شخص
              يبحث عن سكن أو يرغب بتأجير عقاره، من خلال تجربة رقمية بسيطة وآمنة تواكب
              احتياجات مجتمعنا.
            </p>
          </div>

          <div className="about-split__card">
            <h2>رسالتنا</h2>
            <p>
              نسهّل عملية إيجاد وتأجير العقارات من خلال ربط مباشر بين الملاك
              والمستأجرين، مع معلومات دقيقة وموثوقة، وخدمة تحترم وقتك وثقتك بينا.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-heading">
            <h2>قيمنا</h2>
            <p>المبادئ اللي بنبني عليها كل خطوة بمأوى</p>
          </div>

          <div className="about-values__grid">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div className="about-value-card" key={title}>
                <div className="about-value-card__icon">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-why">
        <div className="container">
          <div className="section-heading">
            <h2>لماذا تختار مأوى؟</h2>
            <p>أسباب بسيطة بتخلي رحلتك العقارية أسهل</p>
          </div>

          <div className="about-why__grid">
            {WHY_MAWA.map(({ icon: Icon, title, description }) => (
              <div className="about-why-card" key={title}>
                <div className="about-why-card__icon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2>جاهز تبدأ رحلتك مع مأوى؟</h2>
          <p>سواء بتدوّر على سكن أو عندك عقار للإيجار، مأوى معك من أول خطوة.</p>
          <Link to="/signup">
            <Button variant="primary" size="lg" icon={<ArrowLeft size={18} />}>
              ابدأ رحلتك الآن
            </Button>
          </Link>
        </div>
      </section>

      
    </>
  );
}

export default About;