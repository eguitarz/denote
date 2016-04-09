import { Factory, faker, hasMany } from 'ember-cli-mirage';

const createdAt =  faker.date.recent();
const updatedAt = faker.date.recent();

export default Factory.extend({
  id(i) { return i; },
  body(i) {
    return {
      version: '0.3.0',
      markups: [],
      atoms: [],
      cards: [['image-card', 'Hello!']],
      sections: [
        [1, 'p', [
          [0, [], 0, faker.lorem.paragraph()]
        ]],
        [10, 0]
      ]
    };
  },
  priority(i) { return i },
  created() { return createdAt; },
  updated() { return updatedAt; }
});
