import { validator, Resource } from './validator';

import { isAuth } from './auth';
import { isAdmin, attachAdmin } from './admin';
import { isVerifiedUser, attachUser } from './user';

export default {
  validator,
  Resource,

  isAuth,
  isAdmin,
  attachAdmin,
  isVerifiedUser,
  attachUser,
};
