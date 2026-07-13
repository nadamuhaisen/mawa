// login page:
import {useState} from "react";
import {useNavigate } from "react";
import {loginRequest } from "react";

export default function Login(){
//بناء الstates
const [phone , setPhone] = useState("");
const [password , setPassword] = useState("");
const [role , setRole] = useState("renter");
const [error , setError] = useState("");
const [loading , setLoading] = useState(false);


const navigate = useNavigate();

async function handleSubmit(e) {
    e.preventDefault();
}

setError ("")
setLoading(true)

try{
    //عشان نبعت الداتا للباك
    const user = await loginRequest({phone , passwird} , role);
    // لو كلو صح بيوجه المستخدم حسب دوره 
    navigate (`/dashboard/${user.role}`)
}catch(err){
    setError("رقم الهاتف او كلمة المرور خاطئة ")
}
finally{
    setLoading(false);
}


return(
     <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => setRole('renter')}>مستأجر</button>
        <button type="button" onClick={() => setRole('owner')}>مالك عقار</button>
      </div>

      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="رقم الهاتف" />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="كلمة المرور"/>
{error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'جاري الدخول...' : 'دخول'}
      </button>
    </form>
)
}