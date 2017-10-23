const fs = require("fs");
const path = require('path');
const _ = require('underscore');
const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 * Creates a job in Jenkins.
 *
 * @module api/createJob
 *
 * @param {JenkinsAuth} auth - The authentication object to pass
 * @param {Object} jobArgs - Object that holds the job arguments.
 * @param {string} jobArgs.repository - Git repository url
 * @param {string} jobArgs.branch - Branch to use
 * @param {module:api/createJob.createJobCallback} callback - Callback to call
 *
 */
module.exports = (auth, jobArgs, callback) => {
    const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
    const jenkins = Jenkins(options);
    const fileLocation = path.join(__dirname, '..', '..', 'templates', 'standard.xml');
    const fileContent = fs.readFileSync(fileLocation, 'utf8');
    if (fileContent) {
        const jobTemplate = _.template(fileContent);
        const jobXML = jobTemplate(jobArgs);
        const jobOptions = {
            name: jobArgs.name,
            xml: jobXML
        };
        jenkins.job.create(jobOptions, function (err, data) {
            callback(err, data);
        });
    } else {
        callback("Standard template is missing!");
    }


};

/**
 * @callback module:api/createJob.createJobCallback
 * @param {*} error Error, or null if no error
 * @param {Object} data
 */



