import bcrypt from 'bcrypt';

export const encrypt = async (str: string): Promise<string | null> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(str, salt);
    return hash;
  } catch (e) {
    console.error(e.message);
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
    console.error(e.message);
    return false;
  }
};
