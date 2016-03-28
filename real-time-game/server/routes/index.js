'use strict'

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Real-Time App'
  });
});

module.exports = router;
