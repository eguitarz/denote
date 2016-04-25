let imageCard = {
  name: 'image-card',
  type: 'dom',
  render(card) {
    let dom = $(`
      <div class="note-viewer__resources__item">
        <div>[ image ]</div>
        <div>${card.payload}</div>
      </div>`);
    return dom[0];
  }
};

export { imageCard };
