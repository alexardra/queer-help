import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { ProtectedRequest } from '@/interfaces/express';
import MessageModel from '@/models/Message';
import { StatusCodes } from 'http-status-codes';
import MessageService from '@/services/message';
import ChatService from '@/services/chat';
import ChatModel from '@/models/Chat';
import { NotFoundError } from '@/errors';

const route = Router();

export default (app: Router) => {
  app.use('/messages', route);

  const chatService = new ChatService(ChatModel, MessageModel);
  const messageService = new MessageService(MessageModel);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.isVerifiedUser,
    middlewares.attachUser,
    middlewares.validator(middlewares.Resource.MESSAGE),
    async (req: Request, res: Response) => {
      const personaId = (<ProtectedRequest>req).persona._id;
      const { chatId, text } = req.body;
      const message = await messageService.createMessage(
        chatId,
        personaId,
        text,
      );
      res.status(StatusCodes.CREATED).json(message);
    },
  );

  route.get(
    '/:chatId',
    middlewares.isAuth,
    middlewares.isVerifiedUser,
    middlewares.attachUser,
    async (req: Request, res: Response) => {
      const personaId = (<ProtectedRequest>req).persona._id;
      const chatId = req.params.chatId;

      if (!chatService.chatExists(chatId, personaId)) {
        throw new NotFoundError('Chat does not exist');
      }

      const messages = await messageService.getMessages(chatId);
      res.status(StatusCodes.OK).json({
        messages,
        count: messages.length,
      });
    },
  );
};
