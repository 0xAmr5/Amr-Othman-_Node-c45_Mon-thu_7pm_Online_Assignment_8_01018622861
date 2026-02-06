import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
};