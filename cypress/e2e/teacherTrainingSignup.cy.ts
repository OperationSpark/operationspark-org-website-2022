describe('Info Session Signup', () => {
  it('Should submit valid info session signup with status of 200 and clear the input', () => {
    // Intercept form submission and send back URL
    cy.intercept('/api/signups/training', {
      statusCode: 200,
    });

    // Navigate from home page to info session page
    cy.visit('/');
    cy.get('[data-test-id="nav-link-high-school"]').trigger('mouseover');
    cy.get('[data-test-id="teacher-training"]').click({ timeout: 10000 });
    cy.get('[data-test-id="teacher-training-info-1"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-info-2"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-register-1"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-register-2"]').click();

    // TODO: Test form
  });
});
