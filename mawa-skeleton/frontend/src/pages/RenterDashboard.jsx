import {useState , useEffect} from "react";
import { getMyRequests } from "../services/userService.js"; 

export default function RenterDashboard(){
    const [requests , setRequests] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");


useEffect(()=>{
async function loadMyRequests(){
    try{
        const data = await getMyRequests()
        setRequests(data);
    }catch(err){
        setError("حصل خطأ بجلب بياناتك، قم بتحديث الصفحة")
    }finally{
        setLoading(false);
    }
}

loadMyRequests();
},[]);
const confirmedCount = requests.filter((r) => r.status === "confirmed").length;

const upcomingDates = requests
  .filter((r) => r.status === "confirmed" && r.visitDate)// نخلي بس الطلبات المؤكدة يلي الها تايخ معاينة 
  .map((r) => new Date(r.visitDate))// نحول تاريخ المعاينة من نص ل object من نوع Data
  .sort((a, b) => a - b);//نرتبهم من الأقرب تاريخ للأبعد

const nearestVisit = upcomingDates[0];//أول عنصر بعد الترتيب = أقرب موعد قادم


  if (loading) return <p>جاري تحميل طلباتك...</p>
  if (error) return <p>{error}</p>

  return(
    <div>
        <div>
            <p>{requests.length} : مجموع طلباتي</p>
            <p>{confirmedCount} : مجموع طلباتي المؤكدة</p>     
            <p>أقرب موعد معاينة:{' '}
          {nearestVisit ? nearestVisit.toLocaleDateString('ar') : 'ما في موعد قادم'} </p>

        </div>

         <h3>طلباتي</h3>
      {requests.length === 0 && <p>لسا ما طلبتي تواصل مع أي عقار</p>}
      {requests.map((r) => (
        <div key={r._id}>
          <p>{r.listing?.title}</p>
          <p>الحالة: {r.status}</p>
          {r.visitDate && <p>الموعد: {new Date(r.visitDate).toLocaleDateString('ar')}</p>}// بتحول التاريخ لشكل مقروء بالعربي 
        </div>
      ))}
    </div>
  )
}