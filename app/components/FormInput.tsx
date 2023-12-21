interface Props {
  id: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email";
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

const FormInput = ({
  id,
  value,
  className = "",
  onChange,
  type = "text",
  required = true,
  readOnly = false,
  placeholder = "",
}: Props) => {
  return (
    <input
      id={id}
      className={`input ${
        readOnly ? "input-ghost" : "input-bordered"
      } w-full ${className}`}
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
      type={type}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
