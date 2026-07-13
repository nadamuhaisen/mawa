import {useState} from "react";
import {useNavigate} from "react-router-dom";// مكتبة جاهزة  بتخلينا نوجه المستخدم من صفحة ل صفحة حسب دوره
import {signupRequest} from "../services/authService.js";// بترسل البيانات  للسيرفر "الباك"

const TOTAL_STEPS = 3;

export default function Signup() {
    //جمعت الحقول ب state واحد عشان اسهل عملية التحديث
    const [form , setForm] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "renter"
    });
    const [step , setStep] = useState(1);
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

    function updateForm(fieldName , value){
        // عشان نحدث الحقول بدون ما نمسح القيم القديمة
        setForm(prevForm =>({
            ...prevForm,
            [fieldName] : value// فقط بنبدل الحقل اللي بدنا نحدثه
        }));
    }
    async function handelNextStep(e){
        e.preventDefault();

        if(step < TOTAL_STEPS){
            setStep(step +1);
            return;
        }

          if (form.password !== form.confirmPassword) {
              setError("كلمتا المرور مش متطابقتين");
                  return; 
  }


        setError("");
        setLoading(true);
       
        try{
            const user = await signupRequest(form);  
            navigate(`/dashboard/${user.role}`);
        }catch(err){
            setError("حدث خطأ , تأكد ان رقم الهاتف غير مسجل مسبقاً")
        }
        finally{
            setLoading(false);
        }
    }
    function handelBackStep(){
        if(step > 1){
            setStep(step -1);
        }
    }
       
    return (
         <form onSubmit={handelNextStep}>
      <p>الخطوة {step} من {TOTAL_STEPS}</p>

      {step === 1 && (
        <>
          <input value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="الاسم الكامل" />
          <input value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="رقم الهاتف" />
        </>
      )}

      {step === 2 && (
        <>
          <input value={form.password} onChange={(e) => updateForm('password', e.target.value)} type="password" placeholder="كلمة المرور" />
          <input value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} type="password" placeholder="تأكيد كلمة المرور" />
        </>
      )}

{step === 3 && (
  <div>
    <p>أنا:</p>
    <button type="button" onClick={() => updateForm('role', 'renter')}>
      بدوّر على مأوى (مستأجر)
    </button>
    <button type="button" onClick={() => updateForm('role', 'owner')}>
      عندي عقار (مالك)
    </button>
    <p>اخترتي: {form.role === 'renter' ? 'مستأجر' : 'مالك عقار'}</p>
  </div>
)}
      {error && <p>{error}</p>}

      {step > 1 && <button type="button" onClick={handelBackStep}>رجوع</button>}

      <button type="submit" disabled={loading}>
        {step < TOTAL_STEPS ? 'التالي' : loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
      </button>
    </form>
  )
}