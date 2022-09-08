import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const tokenDecode = (req: Request) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const tokenDecoded = <jwt.IDJwtPayload>(
        jwt.verify(bearer, process.env.TOKEN_SECRET_KEY as string)
      );
      return tokenDecoded;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) return res.status(401).json('Unauthorized');
    req.user = user;
    next();
  } else {
    res.status(401).json('Unauthorized');
  }
};

export { tokenDecode, verifyToken };
