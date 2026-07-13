// نسخة مؤقتة (Mock) - بترجع بيانات وهمية بدل ما تتصل بسيرفر حقيقي
// لما يخلص الباك إند، منرجع نحط النسخة الحقيقية يلي فيها axios

// بمحاكي تأخير الشبكة الحقيقي (نص ثانية) عشان تجربي شكل الـ loading كمان
function fakeDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function signupRequest(form) {
  await fakeDelay()

  // بمحاكي خطأ لو الهاتف يساوي رقم معيّن، عشان تجربي حالة الفشل كمان
  if (form.phone === '0590000000') {
    throw new Error('رقم الهاتف مسجّل مسبقاً')
  }

  const fakeUser = {
    id: 'fake-id-123',
    name: form.name,
    phone: form.phone,
    role: form.role, // بترجع نفس الدور يلي اخترتيه (renter أو owner)
  }

  localStorage.setItem('mawa_token', 'fake-token-123')
  localStorage.setItem('mawa_user', JSON.stringify(fakeUser))

  return fakeUser
}

export async function loginRequest(credentials, role) {
  await fakeDelay()

  if (credentials.password.length < 6) {
    throw new Error('كلمة المرور غير صحيحة')
  }

  const fakeUser = {
    id: 'fake-id-123',
    name: 'مستخدم تجريبي',
    phone: credentials.phone,
    role,
  }

  localStorage.setItem('mawa_token', 'fake-token-123')
  localStorage.setItem('mawa_user', JSON.stringify(fakeUser))

  return fakeUser
}

export function logoutRequest() {
  localStorage.removeItem('mawa_token')
  localStorage.removeItem('mawa_user')
}

export function getCurrentUser() {
  const stored = localStorage.getItem('mawa_user')
  return stored ? JSON.parse(stored) : null
}
