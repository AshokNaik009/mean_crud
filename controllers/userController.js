var User = require('../models/userModel');
const { check, validationResult } = require('express-validator');


/*
 |---------------------------------------------------
 | POST /api/user/createuser
 |---------------------------------------------------
 */

exports.createUser = (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  
  var user = new User(req.body);
  user.save(function (err, result) {
    if (err) {
      console.log(err)
      res.status(200).send({
        data: "Duplicate Value"
      });
    } else {
      res.send({
        data: "New User Added"
      });
    }
    
  });
}

/*
 |---------------------------------------------------
 | GET /api/user/getuser
 |---------------------------------------------------
 */

exports.fetchUser = (req, res) => {

  User.find().select({ "uid": 1, "name": 1, "email": 1, "phone": 1, "_id": 0 }).exec(function (err, users) {
    if (err) {
      res.status(422).send(err);
    }
    return res.json(users);
  });
}

/*
 |---------------------------------------------------
 | PUT /api/user/updateuser/:uid
 |---------------------------------------------------
*/

exports.updateUser = (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).send({
      data: "Invalid Value"
    });
  }

  User.findOne({ uid: req.params.uid }).exec(function (err, user) {
    if (err) {
      res.status(422).send(err);
    }


    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;

    var user = new User(user);

    user.save(function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({
          data: "Invalid Value"
        });
      } else {

        res.status(200).send({
          data: "Records Updated"
        });

      }



    });


  });
}


/*
 |---------------------------------------------------
 | DELETE /api/user/deleteuser/:uid
 |---------------------------------------------------
*/

exports.deleteUser = (req, res) => {

  User.remove({
    uid: req.params.uid
  }, function (err, user) {
    if (err) {
      res.status(200).send({
        data: "Invalid Value"
      });
      } else {

        res.status(200).send({
          data: "Successfully deleted"
        });

        

      }
    
    
  });


}