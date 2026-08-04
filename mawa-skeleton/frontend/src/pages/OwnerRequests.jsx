import { useEffect, useState } from "react";

import {
  getOwnerRequests,
  updateContactStatus
} from "../services/listingService";

import BackButton from "../components/BackButton";
import "../Styles/OwnerPages.css";

export default function OwnerRequests() {
  const [requests, setRequests] = useState([]);

  async function load() {
    const data = await getOwnerRequests();

    setRequests(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(id, status) {
    await updateContactStatus(id, status);

    load();
  }

  return (
    <div className="owner-page">

      <div className="owner-page__header">

        <h1>
          طلبات التواصل
        </h1>

        <BackButton />

      </div>

      <div className="listing-grid">

        {
          requests.length === 0 &&
          <p>
            لا يوجد طلبات حاليا
          </p>
        }

        {
          requests.map(request => (
            <div
              className="listing-card"
              key={request._id}
            >

              <h3>
                {request.listing?.title}
              </h3>

              <p>
                الموقع: {request.listing?.location}
              </p>

              <p>
                من: {request.renter?.name}
              </p>

              <p>
                الايميل: {request.renter?.email}
              </p>

              <p>
                الرسالة: {request.message}
              </p>

              <p>
                الحالة: {request.status}
              </p>

              <div className="listing-actions">

                <button
                  className="edit-btn"
                  onClick={() => changeStatus(request._id, "accepted")}
                >
                  قبول
                </button>

                <button
                  className="delete-btn"
                  onClick={() => changeStatus(request._id, "rejected")}
                >
                  رفض
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}