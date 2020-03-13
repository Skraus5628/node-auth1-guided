# Introduction to Authentication

Guided project for **Node Auth 1** Module.

## Prerequisites

- [DB Browser for SQLite](https://sqlitebrowser.org) installed.
- A rest client like [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm install` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.


<!-- Notes! -->
 
<!-- Authentication (AuthN) = Who are you?
     Authorization (AuthZ)  = What do you want? -->

<!--                Authentication Core Principles:
    -Requiring strong passwords
    -Properly storing passwords
    -Preventing brute-force attacks -->

<!-- brute force example of rainbow table -->
<!-- [Rainbow Table]
md5_hash                                    associated_password
----------------------------------------------------------------------
45893908239012307910981890                  hello world
3095874725872843741039890                   w3bpt10
2093750189701734290171070                   lambda_school
>

<!-- md5 is good for files, but not passwords -->

<!-- b crypt  is great for passwords
https://github.com/dcodeIO/bcrypt.js -->


<!-- Client sends credentials to server (login)
     Server verifies credentials (checks bcrypt hash)
     Server creates a session for the client
     Server sends back the session data as a set-cookie header
     Client stores the cookie in its cookie jar
     Client sends cookie on every subsequent request
     Server verifies the cookie is valid
     Server provides access to the resource (authorized!)


