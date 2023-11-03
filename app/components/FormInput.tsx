interface Props {
  id: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email";
  required?: boolean;
  readOnly?: boolean;
}

const FormInput = ({
  id,
  value,
  className = "",
  onChange,
  type = "text",
  required = true,
  readOnly = false,
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
    />
  );
};

export default FormInput;
