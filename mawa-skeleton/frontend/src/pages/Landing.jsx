import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import Card from '../components/Card.jsx';
import WhyMawa from '../components/WhyMawa.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Footer from '../components/Footer.jsx';
import { getListings } from '../services/listingService.js';
import '../Styles/Landing.css';

function Landing() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async (filters = {}) => {
    setIsLoading(true);
    const results = await getListings(filters);
    setListings(results);
    setIsLoading(false);
  };

  // Initial load — swap getListings' MOCK_MODE flag in listingService.js
  // once the backend is ready; this component doesn't need to change.
  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      
      <Hero onSearch={fetchListings} />
      <Stats />

      <section className="listings-section section" id="listings">
        <div className="container">
          <div className="section-heading reveal-up">
            <h2>أحدث العقارات</h2>
            <p>تصفح آخر العقارات المضافة على مأوى</p>
          </div>

          {isLoading ? (
            <p className="listings-section__status">جارٍ التحميل...</p>
          ) : listings.length === 0 ? (
            <p className="listings-section__status">لا توجد عقارات مطابقة</p>
          ) : (
            <div className="listings-section__grid">
              {listings.map((listing) => (
                <Card key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyMawa />
      <HowItWorks />
      <Testimonials />
     
    </>
  );
}

export default Landing;
