# Movies Application Documentation
## Version 1.0

## FRONT END

### Run Locally

To run the application locally:
- navigate to frontend directory
- run npm i
- run npm start

** You can change the URL of all axios calls based on your backend URL **

## BACK END

The backend is ran with NodeJS/Express.
Locally, I used a vagrant machine and gave the machine a dedicated IP address locally (10.6.0.10).
The Node Server runs on a specific port that you can change through the .env file.

The Node Server is also connected to a MongoDB database. You can create or install one and connect it to the DB.
If you need the steps to install the server please let me know and I will provide a step by step guide on configuring the server.

The Vagrant machine that I am running is based on EC2 - Amazon Linux 2 Image.

After configuring your Machine, installed node:
- navigate to the backend folder
- run npm i
- run npm i -g pm2
- run pm2 start ecosystem.config.js

This last command will start the node server using PM2.
You can view the logs using pm2 logs command.

## API Routes

- users/login
    - params:
        - email: String
        - password: String | 6 chars long

- users/logout
    - Needs to be developed. Please check additional comments at the end of ReadMe file.

- users/register
    - params:
        - email: String
        - password: String | 6 chars long

- users/movies
    - params:
        - userId

- users/addmovie
    - params:
        - userId: String
        - title: String
        - year: String || Number
        - image: String | base64
        - imageType: String | [expecting an image]

- users/editmovie
    - params:
        - movieId: String
        - userId: String
        - title: String
        - year: String || Number
        - image: String | base64
        - imageType: String | [expecting an image]

## Additional Comments

Due to the time limit that was given to create the application and review the front end, some recommendations are listed below:

### Front End
- Build a template to use for all pages
    - grid template
    - color schemes
- Use Protected Routes in a better way
- Use components with props
    - After login: get user data and pass it as props to authorized components
- Unified and better CSS
- Implement timeout session with time to live variable coming from the backend
- Use Image Links rather than base64 decode for images
- Spend more time on perfecting the design in general

### Back End

- Implement JWT Token on login
- Validate JWT Token on every API call from a user
- Refresh JWT Token
- Refresh session time to live (based on JWT token time to live OR a different variable|calculation)
- Change Image storage
    - Store Images in S3
    - Store the S3 URL in the database rather than the base64
