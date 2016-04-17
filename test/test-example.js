var assert = require('chai').assert;
var validate_module = require('../routes/validate');

describe('Validate', function()
{
    describe('isEmail(str)', function ()
    {
        it('should allow valid emails', function()
        {
            assert.isTrue(validate_module.isEmail("jack@cirno.de"));
            assert.isTrue(validate_module.isEmail("skmehta@andrew.cmu.edu"));
            assert.isTrue(validate_module.isEmail("kevin@swiftceipt.com"));
            assert.isTrue(validate_module.isEmail("joemertz@cmu.edu"));
        });

        it('should not allow invalid emails', function()
        {
            assert.isFalse(validate_module.isEmail("@cirno.de"));
            assert.isFalse(validate_module.isEmail("jack@.de"));
            assert.isFalse(validate_module.isEmail("jack@cirno"));
            assert.isFalse(validate_module.isEmail("!@%$$@cirno.de"));
        });
    });
});