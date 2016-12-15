const proxyquire = require('proxyquire');
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const auth = {
  url: "test",
  user: "user",
  password: "password"
};

const jobName = "jobName";
const data = {
  executable: {
    number: 1
  }
};

const JenkinsWrapper = {
  queue: {
    item: sinon.stub().yields(null, data)
  },
  build: {
    logStream: () => ({
      on: sinon.stub().yields()
    })
  }
};

const jenkinsStub = () => JenkinsWrapper;


var streamLogs = proxyquire("../../lib/api/streamLogs", { 'jenkins': jenkinsStub });

describe('Streaming logs', function() {
  it('it should stream logs', function(testFinished) {
    JenkinsWrapper.queue.item = sinon.stub().yields(null, data);
    streamLogs(auth, jobName, 1, console, function(err) {
      assert.isNotOk(err, "Should not return error");
      testFinished();
    });
  });
});