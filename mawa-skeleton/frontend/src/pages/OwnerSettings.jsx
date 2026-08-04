import BackButton from "../components/BackButton";
import "../Styles/OwnerPages.css";
export default function OwnerSettings(){
return (
<div className="owner-page">
<div className="owner-page__header">
<h1>الإعدادات</h1>
<BackButton/>
</div>
<div className="owner-page__card">
<p>
تعديل بيانات الحساب قريباً
</p>
</div>
</div>
)
}