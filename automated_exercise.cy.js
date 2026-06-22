describe("Homepage Load Test", () => {
  it("should successfully load the homepage URL", () => {
    cy.visit("https://automationexercise.com");
  });

  it("The logo should be visible", () => {
    cy.visit("https://automationexercise.com");
    cy.get(".logo img").should("be.visible");
  });

  it("The navigation menu is visible ", () => {
    cy.visit("https://automationexercise.com");
    cy.get(".shop-menu").should("be.visible");
  });
  it("The  Signup / Login link is visible", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup / Login").should("be.visible");
  });
});

describe("User Registration and Cleanup Flow", () => {
  it("should successfully register a new user and then delete the account", () => {
    cy.visit("https://automationexercise.com");

    cy.contains("Signup / Login").click();

    const uniqueEmail = `grace_${Date.now()}@example.com`;
    cy.get('[data-qa="signup-name"]').type("Grace Mwai");
    cy.get('[data-qa="signup-email"]').type(uniqueEmail);

    cy.get('[data-qa="signup-button"]').click();

    cy.get("#id_gender2").check();

    cy.get('[data-qa="password"]').type("SuperSecurePass123!");

    cy.get('[data-qa="days"]').select("21");
    cy.get('[data-qa="months"]').select("July");
    cy.get('[data-qa="years"]').select("1999");

    cy.get('[data-qa="first_name"]').type("Grace");
    cy.get('[data-qa="last_name"]').type("Mwai");
    cy.get('[data-qa="address"]').type("23 Test Automation Way");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("California");
    cy.get('[data-qa="city"]').type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("90001");
    cy.get('[data-qa="mobile_number"]').type("+15550192834");

    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]').should("be.visible");
    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    cy.get(".shop-menu").contains("Logged in as").should("be.visible");

    cy.get(".shop-menu").contains("Delete Account").click();

    cy.get('[data-qa="account-deleted"]').should("be.visible");
    cy.contains("Account Deleted!").should("be.visible");
  });
});

describe("login and logout", () => {
  it("successfully register a new user, login and log out", () => {
    cy.visit("https://automationexercise.com");

    cy.contains("Signup / Login").click();

    const uniqueEmail = `susan_${Date.now()}@example.com`;
    cy.get('[data-qa="signup-name"]').type("Susan Wanjiru");
    cy.get('[data-qa="signup-email"]').type(uniqueEmail);

    cy.get('[data-qa="signup-button"]').click();

    cy.get("#id_gender2").check();

    cy.get('[data-qa="password"]').type("SuperSecurePass123!");

    cy.get('[data-qa="days"]').select("21");
    cy.get('[data-qa="months"]').select("July");
    cy.get('[data-qa="years"]').select("1999");

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    cy.get('[data-qa="first_name"]').type("Susan");
    cy.get('[data-qa="last_name"]').type("Wanjiru");
    cy.get('[data-qa="address"]').type("423 Test Automation Way");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("California");
    cy.get('[data-qa="city"]').type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("90001");
    cy.get('[data-qa="mobile_number"]').type("+15550192834");

    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]').should("be.visible");
    cy.contains("Account Created!").should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    cy.get(".shop-menu").should("contain.text", "Logged in as Susan Wanjiru");

    cy.get('.shop-menu a[href="/delete_account"]').click();

    cy.get('[data-qa="account-deleted"]').should("be.visible");
    cy.contains("Account Deleted!").should("be.visible");

    cy.get('[data-qa="continue-button"]').click();
  });
});

describe("Test Case 4: Login With Invalid Credentials", () => {
  it("Cannot login with invalid credentials", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("fake_nonexistent_user@invalid.com");
    cy.get('[data-qa="login-password"]').type("WrongPassword123");
    cy.get('[data-qa="login-button"]').click();

    cy.get(".login-form form p")
      .should("be.visible")
      .and("contain.text", "Your email or password is incorrect!");
  });
});

describe(" Product Search", () => {
  it("Test Case 5: Search for a Product", () => {
    cy.visit("https://automationexercise.com");
    cy.get('a[href="/products"]').click();
    cy.get("#search_product").type("Dress");
    cy.get("#submit_search").click();
    cy.get(".title").should("contain.text", "Searched Products");
    cy.get(".features_items").should("contain.text", "Dress");
  });
});
describe(" Product Details", () => {
  it("Test Case 6: View product details", () => {
    cy.visit("https://automationexercise.com");
    cy.get('a[href="/products"]').click();
    cy.get(".choose > .nav > li > a").first().click();
    cy.url().should("include", "/product_details/");

    cy.get(".product-information h2").should("be.visible");
    cy.get(".product-information p").should("contain.text", "Category:");
    cy.get(".product-information span span").should("be.visible");
    cy.get(".product-information")
      .should("contain.text", "Availability:")
      .and("contain.text", "Condition:")
      .and("contain.text", "Brand:");
  });
});
describe("Cart Functionality", () => {
  it("Test Case 7: Add Product to Cart", () => {
    cy.visit("https://automationexercise.com");
    cy.get('a[href="/products"]').click();
    cy.get(".features_items .col-sm-4")
      .first()
      .within(() => {
        cy.get(".add-to-cart").first().click();
      });

    cy.get(".modal-content").should("be.visible");
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.url().should("include", "/view_cart");

    cy.get("#cart_info_table tbody tr").should("have.length.at.least", 1);
    cy.get(".cart_price").should("be.visible");
    cy.get(".cart_quantity").should("be.visible");
  });
});

it("Test Case 8: Remove Product From Cart", () => {
  cy.visit("https://automationexercise.com");
  cy.get('a[href="/products"]').click();
  cy.get(".features_items .col-sm-4")
    .first()
    .within(() => {
      cy.get(".add-to-cart").first().click();
    });
  cy.get('.modal-body a[href="/view_cart"]').click();

  cy.get(".cart_quantity_delete").click();
  cy.get("#empty_cart").should("be.visible");
});

describe("Contact Form", () => {
  it("Test Case 9: Submit Contact Us Form", () => {
    cy.get('a[href="/contact_us"]').click();
    cy.get(".contact-form").should("be.visible");

    cy.get('[data-qa="name"]').type("QA Tester");
    cy.get('[data-qa="email"]').type("tester@example.com");
    cy.get('[data-qa="subject"]').type("Automation Query");
    cy.get('[data-qa="message"]').type("Automating this form using Cypress.");

    cy.on("window:alert", (text) => {
      expect(text).to.contain("Press OK");
    });
    cy.on("window:confirm", () => {
      return true;
    });

    cy.get('[data-qa="submit-button"]').click();
    cy.get(".status")
      .should("be.visible")
      .and(
        "contain.text",
        "Success! Your details have been submitted successfully.",
      );
  });
});
it("Challenge Task 2: Verify Product Quantity", () => {
  cy.visit("https://automationexercise.com");

  cy.get('a[href="/products"]').click();
  cy.get(".choose > .nav > li > a").first().click();

  cy.get("#quantity").clear().type("3");
  cy.get(":nth-child(5) > .btn").click();

  cy.get('.modal-body a[href="/view_cart"]').click();
  cy.get(".cart_quantity button").should("contain.text", "3");
});

it("Challenge Task 3: Subscribe to Newsletter", () => {
  cy.get("#footer").scrollIntoView();
  cy.get(".single-widget h2").should("contain.text", "Subscription");

  cy.get("#susbscribe_email").type("subscriber@example.com");
  cy.get("#subscribe").click();

  cy.get(".alert-success")
    .should("be.visible")
    .and("contain.text", "You have been successfully subscribed!");
});




describe('Challenge 1: Add Multiple Products to Cart', () => {

  it('should navigate to products page, add two items, and verify them in the cart', () => {
  
    cy.visit("https://automationexercise.com");

    
    cy.get('a[href="/products"]').click();

    
    cy.url().should('include', '/products');
    cy.get('.title').should('contain.text', 'All Products');


    cy.get('.features_items')
      .contains('Blue Top')
      .parents('.product-image-wrapper')
      .find('.add-to-cart')
      .first()
      .click();

   
    cy.get('.modal-content').should('be.visible');
    cy.get('.btn-success').contains('Continue Shopping').click();

   
    cy.get('.features_items')
      .contains('Men Tshirt')
      .parents('.product-image-wrapper')
      .find('.add-to-cart')
      .first()
      .click();

  
    cy.get('.modal-content').should('be.visible');

 
    cy.get('.modal-body a[href="/view_cart"]').click();

   
    cy.url().should('include', '/view_cart');

  
    cy.get('#cart_info_table').within(() => {
      cy.contains('Blue Top').should('be.visible');
      cy.contains('Men Tshirt').should('be.visible');
    });
  });

});



describe('Challenge 2: Verify Product Quantity in Cart', () => {

  it('should change product quantity on details page and verify it inside the cart', () => {
 
    cy.visit("https://automationexercise.com");

 
    cy.get('.features_items .choose a').first().click();

  
    cy.url().should('include', '/product_details/');
    cy.get('.product-information h2').should('contain.text', 'Blue Top');

    cy.get('#quantity')
      .clear()        
      .type('3')      
      .should('have.value', '3'); 

  
    cy.get('button.cart').click();

  
    cy.get('.modal-content').should('be.visible');

  
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');

    cy.get('#cart_info_table').within(() => {
     
      cy.contains('Blue Top').should('be.visible'); 
      
    
      cy.get('.cart_quantity button')
        .should('have.text', '3');
    });
  });

});
