import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShieldCheck, Building2 } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import Tatreez from './Tatreez.jsx';
import Button from './Button.jsx';
import '../Styles/Hero.css';

function Hero({ onSearch }) {
  return (
    <section className="hero" id="home">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container">
        <div className="hero__top">
          <div className="hero__copy reveal-up">
            <span className="hero__eyebrow">
              <ShieldCheck size={15} /> منصة عقارية موثوقة في قطاع غزة
            </span>

            <h1 className="hero__title reveal-up reveal-delay-1">
              ابحث عن عقارك <span>المثالي</span> في قطاع غزة
            </h1>

            <p className="hero__subtitle reveal-up reveal-delay-2">
              اكتشف منازل، شققاً، محلات وصالات للإيجار في مختلف مناطق قطاع غزة —
              بحث سريع، تواصل مباشر مع الملاك، وكل ما تحتاجه في مكان واحد.
            </p>

            <div className="hero__cta reveal-up reveal-delay-3">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={<ArrowLeft size={18} />}>
                  ابدأ الآن
                </Button>
              </Link>
              <a href="#listings">
                <Button variant="outline" size="lg" icon={<Search size={18} />}>
                  تصفح العقارات
                </Button>
              </a>
            </div>
          </div>

          <div className="hero__visual reveal-fade reveal-delay-2" aria-hidden="true">
            <div className="hero__visual-frame">
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt=""
              />
            </div>
            <div className="hero__visual-badge hero__visual-badge--top">
              <Building2 size={18} />
              <div>
                <strong>+1,200</strong>
                <span>عقار متاح</span>
              </div>
            </div>
            <div className="hero__visual-badge hero__visual-badge--bottom">
              <ShieldCheck size={18} />
              <div>
                <strong>100%</strong>
                <span>إعلانات موثقة</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__search reveal-up reveal-delay-4">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      <Tatreez className="hero__tatreez" />
    </section>
  );
}

export default Hero;