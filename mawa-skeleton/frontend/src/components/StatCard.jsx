import '../Styles/StatCard.css';


function StatCard({ label, value, tone = 'green' }) {
  return (
    <div className="stat-card">
      <div className="stat-card__label">{label}</div>
      <div className={`stat-card__value stat-card__value--${tone}`}>{value}</div>
    </div>
  );
}

export default StatCard;
