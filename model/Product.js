const mongoose = require('mongoose');
const { Schema } = mongoose;

//스키마의 역활은 단순 작업지시서(설계도면같은것)
const productSchema = Schema(
  {
    sku: {
      //각각의 유니크한 키값으로 사용
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: Array,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  //모든 프론트호출에서 password값을 빼고 주기 위한 작업
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;

  return obj;
};

//실제 데이터가 들어가는 곳은 Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
