import api from "./api.js";
//عقارات المالك
export async function getMyListings (){
    const {data} = await api.get('/users/me/listings');
    return data;

}
// طلبات التواصل الي جاية لعقارات المالك
export async function getRequestsForMyListings (){
    const {data} = await api.get('/users/me/listing-requests');
    return data;
}
//طلبات المستاجر نفسه
export async function getMyRequests() {
  const { data } = await api.get('/users/me/requests')
  return data
}
