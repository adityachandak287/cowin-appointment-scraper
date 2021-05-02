# Cowin Appointment Scraper

Scraper which accesses Co-WIN Public API to get vaccination appointments for a district and sends a notification when finds suitable appointments.

API Swagger Documentation: https://apisetu.gov.in/public/api/cowin

## Setup

### `.env` file:

| Key            | Value                                                             |
| -------------- | ----------------------------------------------------------------- |
| FEE_TYPE       | `Free` or `Paid` or `Free,Paid`                                   |
| MIN_AGE_LIMIT  | 18                                                                |
| NODE_ENV       | `dev` or `prod`                                                   |
| SLACK_HOOK_URL | Unique Slack Webhook URL                                          |
| OUTPUT_FILES   | `true` to output filter to file, any other value to ignore        |
| DISTRICT_ID    | Comma seperated values to check districts, eg: `395,389` or `395` |
| CHECK_WEEKS    | Number of weeks to check, eg: `1`                                 |

## Resources

- JSON to TS Interface: http://json2ts.com/
