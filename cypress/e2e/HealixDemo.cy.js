/// <reference types="cypress" />

describe('Demo Test', () => {
  it('Verify Admin is able to delete a form from a care plan template', () => {
    // Login as admin 
    cy.visit('https://mayank-dev.citizensupport.app/')
    cy.get('button').contains('Sign In').click()
    cy.url().should('include','passwordless')
    cy.get('[data-test="button-sign-in-email-and-password"]').should('have.text','Sign In with Password').click()
    cy.get('input[name="email"]').type('admin-dev@nwtoht.ca')
    cy.get('input[name="password"]').type('password')
    cy.get('button').contains('Sign In').click()
    cy.url().should('include','home')

    // Navigate to care plan templates tab
    cy.get('button>div>h5').contains('Care Plan Templates').click()
    cy.url().should('include','templates')

    // Go to care plan template
    cy.get('table>tbody>tr').first().click()
    cy.get('[data-test="new-care-plan-template-form-status-dropdown"]').click()
    cy.get('li').contains('In Review').click()
    cy.wait(1000)
    cy.get('button').contains('Update').click()

    // Verify pop-up message
    cy.get('.MuiAlert-message').should('have.text','Template updated - NEW REVISION CREATED')

    // Naviget to Forms and Fields tab
    cy.get('button').contains('Forms and Fields').click()
    cy.get('[data-test="directly-assigned-forms-table"]>div>div:nth-child(2)>table>tbody>tr>td>div>button').eq(0).click() // It will delete first record under direcly assigned, not matter is it top of bottom
    cy.wait(1000)
    cy.get('[role="dialog"]').find('button').contains('OK').click()

    // Verify pop-up message
    cy.get('.MuiAlert-message').should('have.text','Removed form assignment and updated template')

    // Naviget to overview tab and Verify pop-up message
    cy.get('[data-test="new-careplan-template-overview-tab"]').contains('Overview').click()
    cy.get('button').contains('Update').click()
    cy.get('.MuiAlert-message').should('have.text','Template updated - existing revision updated')
  })
})