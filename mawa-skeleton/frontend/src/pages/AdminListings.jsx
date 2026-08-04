import Sidebar from "../components/Sidebar";
import { getAdminNavItems } from "../data/adminNavItems";
import "../Styles/AdminDashboard.css";

export default function AdminListings() {
  return (
    <div className="admin-dash">
      <Sidebar
        title="لوحة الإدارة"
        items={getAdminNavItems("/admin/listings")}
      />

      <main className="admin-dash__content">
        <div className="admin-dash__header">
          <div>
            <h1>العقارات</h1>
            <p>عرض جميع العقارات الموجودة بالنظام</p>
          </div>
        </div>

        <div className="admin-dash__list">
          <p className="empty">
            سيتم عرض جميع العقارات هنا
          </p>
        </div>
      </main>
    </div>
  );
}