import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import { getListings } from '../services/listingService.js'

export default function Listings() {
  const [search,setSearch] = useState('')
  const [listings,setListings] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    async function loadListings(){
      try{
      const data = await getListings()
        setListings(data)
      }catch(err){
      console.log(err)
      }finally{
        setLoading(false)
      }
    }
    loadListings()
  },[])
  const filteredListings = listings.filter((listing)=>{
    const term = search.trim()
    if(!term) return true
    return (
      listing.location.includes(term) ||
      listing.type.includes(term) ||
      listing.title.includes(term)
    )
  })
  if(loading){

    return <p>جاري تحميل العقارات...</p>

  }
  return (
    <div className="bg-bone min-h-screen">
      <div className="px-6 pt-5 pb-2.5">
        <div className="font-heading text-lg font-bold mb-1"> العقارات المتاحة</div>
        <div className="text-[12.5px] text-muted mb-4"> فلتر حسب النوع والمنطقة والسعر.</div>
        <input className="w-full px-3 py-2.5 rounded-lg border border-line text-[13px] mb-4" placeholder="ابحثي عن منطقة أو نوع عقار" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-6 pb-6">
        {
          filteredListings.length === 0 ?
          <p> لا يوجد عقارات حاليا</p>
          :
          filteredListings.map((listing)=>(
            <Link to={`/listings/${listing._id}`} key={listing._id}>
              <Card listing={listing}/>
            </Link>
          ))
        }
      </div>
    </div>
  )
}