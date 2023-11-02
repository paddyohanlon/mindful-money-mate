interface Props {
  id: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email";
  required?: boolean;
}

const FormInput = ({
  id,
  value,
  className = "",
  onChange,
  type = "text",
  required = true,
}: Props) => {
  return (
    <input
      id={id}
      className={`input input-bordered w-full ${className}`}
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
      type={type}
      required={required}
    />
  );
};

export default FormInput;
