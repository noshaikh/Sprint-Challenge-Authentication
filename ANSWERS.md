<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   cookies are session storages that store information about a particular client/user. a cookie is a small key value pair fata structure that is passed back and forth between client an dserver and stored in the browser.
   workflow for using cookies as session storage:

- the server issues a cookie with an expiration time and sends it with the response.
- browsers automatically store the cookie and send it on every request to the same domain.
- the server can read the information contained in the cookie (like the username).
- the server can make changes to the cookie before sending it back on the response.
- rinse and repeat.

2. What does bcrypt do to help us store passwords in a secure manner.
   bcrypt hashes passwords. it implements salting both manually and automatically. it also has accumulative hashing rounds. it is a popular key derivation function module.

3) What does bcrypt do to slow down attackers?
   Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

4. What are the three parts of the JSON Web Token?
   A JWT is a string that has three parts separated by a period (.). Those are:

The header.The header will contain the algorithm with the token type.
The payload.The payload includes claims /information or any other data we’d like to store in the token
The signature.To create a signature, we must create a string by base64 encoding the header and payload together, and then signing it with a secret.
