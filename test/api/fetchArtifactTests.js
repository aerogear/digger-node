const proxyquire = require('proxyquire');
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const auth = {
  url: "test",
  user: "user",
  password: "password"
};

const dataMock = { artifacts: [{ relativePath: "test" }] };
const JenkinsWrapper = {
  build: {
    get: sinon.stub().yields(null, dataMock)
  }
};

const jenkinsStub = () => JenkinsWrapper;

var fetchArtifact = proxyquire("../../lib/api/fetchArtifact", { 'jenkins': jenkinsStub });

describe('fetchArtifact', function() {
  it('it should return artifacts', function(testFinished) {
    fetchArtifact(auth, "job", 1, function(err, data) {
      assert.isNotOk(err);
      assert.isOk(data);
      assert.equal(data.length, 1);
      assert.equal(data[0], "test/job/job/1/artifact/test");
      testFinished();
    });
  });
});