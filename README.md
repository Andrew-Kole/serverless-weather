# Serverless Weather API

A serverless weather API using AWS Lambda and API Gateway. 

## What did i do?
1. Created a Lambda function on https://eu-north-1.console.aws.amazon.com/lambda/home?region=eu-north-1#/create/function
2. I choose from scratch...(something else was written in option description)
3. Then I pressed trigger and chose API Gateway, everything default, secure open
4. Then I wrote code and tested if it works( I use openWeatherApi to retrieve weather info and https://ipstack.com/ to get geolocation)
5. next I added my code to lambda function
6. Now we can use it on https://h1wnq2hz41.execute-api.eu-north-1.amazonaws.com/default/weatherByIPLambda