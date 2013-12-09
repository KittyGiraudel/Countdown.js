Countdown.js
============

*Countdown.js* is a little yet customizable countdown made in pure JavaScript.

* [JSHint](http://www.jshint.com/) compliant 
* [Jasmine](http://pivotal.github.io/jasmine/) powered-tests
* ~2kb (1.4kb once gzipped)
* No dependency

## Examples

```javascript
// Instanciating a new countdown with all defaults
new Countdown();

// Instanciating a custom countdown
var Countdown = new Countdown({
    selector: '#timer',
    msgBefore: "Will start at Christmas!",
    msgAfter: "Happy new year folks!",
    msgPattern: "{days} days, {hours} hours and {minutes} minutes before new year!",
    dateStart: new Date('2013/12/25 12:00'),
    dateEnd: new Date('Jan 1, 2014 12:00')
});
```

You can also play around with the code at [CodePen](http://codepen.io/HugoGiraudel/pen/vCyJq).

## Options

You can pass the constructor number of options, including:

#### `selector`

The selector you want to inject Countdown into. It should be a valid string for `document.querySelector()`.

*Default*: `.timer`

#### `msgBefore`

The message to display before reaching `dateStart`.

*Default*: `"Be ready!"`

#### `msgAfter`

The message to display once reaching `dateEnd`.

*Default*: `"It's over, sorry folks!"`

#### `msgPattern`

The message to display during the countdown where values between braces get replaced by actual numeric values.
Possible patterns:

* `{years}`
* `{months}`
* `{weeks}`
* `{days}`
* `{hours}`
* `{minutes}`
* `{seconds}`

*Default*: `"{days} days, {hours} hours, {minutes} minutes and {seconds} seconds left."`

#### `dateStart`

The date to start the countdown to. Should be a valid instance of class `Date`. Documentation [here at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

*Default*: `new Date()` (now)

#### `dateEnd`

The date to end the countdown to. Should be a valid instance of class `Date`. Documentation [here at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

*Default*: `new Date(new Date().getTime() + (24 * 60 * 60 * 1000))` (tomorrow)

#### `onStart`

The function to be called whenever the countdown starts.

*Default*: `null`

#### `onEnd`

The function to be called whenever the countdown stops.

*Default*: `null`

## jQuery events

The script doesn't require jQuery at all meanwhile it fires two events on your element if you happen to have jQuery loaded: `countdownStart` and `countdownEnd`. You can use them this way:

``` javascript
new Countdown({
    selector: '.timer'
})

$('.timer').on('countdownStart', function() {
    // do something
});
```

### Grunt tasks

```
grunt test (running JShint and Jasmine)
grunt deploy (running UglifyJS)
```