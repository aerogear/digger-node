const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 *  Stream jenkins logs
 */
module.exports = (auth, jobName, queueNumber, writter, callback) => {
  const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
  const jenkins = Jenkins(options);
  jenkins.queue.item(queueNumber, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    if (!data.executable || !data.executable.number) {
      return writter.log("Build did not started yet! Try again later");
    }
    const buildNo = data.executable.number;
    const logStream = jenkins.build.logStream(jobName, buildNo);
    writter.log(`## Starting streaming build ${buildNo} log`);
    logStream.on('data', function(text) {
      if (text) {
        writter.log(text);
      }
    });

    logStream.on('error', function(err) {
      if (err) {
        writter.error(err);
      }
    });

    logStream.on('end', function() {
      writter.log('Build finished'.gray);
      callback(err, data);
    });
  });
};



