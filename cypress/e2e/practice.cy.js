describe('Practice Test Suite', () => {
  it('should visit the homepage', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('Kitchen Sink').should('be.visible')
  })

  it('should interact with buttons', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('get').click()
    cy.url().should('include', '/commands/querying')
  })

  it('should fill out a form', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })

  it('should handle dropdowns', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-select').select('apples')
    cy.get('.action-select').should('have.value', 'fr-apples')
  })

  it('should check checkboxes', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-checkboxes [type="checkbox"]').first().check()
    cy.get('.action-checkboxes [type="checkbox"]').first().should('be.checked')
  })

  it('should verify API responses', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.greaterThan(0)
    })
  })

  it('should handle network requests', () => {
    cy.visit('https://example.cypress.io/commands/network-requests')
    cy.intercept('GET', '**/comments/*').as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').its('response.statusCode').should('eq', 200)
  })

  it('should work with fixtures', () => {
    cy.fixture('example.json').then((data) => {
      expect(data).to.have.property('name')
    })
  })

  it('should handle custom commands', () => {
    // Assuming a custom command is defined in support/commands.js
    // cy.login('username', 'password')
    cy.visit('https://example.cypress.io')
  })

  it('should test viewport responsiveness', () => {
    cy.visit('https://example.cypress.io')
    cy.viewport('iphone-6')
    cy.contains('Kitchen Sink').should('be.visible')
    cy.viewport('macbook-15')
    cy.contains('Kitchen Sink').should('be.visible')
  })

//   it('should perform a Google search', () => {
//     cy.visit('https://www.google.com')
//     cy.get('input[name="q"]').type('Cypress testing{enter}')
//     cy.url().should('include', 'search')
//     cy.contains('Cypress').should('be.visible')
//   })

  // it('should test form submission on a demo site', () => {
  //   cy.visit('https://demoqa.com/text-box')
  //   cy.get('#userName').type('John Doe')
  //   cy.get('#userEmail').type('john.doe@example.com')
  //   cy.get('#currentAddress').type('123 Main St, Anytown, USA')
  //   cy.get('#permanentAddress').type('456 Oak Ave, Somewhere, USA')
  //   cy.get('#submit').click()
  //   cy.get('#name').should('contain', 'John Doe')
  //   cy.get('#email').should('contain', 'john.doe@example.com')
  // })

//   it('should test navigation and breadcrumbs', () => {
//     cy.visit('https://example.cypress.io')
//     cy.contains('Querying').click()
//     cy.url().should('include', '/commands/querying')
//     cy.contains('get').should('be.visible')
//     cy.go('back')
//     cy.url().should('eq', 'https://example.cypress.io/')
//   })

  it('should test local storage', () => {
    cy.visit('https://example.cypress.io/commands/storage')
    cy.get('.ls-btn').click()
    cy.window().then((win) => {
      expect(win.localStorage.getItem('prop1')).to.eq('red')
    })
  })

//   it('should test error handling', () => {
//     cy.visit('https://httpstat.us/404')
//     cy.contains('404').should('be.visible')
//   })

  it('should test API with different HTTP methods', () => {
    cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
    })
  })

  it('should test file upload', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    cy.get('#file-submit').click()
    cy.contains('File Uploaded!').should('be.visible')
  })

  it('should test drag and drop', () => {
    cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

    // Simulate drag and drop using dataTransfer
    cy.get('#column-a').then($source => {
      cy.get('#column-b').then($target => {
        const dataTransfer = new DataTransfer()
        $source[0].dispatchEvent(new DragEvent('dragstart', { dataTransfer }))
        $target[0].dispatchEvent(new DragEvent('drop', { dataTransfer }))
        $source[0].dispatchEvent(new DragEvent('dragend', { dataTransfer }))
      })
    })

    cy.get('#column-a').should('contain', 'B')
    cy.get('#column-b').should('contain', 'A')
  })

//   it('should test iframe content', () => {
//     cy.visit('https://the-internet.herokuapp.com/iframe')
//     cy.get('#mce_0_ifr').then($iframe => {
//       const $body = $iframe.contents().find('body')
//       cy.wrap($body).clear().type('Hello from Cypress!')
//       cy.wrap($body).should('contain', 'Hello from Cypress!')
//     })
//   })
})
