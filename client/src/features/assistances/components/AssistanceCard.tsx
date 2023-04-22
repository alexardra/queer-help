import { Button } from '@/components/Button';
import { Assistance } from '../api';
import { Link } from 'react-router-dom';
import { AssistanceDetails } from './AssistanceDetails';

type Props = {
  assistance: Assistance;
};

export const AssistanceCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex cursor-pointer rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100">
      <div className="flex w-4/5 flex-col gap-y-2">
        <AssistanceDetails assistance={props.assistance} />
      </div>
      <div className="flex w-1/5 items-start justify-end">
        <Link to={`/user/chat/create/${props.assistance.id}`}>
          <Button>Get in touch</Button>
        </Link>
      </div>
    </div>
  );
};
