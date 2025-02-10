import { WebClient } from '@slack/web-api';

// Read a token from the environment variables
const { SLACK_TOKEN } = process.env;

export const connectSlack = () => new WebClient(SLACK_TOKEN);
