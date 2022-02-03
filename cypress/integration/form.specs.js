/// <references types="Cypress" />;

const URL = "http://127.0.0.1:8080/";

describe("Verifica la funcionalidad del formulario", () => {
  before(() => {
    cy.visit(URL);
  });

  it("verifica que se creen tantos inputs como integrantes hayan", () => {
    cy.get("#cantidad-integrantes").type(4);
    cy.get("#siguiente-paso").click();
    cy.get(".integrante input").eq(0).type(22);
    cy.get(".integrante input").eq(1).type(15);
    cy.get(".integrante input").eq(2).type(40);
    cy.get(".integrante input").eq(3).type(43);

    cy.get("#calcular").click();

    cy.get("#mayor-edad").should("have.text", "43");
    cy.get("#menor-edad").should("have.text", "15");
    cy.get("#promedio-edad").should("have.text", "30");

  });
});
