const mainFormFields = [
  {
    testId: 'text-input-first-name',
    value: 'Halle',
  },
  {
    testId: 'text-input-last-name',
    value: 'Bot',
  },
  {
    testId: 'email-input-email',
    value: 'halle.bot@operationspark.org',
  },
  {
    testId: 'text-input-position',
    value: 'Robot',
  },
  {
    testId: 'text-input-district',
    value: 'Sparkle',
  },
  {
    testId: 'text-input-schools',
    value: 'Operation Spark',
  },
];

const proxyFormFields = [
  {
    testId: 'text-input-proxy-first-name',
    value: 'Wall-E',
  },
  {
    testId: 'text-input-proxy-last-name',
    value: 'Boot',
  },
  {
    testId: 'email-input-proxy-email',
    value: 'halle.proxy@operationspark.org',
  },
  {
    testId: 'text-input-proxy-position',
    value: 'Proxy Robot',
  },
];
const billingFormFields = [
  {
    testId: 'text-input-billing-name',
    value: 'Money Bot',
  },
  {
    testId: 'email-input-billing-email',
    value: 'halle.billing@operationspark.org',
  },
];

describe('Teacher Training Signup', () => {
  beforeEach(() => {
    cy.intercept('/api/signups/training', { statusCode: 200 });
  });
  it('Should submit valid teacher training signup where user is signing themselves up and paying', () => {
    // Intercept form submission and send back URL

    // Navigate from home page to info session page
    cy.visit('/');
    cy.get('[data-test-id="nav-link-high-school"]').trigger('mouseover');
    cy.get('[data-test-id="teacher-training"]').click({ timeout: 10000 });
    cy.get('[data-test-id="teacher-training-info-1"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-info-2"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-register-1"]').should('be.visible');
    cy.get('[data-test-id="teacher-training-register-2"]').click();
    cy.get('[data-test-id="form-step-1"]').should('be.visible');

    // Fill out teacher info
    mainFormFields.forEach((field) => {
      cy.get('[data-test-id="form-next-btn-step-1"]').should('have.class', 'disabled');
      cy.get(`[data-test-id="${field.testId}"]`).type(field.value);
    });

    // Verify that the next button no longer has the class 'disabled'
    cy.get('[data-test-id="form-next-btn-step-1"]').should('not.have.class', 'disabled');

    // Go to step 2
    cy.get('[data-test-id="form-next-btn-step-1"]').click();
    cy.get('[data-test-id="form-step-2"]').should('be.visible');

    // Go back to step 1
    // Check that the back button works, returns to step 1
    cy.get('[data-test-id="form-back-btn-step-2"]').click();
    cy.get('[data-test-id="form-step-1"]').should('be.visible');

    // Verify that the data persists
    mainFormFields.forEach((field) => {
      cy.get(`[data-test-id="${field.testId}"]`).should('have.value', field.value);
    });

    // Go back to step 2
    cy.get('[data-test-id="form-next-btn-step-1"]').click();
    cy.get('[data-test-id="form-step-2"]').should('be.visible');

    // Check that button is not selected
    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default');

    // Check that button is not selected and click
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default');

    cy.get('[data-test-id="form-next-myself-btn"]').click();

    // Should skip step 3 (proxy info)
    cy.get('[data-test-id="form-step-3"]').should('not.exist');

    // Expect step 4 (Question: Signing someone else up)
    cy.get('[data-test-id="form-step-4"]').should('be.visible');

    // Expect to go back to step 2 ▶︎ step 1 (skip step 3)
    cy.get('[data-test-id="form-back-btn-step-4"]').click();
    cy.get('[data-test-id="form-step-2"]').should('be.visible');

    // Check that button is not selected
    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('not.have.class', 'form-btn-selected')
      .should('have.class', 'form-btn-default');

    // Check that button is still selected
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('not.have.class', 'form-btn-default')
      .should('have.class', 'form-btn-selected');

    // Go back to step 4
    cy.get('[data-test-id="form-next-btn-step-2"]').click();

    // Expect to go back to step 4
    cy.get('[data-test-id="form-step-4"]').should('be.visible');

    // Check that button is not selected
    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('be.visible')
      .should('not.have.class', 'form-btn-selected')
      .should('have.class', 'form-btn-default');

    // Check that button is not selected and click
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default')
      .should('not.have.class', 'form-btn-selected');

    cy.get('[data-test-id="form-next-myself-btn"]').click();

    // Should skip to step 6 (Policy/acknowledgements)
    cy.get('[data-test-id="form-step-6"]').should('be.visible');
    cy.get('[data-test-id="form-next-btn-step-6"]').should('have.class', 'disabled');

    cy.get('[data-test-id="checkbox-confirm-read"]').click();
    cy.get('[data-test-id="checkbox-confirm-available"]').click();

    // still disabled
    cy.get('[data-test-id="form-next-btn-step-6"]').should('have.class', 'disabled');
    cy.get('[data-test-id="checkbox-confirm-resources"]').click();

    // No longer disabled
    cy.get('[data-test-id="form-next-btn-step-6"]').should('not.have.class', 'disabled');
    cy.get('[data-test-id="form-next-btn-step-6"]').click();

    // Expect step 7 (Review)
    cy.get('[data-test-id="form-step-7"]').should('be.visible');

    const reviewFields = [
      {
        testId: 'first-name',
        label: 'First Name',
        value: 'Halle',
        exists: true,
        edit: true,
      },
      {
        testId: 'last-name',
        label: 'Last Name',
        value: 'Bot',
        exists: true,
        edit: true,
      },
      {
        testId: 'email',
        label: 'Email',
        value: 'halle.bot@operationspark.org',
        exists: true,
        edit: true,
      },
      {
        testId: 'position',
        label: 'Position',
        value: 'Robot',
        exists: true,
        edit: true,
      },
      {
        testId: 'district',
        label: 'District',
        value: 'Sparkle',
        exists: true,
        edit: true,
      },
      {
        testId: 'schools',
        label: 'Schools',
        value: 'Operation Spark',
        exists: true,
        edit: true,
      },
      {
        testId: 'proxy-first-name',
        exists: false,
      },
      {
        testId: 'proxy-last-name',
        exists: false,
      },
      {
        testId: 'proxy-email',
        exists: false,
      },
      {
        testId: 'proxy-position',
        exists: false,
      },
      {
        testId: 'billing-name',
        label: 'Billing Name',
        value: 'Halle Bot',
        exists: true,
        edit: false,
      },
      {
        testId: 'billing-email',
        label: 'Billing Email',
        value: 'halle.bot@operationspark.org',
        exists: true,
        edit: false,
      },
    ];
    // Verify that the review fields are correct

    reviewFields.forEach((field) => {
      if (field.exists) {
        cy.get(`[data-test-id="review-row-${field.testId}"]`).should('be.visible');
        cy.get(`[data-test-id="review-label-${field.testId}"]`).should('have.text', field.label);
        cy.get(`[data-test-id="review-value-${field.testId}"]`).should('have.text', field.value);

        if (field.edit) {
          // Check that the edit button exists
          cy.get(`[data-test-id="review-edit-btn-${field.testId}"]`).should('be.visible');
        } else {
          // Check that the edit button doesn't exists and we have "Same as above" element
          cy.get(`[data-test-id="review-edit-btn-${field.testId}"]`).should('not.exist');
          cy.get(`[data-test-id="review-same-${field.testId}"]`).should('exist');
        }
      } else {
        // Should not show in review section
        cy.get(`[data-test-id="review-row-${field.testId}"]`).should('not.exist');
      }
    });

    // Submit the form
    cy.get('[data-test-id="form-submit-btn"]').click();

    // Expect success window
    cy.get('[data-test-id="signup-complete-container"]').should('be.visible');

    // Signing up self should not show the register more button
    cy.get('[data-test-id="register-more-btn"]').should('not.exist');

    // Should have button to complete and reset form
    cy.get('[data-test-id="reset-form-btn"]').should('be.visible');

    // Click the reset button should reset form
    cy.get('[data-test-id="reset-form-btn"]').click();

    // Should be back to step 1
    cy.get('[data-test-id="form-step-1"]').should('be.visible');

    // Fields should be empty
    mainFormFields.forEach((field) => {
      cy.get(`[data-test-id="${field.testId}"]`).should('have.value', '');
    });
  });

  it('Should submit valid teacher training signup where user is signing someone else up and signup user is paying', () => {
    // Intercept form submission and send back URL

    // Navigate to level 2 registration form
    cy.visit('/programs/highschool/teacherTraining/register/level-2');
    cy.get('[data-test-id="form-step-1"]').should('be.visible');

    // Fill out teacher info
    mainFormFields.forEach((field) => {
      cy.get('[data-test-id="form-next-btn-step-1"]').should('have.class', 'disabled');
      cy.get(`[data-test-id="${field.testId}"]`).type(field.value);
    });

    // Verify that the next button no longer has the class 'disabled'
    cy.get('[data-test-id="form-next-btn-step-1"]').should('not.have.class', 'disabled');

    // Go to step 2
    cy.get('[data-test-id="form-next-btn-step-1"]').click();
    cy.get('[data-test-id="form-step-2"]').should('be.visible');

    // Check that self button is not selected and click
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default');

    // Check that someone else button is not selected and click
    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default');

    cy.get('[data-test-id="form-next-someone-else-btn"]').click();

    // Should go to step 3 (Proxy info)
    cy.get('[data-test-id="form-step-3"]').should('be.visible');

    // Fill out proxy info
    proxyFormFields.forEach((field) => {
      cy.get('[data-test-id="form-next-btn-step-3"]').should('have.class', 'disabled');
      cy.get(`[data-test-id="${field.testId}"]`).type(field.value);
    });
    // Verify that the next button is no longer disabled and click
    cy.get('[data-test-id="form-next-btn-step-3"]').should('not.have.class', 'disabled');
    cy.get('[data-test-id="form-next-btn-step-3"]').click();

    // Expect step 4 (Question: Signing someone else up)
    cy.get('[data-test-id="form-step-4"]').should('be.visible');

    // Expect to go back to step 3 (not skip)
    cy.get('[data-test-id="form-back-btn-step-4"]').click();
    cy.get('[data-test-id="form-step-3"]').should('be.visible');

    // verify that the proxy info persists
    proxyFormFields.forEach((field) => {
      cy.get(`[data-test-id="${field.testId}"]`).should('have.value', field.value);
    });

    // Go back to step 4
    cy.get('[data-test-id="form-next-btn-step-3"]').click();

    // Expect to go back to step 4
    cy.get('[data-test-id="form-step-4"]').should('be.visible');

    // Check that button is not selected
    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('be.visible')
      .should('not.have.class', 'form-btn-selected')
      .should('have.class', 'form-btn-default');

    // Check that button is not selected and click
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default')
      .should('not.have.class', 'form-btn-selected');

    cy.get('[data-test-id="form-next-myself-btn"]').click();

    // Should skip to step 6 (Policy/acknowledgements)
    cy.get('[data-test-id="form-step-6"]').should('be.visible');
    cy.get('[data-test-id="form-next-btn-step-6"]').should('have.class', 'disabled');

    cy.get('[data-test-id="checkbox-confirm-read"]').click();
    cy.get('[data-test-id="checkbox-confirm-available"]').click();

    // still disabled
    cy.get('[data-test-id="form-next-btn-step-6"]').should('have.class', 'disabled');
    cy.get('[data-test-id="checkbox-confirm-resources"]').click();

    // No longer disabled
    cy.get('[data-test-id="form-next-btn-step-6"]').should('not.have.class', 'disabled');
    cy.get('[data-test-id="form-next-btn-step-6"]').click();

    // Expect step 7 (Review)
    cy.get('[data-test-id="form-step-7"]').should('be.visible');

    const reviewFields = [
      {
        testId: 'first-name',
        label: 'First Name',
        value: 'Halle',
        exists: true,
        edit: true,
      },
      {
        testId: 'last-name',
        label: 'Last Name',
        value: 'Bot',
        exists: true,
        edit: true,
      },
      {
        testId: 'email',
        label: 'Email',
        value: 'halle.bot@operationspark.org',
        exists: true,
        edit: true,
      },
      {
        testId: 'position',
        label: 'Position',
        value: 'Robot',
        exists: true,
        edit: true,
      },
      {
        testId: 'district',
        label: 'District',
        value: 'Sparkle',
        exists: true,
        edit: true,
      },
      {
        testId: 'schools',
        label: 'Schools',
        value: 'Operation Spark',
        exists: true,
        edit: true,
      },
      {
        testId: 'proxy-first-name',
        label: 'Proxy First Name',
        value: 'Wall-E',
        exists: true,
        edit: true,
      },
      {
        testId: 'proxy-last-name',
        label: 'Proxy Last Name',
        value: 'Boot',
        exists: true,
        edit: true,
      },
      {
        testId: 'proxy-email',
        label: 'Proxy Email',
        value: 'halle.proxy@operationspark.org',
        exists: true,
        edit: true,
      },
      {
        testId: 'proxy-position',
        label: 'Proxy Position',
        value: 'Proxy Robot',
        exists: true,
        edit: true,
      },
      {
        testId: 'billing-name',
        label: 'Billing Name',
        value: 'Halle Bot',
        exists: true,
        edit: false,
      },
      {
        testId: 'billing-email',
        label: 'Billing Email',
        value: 'halle.bot@operationspark.org',
        exists: true,
        edit: false,
      },
    ];
    // Verify that the review fields are correct

    reviewFields.forEach((field) => {
      if (field.exists) {
        cy.get(`[data-test-id="review-row-${field.testId}"]`).should('be.visible');
        cy.get(`[data-test-id="review-label-${field.testId}"]`).should('have.text', field.label);
        cy.get(`[data-test-id="review-value-${field.testId}"]`).should('have.text', field.value);

        if (field.edit) {
          // Check that the edit button exists
          cy.get(`[data-test-id="review-edit-btn-${field.testId}"]`).should('be.visible');
        } else {
          // Check that the edit button doesn't exists and we have "Same as above" element
          cy.get(`[data-test-id="review-edit-btn-${field.testId}"]`).should('not.exist');
          cy.get(`[data-test-id="review-same-${field.testId}"]`).should('exist');
        }
      } else {
        // Should not show in review section
        cy.get(`[data-test-id="review-row-${field.testId}"]`).should('not.exist');
      }
    });

    // Submit the form
    cy.get('[data-test-id="form-submit-btn"]').click();

    // Expect success window
    cy.get('[data-test-id="signup-complete-container"]').should('be.visible');

    // Signing up self should not show the register more button
    cy.get('[data-test-id="register-more-btn"]').should('be.visible');

    // Should have button to complete and reset form
    cy.get('[data-test-id="reset-form-btn"]').should('be.visible');

    // Click the register more button should reset form teacher info but not proxy info
    cy.get('[data-test-id="register-more-btn"]').click();

    // Should be back to step 1
    cy.get('[data-test-id="form-step-1"]').should('be.visible');

    // Fields should be empty
    mainFormFields.forEach((field) => {
      cy.get(`[data-test-id="${field.testId}"]`).should('have.value', '');
      cy.get(`[data-test-id="${field.testId}"]`).type(field.value);
    });

    // Go to step 2
    cy.get('[data-test-id="form-next-btn-step-1"]').click();
    cy.get('[data-test-id="form-step-2"]').should('be.visible');

    cy.get('[data-test-id="form-next-someone-else-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-selected')
      .should('not.have.class', 'form-btn-default');

    // Check that button is not selected and click
    cy.get('[data-test-id="form-next-myself-btn"]')
      .should('be.visible')
      .should('have.class', 'form-btn-default')
      .should('not.have.class', 'form-btn-selected');

    cy.get('[data-test-id="form-next-btn-step-2"]').click();

    cy.get('[data-test-id="form-step-3"]').should('be.visible');

    // Verify that the data persists
    proxyFormFields.forEach((field) => {
      cy.get(`[data-test-id="${field.testId}"]`).should('have.value', field.value);
    });
  });
});
