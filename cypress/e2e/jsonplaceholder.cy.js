import { faker } from "@faker-js/faker";

describe('API Testing with Cypress', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  it('should retrieve a list of users', () => {
    cy.request(`${BASE_URL}/users`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.above(0);
      });
  });

  it('should create a new post', () => {
    const postTitle = faker.lorem.words(3);
    const postBody = faker.lorem.paragraph();

    cy.request('POST', `${BASE_URL}/posts`, {
      title: postTitle,
      body: postBody,
      userId: 1,
    })
      .should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq(postTitle);
        expect(response.body.body).to.eq(postBody);
      });
  });

  it('should retrieve a specific post', () => {
    cy.request(`${BASE_URL}/posts/1`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.userId).to.be.a('number');
        expect(response.body.title).to.be.a('string');
        expect(response.body.body).to.be.a('string');
      });
  });
});