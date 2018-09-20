// util.inspect
var util = require('util');
function Person() {
	this.name = 'lbh'
	this.toString = function(){
		return this.name
	}
}

var obj = new Person();
// console.log(util.inspect(obj));
// console.log(util.inspect(obj, true));
// console.log(util.inspect(obj, true, true,43));