import { Button } from '@/components/Button';
import { AsistanceCategoryMap, Assistance } from '../api';
import { Link } from 'react-router-dom';

type Props = {
  assistance: Assistance;
};

export const AssistanceCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
      <div className="flex w-4/5 flex-col gap-y-2">
        <h3 className="m-0 text-base font-bold">{props.assistance.title}</h3>
        <div className="flex items-center justify-start">
          <div className="inline-flex rounded-lg border border-gray-200 px-2">
            {AsistanceCategoryMap[props.assistance.category]}
          </div>
        </div>
        <div className="overflow-hidden text-sm tracking-tight">
          <p className="font-normal text-gray-700">
            {props.assistance.description}
          </p>
        </div>
      </div>
      <div className="flex w-1/5 items-start justify-end">
        <Link to={`/user/chat/create/${props.assistance.id}`}>
          <Button>Get in touch</Button>
        </Link>
        {/* </Link> */}
      </div>
    </div>
  );
};
