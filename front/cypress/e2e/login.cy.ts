describe('Login page tests', () => {

  it('should redirect to sessions', () => {

    cy.intercept("POST", "/api/auth/login", {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MjI5Nzc2MjksImV4cCI6MTcyMzA2NDAyOX0.Pi75FG38BqFQyb3yLLiD_yCp2D1ZIlEoRcAnhYVpx6XcFfngn3nrpSd_wzz9jZySJMK381KREBMS4MPCNmBegQ",
      "type": "Bearer",
      "id": 1,
      "username": "yoga@studio.com",
      "firstName": "Admin",
      "lastName": "Admin",
      "admin": true
    }
    )



    cy.intercept("GET", "/api/session", [
      {
        "id": 1,
        "name": "testttt",
        "date": "2024-07-10T00:00:00.000+00:00",
        "teacher_id": 1,
        "description": "test",
        "users": [
          2
        ],
        "createdAt": "2024-07-29T19:24:57",
        "updatedAt": "2024-07-29T19:24:58"
      },
      {
        "id": 2,
        "name": "sessiontest",
        "date": "2024-08-16T00:00:00.000+00:00",
        "teacher_id": 1,
        "description": "session test pour les tu",
        "users": [],
        "createdAt": "2024-08-01T19:33:43",
        "updatedAt": "2024-08-01T19:33:43"
      }
    ]
    )

    cy.visit('/login');
    cy.wait(100);

    cy.get("button[mat-raised-button]").should("be.disabled")

    cy.get("input[formControlName=email]").type("razzak@gmail.com")
    cy.get("input[formControlName=password]").type("abdel22!")

    cy.get("button[mat-raised-button]").should("be.enabled")
    cy.get("button[mat-raised-button]").click()

    cy.url().should('include', '/sessions')

  })

  it('should display an error', () => {
    cy.visit('/login');
    cy.wait(100);

    cy.get("button[mat-raised-button]").should("be.disabled")


    cy.get("input[formControlName=email]").type("razzak@gmail.com")
    cy.get("input[formControlName=password]").type("abd")

    cy.get("button[mat-raised-button]").click()

    cy.get(".error").should("be.visible")
  })


})
