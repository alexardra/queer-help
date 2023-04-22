import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { StatusCodes } from 'http-status-codes';
import { ProtectedRequest } from '@/interfaces/express';
import ChatService from '@/services/chat';
import ChatModel from '@/models/Chat';
import MessageModel from '@/models/Message';
import AssistanceModel from '@/models/Assistance';
import AssistanceService from '@/services/assistance';

const route = Router();

export default (app: Router) => {
  app.use('/chats', route);

  const chatService = new ChatService(ChatModel, MessageModel);
  const assistanceService = new AssistanceService(AssistanceModel);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.isVerifiedUser,
    middlewares.attachUser,
    middlewares.validator(middlewares.Resource.CHAT),
    async (req: Request, res: Response) => {
      const senderId = (<ProtectedRequest>req).persona._id;
      const { assistanceId, message } = req.body;
      const assistance = await assistanceService.getAssistance(assistanceId);

      const chat = await chatService.createChat(
        senderId,
        assistance.authorId.toString(),
        message,
      );
      res.status(StatusCodes.CREATED).json({ chat });
    },
  );

  route.get(
    '/',
    middlewares.isAuth,
    middlewares.isVerifiedUser,
    middlewares.attachUser,
    async (req: Request, res: Response) => {
      const personaId = (<ProtectedRequest>req).persona._id;
      const chats = await chatService.getUserChats(personaId);

      res.status(StatusCodes.OK).json({
        chats,
        count: chats.length,
      });
    },
  );
};
