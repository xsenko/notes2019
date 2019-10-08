concate two list is
List(1,2) ++ List(3,4)
and ++ is a method of List.

But if we use sometinh ends with :, it means method belongs to right side not left, for example  
1 :: List(2,3) this adds 1 to the beginning of the list. But the method of '::' is actually belong to the List. 

This means in first example we can write like List(1,2).++List(2,3)  
but latter we need to write like List(2,3).::(1)
Why? because method is :: and ends with :

another example  
`1 +: List(2,3) :+ 4`  
here first method `+:` is actually belong to List because ends with :, and second method is `:+` again belongs to the List because this is a normal method and not ends with :, so like every normal method `:+` is belongs to left side.  
if we want to write without syntatic sugar it will be like  
`m.+:(11).:+(22)` because `+:` returns List again and than we apply `:+` to the list with parameter 22.

Another 

-----------------

**Map and FlatMap**

basic map algorithm, not the actual map algo in scala
```scala
case class CustomMap[T, U](list: List[T]) {
  def customMap(f: T => U): List[U] = {
    val initialList = List.empty[U]

    def customMapHelper(in: List[T], out: List[U]): List[U] = {
      in match {
        case Nil => out
        case head :: Nil => f(head) :: out
        case head :: tail => customMapHelper(tail, f(head) :: out)
      }
    }
    customMapHelper(list, initialList) reverse
  }
}
```
in case part we get in which in List[T]
and list has a special behaviour that when you do something like that
`val first :: others = List(1,2,3,4)`  
we get first = 1 and others = List(2,3,4) so above algo we apply this. Since this is a recursive algorithm it will start to execute f function when recursion ends, so it means it first execute the last item in the list, and then will go to the start or head. Thats why we used reverse at the end.  

* One point with Map and FlatMap, 
```scala
val list = List(1,2,3,4,5)
def f(x: Int) = if (x > 2) Some(x) else None
val resultMap = list.map(f(_))
val resultFlatMAp = list.flatMap(f(_))
```
above example map gets all Some and None type but flatMap only takes Some type and discard none type.

* flatmap looks the Seq type and in Seq type if there is another Seq it also travase on it and returns one Seq type

```scala
var aList = List("car", "home", "bus")
var flattenList = aList.flatMap(elem => elem.toLowerCase)
---
aList: List[String] = List(car, home, bus)
flattenList: List[Char] = List(c, a, r, h, o, m, e, b, u, s)
```
as you see flatMap looks in list and sees another Seq type which is String so also traverse into and apply function all chars in String.

* another example
```scala
val map = Map(1->"one", 2->"two", 3->"three")
val mapReturns = (1 to map.size).map(map.get(_))
val flatMapReturns = (1 to map.size).flatMap(map.get(_))
----
map: scala.collection.immutable.Map[Int,String] = Map(1 -> one, 2 -> two, 3 -> three)
mapReturns: IndexedSeq[Option[String]] = Vector(Some(one), Some(two), Some(three))
flatMapReturns: IndexedSeq[String] = Vector(one, two, three)
```
here map returns as Vector(Some) but flatmap directly returns as their values.


----------------

```scala
val tup2 = ("x", "y", "z", "f", "h")
val h = (0 to (tup2.productArity -1)).map(tup2.productElement(_))
val q = (0 to (tup2.productArity -1)).map(tup2.productElement(_)).toList
```

with this way we can convert tuple to list, second row returns Vector and Vectors have toList method. 

* another way to create tuple is doing like that `(1->2, 10->20, 30->40)` 