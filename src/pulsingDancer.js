var PulsingDancer = function(top, left, timeBetweenSteps){
  // varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.sizeState = 'inflate';
  this.timeBetweenSteps = Math.floor((Math.random() * 100) + 10);;
  var borderColors = ['green', 'purple', 'grey', 'pink', 'orange'];
  var randomNumber = Math.floor( Math.random() * borderColors.length);
  this.$node.css('border-color', borderColors[randomNumber]);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function


};
PulsingDancer.prototype = Object.create(Dancer.prototype);
PulsingDancer.prototype.constructor = PulsingDancer;

PulsingDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  var borderPace;
  var topPace;
  var borderWidth = this.$node.css('border-width').split('p')[0];
  // max size
  if (borderWidth > 48) {
    this.sizeState = 'deflate';
  //min size
  } else if (borderWidth < 12) {
    this.sizeState = 'inflate';
  }
  if (this.sizeState === 'inflate') {
    borderPace = '+=1px';
    topPace = '-=0.5px'
  } else {
    borderPace = '-=1px';
    topPace = '+=0.5px'
  }
  
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.

  this.setPosition()
  var styleSettings = {
    borderWidth: borderPace,
    borderRadius: borderPace,
    top: topPace,
    left: topPace
  };
  
  this.$node.css(styleSettings);

};