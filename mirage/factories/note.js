import { Factory, faker, hasMany } from 'ember-cli-mirage';

const createdAt =  faker.date.recent();
const updatedAt = faker.date.recent();

export default Factory.extend({
  id(i) { return i; },
  body() { return faker.lorem.paragraphs(); },
  priority(i) { return i },
  created() { return createdAt; },
  updated() { return updatedAt; }
});
