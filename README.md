# SC-XW1
CMU/Swiftceipt Collaborative Project.

Currently the `fiddling` directory is used to make sure that we can do certain proofs of concept on a very basic level. This possibly could morph into a testing suite by changing the following in `package.json`:

```JS

"scripts": {
    "start": "node server.js",
    "test" : "node fiddling/*.js | grep ERROR"
  }

```
	
- `login_api_call.js` demonstrates using SwiftCeipt's login api to authenticate a user in Node.js.
- `get_receipts.js` demonstrates usage of the [`request`](https://github.com/request/request) module from npm to get the receipts from the user