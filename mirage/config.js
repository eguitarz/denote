export default function() {
  this.timing = 50;

  // this.get('/collections');
  this.get('/notes');

  this.get('/collections');
  this.get('/collection/:id');
  this.patch('/collections/:id');
  this.get('/collection/:id/notes', (schema, request) => {
    let cid = parseInt(request.params.id);
    let notes = this.db.notes.filter( ({id}) => id >= cid * 10 && id < cid * 10 + 10 );
    let collection = schema.collection.find(cid);

    return {
      data: notes.map(attrs => (
        { type: 'note', id: attrs.id, attributes: attrs, collection }
      ))
    };
  });

  this.get('/notes/:id');
  this.delete('/notes/:id');
}
