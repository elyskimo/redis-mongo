// const db = require('sqlite')
// const Redis = require('ioredis')
// const redis = new Redis()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("DB CONNECTED");
});
var usersSchema = new mongoose.Schema({
  id: String,
  pseudo: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});
var User = mongoose.model('User', usersSchema);
// module.exports = mongoose.model('User', usersSchema);
​
module.exports = {
  
  get: async (userId) => {
    console.log("get user")
    const user = await User.find({id:userId})
    console.log(user)
    return user
  },
​
  count: async() => {
   return await User.count({})
  },
​
  getAll: async (limit, offset) => {
    const users = await User.find()
  //  console.log(users)
   return users
​
  },
​
  insert: async (params) => {
    const userId = require('uuid').v4()
    let user = { id: userId,
                pseudo: params.pseudo,
                firstname: params.firstname,
                lastname: params.lastname,
                email: params.email,
                password: params.password }
    let doc = await User.collection.insertMany([user], function(err) {
          console.log("insert error")
      })
    console.log(user)
    console.log(doc)
​
	return doc
​
  },
​
  update: async(userId, params) => {
    let user = { id: userId,
      pseudo: params.pseudo,
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password }
    const doc = await User.updateOne({id:userId},user, function(err) {
        console.log("update error")
    })
​
    return doc
 
  },
​
  remove: async(userId) => {
    console.log("delete")
    const doc = await User.deleteOne({id:userId})
    return doc
  }
​
}