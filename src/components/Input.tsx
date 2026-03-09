import type { InputProps } from "../types/User";

const Input = ({ label, required = true, ...rest }: InputProps) => {
  return (
    <div>
      <label>{label} </label>
      <input
        required={required}
        {...rest}
      />
    </div>
  );
};

export default Input;