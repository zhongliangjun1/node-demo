/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-11-29
 * Time: PM9:05
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Listener = function(station){

    // we need to store the reference of `this` to `self`, so that we can use the current context in the setTimeout (or any callback) functions
    // using `this` in the setTimeout functions will refer to those funtions, not the Radio class
    var self = this;

    // emit 'open' event instantly
    setTimeout(function() {
        self.emit('open', station);
    }, 0);

    // emit 'close' event after 5 secs
    setTimeout(function() {
        self.emit('close', station);
    }, 5000);

    // EventEmitters inherit a single event listener, see it in action
    this.on('newListener', function(listener) {
        console.log('Event Listener: ' + listener);
    });

}


util.inherits(Listener, EventEmitter);

var listener = new Listener('ok');
listener.on('open', function(station){
    console.log('open event with msg : '+station);
});
listener.on('close', function(station){
    console.log('close event with msg : '+station);
});




/**
 *
 (node) warning: possible EventEmitter memory leak detected. 2 listeners added. Use emitter.setMaxListeners() to increase limit.
 Trace
 at EventEmitter.addListener (events.js:175:15)
 at Object.<anonymous> (/Users/mac/Documents/node-demo/test-event.js:51:10)
 at Module._compile (module.js:449:26)
 at Object.Module._extensions..js (module.js:467:10)
 at Module.load (module.js:356:32)
 at Function.Module._load (module.js:312:12)
 at Module.runMain (module.js:492:10)
 at process.startup.processNextTick.process._tickCallback (node.js:244:9)
 *
 */

var test = new Listener('test');
test.setMaxListeners(1);
for(var i=0;i<20;i++){
//    var test = new Listener('test'+i);
//    test.setMaxListeners(1);
    test.on('trigger', function(){
        //
    });
}

console.log(util.inspect(test.listeners('trigger')));



