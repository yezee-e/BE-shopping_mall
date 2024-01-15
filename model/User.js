const mongoose = require('mongoose');
const { Schema } = mongoose;

//스키마의 역활은 단순 작업지시서(설계도면같은것)
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: {
      type: String,
      default: 'customer', //2types:customer,admin
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  //모든 프론트호출에서 password값을 빼고 주기 위한 작업
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;

  return obj;
};

//실제 데이터가 들어가는 곳은 Model
const User = mongoose.model('User', userSchema);

module.exports = User;
