import { useEffect, useState } from "react";

import {
  getOwnerListings,
  deleteListing
} from "../services/listingService";

import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import "../Styles/OwnerPages.css";

export default function OwnerListings() {
  const [listings, setListings] = useState([]);

  async function load() {
    const data = await getOwnerListings();

    setListings(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "هل تريد حذف العقار؟"
    );

    if (!confirmDelete) return;

    await deleteListing(id);

    load();
  }

  const navigate = useNavigate();

  return (
    <div className="owner-page">

      <div className="owner-page__header">

        <h1>
          عقاراتي
        </h1>

        <BackButton />

      </div>

      <div className="listing-grid">

        {
          listings.map(item => (
            <div
              className="listing-card"
              key={item._id}
            >

              <h3>
                {item.title}
              </h3>

              <p className="listing-info">
                النوع: {item.type}
              </p>

              <p className="listing-info">
                الموقع: {item.location}
              </p>

              <p className="listing-info">
                السعر: {item.price} / {item.priceUnit}
              </p>

              <div className="listing-actions">

                <button
                  className="edit-btn"
                  onClick={() => navigate(`/listings/edit/${item._id}`)}
                >
                  تعديل
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  حذف
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}