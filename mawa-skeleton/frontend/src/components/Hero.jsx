import SearchBar from './SearchBar.jsx';
import Tatreez from './Tatreez.jsx';
import '../Styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <h1 className="hero__title">
          ابحث عن عقارك <span>المثالي</span> في قطاع غزة
        </h1>
        <p className="hero__subtitle">
          اكتشف منازل، شققاً، محلات وصالات للإيجار في مختلف مناطق قطاع غزة
        </p>
      <SearchBar />
      <Tatreez />
      </div>
  
    </section>
  );
}

export default Hero;