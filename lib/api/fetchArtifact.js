const _ = require('underscore');
const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 *  Fetch jenkins artifacts
 */
module.exports = (auth, jobName, buildNumber, callback) => {
  const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
  const jenkins = Jenkins(options);
  jenkins.build.get(jobName, buildNumber,  (err, data) => {
    if (err) {
      return callback(err);
    }
    if (!data && !data.artifacts) {
      return callback();
    }
    const baseURL = auth.url;
    const artifactUrl = `${baseURL}/job/${jobName}/${buildNumber}/artifact/`;
    var artifactList=[];
    _.each(data.artifacts, artifact =>{
      artifactList.push(artifactUrl+artifact.relativePath);
    });
    if (artifactList.length>0) {
      return callback(err, artifactList);
    }
    callback(err);
  });
};

