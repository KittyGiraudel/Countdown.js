(function(global) {
  "use strict";

  // Vanilla JS alternative to $.extend
  global.extend = function(obj, extObj) {
    obj = obj || {};
    if (arguments.length > 2) {
      for (var a = 1; a < arguments.length; a++) {
        global.extend(obj, arguments[a]);
      }
    } else {
      for (var i in extObj) {
        obj[i] = extObj[i];
      }
    }
    return obj;
  };

  // Countdown constructor
  var Countdown = function(conf) {
    this.conf = global.extend({
      // Dates
      dateStart    : new Date(),
      dateEnd      : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),

      // Default elements
      selector     : ".timer",

      // Messages
      msgBefore    : "Be ready!",
      msgAfter     : "It's over, sorry folks!",
      msgPattern   : "{days} days, {hours} hours, {minutes} minutes and {seconds} seconds left.",

      // Callbacks
      onStart      : null,
      onEnd        : null,

      // Extra options
      leadingZeros : false
    }, conf);

    // Private variables
    this.selector = document.querySelectorAll(this.conf.selector);
    this.interval = 1000;
    this.now      = new Date();
    this.patterns = [
      { pattern: "{years}", secs: 31536000 },
      { pattern: "{months}", secs: 2628000 },
      { pattern: "{weeks}", secs: 604800 },
      { pattern: "{days}", secs: 86400 },
      { pattern: "{hours}", secs: 3600 },
      { pattern: "{minutes}", secs: 60 },
      { pattern: "{seconds}", secs: 1 }
    ];

    // Doing all the things!
    this.init();
  };

  // Initializing the instance
  Countdown.prototype.init = function() {
    this.defineInterval();

    if(this.now < this.conf.dateEnd && this.now >= this.conf.dateStart) {
      this.run();
      this.callback("start");
    } else {
      this.outOfInterval();
    }
  };

  // Running the countdown
  Countdown.prototype.run = function() {
    var now = this.now.valueOf() / 1000;
    var tar = this.conf.dateEnd.valueOf() / 1000;
    var sec = Math.abs(tar - now);

    // Vanilla JS alternative to $.proxy
    var that  = this;
    var timer = global.setInterval(function() {
      sec--;

      if(sec > 0) {
        that.display(sec);
      } else {
        global.clearInterval(timer);
        that.outOfInterval();
        that.callback("end");
      }
    }, this.interval);

    this.display(sec);
  };

  // Displaying the countdown
  Countdown.prototype.display = function(sec) {
    var output = this.conf.msgPattern;

    for (var b = 0; b < this.patterns.length; b++) {
      var currentPattern = this.patterns[b];

      if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
        var number = Math.floor(sec / currentPattern.secs),
            displayed = this.conf.leadingZeros && number <= 9 ? "0" + number : number;
        sec -= number * currentPattern.secs;
        output = output.replace(currentPattern.pattern, displayed);
      }
    }

    for(var c = 0; c < this.selector.length; c++) {
      this.selector[c].innerHTML = output;
    }
  };

  // Defining the interval to be used for refresh
  Countdown.prototype.defineInterval = function() {
    for (var e = this.patterns.length; e > 0; e--) {
      var currentPattern = this.patterns[e-1];

      if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
        this.interval = currentPattern.secs * 1000;
        return;
      }
    }
  };

  // Canceling the countdown in case it's over
  Countdown.prototype.outOfInterval = function() {
    var message = this.now < this.conf.dateStart ? this.conf.msgBefore : this.conf.msgAfter;

    for(var d = 0; d < this.selector.length; d++) {
      this.selector[d].innerHTML = message;
    }
  };

  // Dealing with events and callbacks
  Countdown.prototype.callback = function(event) {
    event = event.capitalize();

    // onStart callback
    if(typeof this.conf["on" + event] === "function") {
      this.conf["on" + event]();
    }

    // Triggering a jQuery event if jQuery is loaded
    if(typeof global.jQuery !== "undefined") {
      global.jQuery(this.conf.selector).trigger("countdown" + event);
    }
  };

  // Adding a capitalize method to String
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  global.Countdown = Countdown;
}(window));