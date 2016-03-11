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

function is_valid_username(str)
{
    // test particularly defined character set
    var allowed_chars = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWYXZ1234567890-_";
    for(var i = 0; i < str.length; i++)
    {
        if(allowed_chars.indexOf(str.charAt(i)) <= -1)
        {
            return false
        }
    }
}

function isEmail(str)
{
    return /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(str);
}

new_user = function(body)
{
    // Email
    if(body.email == undefined || body.email.length == 0){ return {reason: "Email cannot be blank"}; }
    if(body.email.length >= 80){ return {reason: "Email is too long"}; }
    if(!isEmail(body.email)){ return {reason: "Email is malformed"}; }

    //username
    if(body.username == undefined || body.username.length == 0){ return {reason: "Username cannot be blank"}; }
    if(body.username.length <= 2){ return {reason: "Username is too short"}; }
    if(body.username.length >= 30){ return {reason: "Username is too long"}; }
    if(!is_valid_username(body.username)){ return {reason: "Username cannot contain special characters"}; }
    
    // Password
    if(body.password == undefined || body.password.length == 0){ return {reason: "Password cannot be blank"}; }
    if(body.password.length >= 80){ return {reason: "Password is too long"}; }

    return {reason: "I haven't implemented calling the backend yet"};
}

module.exports = {
    new_user: new_user
};