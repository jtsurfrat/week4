import * as express from 'express';
import MyUser from '../models/userPassModel';

let router = express.Router();

// get all userNames password
router.get('/', (req, res) => {
  MyUser.find().then((users) => {
    res.json(users);
  }).catch((err) => {
    res.status(500)
    console.log(err);
  })
})

router.get('/:id', (req, res) => {
  MyUser.findById(req.param['id']).then((user) => {
    res.json(user);
  })
})
