import bcrypt from 'bcryptjs';

export default async function (
  data: string,
  config?: { rounds: number },
): Promise<string> {
  const salt = await bcrypt.genSalt(config?.rounds);
  return await bcrypt.hash(data, salt);
}
