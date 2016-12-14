const authHelper = require("../util/auth");
const Jenkins = require('jenkins');
const logger = require("../util/logger");

/**
 *  Trigger jenkins build
 */
module.exports = (auth, jobName, callback) => {
  const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
  const jenkins = Jenkins(options);
  jenkins.job.build(jobName, function(err, queueNumber) {
    if (err) {
      callback(err);
      return;
    }
    logger.info("Build triggered. Waiting for build number.");
    const fetchInterval = setInterval(() => {
      jenkins.queue.item(queueNumber, function(err, data) {
        if (data && data.executable && data.executable.number) {
          clearInterval(fetchInterval);
          callback(null,data.executable.number);
        }
      });
    }, 3000);
  });
};




