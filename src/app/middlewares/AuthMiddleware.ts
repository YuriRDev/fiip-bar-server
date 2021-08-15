import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken'
import secret from '../../secret'

interface TokenPayload {
  id: string,
  iat: number,
  exp: number;
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ error: 'Missing authorization!' })
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, secret)
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.status(403).json({ error: 'Invalid Token!' })
  }
}