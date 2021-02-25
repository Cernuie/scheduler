describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
   cy.get("[alt=Add]")
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //force click edit button
    cy.get("[alt=Edit]")
    .click({force:true})

    //change name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Alexander Nguyen")
    
    cy.get(':nth-child(2) > .interviewers__item-image')
      .click()
    
    //saves edit
    cy.contains("Save")
      .click()

    //checks if it contains name and interviewer wanted
    cy.contains(".appointment__card--show", "Alexander Nguyen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
 
  })

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
  
 });
 