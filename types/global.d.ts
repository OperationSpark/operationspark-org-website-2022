declare namespace NodeJS {
  interface ProcessEnv {
    /** Currently broken. See this [TODO](https://github.com/OperationSpark/operationspark-org-website-2022/blob/add-google-analytics/src/components/Navbar/Navbar.tsx#L95) */
    OVERRIDE_NODE_ENV: string;
    MAILCHIMP_API_KEY: string;
    MAILCHIMP_AUDIENCE_ID: string;
    GREENLIGHT_API_ENDPOINT: string;
    GREENLIGHT_API_TOKEN: string;
    SIGNUP_API_ENDPOINT: string;
    FB_PIXEL_ID: string;
    FB_ACCESS_TOKEN: string;
    FB_APP_ID: string;
    FB_APP_SECRET: string;
    FB_CLIENT_TOKEN: string;
    FB_AUTH_TOKEN: string;
    /** Generated with command: `openssl rand -base64 32` */
    FB_WEBHOOK_TOKEN: string;
    HIGHSCHOOL_FORM_RESPONSES_ID: string;
    HIGHSCHOOL_FORM_ACTIVE_UNTIL: string;
    HIGHSCHOOL_FORM_RESPONSES_NAME: string;
    WUFOO_HOST: string;
    WUFOO_TOKEN: string;
    WUFOO_CONTACT_FORM_ID: string;
    GOOGLE_API_KEY: string;
    GOOGLE_EVENTS_CALENDAR_ID: string;
    GOOGLE_SERVICE_ACCOUNT: string;
    GOOGLE_ANALYTICS_ID: string;
  }
}
