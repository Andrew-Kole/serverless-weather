const AWS = require('aws-sdk');

const AWS_REGION = process.env.AWS_REGION;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const ses = new AWS.SES({region: AWS_REGION});

exports.handler = async (event) => {
    const { question, email, username } = JSON.parse(event.body);

    const userParams = {
        Destination: {
            ToAddresses: [
                email,
            ],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Hello ${username},\n we detected your question: ${question}. We will answer it as soon as possible. Thanks for waiting.`,
                },
            },
            Subject: {
                Data: 'Question received',
            },
        },
        Source: EMAIL_SENDER,
    };

    const adminParams = {
        Destination: {
            ToAddresses: [
                EMAIL_SENDER,
            ],
        },
        Message: {
            Body: {
                Text: {
                    Data: `New question ${question} from ${username}, email: ${email}.`,
                },
            },
            Subject: {
                Data: 'New question',
            },
        },
        Source: EMAIL_SENDER,
    };

    try {
        await ses.sendEmail(userParams).promise();
        await ses.sendEmail(adminParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Sent'}),
        };
    }
    catch (error) {
        console.error('Not sent', error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    }
};