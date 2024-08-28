interface ToggleProps {
  label: string;
  id: string;
  name: string;
  value?: string | number;
  required?: boolean
  checked: boolean
}

function ToggleInput({ label, name, id, checked }: ToggleProps) {

  return (
    <>
      <label htmlFor={id || name} className="cursor-pointer label">
        <span className="label-text mr-4">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={checked}
        />
      </label>
    </>
  );
}

export default ToggleInput;
