import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
