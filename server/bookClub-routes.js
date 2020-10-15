const router = require('express').Router();
const { User, UserFollower } = require('../sequelize/index');

router.get('/', (req, res) => {
  // handles GET requests from '/bc/'
})

router.post('/', (req, res) => {
  // handles POST requests from '/bc/'
})

module.exports = router;
