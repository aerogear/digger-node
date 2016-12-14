var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require("sinon");

const auth = {
  url: "test",
  user: "user",
  password: "password"
};

const data = {
  executable: {
    number: 1
  }
};

const JenkinsWrapper = {
  info: sinon.stub().yields(null, data)
};

const jenkinsStub = () =>
     JenkinsWrapper;

var jenkinsInfo = proxyquire("../../lib/api/jenkinsInfo", { 'jenkins': jenkinsStub });

describe('jenkinsInfo', function() {
  it('it should return jenkinsInfo', function() {
    jenkinsInfo(auth, function(err, data) {
      assert(!err);
      assert(data);
    });
  });
});