import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { TextArea } from '@/components/TextArea';
import {
  AsistanceCategoryMap,
  fetchAssistance,
} from '@/features/assistances/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chat, createChat } from '../api';

export const ChatCreate = () => {
  const navigate = useNavigate();
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
    onSuccess: (chat: Chat) => {
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
    <div className="mt-10 flex w-full justify-center">
      <div className="w-full px-5">
        <div className="hover:bg-gray-10 flex cursor-pointer flex-col gap-y-3 rounded-lg border border-gray-200 bg-white p-5 shadow">
          <h3 className="m-0 text-base font-bold">{assistance.title}</h3>
          <div className="flex items-center justify-start">
            <div className="inline-flex rounded-lg border border-gray-200 px-2">
              {AsistanceCategoryMap[assistance.category]}
            </div>
          </div>
          <div className="overflow-hidden text-sm tracking-tight">
            <p className="font-normal text-gray-700">
              {assistance.description}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 border-t-2">
            <div className="text-sm">
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
    </div>
  );
};
