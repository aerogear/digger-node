const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 *  Stream jenkins logs
 */
module.exports = (auth, jobName, buildNo, writter, callback) => {
  const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
  const jenkins = Jenkins(options);
  const logStream = jenkins.build.logStream(jobName, buildNo);
  writter.log(`## Starting streaming build ${buildNo} log`);
  logStream.on('data', text => {
    if (text) {
      writter.log(text);
    }
  });

  logStream.on('error', err => {
    if (err) {
      writter.error(err);
    }
  });

  logStream.on('end', err => {
    writter.log('Finished streaming logs');
    callback(err, buildNo);
  });
};