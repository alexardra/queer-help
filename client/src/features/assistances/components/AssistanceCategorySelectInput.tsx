import { ChangeEvent } from 'react';
import { AssistanceCategory } from '../api';

type Props = {
  onChange: (value: AssistanceCategory) => void;
  value?: number;
  required?: boolean;
  disabled?: boolean;
};

type AssistanceCagetoryOptionType =
  | 'Doctor consultation'
  | 'Legal consultation'
  | 'Financial advise'
  | 'Technical support'
  | 'Educational advise'
  | 'Help with specific item';

// todo: fix
const AssistanceCategoryOptions = {
  'Doctor consultation': AssistanceCategory.DOCTOR_CONSULTATION,
  'Legal consultation': AssistanceCategory.LEGAL_CONSULTATION,
  'Financial advise': AssistanceCategory.FINANCIAL_ADVISE,
  'Technical support': AssistanceCategory.TECHNICAL_SUPPORT,
  'Educational advise': AssistanceCategory.EDUCATIONAL_ADVISE,
  'Help with specific item': AssistanceCategory.HELP_WITH_SPECIFIC_ITEM,
};

// whats not to like about this code? -_-
export const AssistanceCategorySelectInput: React.FC<Props> = (
  props: Props,
) => {
  const selected = props.value
    ? Object.keys(AssistanceCategoryOptions).find(
        (option) =>
          AssistanceCategoryOptions[option as AssistanceCagetoryOptionType] ===
          props.value,
      )
    : undefined;

  return (
    <div className="flex flex-col items-start gap-y-1">
      <label
        htmlFor="category"
        className="block text-sm font-bold text-gray-700"
      >
        Category
      </label>
      {/* todo: add hint here */}
      <select
        id="category"
        name="category"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        disabled={props.disabled}
        required={props.required}
        value={selected}
        onChange={(e: ChangeEvent) => {
          const selectedCategory = (e.target as HTMLTextAreaElement)
            .value as AssistanceCagetoryOptionType;
          props.onChange(AssistanceCategoryOptions[selectedCategory]);
        }}
      >
        {props.value === undefined && <option />}
        {Object.keys(AssistanceCategoryOptions).map((key) => (
          <option key={`category-${key}`}>{key}</option>
        ))}
      </select>
    </div>
  );
};
