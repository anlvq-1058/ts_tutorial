function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());

// let myName: string = "Alice";
let myName = "Alice";

const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// function printId(id: number | string) {
//   console.log("Your ID is: " + id);
// }

// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 });

function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}



/* Alias */


type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
 
printCoord({ x: 100, y: 100 });



/* interface */


// interface Point {
//   x: number;
//   y: number;
// }
 
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
 
printCoord({ x: 100, y: 100 });


let x: "hello" = "hello"


function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" };\
const req = { url: "https://example.com", method: "GET" as "GET" };

handleRequest(req.url, req.method);
//handleRequest(req.url, req.method as "GET");


enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}


enum Direction1 {
  Up, // 0
  Down,
  Left,
  Right,
}

enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}


const firstName = Symbol("name");
const secondName = Symbol("name");
 
// if (firstName === secondName) {
//   // This condition will always be false
//   console.log("firstName and secondName are equal");
// }




/* Narrowing */

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

// bad code don't do this
// function printAll(strs: string | string[] | null) {
//   if (typeof strs === "object") {
//     for (const s of strs) {
//       console.log(s);
//     }
//   } else if (typeof strs === "string") {
//     console.log(strs);
//   } else {
//     // do nothing
//   }
// }

// good 
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}


function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}



/* The in operator narrowing */

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

/* function */

// function type expression

function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);

// use alias

// type GreetFunction = (a: string) => void;
// function greeter(fn: GreetFunction) {
//   // ...
// }

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = "default description";
 
doSomething(myFunc);


// type SomeConstructor = {
//   new (s: string): SomeObject;
// };

// function fn(ctor: SomeConstructor) {
//   return new ctor("hello");
// }


interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

// Generic Functions

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);


//Optional Parameters
function f(n: number) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}

// function f(x?: number) {
//   // ...
// }
// f(); // OK
// f(10); // OK

declare function f1(x?: number): void;
// cut
// All OK
f1();
f1(10);
f1(undefined);

//Function Overloads

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}


len(""); // OK
len([0]); // OK
// len(Math.random() > 0.5 ? "hello" : [0]); ====> error
// we can invoke it with strings or arrays. However, we can’t invoke it with a value that might be a string or an array, because TypeScript can only resolve a function call to a single overload


/* Object Types */


interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
 
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
  let yPos = opts.yPos;
}
 
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });


//readonly properties

interface SomeType {
  readonly prop: string;
}
 
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // But we can't re-assign it.
  obj.prop = "hello";
// Cannot assign to 'prop' because it is a read-only property.
}

// Generic Object Types

interface Box<Type> {
  contents: Type;
}

interface StringBox {
  contents: string;
}
 
let boxA: Box<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "world" };
boxB.contents;


