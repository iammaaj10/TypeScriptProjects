"use strict";
let username = "Maaj";
const age = 35;
// symbol data type
let sym = Symbol("unique");
let sym2 = Symbol("unique");
console.log(sym === sym2);
// console.log(`My name is ${username} and I am ${age} years old.`);
const obj = {
    [sym]: "This is a unique symbol property"
};
console.log(obj[sym]); // Accessing the symbol property
