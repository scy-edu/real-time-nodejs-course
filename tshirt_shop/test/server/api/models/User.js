'use strict'

const mongoose = require('mongoose')
const expect = require('chai').expect

const User = mongoose.model('User');

describe('User', () => {
  var user

  // Setup
  before(() => {
    user = new User({
      name: 'Stanley Yang'
    });
  })

  describe('attributes', () => {

    it('created an user object', () => {
      expect(typeof person).to.be.an.object
    });

    it('should have a String for name', () => {
      expect(user.name).to.be.a('string')
    });

  });

  describe('#save', () => {

    it('should save without problems', (done) => {
      user.save(done);
    });

    it('should GET the user', (done) => {
      User.findById(user._id, (err, _user) => {
        expect(user._id.toString()).to.equal(_user.id);
        done();
      });
    });

  });

  describe('#validate', () => {
    it('should persist the name', (done) => {
      User.findById(user._id, (err, _user) => {
        expect(err).to.be.a('null');
        expect(_user).to.be.an('object');
        expect(_user.name).to.be.a('string');
        done();
      });
    });
  });



  // Cleanup
  after((done) => {
    User.remove({
      _id: {
        $in: [
          user._id
        ]
      }
    }).exec(done);
  })

});

