const EventEmmiter=require('events');
fs=require('fs');
//custom event
const myEmmiter= new EventEmmiter();
function Event(a,b)
{
	console.log(a,b);
}
myEmmiter.on("customEvent",Event);
myEmmiter.emit("customEvent","a","b");
//CallBack
function Event2(b,Event)
{
	console.log(b);
	myEmmiter.emit("customEvent","second a", "second b")
}
myEmmiter.on("secondEvent",Event2);
myEmmiter.emit("secondEvent","second event being emmited","customEvent");
