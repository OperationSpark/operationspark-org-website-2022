const testEmail = (
  expectation: string,
  email: string,
  expectedStatus: number,
  inputCleared: boolean,
) => {
  it(expectation, () => {
    cy.visit('/');
    cy.intercept('/api/subscribe').as('subscribe');
    email && cy.get('input[data-test-id="input-subscribe-email"]').type(email);
    cy.get('input[data-test-id="input-subscribe-email"]').should('have.value', email);

    cy.get('button[data-test-id="button-subscribe-email"]').click();

    cy.wait('@subscribe').then(({ response }) => {
      cy.get('input[data-test-id="input-subscribe-email"]').should(
        'have.value',
        inputCleared ? '' : email,
      );
      expect(response?.statusCode).eq(expectedStatus);
    });
  });
};

describe('Subscribe', () => {
  testEmail(
    'Should submit valid email with status of 200 and clear the input',
    'peter@gmail.com',
    200,
    true,
  );

  testEmail('Should send 400 on invalid email and not clear the input', 'peter@', 400, false);

  testEmail('Should send 400 on no email and leave input field blank', '', 400, false);
});
