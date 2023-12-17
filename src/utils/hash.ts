import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export function generateHash(PlainPassword) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(PlainPassword, salt, 64).toString('hex');
  return `${salt}:${hashedPassword}`
}
export function verifyHash(password, hash) {
  const [salt, key] = hash.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  return timingSafeEqual(hashedBuffer, keyBuffer);
}
