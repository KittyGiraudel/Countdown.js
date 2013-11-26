(function() {
  'use strict';

  window.Countdown = window.Countdown || {};

  // Vanilla JS alternative to $.extend
  window.extend = function(obj, extObj) {
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            extend(obj, arguments[a]);
        }
    } else {
        for (var i in extObj) {
            obj[i] = extObj[i];
        }
    }
    return obj;
  };

  // Countdown constructor
  Countdown = function(conf) {
    this.conf = extend({
        // Dates
        dateStart  : new Date(),
        dateEnd    : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),

        // Default elements
        selector   : ".timer",

        // Messages
        msgBefore  : "Be ready!",
        msgAfter   : "It's over, sorry folks!",
        msgPattern : "{days} days, {hours} hours, {minutes} minutes and {seconds} seconds left."
    }, conf || {});

    // Private variables
    this.selector = document.querySelectorAll(this.conf.selector);
    this.interval = 1000;
    this.sec      = 0;
    this.now      = new Date();
    this.patterns = [
      { pattern: '{years}', secs: 31536000 },
      { pattern: '{months}', secs: 2628000 },
      { pattern: '{weeks}', secs: 604800 },
      { pattern: '{days}', secs: 86400 },
      { pattern: '{hours}', secs: 3600 },
      { pattern: '{minutes}', secs: 60 },
      { pattern: '{seconds}', secs: 1 }
    ];

    // Doing all the things!
    this.init();
  };

  // Initializing the instance
  Countdown.prototype.init = function() {
    this.defineInterval();

    this.now < this.conf.dateEnd && this.now >= this.conf.dateStart
    ? this.run()
    : this.outOfInterval();
  };

  // Running the countdown
  Countdown.prototype.run = function() {
    var nowTS = this.now.valueOf() / 1000;
    var tarTS = this.conf.dateEnd.valueOf() / 1000;
    this.sec = Math.abs(tarTS - nowTS);

    // Vanilla JS alternative to $.proxy
    var that = this;
    var timer = window.setInterval(function() {
      that.sec--;

      if(that.sec > 0) {
        that.display(that.sec);
      } else {
        that.outOfInterval();
        clearInterval(timer);
      }
    }, this.interval);

    this.display(this.sec);
  };

  // Displaying the countdown
  Countdown.prototype.display = function(sec) {
    var output = this.conf.msgPattern;

      for (var i = 0, len = this.patterns.length; i < len; i++) {
        var currentPattern = this.patterns[i];

        if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
          var number = Math.floor(sec / currentPattern.secs);
          sec -= number * currentPattern.secs;
          output = output.replace(currentPattern.pattern, number);
        }
      }

      for(var i = 0, len = this.selector.length; i < len; i++)
         this.selector[i].innerHTML = output;
  };

  // Canceling the countdown in case it's over
  Countdown.prototype.outOfInterval = function() {
      var message = this.now > this.conf.dateStart ? this.conf.msgBefore : this.conf.msgAfter;
      for(var i = 0, len = this.selector.length; i < len; i++)
         this.selector[i].innerHTML = message;
  };

  // Defining the interval to be used for refresh
  Countdown.prototype.defineInterval = function() {
    for (var i = this.patterns.length; i > 0; i--) {
      var currentPattern = this.patterns[i-1];

      if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
        this.interval = currentPattern.secs * 1000;
        return;
      }
    }
  };
}());