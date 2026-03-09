interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
label?: string;
}

const Button = ({ label, children, ...rest}: ButtonProps) => {
  return (
    <button {...rest}>
      {label || children}
    </button>
  );
};

export default Button;