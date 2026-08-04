import "../Styles/OwnerDashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { getOwnerNavItems } from "../data/ownerNavItems.jsx";
import { getOwnerListings, getOwnerRequests } from "../services/listingService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function loadDashboardData(){
      try {
        const ownerListings = await getOwnerListings();
        const ownerRequests = await getOwnerRequests();

        setListings(ownerListings);
        setRequests(ownerRequests);
        console.log("Owner listings:", ownerListings);
        console.log("Owner requests:", ownerRequests);
      } catch(err){
        console.log(err);
        setError("حدث خطأ أثناء تحميل بيانات لوحة التحكم");
      }
      finally{
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);
  const approvedListings =
    listings.filter( item => item.status === "approved").length;

  const pendingRequests =
    requests.filter( item => item.status === "pending").length;

  if(loading){
    return <p>جاري تحميل البيانات...</p>
  }

  return (
    <div className="owner-dash">
      <Sidebar
        title="لوحة المالك"
        items={getOwnerNavItems('/owner/dashboard')}
      />

      <main className="owner-dash__content">
        <header className="owner-dash__header">
          <div>
            <h1> أهلاً يا {user?.name || "مالك العقار"} 👋</h1>
            <p> هذه لوحة التحكم الخاصة بك لإدارة عقاراتك</p>
          </div>
<Button variant="primary"  onClick={() => navigate("/owner/listings/new")}>+ إضافة عقار</Button>     
   </header>
        <section className="owner-dash__stats">

        <StatCard label="العقارات المسجلة"value={listings.length}tone="green"/>
        <StatCard label="العقارات المقبولة"value={approvedListings}tone="gold"/>
        <StatCard label="طلبات التواصل"value={pendingRequests}tone="green"/>
        <StatCard label="إجمالي الطلبات"value={requests.length}tone="muted"/>
        
        </section>
       
        <section>
          <h2> طلبات التواصل الأخيرة</h2>
          {
            requests.length === 0 ?
            ( <p> لا يوجد طلبات تواصل حالياً</p>): requests.map(request => (
              <div key={request._id}>
                <h4>{request.renter?.name}</h4>
                <p>{request.message}</p>
              </div>
            ))
          }
        </section>
      </main>
    </div>
  );
}