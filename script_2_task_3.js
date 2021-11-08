"use strict"
let a = +prompt('input a: ');
let b = +prompt('input b: ');
if (a >= 0 && b >= 0){
	
	alert(a - b);

} else if(a < 0 && b < 0){

	alert(a * b);

} else if (a * b < 0){

	alert(a + b)

}