# Cowin Appointment Scraper

Scraper which accesses Co-WIN Public API to get vaccination appointments for a district and sends a notification when finds suitable appointments.

API Swagger Documentation: https://apisetu.gov.in/public/api/cowin

## Setup

### `.env` file:

| Key                           | Value                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------- |
| CALENDAR_BY_DISTRICT_BASE_URL | https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict |
| FEE_TYPE                      | `Free` or `Paid` or `Free,Paid`                                                 |
| MIN_AGE_LIMIT                 | 18                                                                              |
| NODE_ENV                      | `dev` or `prod`                                                                 |

## Resources

- JSON to TS Interface: http://json2ts.com/
