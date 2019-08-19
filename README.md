# contact-form-api

A [Serverless](https://serverless.com/framework/) AWS service for sending emails
with a contact form. Used for the form on
[my website](https://www.punitshah.dev).

## Setup

1. Clone this repo

   ```bash
   git clone https://github.com/punit-shah/contact-form-api.git
   cd contact-form-api
   ```

2. Install dependencies

   ```
   yarn
   ```

3. Provide AWS credentials to Serverless

   ```
   yarn sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_ACCESS_KEY
   ```

4. Create a `secrets.json` file

   ```
   cp secrets.example.json secrets.json
   ```

   Set the following values:

   - `NODE_ENV` - the stage to deploy to (`"dev"` or `"prod"`)
   - `EMAIL` - the email address to send emails to (must be verified with AWS SES)
   - `DOMAIN` - the domain your form lives on

5. Deploy the service

   ```
   yarn deploy
   ```

## Testing the service

- Run the function locally with the data in `data.json`

  ```
  yarn invoke-local
  ```

- Invoke the deployed function with the data in `data.json`

  ```
  yarn invoke-remote
  ```
