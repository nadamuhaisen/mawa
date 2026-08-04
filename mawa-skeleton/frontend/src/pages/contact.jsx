import { useState } from 'react';
import { sendContactMessage } from "../services/contactService.js";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import '../Styles/contact.css';

const CONTACT_INFO = [
  { icon: MapPin, label: 'العنوان', value: 'غزة، فلسطين' },
  { icon: Mail, label: 'البريد الإلكتروني', value: 'info@mawa-gaza.com' },
  { icon: Phone, label: 'الهاتف', value: '+970-599-000000' },
  { icon: Clock, label: 'ساعات العمل', value: 'السبت - الخميس، 9 ص - 5 م' },
];


const initialContactForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};


function Contact() {
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactErrors, setContactErrors] = useState({});
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

 
  const updateContactField = (field) => (e) => {
    setContactForm((prev) => ({ ...prev, [field]: e.target.value }));
  };


  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.fullName.trim()) errors.fullName = 'الرجاء إدخال الاسم الكامل';
    if (!contactForm.email.trim()) {
      errors.email = 'الرجاء إدخال البريد الإلكتروني';
    } else if (!/^\S+@\S+\.\S+$/.test(contactForm.email)) {
      errors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!contactForm.subject.trim()) errors.subject = 'الرجاء إدخال الموضوع';
    if (!contactForm.message.trim()) errors.message = 'الرجاء إدخال الرسالة';
    return errors;
  };

  

const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = validateContactForm();
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await sendContactMessage(contactForm);
      setIsContactSubmitted(true);
      setContactForm(initialContactForm);
    } catch (err) {
      console.log(err);
      setContactErrors({ submit: "صار خطأ، حاولي مرة ثانية" });
    }
};
  return (
    <>

      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <h1 className="contact-hero__title">يسعدنا تواصلك معنا</h1>
          <p className="contact-hero__subtitle">
            عندك سؤال، اقتراح، أو محتاج مساعدة؟ فريق مأوى جاهز يسمعك ويرد عليك بأقرب وقت.
          </p>
        </div>
      </section>

      <section className="section contact-info">
        <div className="container contact-info__grid">
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div className="contact-info-card" key={label}>
              <div className="contact-info-card__icon">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3>{label}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="container contact-form-section__inner">
          <div className="section-heading">
            <h2>راسلنا</h2>
            <p>عبّي الفورم وبنرد عليك أقرب ما يمكن</p>
          </div>

          {isContactSubmitted ? (
            <div className="contact-success">
              <CheckCircle2 size={40} strokeWidth={1.8} />
              <h3>تم إرسال رسالتك بنجاح!</h3>
              <p>وصلتنا رسالتك وفريقنا رح يتواصل معك قريبًا.</p>
              <Button variant="outline" onClick={() => setIsContactSubmitted(false)}>
                إرسال رسالة أخرى
              </Button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="fullName">الاسم الكامل</label>
                  <input
                    id="fullName"
                    className="contact-form__input"
                    value={contactForm.fullName}
                    onChange={updateContactField('fullName')}
                    placeholder="مثال: محمد يوسف"
                  />
                  {contactErrors.fullName && <span className="contact-form__error">{contactErrors.fullName}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input
                    id="email"
                    type="email"
                    className="contact-form__input"
                    value={contactForm.email}
                    onChange={updateContactField('email')}
                    placeholder="email@example.com"
                  />
                  {contactErrors.email && <span className="contact-form__error">{contactErrors.email}</span>}
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="phone">رقم الهاتف (اختياري)</label>
                  <input
                    id="phone"
                    className="contact-form__input"
                    value={contactForm.phone}
                    onChange={updateContactField('phone')}
                    placeholder="059XXXXXXX"
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="subject">الموضوع</label>
                  <input
                    id="subject"
                    className="contact-form__input"
                    value={contactForm.subject}
                    onChange={updateContactField('subject')}
                    placeholder="موضوع رسالتك"
                  />
                  {contactErrors.subject && <span className="contact-form__error">{contactErrors.subject}</span>}
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">الرسالة</label>
                <textarea
                  id="message"
                  className="contact-form__textarea"
                  rows={5}
                  value={contactForm.message}
                  onChange={updateContactField('message')}
                  placeholder="اكتب رسالتك هنا..."
                />
                {contactErrors.message && <span className="contact-form__error">{contactErrors.message}</span>}
              </div>

              <Button type="submit" variant="primary" size="lg" icon={<Send size={17} />}>
                إرسال الرسالة
              </Button>
            </form>
          )}
        </div>
      </section>

   
    </>
  );
}

export default Contact;