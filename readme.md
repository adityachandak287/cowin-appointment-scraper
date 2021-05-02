# Cowin Appointment Scraper

Scraper which accesses Co-WIN Public API to get vaccination appointments for a district and sends a notification when finds suitable appointments.

API Swagger Documentation: https://apisetu.gov.in/public/api/cowin

## Setup

### Install requirements

```
npm install
```

### `.env` file:

| Key            | Value                                                             |
| -------------- | ----------------------------------------------------------------- |
| FEE_TYPE       | `Free` or `Paid` or `Free,Paid`                                   |
| MIN_AGE_LIMIT  | `18` or `45`                                                      |
| NODE_ENV       | `dev` or `prod`                                                   |
| SLACK_HOOK_URL | Unique Slack Webhook URL                                          |
| OUTPUT_FILES   | `true` to output filter to file, any other value to ignore        |
| DISTRICT_ID    | Comma seperated values to check districts, eg: `100,101` or `102` |
| CHECK_WEEKS    | Number of weeks to check, eg: `1`                                 |

Refer:

- List of States https://cdn-api.co-vin.in/api/v2/admin/location/states
- List of Districts for a State https://cdn-api.co-vin.in/api/v2/admin/location/districts/state_id

## Deploy

`Note:` Assuming AWS credentials have been configured.

```
serverless deploy
```

## Resources

- JSON to TS Interface: http://json2ts.com/
