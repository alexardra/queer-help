import { Assistance } from '../api';
import { AssistanceCategoryBadge } from './AssistanceCategoryBadge';

export const AssistanceDetails = ({
  assistance,
}: {
  assistance: Assistance;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-3">
        <h3 className="m-0 text-base font-bold">{assistance.title}</h3>
        <AssistanceCategoryBadge category={assistance.category} />
      </div>
      <div className="overflow-hidden text-sm tracking-tight">
        <p className="font-normal text-gray-700">{assistance.description}</p>
      </div>
    </div>
  );
};
