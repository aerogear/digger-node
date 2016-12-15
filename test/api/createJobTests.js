const proxyquire = require('proxyquire');
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const auth = {
  url: "test",
  user: "user",
  password: "password"
};

const jobArgs = {
  repository: "test",
  branch: "master",
  name: "test"
};

const dataMock = {
  name: "Test"
};

const JenkinsWrapper = {
  job: {
    create: sinon.stub().yields(null, dataMock)
  }
};

const jenkinsStub = () => JenkinsWrapper;

const createJob = proxyquire("../../lib/api/createJob", { 'jenkins': jenkinsStub });

describe('createJob', function() {
  it('it should return job', function(testFinished) {
    createJob(auth, jobArgs, function(err, data) {
      assert.isNotOk(err, "Should not return error");
      assert.isOk(data, "Should return data");
      assert.equal(data.name, dataMock.name);
      testFinished();
    });
  });
});