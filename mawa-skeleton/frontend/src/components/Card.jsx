import '../Styles/Card.css';
import { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import Badge from './Badge.jsx';
import { Link } from "react-router-dom";

function Card({ listing }) {

  const [isFavorite, setIsFavorite] = useState(false);


  if (!listing) return null;


const {
  title,
  type,
  location,
  price,
  priceUnit,
  images,
} = listing;


const image = images?.[0];

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };




  return (
<article className="prop-card">
      <div className="prop-card__image-wrap">


        <img
src={
  image ||
  "https://via.placeholder.com/400x300?text=No+Image"
}          alt={title}
          className="prop-card__image"
        />


        <div className="prop-card__badge">

          <Badge tone="rent">
            {type}
          </Badge>

        </div>



        <button
          className={`prop-card__fav ${isFavorite ? 'is-active' : ''}`}
          onClick={handleFavoriteToggle}
        >

          <Heart
            size={18}
            fill={isFavorite ? 'currentColor' : 'none'}
          />

        </button>


      </div>



      <div className="prop-card__body">


        <h3 className="prop-card__title">
          {title}
        </h3>



        <p className="prop-card__location">

          <MapPin size={14}/>

          <span>
            {location}
          </span>

        </p>




        <div className="prop-card__specs">


          <span className="prop-card__spec">
            {type}
          </span>


          <span className="prop-card__spec">
            {priceUnit}
          </span>


        </div>




        <div className="prop-card__footer">


          <p className="prop-card__price">

            {price?.toLocaleString('en-US')}

            <span>
              شيكل / {priceUnit}
            </span>

          </p>



<Link
  to={`/listings/${listing._id}`}
  className="details-btn"
>
  التفاصيل
</Link>

        </div>



      </div>


  </article>
  );
}


export default Card;