// -----External module-----//
import { genSalt, hash, compare } from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword) => {
    try {
        const salt = await genSalt(SALT_ROUNDS);
        const hashedPassword = await hash(plainPassword, salt);
        return hashedPassword;
    }
    catch (error) {
        throw (error);
    }
}

export const comparePasswords = async (password, savedHashedPassword) => {
    try {
        return await compare(password, savedHashedPassword);
    }
    catch (error) {
        throw (error);
    }
}



