import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  const saltRounds = 10; // Recommended cost factor for bcrypt
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  inputedPassword: string,
  savedPassword: string
): Promise<boolean> => {
  const isValidPassword = await bcrypt.compare(
    inputedPassword /*user inputed pass*/,
    savedPassword /*user encrypted saved pass*/
  );
  if (isValidPassword) {
    return true;
  }
  return false;
};
