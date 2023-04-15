import { IAdmin, IAdminDto } from 'interfaces/personas';

export default class AdminMapper {
  static toDTO(admin: IAdmin) {
    const adminDto = {} as IAdminDto;

    adminDto.id = admin._id;
    adminDto.email = admin.email;
    adminDto.firstname = admin.firstname;
    adminDto.lastname = admin.lastname;

    return adminDto;
  }
}
