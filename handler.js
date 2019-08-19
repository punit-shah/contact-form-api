'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();
const { EMAIL, DOMAIN } = process.env;

const buildEmailParams = ({ name, email, message }) => {
  if (!(email && name && message)) {
    throw Error(
      "Missing parameters! Make sure to add parameters 'email', 'name', 'message'."
    );
  }

  return {
    Source: EMAIL,
    Destination: {
      ToAddresses: [EMAIL],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `From: ${name} <${email}>

${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `New message from ${DOMAIN}`,
      },
    },
  };
};

const buildResponse = (statusCode, data) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': DOMAIN,
  },
  body: JSON.stringify(data),
});

module.exports.sendEmail = async event => {
  try {
    const formData = JSON.parse(event.body);
    const emailParams = buildEmailParams(formData);
    const data = await SES.sendEmail(emailParams).promise();
    return buildResponse(200, data);
  } catch (error) {
    console.log(error);
    return buildResponse(500, error.message);
  }
};
