import { Star, Quote, ShieldCheck, Users, Building2 } from 'lucide-react';
import '../Styles/Testimonials.css';

const REVIEWS = [
  {
    name: 'محمد أبو ريدة',
    role: 'مستأجر — غزة',
    quote: 'لقيت شقة مناسبة خلال يومين بس، وتواصلت مع صاحب البيت مباشرة بدون أي وسيط. تجربة سهلة كتير.',
  },
  {
    name: 'سارة الأشقر',
    role: 'مالكة عقار — خان يونس',
    quote: 'نشرت إعلان الشقة وخلال أسبوع لقيت مستأجر جاد. المنصة وفرت علي وقت ومجهود كبير.',
  },
  {
    name: 'يوسف النجار',
    role: 'مستأجر — دير البلح',
    quote: 'كل التفاصيل والصور كانت واضحة من البداية، وما اضطريت أعمل جولات كتيرة عالفاضي.',
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, title: 'مراجعة كل الإعلانات', description: 'كل عقار يمر بمراجعة قبل نشره على المنصة.' },
  { icon: Users, title: 'مجتمع محلي حقيقي', description: 'آلاف المستخدمين من كل مناطق قطاع غزة.' },
  { icon: Building2, title: 'شفافية كاملة', description: 'معلومات دقيقة عن كل عقار بدون مفاجآت.' },
];

function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-heading reveal-up">
          <h2>ثقة آلاف المستخدمين</h2>
          <p>هيك بيوصف مستخدمينا تجربتهم مع مأوى</p>
        </div>

        <div className="testimonials__trust">
          {TRUST_POINTS.map(({ icon: Icon, title, description }, index) => (
            <div className={`trust-point reveal-up reveal-delay-${index + 1}`} key={title}>
              <Icon size={20} strokeWidth={2} />
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__grid">
          {REVIEWS.map((review, index) => (
            <div className={`review-card reveal-up reveal-delay-${index + 1}`} key={review.name}>
              <Quote size={26} className="review-card__quote-icon" />
              <div className="review-card__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="review-card__text">{review.quote}</p>
              <div className="review-card__author">
                <div className="review-card__avatar">{review.name[0]}</div>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
