import * as bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  return bcryptjs.hash(password, salt);
}

export async function comparePasswords(plainText: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(plainText, hashedPassword);
}