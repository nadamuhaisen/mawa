import "../Styles/Button.css";


function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  onClick,
  fullWidth = false,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? "btn--full" : ""}`}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

export default Button;
