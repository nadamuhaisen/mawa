import "../Styles/RoleSWitch.css";
/**
 * Two-way tab used on Login/Signup to pick the account type.
 * value: 'renter' | 'owner'
 */
function RoleSwitch({ value, onChange }) {
  return (
    <div className="role-switch" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'renter'}
        className={`role-switch__tab ${value === 'renter' ? 'is-active' : ''}`}
        onClick={() => onChange('renter')}
      >
        مستأجر
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'owner'}
        className={`role-switch__tab ${value === 'owner' ? 'is-active' : ''}`}
        onClick={() => onChange('owner')}
      >
        مالك عقار
      </button>
    </div>
  );
}

export default RoleSwitch;
