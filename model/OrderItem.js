const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const { Schema } = mongoose;

//스키마의 역활은 단순 작업지시서(설계도면같은것)
const orderItemSchema = Schema(
  {
    shipTo: {
      type: Object,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: User,
    },
    status: {
      type: String,
      default: 'preparing',
    },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, default: 1 },
        size: { type: String, required: true },
      },
    ],
    oderNum: {
      type: String,
    },
  },
  { timestamps: true }
);

orderItemSchema.methods.toJSON = function () {
  //모든 프론트호출에서 password값을 빼고 주기 위한 작업
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;

  return obj;
};

//실제 데이터가 들어가는 곳은 Model
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
