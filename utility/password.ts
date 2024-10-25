import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (
  password: string
): Promise<string> => {
  const saltRounds = 10; // Recommended cost factor for bcrypt
  return await bcrypt.hash(password, saltRounds);
};
