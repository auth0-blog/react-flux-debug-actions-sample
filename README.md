# React - Debugging Flux Actions

Source code for the blog post: [Logging & Debugging in React with Flux: Replaying your user’s actions](https://auth0.com/blog/2015/08/25/logging-and-debugging-in-react-with-flux-replaying-your-users-actions/)

## Using it

- [ ] First start the backend: `npm run backend` (which will listen on [http://localhost:3001](http://localhost:3001)).
- [ ] Then start the web application: `npm run dev` (which will run on [http://localhost:4501/webpack-dev-server/](http://localhost:4501/webpack-dev-server/)).

Once you have everything running you can start the app in 2 browser windows:

 - In the first window, you'll be an end user. If you delete the third item, the app will crash.
 - In the second window, you'll be a developer. Click the DEBUG button on the top right, choose to replay the end user's session and look at your Console. You'll see the error of the end user.

## How does it work?

You can find more information on our [blog post](https://auth0.com/blog/2015/08/25/logging-and-debugging-in-react-with-flux-replaying-your-users-actions/)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
