import Sidebar from "../components/Sidebar";
import { getAdminNavItems } from "../data/adminNavItems";
import "../Styles/AdminDashboard.css";

export default function AdminUsers() {
  return (
    <div className="admin-dash">
      <Sidebar
        title="لوحة الإدارة"
        items={getAdminNavItems("/admin/users")}
      />

      <main className="admin-dash__content">
        <div className="admin-dash__header">
          <div>
            <h1>المستخدمون</h1>
            <p>إدارة جميع مستخدمي منصة مأوى</p>
          </div>
        </div>

        <div className="admin-dash__list">
          <p className="empty">
            سيتم عرض جميع المستخدمين هنا
          </p>
        </div>
      </main>
    </div>
  );
}