interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ type = "button", label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;