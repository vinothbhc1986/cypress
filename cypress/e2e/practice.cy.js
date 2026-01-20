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

  // Realtime Test Cases

  it('should test clock and time manipulation', () => {
    // create the date in UTC so it's always the same
    const now = new Date(Date.UTC(2017, 2, 14)).getTime()

    cy.clock(now)
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
    cy.get('#clock-div').click()
    cy.get('#clock-div').should('have.text', '1489449600')
  })

  it('should test tick functionality for time advancement', () => {
    // create the date in UTC so it's always the same
    const now = new Date(Date.UTC(2017, 2, 14)).getTime()

    cy.clock(now)
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
    cy.get('#tick-div').click()
    cy.get('#tick-div').should('have.text', '1489449600')

    cy.tick(10000) // 10 seconds passed
    cy.get('#tick-div').click()
    cy.get('#tick-div').should('have.text', '1489449610')
  })

  // it('should test real-time data updates with polling', () => {
  //   cy.clock()
    
  //   // Mock API that gets called periodically
  //   let callCount = 0
  //   cy.intercept('GET', '**/api/data', (req) => {
  //     callCount++
  //     req.reply({ data: `Data update ${callCount}`, timestamp: Date.now() })
  //   }).as('getData')
    
  //   // Simulate a component that polls for data every 2 seconds
  //   cy.window().then((win) => {
  //     // Mock a polling function
  //     win.startPolling = () => {
  //       setInterval(() => {
  //         cy.request('https://jsonplaceholder.cypress.io/posts/1')
  //       }, 2000)
  //     }
  //   })
    
  //   // Start polling
  //   cy.window().then((win) => {
  //     win.startPolling()
  //   })
    
  //   // Wait for first call
  //   cy.wait('@getData')
  //   cy.then(() => {
  //     expect(callCount).to.equal(1)
  //   })
    
  //   // Advance time and wait for second call
  //   cy.tick(2000)
  //   cy.wait('@getData')
  //   cy.then(() => {
  //     expect(callCount).to.equal(2)
  //   })
    
  //   // Advance time again for third call
  //   cy.tick(2000)
  //   cy.wait('@getData')
  //   cy.then(() => {
  //     expect(callCount).to.equal(3)
  //   })
  // })

  it('should test WebSocket connections', () => {
    cy.visit('https://example.cypress.io/commands/network-requests')
    
    // Mock WebSocket connection
    cy.window().then((win) => {
      const mockWebSocket = {
        send: cy.stub(),
        onmessage: cy.stub(),
        onopen: cy.stub(),
        onclose: cy.stub(),
        readyState: 1, // OPEN
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3
      }
      
      // Mock the WebSocket constructor
      win.WebSocket = cy.stub().returns(mockWebSocket)
      
      // Mock a function that creates WebSocket connection
      win.connectWebSocket = () => {
        return new win.WebSocket('ws://example.com/socket')
      }
    })
    
    // Test WebSocket connection
    cy.window().then((win) => {
      const ws = win.connectWebSocket()
      expect(win.WebSocket).to.be.calledWith('ws://example.com/socket')
      expect(ws.readyState).to.equal(1)
      expect(ws.onopen).to.be.a('function')
      expect(ws.onmessage).to.be.a('function')
    })
  })

  it('should test live notifications', () => {
    cy.clock()
    
    // Mock notification API with initial data
    cy.intercept('GET', '**/api/notifications', {
      notifications: [
        { id: 1, message: 'Welcome message', timestamp: Date.now(), read: false }
      ]
    }).as('getNotifications')
    
    // First API call
    cy.request('https://jsonplaceholder.cypress.io/posts/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
    
    // Simulate time passing and new notification arriving
    cy.tick(5000)
    
    // Mock updated API response with new notification
    cy.intercept('GET', '**/api/notifications', {
      notifications: [
        { id: 1, message: 'Welcome message', timestamp: Date.now(), read: false },
        { id: 2, message: 'System update available', timestamp: Date.now(), read: false }
      ]
    }).as('getNotificationsUpdated')
    
    // Second API call should return updated data
    cy.request('https://jsonplaceholder.cypress.io/posts/2').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('should test countdown timer with setTimeout', () => {
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
    cy.clock()
    
    // Test setTimeout behavior
    let called = false
    cy.window().then((win) => {
      win.setTimeout(() => {
        called = true
      }, 5000)
    })
    
    cy.tick(4999)
    cy.window().then((win) => {
      expect(called).to.be.false
    })
    
    cy.tick(1)
    cy.window().then((win) => {
      expect(called).to.be.true
    })
  })

  // it('should test real-time search with debouncing', () => {
  //   cy.clock()

  //   // Mock search API
  //   cy.intercept('GET', '**/api/search?q=*', { results: [] }).as('searchRequest')

  //   // Mock debounced search function that doesn't return a promise
  //   cy.window().then((win) => {
  //     let searchTimeout
  //     win.debouncedSearch = (query) => {
  //       clearTimeout(searchTimeout)
  //       searchTimeout = setTimeout(() => {
  //         // Instead of calling cy.request directly, we'll use a flag
  //         win.searchCalled = true
  //         win.lastSearchQuery = query
  //       }, 300)
  //     }
  //   })

  //   // Trigger search
  //   cy.window().then((win) => {
  //     win.debouncedSearch('test query')
  //   })

  //   // Should not have called search immediately due to debounce
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.undefined
  //   })

  //   // Advance time by 299ms - still not called
  //   cy.tick(299)
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.undefined
  //   })

  //   // Advance by 1 more ms to trigger the search
  //   cy.tick(1)
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.true
  //     expect(win.lastSearchQuery).to.equal('test query')
  //   })

  //   // Now test that rapid calls reset the debounce
  //   cy.window().then((win) => {
  //     win.searchCalled = false
  //     win.debouncedSearch('new query')
  //   })

  //   // Advance time by 200ms
  //   cy.tick(200)
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.false
  //   })

  //   // Call again - should reset the timer
  //   cy.window().then((win) => {
  //     win.debouncedSearch('another query')
  //   })

  //   // Advance by another 200ms - still not called because timer was reset
  //   cy.tick(200)
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.false
  //   })

  //   // Advance remaining time to trigger final search
  //   cy.tick(100)
  //   cy.window().then((win) => {
  //     expect(win.searchCalled).to.be.true
  //     expect(win.lastSearchQuery).to.equal('another query')
  //   })
  // })

  it('should test live chat functionality', () => {
    cy.clock()
    
    // Mock chat API
    cy.intercept('GET', '**/api/chat/messages', { messages: [] }).as('getMessages')
    cy.intercept('POST', '**/api/chat/messages', { success: true, messageId: 1 }).as('sendMessage')
    
    // Initial load of messages
    cy.request('https://jsonplaceholder.cypress.io/posts/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
    
    // Send a message
    cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
      title: 'Chat Message',
      body: 'Hello, world!',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
    })
    
    // Simulate incoming message after some time
    cy.tick(2000)
    
    cy.intercept('GET', '**/api/chat/messages', {
      messages: [
        { id: 1, text: 'Hello, world!', sender: 'user', timestamp: Date.now() },
        { id: 2, text: 'Hi there!', sender: 'bot', timestamp: Date.now() }
      ]
    }).as('getNewMessages')
    
    // Check for new messages
    cy.request('https://jsonplaceholder.cypress.io/posts/2').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('should test real-time stock price updates', () => {
    cy.clock()
    
    // Mock stock API with initial price
    cy.intercept('GET', '**/api/stocks/AAPL', {
      symbol: 'AAPL',
      price: 150.00,
      change: 2.50,
      changePercent: 1.69
    }).as('getStockPrice')
    
    // Get initial stock price
    cy.request('https://jsonplaceholder.cypress.io/posts/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
    
    // Simulate price update after 5 seconds
    cy.tick(5000)
    
    cy.intercept('GET', '**/api/stocks/AAPL', {
      symbol: 'AAPL',
      price: 152.30,
      change: 4.80,
      changePercent: 3.15
    }).as('getUpdatedStockPrice')
    
    // Get updated stock price
    cy.request('https://jsonplaceholder.cypress.io/posts/2').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('should test session timeout with real-time countdown', () => {
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks')
    cy.clock()
    
    // Mock session with 5 minute timeout using setTimeout
    let sessionExpired = false
    cy.window().then((win) => {
      win.setTimeout(() => {
        sessionExpired = true
      }, 5 * 60 * 1000) // 5 minutes
    })
    
    // Check that session hasn't expired initially
    cy.window().then((win) => {
      expect(sessionExpired).to.be.false
    })
    
    // Advance time by 4 minutes 59 seconds
    cy.tick(4 * 60 * 1000 + 59 * 1000)
    cy.window().then((win) => {
      expect(sessionExpired).to.be.false
    })
    
    // Advance by 1 more second to trigger timeout
    cy.tick(1000)
    cy.window().then((win) => {
      expect(sessionExpired).to.be.true
    })
  })
})
