const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//this is a hook and hashes the password before saving
//I normally handle elsewhere but learned something new 
//which is always nice
UserSchema.pre(
  'save',
  async (next) => {
    //this refers to the current document about to be saved.
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
)

//again I usually do it some other way but this is fine too
//adding a method to he instance
UserSchema.methods.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;