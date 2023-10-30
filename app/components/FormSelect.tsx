import { Option } from "../types";

interface Props {
  id: string;
  options: Option[];
  value?: string;
  defaultLabel?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

const FormSelect = ({
  id,
  options,
  value,
  defaultLabel = "Choose an option",
  onChange,
  required = true,
}: Props) => {
  return (
    <select
      id={id}
      className="select select-bordered"
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
      required={required}
    >
      <option value="" disabled>
        {defaultLabel}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
