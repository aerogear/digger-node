const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 * Streams the logs of a build in Jenkins.
 *
 * @module api/streamLogs
 *
 * @param {JenkinsAuth} auth - The authentication object to pass
 * @param {string} jobName - Name of the Jenkins Job
 * @param {number} buildNumber - Build number to fetch artifacts
 * @param {module:api/streamLogs.logStream} writer - Stream to write logs
 * @param {module:api/streamLogs.streamLogsCallback} callback - Callback to call
 *
 */
module.exports = (auth, jobName, buildNumber, writer, callback) => {
    const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
    const jenkins = Jenkins(options);
    const logStream = jenkins.build.logStream(jobName, buildNumber);
    writer.log(`## Starting streaming build ${buildNumber} log`);
    logStream.on('data', text => {
        if (text) {
            writer.log(text);
        }
    });

    logStream.on('error', err => {
        if (err) {
            writer.error(err);
        }
    });

    logStream.on('end', err => {
        writer.log('Finished streaming logs');
        callback(err, buildNumber);
    });
};

/**
 * @typedef module:api/streamLogs.logStream
 * @property {function(string)} log - log msg received from Jenkins
 * @property {function(string)} error - error msg received from Jenkins
 */

/**
 * @callback module:api/streamLogs.streamLogsCallback
 * @param {*} error Error, or null if no error
 * @param {number} buildNumber - the build number
 */