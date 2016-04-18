# SC-XW1
CMU/Swiftceipt Collaborative Project.

To run the tests, simply run the following command:

```
$ npm test

SC Server
    ✓ should accept valid login credentials (134ms)
    ✓ should not accept invalid login credentials (109ms)

  /routes/routes.js
    register(req, res)
      ✓ should be able to be able to register a new user (105ms)
      ✓ should be able to login as the newly created user (135ms)

  routes/validate.js
    isEmail(str)
      ✓ should allow valid emails
      ✓ should not allow invalid emails
    new_user(body)
      ✓ should not allow an invalid email
      ✓ should not allow an invalid username
      ✓ should not allow an invalid password
      ✓ should allow an valid body object


  10 passing (523ms)
```
  