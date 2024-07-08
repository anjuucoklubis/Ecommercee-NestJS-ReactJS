// export const jwtSecret = process.env.JWT_SECRET;

import * as dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;
console.log('JWT_SECRET from constants:', jwtSecret);
