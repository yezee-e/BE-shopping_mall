const User = require('../model/User');
const bcrypt = require('bcryptjs');

const userController = {};

//createUser:회원가입 기능
userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body; //프론트로부터 회원가입시, email,password,name을 받는다
    const user = await User.findOne({ email });
    if (user) {
      //이메일로 이미 가입된 유저인지 아닌지 판별한다
      throw new Error('User already exist');
    }
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : 'customer',
    });
    await newUser.save(); //비밀번호가 바뀐 유저로 저장
    res.status(200).json({ status: 'createUser success', newUser });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = userController;
