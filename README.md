# Haufe Group Technical Challenge

## Tools and Frameworks used and "why"

#### Frontend
- CRA and React Library are mandatory
- React router as different pages are mandatory (e.g 404 page)
- Redux and Redux Toolkit because this help us keep the code cleaner,
Redux could be replaced by React Context if there weren't several state updates.
Otherwise if only we had to change the theme or update the state once React Context
would be a better alternative.
- Jest as this is a well-known testing framework that covers all of the
Unit tests and Integration tests that we need.

#### Backend
- Express and NodeJS are mandatory
- Dotenv in order to keep the config decoupled
- MongoDB since we don't need any relationship or transactions, we are not using
a database which requires consistent data or data analysis workloads. In addition, 
we don't have the big picture of how the model should be so MongoDB here is a good
way to go. As https://rickandmortyapi.com/ follows the HATEOAS principle I
decided to store URLs in the DB model.
- Mocha and chai (instead of Jest) in order to show my skills with other
testing framework (plus this is written in NodeJS) and Assertion Library.

## Summary
#### Login
I decided to implement the login using the following approach:

- Request a JWT and store it in a cookie
- Send this cookie every time we need to consume the API

It could be improved as follows (not implemented due to the deadline):

- JWTs have the form of **header.payload.signature** so that we can split
this cookie in order to prevent XSS or CSRF. the JWT would be split into
**header.payload** and **signature**. The server stitches
the header with the cookie and then validates the JWT.

#### List all characters
My approach is to request the characters paginated by a given number and keep
them in the Redux store as well as an additional field (added in the backend by id)
that shows if a character is in fav list.

#### Detail character
This component will use the state from Redux store that mark each character as
favorite.

#### 404 Page
This page will be default when no route is known.