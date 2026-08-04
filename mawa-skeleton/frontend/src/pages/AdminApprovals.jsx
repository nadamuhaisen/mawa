import { useEffect, useState } from "react";
import {
  getPendingListings,
  updateListingStatus
} from "../services/listingService";

import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import { getAdminNavItems } from "../data/adminNavItems";

import "../Styles/OwnerPages.css";

export default function AdminApprovals() {

  const [listings, setListings] = useState([]);

  async function loadListings() {
    try {
      const data = await getPendingListings();
      setListings(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadListings();
  }, []);

  async function changeStatus(id, status) {
    try {
      await updateListingStatus(id, status);
      loadListings();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="owner-dash">

      <Sidebar
        title="لوحة الإدارة"
        items={getAdminNavItems("/admin/approvals")}
      />

      <main className="owner-dash__content">

        <div className="owner-page__header">
          <h1>طلبات الموافقة</h1>
          <BackButton />
        </div>

        <div className="listing-grid">

          {listings.length === 0 ? (
            <p>لا توجد طلبات معلقة.</p>
          ) : (
            listings.map((listing) => (
              <div className="listing-card" key={listing._id}>

                <h3>{listing.title}</h3>

                <p><strong>النوع:</strong> {listing.type}</p>
                <p><strong>الموقع:</strong> {listing.location}</p>
                <p><strong>السعر:</strong> {listing.price} شيكل</p>
                <p><strong>المالك:</strong> {listing.owner?.name}</p>
                <p><strong>الهاتف:</strong> {listing.owner?.phone}</p>

                <div className="listing-actions">

                  <button
                    className="edit-btn"
                    onClick={() => changeStatus(listing._id, "approved")}
                  >
                    قبول
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => changeStatus(listing._id, "rejected")}
                  >
                    رفض
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}