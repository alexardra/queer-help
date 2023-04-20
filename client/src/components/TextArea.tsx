import { ChangeEvent } from 'react';

export type TextAreaProps = {
  id?: string;
  name?: string;
  label?: string;
  rows?: number;
  cols?: number;

  required?: boolean;
  disabled?: boolean;
  placeholder?: string;

  value?: string;
  onChange: (value: string) => void;
};

export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  const rows = props.rows ?? 4;
  const cols = props.cols ?? 50;

  return (
    <div className="flex flex-col items-start gap-y-1">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-bold text-gray-700"
        >
          {props.label}
        </label>
      )}
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id={props.id}
        name={props.name}
        value={props.value}
        rows={rows}
        cols={cols}
        onChange={(e: ChangeEvent) => {
          props.onChange((e.target as HTMLTextAreaElement).value);
        }}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
      />
    </div>
  );
};
