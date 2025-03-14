const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1"; //for mumbai
// Create SES service object.
const client = new SESClient({ region: REGION, credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
} });
module.exports = { client };
// snippet-end:[ses.JavaScript.createclientv3]