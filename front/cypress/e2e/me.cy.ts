describe('Account page', () => {

  beforeEach(() => {

    cy.intercept("GET", "/api/session", []
    )

    cy.visit("/login")
    cy.wait(100);

    cy.get("input[formControlName=email]").type("razzak@gmail.com")
    cy.get("input[formControlName=password]").type("abdel22!")


  })


  it('should display an user', () => {

    /**
     * Connexion en tant que user
     *
     */
    const user = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MjI5Nzc2MjksImV4cCI6MTcyMzA2NDAyOX0.Pi75FG38BqFQyb3yLLiD_yCp2D1ZIlEoRcAnhYVpx6XcFfngn3nrpSd_wzz9jZySJMK381KREBMS4MPCNmBegQ",
      type: 'Bearer',
      id: 1,
      email: 'yoga@studio.com',
      firstName: 'User',
      lastName: 'User',
      admin: false,
      createdAt: '2024-04-15T19:37:41',
      updatedAt: '2024-04-15T15:33:42',
    }

    cy.intercept("POST", "/api/auth/login", user)

    cy.intercept('GET', `/api/user/${user.id}`, {...user});

    cy.get("button[mat-raised-button]").click()


    cy.wait(100);

    /**
     * vérification de l'affichage
     */
    cy.get("span").contains('Account').click()

    cy.get('p').eq(0).should("contain", "User USER")
    cy.get('p').eq(1).should("contain", "yoga@studio.com")
    cy.get('p').eq(3).should("contain", "April 15, 2024")
    cy.get('p').eq(4).should("contain", "April 15, 2024")

  })


  it('should display an admin', () => {
     /**
     * Connexion en tant que admin
     *
     */
     const user = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MjI5Nzc2MjksImV4cCI6MTcyMzA2NDAyOX0.Pi75FG38BqFQyb3yLLiD_yCp2D1ZIlEoRcAnhYVpx6XcFfngn3nrpSd_wzz9jZySJMK381KREBMS4MPCNmBegQ",
      type: 'Bearer',
      id: 1,
      email: 'yoga@studio.com',
      firstName: 'Admin',
      lastName: 'Admin',
      admin: true,
      createdAt: '2024-04-15T19:37:41',
      updatedAt: '2024-04-15T15:33:42',
    }

    cy.intercept("POST", "/api/auth/login", user)

    cy.intercept('GET', `/api/user/${user.id}`, {...user});

    cy.get("button[mat-raised-button]").click()

    cy.wait(100);


    /**
     * vérification de l'affichage
     */
    cy.get("span").contains('Account').click()

    cy.get('p').eq(0).should("contain", "Admin ADMIN")
    cy.get('p').eq(1).should("contain", "yoga@studio.com")
    cy.get('p').eq(2).should("contain", "You are admin")
    cy.get('p').eq(3).should("contain", "April 15, 2024")
    cy.get('p').eq(4).should("contain", "April 15, 2024")

  })

})
