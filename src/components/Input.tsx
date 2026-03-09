import type { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ label, type, name, value, onChange, required = true }: InputProps) => {
  return (
    <div>
      <label>{label} </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;