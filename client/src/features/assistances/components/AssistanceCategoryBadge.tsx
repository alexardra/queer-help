import { classList } from '@/utils';
import { AssistanceCategory } from '../api';

const CategoryNames = {
  [AssistanceCategory.DOCTOR_CONSULTATION]: 'Doctor consultation',
  [AssistanceCategory.LEGAL_CONSULTATION]: 'Legal consultation',
  [AssistanceCategory.FINANCIAL_ADVISE]: 'Financial advise',
  [AssistanceCategory.TECHNICAL_SUPPORT]: 'Technical support',
  [AssistanceCategory.EDUCATIONAL_ADVISE]: 'Educational advise',
  [AssistanceCategory.HELP_WITH_SPECIFIC_ITEM]: 'Help with specific item',
};

const CategoryColors = {
  [AssistanceCategory.DOCTOR_CONSULTATION]:
    'bg-purple-100 text-purple-500 border-purple-300',
  [AssistanceCategory.LEGAL_CONSULTATION]:
    'bg-pink-100 text-pink-500 border-pink-300',
  [AssistanceCategory.FINANCIAL_ADVISE]:
    'bg-fuchsia-100 text-fuchsia-500 border-fuchsia-300',
  [AssistanceCategory.TECHNICAL_SUPPORT]:
    'bg-emerald-100 text-emerald-500 border-emerald-300',
  [AssistanceCategory.EDUCATIONAL_ADVISE]:
    'bg-amber-100 text-amber-500 border-amber-300',
  [AssistanceCategory.HELP_WITH_SPECIFIC_ITEM]:
    'bg-yellow-100 text-yellow-500 border-yellow-300',
};

export const AssistanceCategoryBadge = ({
  category,
}: {
  category: AssistanceCategory;
}) => {
  return (
    <div
      className={classList(
        'inline-flex rounded-lg border px-2',
        CategoryColors[category],
      )}
    >
      {CategoryNames[category]}
    </div>
  );
};
