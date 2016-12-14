var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require("sinon");

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
    logStream: () => ({ on: function() { } })
  }
};

const jenkinsStub = () => JenkinsWrapper;


var streamLogs = proxyquire("../../lib/api/streamLogs", { 'jenkins': jenkinsStub });

describe('Streaming logs', function() {
  it('it should return error', function() {
    JenkinsWrapper.queue.item = sinon.stub().yields("error");
    streamLogs(auth, jobName, 1, console, function(err) {
      assert(err);
    });
  });

  it('it should stream logs', function() {
    JenkinsWrapper.queue.item = sinon.stub().yields(null, data);
    streamLogs(auth, jobName, 1, console, function(err) {
      assert(!err);
    });
  });
});