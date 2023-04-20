import { validator, Resource } from './validator';

import { attachPersona, isAuth } from './auth';
import { isAdmin, attachAdmin } from './admin';
import { isVerifiedUser, attachUser } from './user';

export default {
  validator,
  Resource,

  isAuth,
  attachPersona,

  isAdmin,
  attachAdmin,
  isVerifiedUser,
  attachUser,
};
