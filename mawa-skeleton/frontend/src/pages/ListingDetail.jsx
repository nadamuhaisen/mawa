import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, contactOwner } from "../services/listingService";
import "../Styles/ListingDetail.css";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function sendRequest() {
    try {
      console.log("LISTING ID:", listing._id);

      const data = await contactOwner(
        listing._id,
        "ارغب بالتواصل بخصوص العقار"
      );

      console.log("CONTACT SUCCESS:", data);

      setRequested(true);
    } catch (err) {
      console.log(
        "CONTACT ERROR:",
        err.response?.data || err.message
      );
    }
  }

  if (loading) {
    return (
      <div className="loading-page">
        جاري التحميل...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="loading-page">
        <button onClick={() => navigate(-1)}>رجوع</button>
        العقار غير موجود
      </div>
    );
  }

  return (
    <div className="listing-detail-page">
      <div className="listing-detail-container">
        <button
          className="listing-back-btn"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>

        {/* صورة العقار */}
        <div className="listing-detail-image">
          {
            listing.images && listing.images.length > 0 ?
              <img src={listing.images[0]} alt={listing.title} />
              :
              <div>لا توجد صورة</div>
          }
        </div>

        <div className="listing-detail-content">
          <div className="listing-detail-header">
            <h1 className="listing-detail-title">
              {listing.title}
            </h1>

            <div className="listing-detail-price">
              {listing.price} ₪
              <span>{listing.priceUnit}</span>
            </div>
          </div>

          <div className="listing-detail-section">
            <h3>تفاصيل العقار</h3>

            <p className="listing-detail-text">
              🏠 النوع:
              {listing.type}
              <br />

              📍 الموقع:
              {listing.location}
              <br />

              💰 السعر:
              {listing.price} شيكل / {listing.priceUnit}
              <br />

              📌 الحالة:
              {listing.status}
              <br />

              📐 المساحة:
              {listing.area || "غير محددة"} متر
              <br />

              🛏 عدد الغرف:
              {listing.rooms || "غير محدد"}
              <br />

              🚿 عدد الحمامات:
              {listing.bathrooms || "غير محدد"}
              <br />

              🏢 الطابق:
              {listing.floor || "غير محدد"}
              <br />

              🛋 مفروش:
              {listing.furnished ? "نعم" : "لا"}
            </p>
          </div>

          <div className="listing-detail-section">
            <h3>الوصف</h3>

            <p className="listing-detail-text">
              {listing.description || "لا يوجد وصف"}
            </p>
          </div>

          <div className="listing-detail-section">
            <h3>معلومات المالك</h3>

            <div className="owner-box">
              <p>الاسم: {listing.owner?.name || "غير معروف"}</p>
              <p>الهاتف: {listing.owner?.phone || "غير متوفر"}</p>

              {
                requested ?
                  <p style={{ color: "green" }}>
                    ✓ تم إرسال طلب التواصل
                  </p>
                  :
                  <button
                    className="contact-btn"
                    onClick={sendRequest}
                  >
                    تواصل مع المالك
                  </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}