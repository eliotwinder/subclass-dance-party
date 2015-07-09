var PulsingDancer = function(top, left, timeBetweenSteps){
  // varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.sizeState = 'inflate';
  this.timeBetweenSteps = 500;
  // this.timeBetweenSteps =
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function


};
PulsingDancer.prototype = Object.create(Dancer.prototype);
PulsingDancer.prototype.constructor = PulsingDancer;

PulsingDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  var pace;
  var borderWidth = this.$node.css('border-width').split('p')[0];
  if (borderWidth > 100) {
    this.sizeState = 'deflate';
  } else if (borderWidth < 10) {
    this.sizeState = 'inflate';
  }
  if (this.sizeState === 'inflate') {
    pace = '+=30px';
  } else {
    pace = '-=30px';
  }
  
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.

  var styleSettings = {
    borderWidth: pace,
    borderRadius: pace
  };
  
  this.$node.animate(styleSettings, this.timeBetweenSteps, 'linear');

};