import { Factory, faker, hasMany } from 'ember-cli-mirage';

const createdAt =  faker.date.recent();
const updatedAt = faker.date.recent();

export default Factory.extend({
  id(i) { return i; },
  name() { return faker.name.firstName(); },
  priority(i) { return i },
  created() { return createdAt; },
  updated() { return updatedAt; },
  notes: hasMany('note')
});
