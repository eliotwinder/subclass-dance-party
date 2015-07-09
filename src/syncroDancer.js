var SyncroDancer = function(top, left, timeBetweenSteps){
  // varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.sizeState = 'inflate';
  this.timeBetweenSteps = 2000;
  this.transSync = 1000;
  this.transDefault = this.timeBetweenSteps;
  this.timeStart = clock;
  this.minSize = '20px'
  this.maxSize = '100px';
  var backgroundColors = ['green', 'purple', 'grey', 'pink', 'orange'];
  var randomNumber = Math.floor( Math.random() * backgroundColors.length);
  this.$node.addClass('syncro');
  this.$node.removeClass('dancer');
  this.$node.css('background-color', backgroundColors[randomNumber]);
  this.$node.css('width', this.minSize);
  this.$node.css('height', this.minSize);

};

SyncroDancer.prototype = Object.create(Dancer.prototype);
SyncroDancer.prototype.constructor = SyncroDancer;



SyncroDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  var styleSettings = {
    'transition-duration': (this.timeBetweenSteps/1000) + 's',
    width: '10px',
    height: '10px',
  };

  this.timeStart = clock;

  if (this.sizeState === 'inflate') {
    // set width and height to maxSize
    styleSettings.width = this.maxSize;
    styleSettings.height = this.maxSize;
    this.sizeState = 'deflate';
  } else {
    styleSettings.width = this.minSize;
    styleSettings.height = this.minSize;
    this.sizeState = 'inflate';
  }

  var mod = this.timeStart % this.transDefault;
  // if mod != 0
  if (mod !=0) {
    this.timeBetweenSteps = this.transSync;
  } else {
    this.timeBetweenSteps = this.transDefault;
  }


  // change the css transition time to timebetween steps
  this.$node.css('transition-duration', this.timeBetweenSteps);
  
  this.$node.css(styleSettings);

};

