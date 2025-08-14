/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to get element by data-test attribute
         * @example cy.getDataTest('submit-button')
         */
        getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
    }
}
