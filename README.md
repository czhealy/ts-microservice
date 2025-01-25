# ts-microservice
A Typescript microservice starter project deployed in AWS.

# Prerequisits
[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

[SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

[NodeJS](https://nodejs.org/en/download)

[NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

[Docker](https://docs.docker.com/desktop/setup/install/mac-install/)

## Unit Test
```
cd code
npm install
npm run test
```
## Run locally
```
sam local start-api
```

## Deploy
Configure AWS Key and secret on your machine or use aws sso cli [instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)

Then run
```bash
sam build -t infrastructure/main.yml
sam deploy
```

The stack output has your deployed target url.
![alt text](/docs/images/stackoutput.png)

So, this GET request...
```
https://ldlxp3k75a.execute-api.us-east-2.amazonaws.com/v0/things
```
Should return
```
[{"name":"ThingOne","status":"New","code":"fake","id":"1"}]
```
* If you don't want to confirm the changeset, set "confirm_changeset" to false
* Remember to add the Cloudwatch logging role to api gateway, RestApiStage will error with "Logs role ARN must be set in account setting to enable logging" if you forgot.
