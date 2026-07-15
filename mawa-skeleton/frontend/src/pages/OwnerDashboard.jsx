import { useEffect , useState } from "react";
import {useNavigate} from "react-router-dom";// مكتبة جاهزة  بتخلينا نوجه المستخدم من صفحة ل صفحة حسب دوره
import { getMyListings, getRequestsForMyListings } from '../services/userService.js'

export default function OwnerDashboard(){
    //نبني ال states ونخزن البيانات الي جاية من السيرفر 
    const [listings , setListings] = useState([]);
    const [requests , setRequests] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");

    const navigate = useNavigate();

    useEffect (()=>{
        async function loadDashboardData (){
            try {
                const [myListings , myRequests] = await Promise.all([
                    getMyListings(),
                    getRequestsForMyListings()
                ]); 
                setListings(myListings);
                setRequests(myRequests);

            }catch(err){
                 setError('صار خطأ بجلب بياناتك، حاولي تحدّثي الصفحة')
            }finally{
                setLoading(false);
            }
        }
        loadDashboardData()
    },[]);

  const activeListingsCount = listings.filter((l) => l.status === 'approved').length
  const pandingRequestsCount = requests.filter((r) => r.status === 'pending').length

// لما نضغط على زر "اضافة عقار" بنوجهو للصفحة 
  function handleAddListing (){
    navigate('/listings/new')
  }
  if(loading){
    return <p>جاري تحميل بياناتك...</p>
  }
  if(error){
    return <p>{error}</p>
  }
  return(
    
    <div>
        <button onClick={handleAddListing}>اضافة عقار</button>
        <div>
            <p>{listings.length}: عقارات مسجلة</p>
            <p>{activeListingsCount}: عقارات مؤخرة\موافق عليها</p>
            <p>{pandingRequestsCount}: طلبات جديدة</p>
        </div>
        <h3>طلبات التواصل الاخيرة</h3>
        
        {requests.length === 0 && <p>ما في طلبات لسا</p>}
        {requests.map((r) => (
        <div key={r._id}>
          <p>{r.renter?.name} — {r.listing?.title}</p>
          <p>الحالة: {r.status}</p>
        </div>
      ))}

    </div>
  )
}