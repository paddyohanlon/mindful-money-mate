interface Props {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email" | "number";
  required?: boolean;
}

const FormInput = ({
  id,
  value,
  onChange,
  type = "text",
  required = true,
}: Props) => {
  return (
    <input
      id={id}
      className="input input-bordered w-full max-w-xs"
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
      type={type}
      required={required}
    />
  );
};

export default FormInput;
