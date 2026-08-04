import Sidebar from "../components/Sidebar";
import { getAdminNavItems } from "../data/adminNavItems";
import "../Styles/AdminDashboard.css";

export default function AdminSettings() {
  return (
    <div className="admin-dash">
      <Sidebar
        title="لوحة الإدارة"
        items={getAdminNavItems("/admin/settings")}
      />

      <main className="admin-dash__content">
        <div className="admin-dash__header">
          <div>
            <h1>الإعدادات</h1>
            <p>إعدادات لوحة الإدارة</p>
          </div>
        </div>

        <div className="admin-dash__list">
          <p className="empty">
            سيتم إضافة الإعدادات لاحقاً
          </p>
        </div>
      </main>
    </div>
  );
}