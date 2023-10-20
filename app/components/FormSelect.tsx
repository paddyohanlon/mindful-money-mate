interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const FormSelect = ({ id, options, value, onChange }: Props) => {
  return (
    <select
      id={id}
      className="select select-bordered"
      value={value}
      onChange={(event) => onChange && onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
