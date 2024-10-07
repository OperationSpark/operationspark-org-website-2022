import infoSessions from '../fixtures/infoSession.json';

describe('Info Session Signup', () => {
  it('Should submit valid info session signup with status of 200 and clear the input', () => {
    // Intercept and send back session dates for the form
    cy.intercept('/api/infoSession/dates', [infoSessions.VIRTUAL]);
    // Intercept form submission and send back URL
    cy.intercept('/api/signups/info', {
      statusCode: 200,
      body: { url: 'https://operationspark.org' },
    });

    // Navigate from home page to info session page
    cy.visit('/');
    cy.get('[data-test-id="nav-info-session-link"]').click();

    // Wait for view and form to load
    cy.wait(1000);

    // Check that the next info session date is displayed
    // NOTE: THe API won't actually send back past dates
    cy.get(`[data-test-id="next-session-date-time"]`).should('contain.text', 'September 24, 2024');

    // Check the initial SMS disclaimer message when no option is selected
    cy.get(`[data-test-id="sms-disclaimer"]`).should(
      'contain.text',
      'You can opt out of text messages at any time by replying "STOP"',
    );

    // Form text fields
    const textInputs = [
      { selector: 'info-session-input-first-name', value: 'Halle' },
      { selector: 'info-session-input-last-name', value: 'Bot' },
      { selector: 'info-session-input-email', value: 'halle@operationspark.org' },
      // Area code for phone number **must** be valid
      { selector: 'info-session-input-phone', value: '303-456-7890' },
      { selector: 'info-session-input-zip-code', value: '70117' },
    ];

    // Fill out text fields
    textInputs.forEach(({ selector, value }) => {
      cy.get(`input[data-test-id="${selector}"]`).type(value);
    });

    // Fill out select fields
    cy.get(`select[data-test-id="info-session-input-referenced-by"]`).select('Google');
    cy.get(`select[data-test-id="info-session-input-session-date"]`).select(1);

    // Click SMS radio to 'yes' to check disclaimer message
    cy.get(`input[data-test-id="radio-input-sms-opt-in-true"]`).click();

    cy.get(`[data-test-id="sms-disclaimer"]`).should(
      'contain.text',
      `By providing your phone number, you agree to receive text messages from Operation Spark. We'll send you information and reminders about your upcoming session. You can also text us with any additional questions. Message and data rates may apply. Message frequency varies. Reply "STOP" to opt-out.`,
    );

    // Click SMS radio to 'no' to check disclaimer message (and to submit the form)
    cy.get(`input[data-test-id="radio-input-sms-opt-in-false"]`).click();
    cy.get(`[data-test-id="sms-disclaimer"]`).should(
      'contain.text',
      `By opting out of text messages, you acknowledge that you may miss important information about upcoming sessions and registrations.`,
    );

    // Click radios
    cy.get(`button[data-test-id="info-session-submit-button"]`).click();

    // Ensure modal opens with correct message
    cy.get(`[data-test-id="info-session-submit-message"]`)
      .should('be.visible')
      .should(
        'contain.text',
        'You have successfully registered for an info session on Tuesday, September 24th',
      )
      .should('contain.text', 'You will receive an email  shortly.');

    // Check that the "registration" link is rendered with the correct href and text
    cy.get(`[data-test-id="info-session-registration-link"]`)
      .should('have.attr', 'href', 'https://operationspark.org')
      .should('contain.text', 'View your registration details');

    // Close modal
    cy.get(`button[data-test-id="info-session-details-close-button"]`).click();

    // Check that the modal closes
    cy.get(`[data-test-id="info-session-submit-message"]`).should('not.exist');

    // Check that the form is cleared
    textInputs.forEach(({ selector, value }) => {
      cy.get(`input[data-test-id="${selector}"]`).should('have.value', '');
    });

    cy.get(`select[data-test-id="info-session-input-referenced-by"]`).should('have.value', null);
    cy.get(`select[data-test-id="info-session-input-session-date"]`).should('have.value', null);
    cy.get(`input[data-test-id="radio-input-sms-opt-in-false"]`).should('have.value', 'false');
  });
});
