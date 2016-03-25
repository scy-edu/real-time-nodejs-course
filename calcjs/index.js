'use strict'

// Import dependencies
const math = require('mathjs')

/*
 * CALCJS. LOVE OUR MODULE!!!
 */

exports.add = function (num1, num2) {
  return math.eval(num1 + num2);
}

exports.subtract = function (num1, num2) {
  return math.eval(num1 - num2);
}

exports.multiply = function (num1, num2) {
  return math.eval(num1 * num2);
}

exports.divide =  function (num1, num2) {
  return math.eval(num1 / num2);
}

// Students will perform this part

exports.round = function (num1, roundTo) {
  return math.round(num1, roundTo);
}

exports.sqrt = function (num) {
  return math.sqrt(num);
}

