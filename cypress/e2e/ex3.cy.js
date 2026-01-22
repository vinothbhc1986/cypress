context("traveral", () => {
    beforeEach(() => {
      cy.visit("https://example.cypress.io/commands/traversal");
    });
  
    it("find element by class", () => {
      cy.get(".traversal-breadcrumb").find("li").should("have.length", 3);
    });
  
    it("find element by text", () => {
      cy.get(".traversal-breadcrumb")
        .find("li")
        .contains("Home")
        .should("be.visible");
    });
  
    it("find element by index", () => {
      cy.get(".traversal-breadcrumb").find("li").eq(0).should("contain", "Home");
    });
  
    it("find element by attribute", () => {
      cy.get(".traversal-breadcrumb")
        .find("li")
        .first()
        .should("contain", "Home");
    });
  
    it("find element by attribute", () => {
      cy.get(".traversal-breadcrumb").find("li").last().should("contain", "Data");
    });
  
    it("active element", () => {
      cy.get(".traversal-breadcrumb")
        .children(".active")
        .should("contain", "Data");
    });
  
    it("To get a DOM element at a specific index, use the .eq() command.", () => {
      cy.get(".traversal-list>li").eq(2).should("contain", "persian");
    });
  
    it("To get DOM elements that match a specific selector, use the .filter() command.", () => {
      cy.get(".traversal-nav>li").filter(".active").should("contain", "About");
    });
  
    it("To get the first DOM element within elements, use the .first() command.", () => {
      cy.get(".traversal-table td").first().should("contain", "1");
    });
  
    it("To get the last DOM element within elements, use the .last() command.", () => {
      cy.get(".traversal-buttons .btn").last().should("contain", "Submit");
    });
  
    it("To get the next sibling DOM element within elements, use the .next() command", () => {
      cy.get(".traversal-ul")
        .contains("apples")
        .next()
        .should("contain", "oranges");
    });
  
    it("To get all of the next sibling DOM elements within elements, use the .nextAll() command", () => {
      cy.get(".traversal-next-all")
        .contains("oranges")
        .nextAll()
        .should("have.length", 3);
    });
  
     it("To get all of the next sibling DOM elements within elements until another element, use the .nextUntil() command", () => {
      cy.get("#veggies").nextUntil("#nuts").should("have.length", 3);
    });
  
    it("To get parent DOM element of elements, use the .parent() command", () => {
      cy.get(".traversal-mark").parent().should("contain", "Morbi leo risus");
    });
  
    it("To get the previous sibling DOM element within elements, use the .prev() command", () => {
      cy.get(".birds").find(".active").prev().should("contain", "Lorikeets");
    });
  
    it("To get all previous sibling DOM elements within elements, use the .prevAll() command", () => {
      cy.get(".fruits-list").find(".third").prevAll().should("have.length", 2);
    });
  
    it("To get all previous sibling DOM elements within elements until other element, use the .prevUntil() command", () => {
      cy.get(".foods-list")
        .find("#nuts")
        .prevUntil("#veggies")
        .should("have.length", 3);
    });
  
    it("To get parents DOM element of elements, use the .parents() command", () => {
      cy.get(".traversal-cite").parents().should("match", "blockquote");
    });
  
   
    it("To get all sibling DOM elements of elements, use the .siblings() command.", () => {
      cy.get(".traversal-pills .active").siblings().should("have.length", 2);
    });
  
    it("Cypress.Promise - instantiate a promise", () => {
      let waited = false;
  
   
      function waitOneSecond() {
        // return a promise that resolves after 1 second
        return new Cypress.Promise((resolve, reject) => {
          setTimeout(() => {
            // set waited to true
            waited = true;
  
            // resolve with 'foo' string
            resolve("foo");
          }, 1000);
        });
      }
  
      cy.then(() => {
        // return a promise to cy.then() that
        // is awaited until it resolves
        return waitOneSecond().then((str) => {
          expect(str).to.eq("foo");
          expect(waited).to.be.true;
        });
      });
    });
  });
  