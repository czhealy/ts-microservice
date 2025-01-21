# ts-microservice
A Typescript microservice starter project deployed in AWS.

# Prerequisits
[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

[SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

[NodeJS](https://nodejs.org/en/download)

[NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

## Deploy
```bash
sam build -t infrastructure/main.yml
sam deploy
```
* If you don't want to confirm the changeset, set "confirm_changeset" to false
* Remember to add the Cloudwatch logging role to api gateway, RestApiStage will error with "Logs role ARN must be set in account setting to enable logging" if you forgot.