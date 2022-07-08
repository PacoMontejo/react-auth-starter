import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res) => {
    console.log('req.headers', req.headers);
    const { authorization } = req.headers;

    console.log('req.params', req.params);
    const { userId } = req.params;

    console.log('req.body', req.body);

    // const updates = ({ favoriteFood, hairColor, bio }) =>
    //   ({ favoriteFood, hairColor, bio }(req.body));

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    // const updates = ({ favoriteFood, hairColor, bio } = req.body)

    console.log('updates', updates);

    if (!authorization) {
      return res
        .status(401)
        .json({ msg: 'No authorization header sent' });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err)
          return res
            .status(401)
            .json({ msg: 'Unable to verify token' });

        console.log('decoded', decoded);
        const { id } = decoded;

        if (id !== userId)
          return res.status(403).json({
            msg: "Not allowed to update that user's data",
          });

        const db = getDbConnection('react-auth-db');
        const result = await db
          .collection('users')
          .findOneAndUpdate(
            {
              _id: ObjectID(id),
            },
            { $set: { info: updates } },
            { returnOriginal: false }
          );

        console.log('result', result);

        const { email, isVerified, info } = result.value;

        jwt.sign(
          { id, email, isVerified, info },
          process.env.JWT_SECRET,
          { expiresIn: '100d' },
          (err, token) => {
            if (err) {
              return res.status(200).json(err);
            }
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
