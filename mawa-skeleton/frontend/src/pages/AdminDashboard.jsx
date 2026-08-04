import "../Styles/AdminDashboard.css";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import {
  getPendingListings,
  updateListingStatus
} from "../services/listingService";

import { getAdminNavItems } from "../data/adminNavItems.jsx";
import { useAuth } from "../context/AuthContext";
import { getAdminStats } from "../services/dminService.js";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    usersCount: 0,
    activeListings: 0,
    pendingListings: 0
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getAdminStats();

      setStats(data);
    }

    loadStats();
  }, []);

  const [pendingListings, setPendingListings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getPendingListings();

      setPendingListings(data);

    } catch (err) {
      setError("حدث خطأ أثناء تحميل البيانات");

    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    await updateListingStatus(
      id,
      "approved"
    );

    load();
  }

  async function reject(id) {
    await updateListingStatus(
      id,
      "rejected"
    );

    load();
  }

  if (loading) {
    return <p>جاري تحميل البيانات...</p>;
  }

  return (
    <div className="admin-dash">

      <Sidebar
        title="لوحة الإدارة"
        items={getAdminNavItems("/admin/dashboard")}
      />

      <main className="admin-dash__content">

        <header className="admin-dash__header">

          <div>

            <h1>
              أهلاً يا {user?.name}
            </h1>

            <p>
              إدارة العقارات والمستخدمين
            </p>

          </div>

        </header>

        <section className="admin-dash__stats">

          <StatCard
            label="مستخدمون مسجّلون"
            value={stats.usersCount}
          />

          <StatCard
            label="عقارات نشطة"
            value={stats.activeListings}
          />

          <StatCard
            label="طلبات معلّقة"
            value={stats.pendingListings}
            valueColor="text-gold"
          />

        </section>

        <section>

          <h2 className="admin-dash__section-title">
            العقارات بانتظار الموافقة
          </h2>

          <div className="admin-dash__list">

            {
              pendingListings.length === 0 ?

                <p className="empty">
                  لا يوجد طلبات حالياً
                </p>

                :

                pendingListings.map(item => (

                  <div
                    className="admin-dash__request"
                    key={item._id}
                  >

                    <div>

                      <h3 className="admin-dash__request-title">
                        {item.title}
                      </h3>

                      <p className="admin-dash__request-subtitle">
                        {item.location}
                      </p>

                      <p className="admin-dash__request-subtitle">
                        المالك: {item.owner?.name}
                      </p>

                    </div>

                    <div className="admin-actions">

                      <button
                        className="approve-btn"
                        onClick={() => approve(item._id)}
                      >
                        قبول
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => reject(item._id)}
                      >
                        رفض
                      </button>

                    </div>

                  </div>

                ))
            }

          </div>

        </section>

      </main>

    </div>
  );
}