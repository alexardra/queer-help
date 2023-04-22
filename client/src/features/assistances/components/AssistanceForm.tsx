import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { AssistanceCategory, createAssistance } from '../api';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { AssistanceCategorySelectInput } from './AssistanceCategorySelectInput';
import { Button } from '@/components/Button';

type Props = {
  onSuccess: () => void;
};

export const AssistanceForm: React.FC<Props> = ({ onSuccess }: Props) => {
  const [assistance, setAssistance] = useState<{
    category: AssistanceCategory | undefined;
    title: string;
    description: string;
  }>({
    category: undefined,
    title: '',
    description: '',
  });

  const useCreateAssistance = useMutation({
    mutationFn: createAssistance,
    onSuccess: onSuccess,
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          if (assistance.category === undefined) return;

          useCreateAssistance.mutate({
            ...assistance,
            category: assistance.category,
          });
        }}
      >
        <AssistanceCategorySelectInput
          required
          disabled={useCreateAssistance.isLoading}
          value={assistance.category}
          onChange={(value: AssistanceCategory) => {
            setAssistance((prevState) => ({ ...prevState, category: value }));
          }}
        />
        <Input
          label="Title"
          type={'text'}
          required
          disabled={useCreateAssistance.isLoading}
          value={assistance.title}
          onChange={(value: string) => {
            setAssistance((prevState) => ({ ...prevState, title: value }));
          }}
        />
        <TextArea
          label="Description"
          required
          disabled={useCreateAssistance.isLoading}
          value={assistance.description}
          onChange={(value: string) => {
            setAssistance((prevState) => ({
              ...prevState,
              description: value,
            }));
          }}
        />
        <Button
          type="submit"
          disabled={useCreateAssistance.isLoading}
          isLoading={useCreateAssistance.isLoading}
        >
          Create
        </Button>
      </form>
    </div>
  );
};
