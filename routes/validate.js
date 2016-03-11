// from the documention:

/*
firstName:
    Not required value in that an empty string is acceptable.
lastName:
    Not required value in that an empty string is acceptable.
email:
    Must be unique, each user is uniquely identifed by their email address, should not exceed 80 characters.
password:
    Should not exceed 80 characters.
username:
    Should not exceed 30 characters. Please sanitize before requesting; non-ascii characters, this means you. Please allow only letters, numbers, underscores, and hyphens. No spaces. Do not include @ceet.us, this is added by the backend
*/

new_user = function(body)
{
    // Email
    if(body.email == undefined){ return {reason: "Email cannot be blank"}; }
    if(body.email.length >= 80){ return {reason: "Email is too long"}; }
    // Password
    if(body.password == undefined){ return {reason: "password cannot be blank"}; }
    if(body.password.length >= 80){ return {reason: "password is too long"}; }

    return {reason: "I haven't implemented it yet"};
}

module.exports = {
    new_user: new_user
};