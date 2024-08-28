interface RadioProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  required?: boolean
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function RadioInput({ label, name, id, value, required, checked,onChange }: RadioProps) {
  return (
    <>
      <label htmlFor={id || name} className="cursor-pointer label px-0">
        <span className="label-text mr-4">{label}</span>
        <input
          type="radio"
          className="radio radio-primary"
          name={name}
          id={id}
          value={value}
          checked={checked}
          required={required}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default RadioInput;
