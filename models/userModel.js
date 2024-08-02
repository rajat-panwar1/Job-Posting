import mongooese from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//schema
const userSchema = new mongooese.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      requried: [true, 'Email is required'],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [6, 'password length should be gretor than 6'],
      select: true,
    },
    location: {
      type: String,
      default: 'India',
    },
  },
  { timestamps: true }
);

//middlewares
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//json webtoken
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default mongooese.model('User', userSchema);
