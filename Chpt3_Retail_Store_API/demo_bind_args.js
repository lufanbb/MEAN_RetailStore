function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
console.log("list1");
console.log(list1)

// Create a function with a preset leading argument
console.log(require('util').inspect(list.bind(null, 36)));
var leadingThirtysevenList = list.bind(null, 37);

 console.log(leadingThirtysevenList());

var list2 = leadingThirtysevenList(); 
// [37]
console.log("list2");
console.log(list2);


var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]
console.log("list3");
console.log(list3);