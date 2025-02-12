# Mailgun Templates

> Once the template is ready, copy the template html into [this css inliner tool](https://htmlemail.io/inline) and paste the result into the template in Mailgun.

### Teacher Training

> [Teacher Training Mailgun Template](https://app.mailgun.com/mg/sending/mail.operationspark.org/templates/dGVhY2hlci10cmFpbmluZy1jb25maXJtYXRpb24=)

#### Teacher training Mailgun template variables

```ts
// Teacher training mailgun template variable type
type MailgunVariables = {
  title: string;
  subject: string;
  body: string;
  details: {
    label: string;
    value: string;
  }[];
};
```

#### Sample Payload (Mailgun Variables)

> Use in mailgun editor preview

```json
{
  "title": "Teacher Training Signup Confirmation",
  "subject": "Teacher Training | Summer 2025 | Level 2 (Advanced) Confirmation",
  "details": [
    {
      "label": "Name",
      "value": "Halle Bot",
      "plainValue": "Halle Bot <halle.bot@operationspark.org>"
    },
    {
      "label": "Signed Up By",
      "value": "\n          <div>\n            <div><b>Proxy Boot</b></div>\n            <div style=\"color: #A6A6A6; font-size: 12px;\">halle.proxy@operationspark.org</div>\n          </div>\n          ",
      "plainValue": "Proxy Boot <halle.proxy@operationspark.org>"
    },
    {
      "label": "Course",
      "value": "Javascript, Functional Programming, and Web Development",
      "plainValue": "Javascript, Functional Programming, and Web Development"
    },
    {
      "label": "IBC",
      "value": "Level 2 (Advanced) <span style=\"color: #A6A6A6; font-size: 12px;\">080520</span>",
      "plainValue": "Level 2 (Advanced) 080520"
    },
    {
      "label": "Dates",
      "value": "\n      <div>\n        <div><b>Tuesday, July 8th</b> - <b>Friday, July 18th</b></div>\n        <div>9:00 AM - 3:00 PM</div>\n        <div style=\"color: #A6A6A6; font-size: 12px;\">Monday - Friday</div>\n      </div>\n      ",
      "plainValue": "Tuesday, July 8th - Friday, July 18th\n9:00 AM - 3:00 PM\nMonday - Friday",
      "noBorder": true
    }
  ],
  "body": "Thank you for signing up for Operation Spark's Teacher Training program starting \n  <span style=\"\n    display: inline-block;\n    padding: 2px 4px;\n    border-radius: 4px;\n    background-color:rgba(50, 0, 100, 1);\n    border: 1px solid rgba(118, 0, 233, 1);\n    color: rgba(255, 255, 255, 1);\n    font-size: 0.9em;\n    font-weight: 600;\n    line-height: 1;\n  \">Tuesday, July 8th</span>\n at \n  <span style=\"\n    display: inline-block;\n    padding: 2px 4px;\n    border-radius: 4px;\n    background-color:rgba(50, 0, 100, 1);\n    border: 1px solid rgba(118, 0, 233, 1);\n    color: rgba(255, 255, 255, 1);\n    font-size: 0.9em;\n    font-weight: 600;\n    line-height: 1;\n  \">9:00 AM</span>\n. We will be in touch soon with more details."
}
```
