import User from '../models/userModel';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const ROUNDS = 10;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = req.body;
      const userCreated = await User.create ({
        email: user.email,
        name: user.name,
        password: bcrypt.hashSync (user.password, ROUNDS),
      });

      userCreated
        ? res.status (201).send ({message: 'Usuário criado'})
        : res.status (500).send ({error: 'Falha ao criar usuário'});
    } catch (error) {
      console.error (error);
      res.status (500).json ({message: 'Não foi possivel cadastrar o usuário'});
    }
  },
  signin: async (req, res) => {
    try {
      const {email, password} = req.body;

      User.findOne ({email}, async (err, user) => {
        console.log (user);
        if (user) {
          const isValidPassword = bcrypt.compareSync (password, user.password);

          const jwtToken = await jwt.sign (
            {
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
              },
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '30 days',
            }
          );
          console.log (isValidPassword);
          isValidPassword
            ? res.status (200).json ({jwtToken})
            : res.status (401).json ({message: 'Email ou senha inválidos'});
        } else {
          res.status (401).json ({message: 'Email ou senha inválidos'});
        }
      });
    } catch (error) {
      console.error (error);
      res
        .send (500)
        .json ({message: 'Não foi possível fazer login do usuário'});
    }
  },
};

export const invalidSigninResponse = (req, res) => {
  console.log ('enviado');
  res.status (401).json ({message: 'Email ou senha inválidos'});
};
