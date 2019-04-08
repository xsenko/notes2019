
There are 4 rules or paradigms in Functional Programming

- No state change: We can only give variables into function with it's arguments, function should't use any values or variables outside of the scope except function's arguments.

- No Side effects: Function should't change any outside value. Variables in function scope can change but, values or variables that out of the function's scope should't change.

- Favor recursion over iteration

- Use Immutable variables.

*Pure Functions:* Function is pure if has no side effects and always return same values with same arguments.
for example:
```java
public static int sum(int a, int b) {
    return a + b;
}
```

everytime we put 3 and 5 for the function (method here, but the same concept) we got 8 so, it means this is pure, also we know that this function has no side effects.

example for *impure* function
```java
public static int sum(int a, int b) {
    return new Random().nextInt() + a + b;
}
```
because of the random function inside, this method or function is not pure, because everytime we get different value. But noticed that this function still have no side effects.

another example with side effects:
```java
public class SideEffectClass{

    private int state = 0;


    public doSomething(int arg0){
        state += arg0;
    }
}
```

as you see, we are changing state variable inside the function (method) so this has no side effect, thus not a pure function.

another example with side effects:
```java
public static int sum(int a, int b) {
    writeSomethingToFile();
    return a + b;
}
```
again here the method writeSomethingToFile() makes this function impure, because this method changes some values outside of the function. So actually we can say most of the I/O operations are impure because of their nature. If you apply some write function you change a file, so change variable outside of the scope.

## Java Functional Interfaces
An interface is abstrac if this interface has one abstrac method.
like:
```java
public interface MyFunction<T, R> {
	R apply(T t);
}
```

This is a interface that takes one generic type and returns another. We can put any implementation we want to this abstrac interface, and we can use lambda notation with it.

```java
public class MyFunctionTest {
	
	public static void main(String[] args) {
		
		MyFunction<Integer, Integer> func = x -> x+1;
		System.out.println(func.apply(10));
		
	}

}
```

## High Order Functions
High order functions are functions that takes argument as a function, or returns a function, or both of them.


first we need to create a Functional Interface
```java
@FunctionalInterface
public interface IncFunction<T, R> {
	R apply(T t);
}
```

@FunctionalInterface annotation makes us sure that the interface is functional.

then we can create our high order method
```java
public static void increment(List<Integer> intList, IncFunction<Integer, Integer> f) {
		for(Integer item : intList) {
			Integer newItem = f.apply(item);
			System.out.println(newItem);
			
		}
	}
```
as you see second argument is our IncFunction type

Then we can write our implementation and pass as a argument
```java
IncFunction<Integer, Integer> func = x -> x+1;
		List<Integer> myList = Arrays.asList(1,2,3,4,5);
		increment(myList,func);
```
here we defined our function as func, and we pass to the out increment method. So here increment() method becomes high order, because it can takes function as an argument.

Aslo we can implement a method that returns function.
```java
	public static IncFunction<Integer, Integer> multiplyByTwo() {
		return x -> x*2;
	}

    increment(myList, multiplyByTwo());
```
here multiplyByTwo return a function, and we can directly use this method as an argument (because return value is Function)

## closure in java
Closure is a persistent scope which holds on to local variables even after the code execution has moved out of that block. So it means, after execution your variables in your block still be holded in memory or stack and you can reach them. Also closure allows inner function to reach outer functions variables.

very simple javascript example
```js
function() {
  var a = 1;
  console.log(a); // works
}    
console.log(a); // fails
```
```js
var a = 1;
function() {
  console.log(a); // works
}    
console.log(a); // works
```

```js
outer = function() {
  var a = 1;
  var inner = function() {
    console.log(a);
  }
  return inner; // this returns a function
}

var fnc = outer(); // execute outer to get inner 
fnc();
```

below example, outer() function returns another function, normal situation after outer exited, a should be deleted by garbage collector. But js have closure property, so var a stays in stack. and with fnc got inner function and when we run fnc() we can reach var a, which is in scope of outer function.

now lets look example for java

```java
	public static Function<Integer, Integer> add (int x) {
		Function<Integer, Integer> partialAdd = y -> y +x;
		return partialAdd;
	}
```
here we add method and it gets a variable x, then this method returns a Function
```java
Function<Integer, Integer> add10 = add(10);
		System.out.println(add10.apply(5));
```
and here first we call add method with an integer, and this returns a function. After that we run this function with another integer, and we get sum. Normally add10.apply(5) can't reach to int x, because it is in outer scope, but because of closure properties, we can reach it.

This is shorter implementation of add method
```java
	public static Function<Integer, Integer> add (int x) {
		return  y -> y +x;
	}

    System.out.println(add(10).apply(5));
```
add(10) returns a function but integer 10 is still on stack. then we execute apply method, since we got x already we can sum 10 and 5.

Another important point here is, int x is *efficently final*. This means x should not be changed after that
for example:
```java
	public static Function<Integer, Integer> add (int x) {
		x++ // don't compile, x is not a efficently final now
        Function<Integer, Integer> partialAdd = y -> y +x;
		return partialAdd;
	}
```
above example, we chnaged value of x, so x is not efficently final anymore. Efficently final is a some kind of syntatic sugar, and comes with java8. We don't need to type add(final int x) everytime. Compile understands that, but if we try to change the value, compile throws error.


## Ready to use Functional Interfaces
there are several Functional Interfaces comes with java. For example Function<T,R>
which gets an input T and returns R

Another is Runnable Functional Interface, while we are creating thread we need Runnable interface and run() method. It takes no arguments and returns void.
here is an exmaple:
```java
Thread asd = new Thread(() -> System.out.println("hello"));
		asd.start();
```
also we can write this:
```java
new Thread(() -> System.out.println("hello")).start();
```

Thread expects Runnable Functional interface as arguments, and above example we are implementing Runnable with lambda. 

-------

sonraki konularin
method reference

https://www.javaworld.com/article/3319078/functional-programming-for-java-developers-part-2.html?page=2

https://www.javaworld.com/article/2092260/java-programming-with-lambda-expressions.html














