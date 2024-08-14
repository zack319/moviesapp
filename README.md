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
