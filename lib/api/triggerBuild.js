const authHelper = require("../util/auth");
const Jenkins = require('jenkins');
const logger = require("../util/logger");

/**
 * Triggers a build in Jenkins and waits until the build leaves the queue and starts building to get the build number.
 *
 * @module api/triggerBuild
 *
 * @param {JenkinsAuth} auth - The authentication object to pass
 * @param {string} jobName - Name of the job
 * @param {number} intervalTimeout - How long (in ms) should we until the job to leave the queue and start building?
 * @param {module:api/triggerBuild.triggerBuildCallback} callback - Callback to call
 *
 */
module.exports = (auth, jobName, intervalTimeout, callback) => {
    const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
    const jenkins = Jenkins(options);
    jenkins.job.build(jobName, function (err, queueNumber) {
        if (err) {
            callback(err);
            return;
        }
        logger.info("Build triggered. Waiting for build number.");
        const fetchInterval = setInterval(() => {
            jenkins.queue.item(queueNumber, function (err, data) {
                if (data && data.executable && data.executable.number) {
                    clearInterval(fetchInterval);
                    callback(null, data.executable.number);
                }
            });
        }, intervalTimeout);
    });
};


/**
 * @callback module:api/triggerBuild.triggerBuildCallback
 * @param {*} error Error, or null if no error
 * @param {number} Build number
 */
