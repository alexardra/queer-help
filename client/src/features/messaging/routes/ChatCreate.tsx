import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { TextArea } from '@/components/TextArea';
import { fetchAssistance } from '@/features/assistances/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chat, createChat } from '../api';
import { AssistanceDetails } from '@/features/assistances/components/AssistanceDetails';

export const ChatCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { assistanceId } = useParams();

  const [message, setMessage] = useState('');

  const {
    data: assistance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['assistances', assistanceId],
    queryFn: () => fetchAssistance(assistanceId ?? ''),
  });

  const useCreateChat = useMutation({
    mutationFn: createChat,
    onSuccess: async (chat: Chat) => {
      await queryClient.invalidateQueries({ queryKey: ['chats'], exact: true });
      navigate(`/user/chat/${chat.id}`);
    },
  });

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-y-4">
        <div className="">
          Oops.. we were not able to locate assistance at the moment. User might
          have taken it down..
        </div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back to the portal
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-y-3">
      <h3 className="flex text-center text-xl font-semibold tracking-wider text-purple-700">
        Reach out to help
      </h3>
      <div className="mx-5 flex w-full max-w-lg flex-col gap-y-4 divide-y-2 rounded bg-white p-8 shadow md:w-1/2">
        <AssistanceDetails assistance={assistance} />
        <div className="flex flex-col gap-y-2 pt-3">
          <div className="text-center text-xs">
            Please write several sentences to introduce yourself and provide
            relevant experience details that might help with this particular
            assistance:
          </div>
          <TextArea
            label=""
            value={message}
            required
            onChange={setMessage}
            disabled={useCreateChat.isLoading}
          />
          <Button
            disabled={useCreateChat.isLoading}
            isLoading={useCreateChat.isLoading}
            onClick={() => {
              useCreateChat.mutate({
                assistanceId: assistance.id,
                message,
              });
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
