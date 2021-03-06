const chai = require('chai');
const assert = chai.assert;
const Overlord = require('../lib/overlord.js');

describe('Overlord', function(){
  context('with default attributes', function(){
    var overlord = new Overlord();

    it('should be instantiated', function(){
      assert.isObject(overlord);
    });

    it('should have an x-coordinate', function(){
      assert.equal(overlord.x, 0);
    });

    it('should have a y-coordinate', function(){
      assert.equal(overlord.y, 10);
    });

    it('should have a height', function(){
      assert.equal(overlord.height, 125);
    });

    it('should have a width', function(){
      assert.equal(overlord.width, 150);
    });

    it('should have a speed', function(){
      assert.equal(overlord.speed, 10);
    });
  });

  context('with given attributes', function(){
    it('can accept a new x-coordinate', function(){
      let overlord = new Overlord({x: 300});
      assert.equal(overlord.x, 300);
    });

    it('can accept a new y-coordinate', function(){
      let overlord = new Overlord({y: 26});
      assert.equal(overlord.y, 26);
    });

    it('can accept a new height', function(){
      let overlord = new Overlord({height: 30});
      assert.equal(overlord.height, 30);
    });

    it('can accept a new width', function(){
      let overlord = new Overlord({width: 90});
      assert.equal(overlord.width, 90);
    });

    it('can accept a new speed', function(){
      let overlord = new Overlord({speed: 45});
      assert.equal(overlord.speed, 45);
    });
  });
});
