var SyncroDancer = function(top, left, timeBetweenSteps){
  // varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.sizeState = 'inflate';
  this.timeBetweenSteps = 500;
  this.transSync = 600;
  this.minSize = '20px'
  this.maxSize = '100px';
  this.synced = false;
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

  this.transDefault = this.timeBetweenSteps;
  this.timeStart = new Date();

  if (this.sizeState === 'inflate') {
    styleSettings.width = this.maxSize;
    styleSettings.height = this.maxSize;
    this.sizeState = 'deflate';
  } else {
    styleSettings.width = this.minSize;
    styleSettings.height = this.minSize;
    this.sizeState = 'inflate';
  }

  this.timeStart = new Date();
  var mod = this.timeStart.getTime() % this.transDefault;
  // this.synced = false;
  if (!this.synced) {
    if (mod > 50) {
      console.log('sync');
      this.timeBetweenSteps = this.transSync;
    } else {
      console.log('in phase');
      this.timeBetweenSteps = this.transDefault;
      this.synced = true;
    }
    console.log('timestart',this.timeStart.getTime());
    console.log('time',this.timeStart.getTime() - clock.getTime());
    console.log('mod', mod);
    console.log('start', this.timeStart.getTime());
    console.log('clock', this.transDefault);
  }

  // change the css transition time to timebetween steps
  this.$node.css('transition-duration', this.timeBetweenSteps);
  
  this.$node.css(styleSettings);

};

