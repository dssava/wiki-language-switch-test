import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set. Check your .env file.`);
  }
  return value;
}

export const env = {
  baseUrl: getEnv('WIKI_BASE_URL'),
  username: getEnv('WIKI_NAME'),
  password: getEnv('WIKI_PASSWORD'),
};
