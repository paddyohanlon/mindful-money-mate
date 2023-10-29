import { Option } from "../types";

interface Props {
  id: string;
  options: Option[];
  value?: string;
  defaultLabel?: string;
  onChange?: (value: string) => void;
}

const FormSelect = ({
  id,
  options,
  value,
  defaultLabel = "Choose an option",
  onChange,
}: Props) => {
  return (
    <select
      id={id}
      className="select select-bordered"
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
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
