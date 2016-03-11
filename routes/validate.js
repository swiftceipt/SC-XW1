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

/*
    Taken from:
    http://stackoverflow.com/a/14313213/3934731
*/

function isASCII(str)
{
    return /^[\x00-\x7F]+$/.test(str);
}

new_user = function(body)
{
    // Email
    if(body.email == undefined){ return {reason: "Email cannot be blank"}; }
    if(body.email.length >= 80){ return {reason: "Email is too long"}; }

    // Password
    if(body.password == undefined){ return {reason: "Password cannot be blank"}; }
    if(body.password.length >= 80){ return {reason: "Password is too long"}; }

    //username
    if(body.username == undefined){ return {reason: "Username cannot be blank"}; }
    if(body.username.length <= 2){ return {reason: "Username is too short"}; }
    if(body.username.length >= 30){ return {reason: "Username is too long"}; }
    if(!isASCII(body.username)){ return {reason: "Username cannot contain non-ascii characters"}; }

    return {reason: "I haven't implemented calling the backend yet"};
}

module.exports = {
    new_user: new_user
};