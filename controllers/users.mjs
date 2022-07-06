import jsSHA from 'jssha';

const generateHash = (text) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(`hello${text}goodbye`);
  return shaObj.getHash('HEX');
};

export default function initUsersController(db) {
  const create = async (req, res) => {
    try {
      const {
        email, password, name, bootcamp,
      } = req.body;
      const user = await db.User.create({
        email,
        password: generateHash(password),
        name,
        bootcamp,
      });
      const dataToClient = {
        userId: user.id,
        userName: user.name,
      };
      res.clearCookie('login')
        .clearCookie('userId')
        .clearCookie('userName')
        .clearCookie('bootcamp');
      res.cookie(`login=${generateHash(user.id)};`);
      res.cookie(`userId=${user.id};`);
      res.cookie(`userName=${user.name};`);
      res.cookie(`bootcamp=${user.bootcamp ?? false};`);
      res.send(dataToClient);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const login = async (req, res) => {
    try {
      res.clearCookie('login')
        .clearCookie('userId')
        .clearCookie('userName')
        .clearCookie('bootcamp');

      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });

      // if user doesn't exist:
      if (user === null) { throw new Error('no such email'); }

      // if password is correct:
      else if (user.password === generateHash(password)) {
        const dataToClient = {
          userId: user.id,
          userName: user.name,
        };
        res.cookie(`login=${generateHash(user.id)};`);
        res.cookie(`userId=${user.id};`);
        res.cookie(`userName=${user.name};`);
        res.cookie(`bootcamp=${user.bootcamp === '' ? false : user.bootcamp};`);
        res.send(dataToClient);
      }

      // if user exists but password is incorrect:
      else { throw new Error('wrong password'); }
    } catch (error) {
      console.log(error.message);
      res.send({ errors: error });
    }
  };

  const checkAuth = async (req, res) => {
    try {
      const { userId, loginHash } = req.body;
      console.log(req.body);
      if (generateHash(Number(userId)) === loginHash) {
        const { name } = await db.User.findByPk(userId);
        res.send({ okay: true, userName: name });
      } else {
        res.clearCookie('login')
          .clearCookie('userId')
          .clearCookie('userName')
          .clearCookie('bootcamp')
          .send(false);
      }
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const logout = async (req, res) => {
    try {
      res.clearCookie('login')
        .clearCookie('userId')
        .clearCookie('userName')
        .clearCookie('bootcamp');

      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.send({ errors: error });
    }
  };

  return {
    create,
    login,
    checkAuth,
    logout,
  };
}
