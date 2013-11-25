Countdown.js
============

Countdown.js is a little customizable countdown made in pure JavaScript. 

## Examples

```javascript
// Instanciating a new countdown with all defaults
new Countdown();

// Instanciatin a custom countdown
new Countdown({
    selector: '#timer',
    msgBefore: "Will start at Christmas!",
    msgAfter: "Happy new year folks!",
    msgPattern: "{days} days, {hours} hours and {minutes} minutes before new year!",
    dateStart: new Date('Dec 25, 2013 12:00:00'),
    dateEnd: new Date('Jan 1, 2014 12:00:00')
});
```

## Options

You can pass the constructor number of options, including:

#### `selector`

The selector you want to inject Countdown into.

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

The date to start the countdown to. Should be an instance of class `Date`. Documentation [here at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

*Default*: `new Date()`

#### `dateEnd`

The date to end the countdown to. Should be an instance of class `Date`. Documentation [here at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

*Default*: `new Date(new Date().getTime() + (24 * 60 * 60 * 1000))` (tomorrow)

