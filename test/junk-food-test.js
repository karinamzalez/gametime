const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');
const JunkFood = require('../lib/junk-food')
const Overlord = require('../lib/overlord')
const World = require('../lib/world')

describe('junkFood', function(){
  context('with default attributes', function(){
    var junkFood = new JunkFood();

    it('should be instantiated', function(){
      assert.isObject(junkFood);
    });

    it('should have an x-coordinate', function(){
      var world = new World(600, 600, 'context');
      var overlordX = world.overlord.x;
      var junkfoodX = world.junkFood.x;
      assert.equal(junkfoodX, overlordX);
    });

    it('should have an y-coordinate', function(){
      var world = new World(600, 600, 'context');
      var overlordY = world.overlord.y;
      var junkfoodY = world.junkFood.y;
      assert.equal(junkfoodY, overlordY);
    });

    it('should have a height', function(){
      assert.equal(junkFood.height, 20);
    });

    it('should have a width', function(){
      assert.equal(junkFood.width, 20);
    });

    it('should have a speed', function(){
      assert.equal(junkFood.speed, 0.5);
    });
  });

  // context('with given attributes', function(){
  //   it('can accept a new x-coordinate', function(){
  //     let junkFood = new JunkFood({x: 50});
  //     assert.equal(junkFood.x, 50);
  //   });
  //
  //   it('can accept a new y-coordinate', function(){
  //     let junkFood = new JunkFood({y: 50});
  //     assert.equal(junkFood.y, 50);
  //   });
  //
  //   it('can accept a new height', function(){
  //     let junkFood = new JunkFood({height: 50});
  //     assert.equal(junkFood.height, 50);
  //   });
  //
  //   it('can accept a new width', function(){
  //     let junkFood = new JunkFood({width: 50});
  //     assert.equal(junkFood.width, 50);
  //   });
  //
  //   it('can accept a new speed', function(){
  //     let junkFood = new JunkFood({speed: 50});
  //     assert.equal(junkFood.speed, 50);
  //   });
  // });

  // context('moveJunkFood', function(){
  //   var context = stub().of('beginPath').of('arc').of('closePath').of('fill');
  //   var junkFood = new JunkFood({context: context});
  //   junkFood.moveJunkFood();
  //
  //   it('should calls correct functions on context', function(){
  //     assert.equal(context.beginPath.calls.length, 1);
  //     assert.equal(context.arc.calls.length, 1);
  //     assert.equal(context.closePath.calls.length, 1);
  //     assert.equal(context.fill.calls.length, 1);
  //   });
  // });

  // context('dropRandomFood', function(){
  //   var junkFood = new JunkFood();
  //
  //   it('should assign a random healthy food type', function(){
  //     var newFoodHash = junkFood.dropRandomFood();
  //     var newFood = new JunkFood(newFoodHash);
  //     assert.notEqual(newFood['type'], 'carrot');
  //   });
  //
  //   it('should assign a random healthy food color', function(){
  //     var newFoodHash = junkFood.dropRandomFood();
  //     var newFood = new JunkFood(newFoodHash);
  //     assert.notEqual(newFood['color'], 'orange');
  //   });
  //
  //   it('should assign a random healthy food score', function(){
  //     var newFoodHash = junkFood.dropRandomFood();
  //     var newFood = new JunkFood(newFoodHash);
  //     assert.notEqual(newFood['score'], 100);
  //   });
  //
  //   it('should assign a random healthy x coordinate', function(){
  //     var newFoodHash = junkFood.dropRandomFood();
  //     var newFood = new JunkFood(newFoodHash);
  //     assert.notEqual(newFood['x'], 500);
  //   });
  //
  //   it('should assign a random healthy y coordinate', function(){
  //     var newFoodHash = junkFood.dropRandomFood();
  //     var newFood = new JunkFood(newFoodHash);
  //     assert.equal(newFood['y'], 0);
  //   });
  // });
});
