import { useState } from 'react';
import { Heart, MapPin, BedDouble, Bath, Maximize } from 'lucide-react';
import Badge from './Badge.jsx';
import Button from './Button.jsx';
import '../Styles/Card.css';

function Card({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    title,
    status,
    city,
    neighborhood,
    price,
    currency,
    area,
    bedrooms,
    bathrooms,
    image,
  } = listing;

  const handleFavoriteToggle = () => {
    // Placeholder — wire up to a favorites API/service later.
    setIsFavorite((prev) => !prev);
  };

  const handleContactClick = () => {
    // Placeholder — should open contact modal / call listingService.
    console.log('طلب تواصل بخصوص:', title);
  };

  return (
    <article className="prop-card">
      <div className="prop-card__image-wrap">
        <img src={image} alt={title} className="prop-card__image" loading="lazy" />
        <div className="prop-card__badge">
          <Badge tone={status === 'للبيع' ? 'sale' : 'rent'}>{status}</Badge>
        </div>
        <button
          className={`prop-card__fav ${isFavorite ? 'is-active' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label="إضافة إلى المفضلة"
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="prop-card__body">
        <h3 className="prop-card__title">{title}</h3>
        <p className="prop-card__location">
          <MapPin size={14} />
          <span>{city} - {neighborhood}</span>
        </p>

        <div className="prop-card__specs">
          {area && (
            <span className="prop-card__spec">
              <Maximize size={14} />
              {area} م²
            </span>
          )}
          {bedrooms && (
            <span className="prop-card__spec">
              <BedDouble size={14} />
              {bedrooms}
            </span>
          )}
          {bathrooms && (
            <span className="prop-card__spec">
              <Bath size={14} />
              {bathrooms}
            </span>
          )}
        </div>

        <div className="prop-card__footer">
          <p className="prop-card__price">
            {price.toLocaleString('en-US')} <span>{currency}</span>
          </p>
          <Button size="sm" variant="outline" onClick={handleContactClick}>
            تواصل
          </Button>
        </div>
      </div>
    </article>
  );
}

export default Card;
