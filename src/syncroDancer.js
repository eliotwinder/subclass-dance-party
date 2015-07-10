var SyncroDancer = function(top, left, timeBetweenSteps){
  // varpulsingyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.apply(this, arguments);
  this.$node.addClass('syncro');
  this.$node.removeClass('dancer');
  this.synced = false;
  this.sizeState = 'inflate';
  this.timeBetweenSteps = 2000;
  this.transBig = 2700;
  this.transSmall = 1300;
  this.minSize = '20px'
  this.maxSize = '100px';
  this.$node.css('width', this.minSize);
  this.$node.css('height', this.minSize);
  var backgroundColors = ['green', 'purple', 'grey', 'pink', 'orange'];
  var randomNumber = Math.floor( Math.random() * backgroundColors.length);
  this.$node.css('background-color', backgroundColors[randomNumber]);

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
  console.log('left', mod);
  console.log('right', this.transDefault - mod);
  console.log('step', this.timeBetweenSteps);

  // this.synced = false;
  // if (!this.synced) { // if they are not synced
    if (mod !== 0 && mod < this.transDefault / 2) {
      console.log('if left');
      this.timeBetweenSteps = this.transSmall;
      if (this.$node.css('background-color') === 'black'){  
        this.$node.css({backgroundColor: 'white'});
      }
    } else if (mod > this.transDefault / 2 && (this.transDefault - mod) !== 0) {
      console.log('if right');
      this.timeBetweenSteps = this.transBig;
      if (this.$node.css('background-color') === 'black'){  
        this.$node.css({backgroundColor: 'white'});
      }
      // this.synced = true; // dancer's period should not be adjusted again
      
    } else {
      this.timeBetweenSteps = this.transDefault;
      this.$node.css({backgroundColor: 'black'});
    }
  // }

  // change the css transition time to timebetween steps
  this.$node.css('transition-duration', this.timeBetweenSteps);
  
  this.$node.css(styleSettings);

};

