const proxyquire = require('proxyquire');
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const auth = {
  url: "test",
  user: "user",
  password: "password"
};

const dataMock = {
  executable: {
    number: 1
  }
};

const JenkinsWrapper = {
  job: {
    build: sinon.stub().yields(null, {})
  },
  queue :{
    item:sinon.stub().yields(null, dataMock)
  }
};


const jenkinsStub = () => JenkinsWrapper;

var triggerBuild = proxyquire("../../lib/api/triggerBuild", { 'jenkins': jenkinsStub });

describe('triggerBuild', function() {
  it('it should trigger build', function(testFinished) {
    triggerBuild(auth, "job", 10, function(err, data) {
      assert.isNotOk(err, "Should not return error");
      assert.isOk(data, "Should return data");
      testFinished();
    });
  });
});