/**
 * LOGIN PAGE TESTS
 */

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

/**
 * REGISTER PAGE TESTS
 */

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


/**
 * ME PAGE TESTS
 */

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




/**
 * SESSIONS PAGE TEST
 */
describe('Sessions page test', () => {

  const sessions = [
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
  ];



  it('should display sessions as user', () => {
    /**
      * Login du user
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

    cy.intercept('GET', `/api/user/${user.id}`, { ...user });

    cy.intercept('GET', "/api/session", [...sessions])

    cy.intercept('GET', `/api/session/${sessions[0].id}`, [...sessions][0])

    cy.intercept('POST', `/api/session/1/participate/1`, {
      "id": 1,
      "lastName": "DELAHAYE",
      "firstName": "Margot",
      "createdAt": "2024-07-29T14:07:32",
      "updatedAt": "2024-07-29T14:07:32"
  })

  cy.intercept("GET", "/api/teacher/1", {
    statusCode: 200,
    body: {
      id: 1,
      lastName: "DELAHAYE",
      firstName: "Margot",
      createdAt: "2024-07-29T14:07:32",
      updatedAt: "2024-07-29T14:07:32"
    }
  })


    cy.visit('/login')





    cy.get("input[formControlName=email]").type("razzak@gmail.com")
    cy.get("input[formControlName=password]").type("abdel22!")
    cy.get("button[mat-raised-button]").click()

    cy.wait(100);

    /**
     * test de l'affichage
     */
    cy.get('.m0').should('contain', 'Rentals available')
    cy.get('mat-card-title').should('contain', 'testttt')
    cy.get('mat-card-subtitle').should('contain', 'Session on July 10, 2024')
    cy.get('p').eq(0).should('contain', 'test')

    cy.get('button').eq(0).click()

    cy.wait(100)
    // bascule sur le detail de la session
    cy.get('h1').should('contain', 'Testttt')
    cy.contains('span', 'Participate').should('exist')
    cy.get('button').eq(1).click()
    cy.contains('span', 'Do not participate').should('exist')
    cy.contains('span', 'attendees').should('contain', '2 attendees')
    cy.get('button').eq(1).click()
    cy.contains('span', 'Participate').should('exist')
  })



  it('should display sessions as admin', () => {
      /**
      * Login du user
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

  cy.intercept('GET', `/api/user/${user.id}`, { ...user });

  cy.intercept('GET', "/api/session", [...sessions])

  cy.intercept('GET', `/api/session/${sessions[0].id}`, [...sessions][0])

  cy.intercept('POST', `/api/session/1/participate/1`, {
    "id": 1,
    "lastName": "DELAHAYE",
    "firstName": "Margot",
    "createdAt": "2024-07-29T14:07:32",
    "updatedAt": "2024-07-29T14:07:32"
})

cy.intercept("GET", "/api/teacher/1", {
  statusCode: 200,
  body: {
    id: 1,
    lastName: "DELAHAYE",
    firstName: "Margot",
    createdAt: "2024-07-29T14:07:32",
    updatedAt: "2024-07-29T14:07:32"
  }
})




  cy.visit('/login')


  cy.get("input[formControlName=email]").type("razzak@gmail.com")
  cy.get("input[formControlName=password]").type("abdel22!")
  cy.get("button[mat-raised-button]").click()

  cy.wait(100);

  /**
   * test de l'affichage
   */
  cy.get('.m0').should('contain', 'Rentals available')
  cy.get('mat-card-title').should('contain', 'testttt')
  cy.get('mat-card-subtitle').should('contain', 'Session on July 10, 2024')
  cy.get('p').eq(0).should('contain', 'test')
  cy.contains('span', 'Create').should('exist')
  cy.contains('span', 'Edit').should('exist')




  cy.get('button').eq(1).click()    // bascule sur le detail de la session
  cy.wait(100)


  cy.get('h1').should('contain', 'Testttt')
  cy.contains('span', 'Delete').should('exist')


  cy.get('button').eq(0).click()   // clique sur bouton page precedente
  cy.wait(100)

  cy.contains('span', 'Create').click()  // bascule sur le create de la session
  cy.wait(100)

  cy.contains('button', 'Save').should('be.disabled')
  cy.get('input[formControlName=name]').type('razzak')
  cy.get('input[formControlName=date]').type('1995-07-25')
  cy.get('mat-select[formControlName="teacher_id"]').click();
  cy.get('mat-option').contains('Margot DELAHAYE').click();
  cy.get('textarea[formControlName=description]').type('ok')
  cy.contains('button', 'Save').should('be.enabled')


  })


})
