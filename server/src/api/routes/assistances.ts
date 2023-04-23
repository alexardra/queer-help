import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProtectedRequest } from '@/interfaces/express';
import middlewares from '../middlewares';
import AssistanceService from '@/services/assistance';
import AssistanceModel from '@/models/Assistance';
import AssistanceMapper from '@/mappers/assistance';

const route = Router();

export default (app: Router) => {
  app.use('/assistances', route);

  const assistanceService = new AssistanceService(AssistanceModel);

  route.get(
    '/',
    middlewares.isAuth,
    middlewares.attachPersona,
    async (req: Request, res: Response) => {
      const persona = (<ProtectedRequest>req).persona;
      const assistances = await assistanceService.getAssistances();

      return res.status(StatusCodes.OK).json({
        assistances: assistances.map((a) =>
          AssistanceMapper.toDTO(a, persona._id),
        ),
        count: assistances.length,
      });
    },
  );

  route.get(
    '/:id',
    middlewares.isAuth,
    middlewares.attachPersona,
    async (req: Request, res: Response) => {
      const persona = (<ProtectedRequest>req).persona;

      const assistance = await assistanceService.getAssistance(req.params.id);

      return res
        .status(StatusCodes.OK)
        .json({ assistance: AssistanceMapper.toDTO(assistance, persona._id) });
    },
  );

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.attachPersona,
    middlewares.validator(middlewares.Resource.ASSISTANCE),
    async (req: Request, res: Response) => {
      const persona = (<ProtectedRequest>req).persona;

      const assistance = await assistanceService.createAssistance(
        persona._id,
        req.body,
      );
      return res
        .status(StatusCodes.CREATED)
        .json({ assistance: AssistanceMapper.toDTO(assistance, persona._id) });
    },
  );
};
