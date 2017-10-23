// following docs statement is actually not really matching something that exists.
// you know, this is how JSDoc works :)
// anyway, this probably is the best place to have this statement.
/**
 * @typedef JenkinsAuth
 * @property {string} url - Jenkins URL
 * @property {string} user - Jenkins username
 * @property {string} password - Jenkins password
 */

module.exports = {
    createJenkinsOptions: (url, username, password) =>
        ({
            baseUrl: url,
            headers: {
                "Authorization": `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`
            },
        })

};

