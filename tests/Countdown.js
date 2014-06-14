/* global describe, it, expect, extend, beforeEach, afterEach, jasmine, Countdown */
(function() {
  'use strict';

  describe('extend() method tests', function() {
    xit('checks that extend() methods works like jQuery version', function() {
      expect(extend({}, {})).toEqual({});
      expect(extend(null, {})).toEqual({});
      expect(extend({}, null)).toEqual({});
      expect(extend(null, null)).toEqual({});
      expect(extend({}, undefined)).toEqual({});
      expect(extend(undefined, {})).toEqual({});
      expect(extend(undefined, undefined)).toEqual({});
      expect(extend({a:1}, {b:2})).toEqual({a:1, b:2});
      expect(extend({a:1}, {a:2})).toEqual({a:2});
      expect(extend({a:1}, {b:2}, {b:3})).toEqual({a:1, b:3});
    });
  });

  describe('Countdown tests', function() {
    beforeEach(function() {
      var div = document.createElement('div');
      div.id = 'root';
      div.innerHTML = '<span class="timer"></span>';
      document.body.appendChild(div);
    });

    afterEach(function() {
      var root = document.getElementById('root');
      root.parentNode.removeChild(root);
    });

    it('tests classic usecase', function() {
      jasmine.Clock.useMock();

      var d = new Date();

      new Countdown({
        dateStart: d,
        dateEnd: new Date(d.getTime() + 10000)
      });

      expect(document.getElementsByClassName('timer')[0].innerHTML).not.toBe("It's over, sorry folks!");
      jasmine.Clock.tick(10000);
      expect(document.getElementsByClassName('timer')[0].innerHTML).toBe("It's over, sorry folks!");
    });

    it('tests output display', function() {
      jasmine.Clock.useMock();

      var d = new Date();

      new Countdown({
        dateStart: d,
        dateEnd: new Date(d.getTime() + 10000),
        msgPattern: "{hours}:{minutes}:{seconds}"
      });

      jasmine.Clock.tick(5000);
      expect(document.getElementsByClassName('timer')[0].innerHTML.match(/0:0:[4-6]/)).toBeTruthy();
    });

    it('tests start in future', function() {
      jasmine.Clock.useMock();

      var d = new Date();

      new Countdown({
        dateStart: new Date(d.getTime() + 10000),
        dateEnd: new Date(d.getTime() + 20000)
      });

      expect(document.getElementsByClassName('timer')[0].innerHTML).toBe("Be ready!");
    });

    it('tests start event', function() {
      jasmine.Clock.useMock();

      var d = new Date();
      var tmp = {
        f: function() {},
        jqueryStart: function() {}
      };
      spyOn(tmp, 'f');
      spyOn(tmp, 'jqueryStart');

      $('.timer').on('countdownStart', tmp.jqueryStart);
      new Countdown({
        dateStart: new Date(d.getTime() + 1000),
        dateEnd: new Date(d.getTime() + 10000),
        onStart: tmp.f
      });

      expect(tmp.f).not.toHaveBeenCalled();
      jasmine.Clock.tick(1000);
      expect(tmp.f).toHaveBeenCalled();
      expect(tmp.f.argsForCall.length).toBe(1);
      expect(tmp.jqueryStart).toHaveBeenCalled();
    });

    it('tests end event', function() {
      jasmine.Clock.useMock();

      var d = new Date();
      var tmp = {
        g: function() {},
        jqueryEnd: function() {}
      };
      spyOn(tmp, 'g');
      spyOn(tmp, 'jqueryEnd');

      $('.timer').on('countdownEnd', tmp.jqueryEnd);
      new Countdown({
        dateStart: new Date(d.getTime() + 1000),
        dateEnd: new Date(d.getTime() + 10000),
        onEnd: tmp.g
      });

      expect(tmp.g).not.toHaveBeenCalled();
      jasmine.Clock.tick(9000);
      expect(tmp.g).not.toHaveBeenCalled();
      jasmine.Clock.tick(1000);
      expect(tmp.g).toHaveBeenCalled();
      expect(tmp.jqueryEnd).toHaveBeenCalled();
    });
  });
}());