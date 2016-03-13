export default function() {
  let duration = 300;
  this.transition(
    this.includingInitialRender(),
    this.hasClass('--liquid-sidebar'),
    this.toValue(true),
    this.use('toLeft', {duration, easing: [0.6, -0.28, 0.735, 0.045]}),
    this.reverse('toRight', {duration, easing: [0.6, -0.28, 0.735, 0.045]})
  );
}
