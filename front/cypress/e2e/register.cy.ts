describe('register page', () => {



  it('should create an account successfully', () => {
    cy.visit('/register');
    cy.wait(100);

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {
        "message": "User registered successfully!"
    },
    })

    cy.get("input[formControlName=firstName]").type("Razzak")
    cy.get("input[formControlName=lastName]").type("Khalfallah")
    cy.get("input[formControlName=email]").type("razzak@mail.com")
    cy.get("input[formControlName=password]").type("Razzak12!")

    cy.get("button[type=submit]").click()

    cy.url().should('include', 'login')
  })



  it('should have button disabled because of invalid input and display error on submit', () => {

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: {
        error: 'aie',
      },
    })

    cy.visit('/register');
    cy.wait(100);

    cy.get("input[formControlName=firstName]").type("Razzak")
    cy.get("input[formControlName=lastName]").type("Khalfallah")

    cy.get("button[type=submit]").should("be.disabled")

    cy.get("input[formControlName=email]").type("razzak")
    cy.get("input[formControlName=password]").type("Razzak12!")

    cy.get("button[type=submit]").should("be.disabled")

    cy.get("input[formControlName=email]").clear().type("razzak@mail.com")

    cy.get("button[type=submit]").should("be.enabled")

    cy.get("button[type=submit]").click()

    cy.get(".error").should("be.visible")
  })
})
