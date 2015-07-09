var FollowingDancer = function(top, left, timeBetweenSteps) {
// varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.timeBetweenSteps = 60;
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

FollowingDancer.prototype = Object.create(Dancer.prototype);
FollowingDancer.prototype.constructor = FollowingDancer;

FollowingDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.

  var styleSettings = {
    top :'' + window.currentMousePos.y + 'px',
    left :'' + window.currentMousePos.x + 'px'
  };
  
  this.$node.animate(styleSettings, 60);

};

