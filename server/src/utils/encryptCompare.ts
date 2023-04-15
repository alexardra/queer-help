import bcrypt from 'bcryptjs';

export default async function (data: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(data, hash);
}
