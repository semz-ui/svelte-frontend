

describe('home page', () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it('passes', () => {

    cy.get("h2").contains("Login")
    cy.wait(500)

    //redirect back to login if user is not logged
    cy.visit("/dashboard")
    cy.location("pathname").should("not.eq", "/dashboard")
    cy.wait(500)

    //login existing user
    const email = "test@gmail.com"
    const password = "password"
    cy.getDataTest("login-email").type(email)
    cy.getDataTest("login-password").type(password)
    cy.getDataTest("login-button").click()
    cy.location("pathname").should("eq", "/dashboard")
    cy.get("h2").contains("Welcome back")
    cy.wait(500)


    //add todo
    const addTodo = "Testing Cypress"
    cy.getDataTest("todo-input").type(addTodo)
    cy.getDataTest("todo-button").click()
    cy.contains(addTodo).should("exist")
    cy.wait(500)


    //update todo
    const editText = " (edit)"
    cy.contains("[data-test=todo-items]", addTodo) // find the todo item by text
      .within(() => {
        cy.get("[data-test=edit-todo]").click({ multiple: true })
      });
    // cy.getDataTest("edit-todo").eq(0).click();
    cy.getDataTest("todo-input").type(editText);
    cy.getDataTest("todo-button").click()
    cy.contains(editText).should("exist")
    cy.wait(500)

    // delete todo
    cy.get("[data-test=todo-items]")
      .contains(addTodo + editText)
      .find("[data-test=delete-todo-button]")
      .click({ multiple: true });

    cy.contains(addTodo).should("not.exist");
    cy.wait(500)

    //logout user
    cy.getDataTest("logout-button").click();
    cy.location("pathname").should("not.eq", "/dashboard")
    cy.location("pathname").should("eq", "/auth")
  })

})