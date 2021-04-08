import bcrypt from 'bcrypt';

export const encrypt = async (str: string): Promise<string | null> => {
  try {
    const hash = await bcrypt.hash(str, process.env.SALT);
    return hash;
  } catch (e) {
    return null;
  }
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hash);
    if (match) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
