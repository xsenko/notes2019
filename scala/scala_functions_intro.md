# Scala Functions

Temel yapitaslari java ile benzer aslinda.
Ilk once bir trait tanimladik, 

```scala
trait MyFunction[A,B] {
    def apply(element: A): B
}
```

daha sonra anonymous olarak bu trait i tanimladim
```scala
val doubler = new MyFunction[Int, Int] {
    override def apply(element: Int): Int = element * 2
}
```

daha sonra anonymous olarak yarattigim fonksiyonu (aslinda hala gercek anlami ile fonksiyon degil, trait in instance'i burda, ayni java'da ki Functional Interface i anonymous olarak yaratip bir variable a atamamiz gibi) kullanabilirim.

```scala
println(doubler(2))
```

Scala biz her seferinde bir trait yaratmayalim diye, hazir Function1, Function2 seklinde traitler yaratmis. Function1 bir adet arguman alip bir tane geri donuyor, function2 2 arguman alip 1 tane donuyor vs

ornek:
```scala
val stringToIntConverter = new Function1[String, Int] {
    override def apply(element: String): Int = element.toInt
}

println(stringToIntConverter("2") + 3)
```
yukaridaki kod bize 5 vericektir.

baska bir ornek
```scala
var adder = new Function2[Int, Int, Int] {
    override def apply(elem1: Int, elem2: Int): Int = elem1 + elem2
}

println(adder(3,5))
```
bize 8 donecektir.

Normalde scala da fonksiyonumuz veya methodumuz recursive degil ise donus tipini belirtmemize gerek yok, scala kendi anliyor. Fakat belirtmek istersek bunu 2 sekilde yapabiliriz. Mesela multiplyer diye yeni bir fonksyion yapalim
```scala
val multiplyer: [Int, Int, Int] = new Function2[Int, Int, Int] {
    override def apply(elem1: Int, elem2: Int): Int = elem1 * elem2
}
```

ikinci bir yol ise
```scala
val multiplyer: ((Int, Int) => Int) = new Function2[Int, Int, Int] {
    override def apply(elem1: Int, elem2: Int): Int = elem1 * elem2
}
```
yapmaktir, boylece multiplyer in 2 Int arguman alan ve bir Int arguman donen bir fonksiyon oldugunu belirtmis oluyoruz.

scala da fonksiyon donen fonksiyonlar: baska turlu yapmanin yolu var mi bilmiyorum ama, sanirim anca clousure kullanarak yapilabiliniyor.
ornek:
```scala
val test = new Function1[Int, Function1[Int, Int]] {
    override def apply(x: Int): Function1[Int, Int] = new Function1[Int, Int] {
        override def apply(y: Int): Int = x + y
    }
}
```

daha sonra bu fonksiyonu iki sekilde kullanabiliriz, ilki:
```scala
val tempFunc = test(2)
println(tempFunc(3))  // yields 5
```
burda test e atadigimiz fonksiyonu cagirarak tempFunc a yeni bir fonksiyon atanmasini sagladik. daha sonra bunu kullanarak return degerini alabildik. Burda closure var, yani biz tempFunc(3) dedigimizde fonksiyon aslinda outer value olan x'i yani 2 yi hala memory de tutuyor, boylece tempFunc(3) parametresi ile cagirdigimizda x+y toplamini yapabiliyor.

diger bir yontem ise:
```scala
println(test(2)(3))
```

### scala da anonymous fonksiyonlar
simdiye kadar fonksiyon yaratma yontemlerimiz aslinda object oriented tarzdaydi
ornegin:
```scala
val adder = new Function2[Int, Int, Int] {
    override def apply(x: Int, y: Int): Int = x + y
}
```

bu da bir anonymous fonksiyon fakat yaratilis sekli object oriented way. Bunun yerine assagidaki gibi de fonksyion yaratabilmemiz mumkun

```scala
val adder = (x, y) => x + y
```

bu yukaridaki ornek ile tamamen ayni ama burda lambda notasyonu kullandik.
Assagidaki 3 farkli gosterim de valid ve gecerlidir:
```scala
val newAdder = (q: Int, w: Int) => q+w
val newAdder2: ((Int, Int) => Int) = (q, w) => q + w
val newAdder3: Function2[Int, Int, Int] = (q ,w) => q + w
```

normalde return val newAdder in type'ini belirtmesek bile scala bunu anlayabiliyor o yuzden illa belirtmemize gerek yok (fonksiyon recursive olmadigi surece).

eger hicbir parametre almiyacaksa lambda fonksiyonu assagidaki sekilde tanimlanir:
```scala
val justDoSomething = () => 3 // just returns 3
val justDoSomething2: () => Int = () => 3 // same as above
```

baska bir lambda gosterimi:
```scala
val stringToInt = { (str: String) =>
    str.toInt
}
```

lambda icin syntactic sugar:
```scala
val niceIncrementer: Int => Int = x => x + 1
val niceIncrementer2: Int => Int = _ + 1
```

dikkat edilmesi gereken nokta her kullandigimi _ sembolu diger bir argumani gosterir, ve eger _ kullanmak istiyorsak val in type'ini belirtmemiz gerekir, aksi halde complier ne tur deger gelecegini bilemez.

```scala
val niceAdder: (Int, Int) => Int = _ + _ // first _ first  argument second _ is second argument
```

lambda notasyonu ile fonksiyon donduren fonksiyon yapilmasi: yukarida bunu object oriented way ve yine new keyword u ile anonymous function kullanarak yapmistik. Simdi lambda notasyonu ile yapicaz.

```scala
val testX = (x: Int) => (y: Int) => x + y
val testY = testX(2)
val result = testY(3) // returns 5
```

### Higher Order Functions and Curries
Icine arguman olarka fonksiyon alan veya fonksiyon donen veya hem fonksiyon alip hem fonksiyonon donen fonksiyonlara higher order functions deniyor

karisik bir ornegi:
```scala
val superFunction = (Int, (String, (Int => Boolean)) => Int) => (Int => Int)
```
bunu anlamak icin parcalara bolmemiz lazim, en soldaki taraf yani (Int => Int) bize tum bu argumanlari alan fonksiyonun bir fonksiyon dondugunu belirtiyor.
Simdi argumanlara bakalim.
(Int, (xxx) => Int) diye bakabiliriz, bu bize arguman olarak bir Int ve bir de Int donduren bir fonksiyon aldigini soyluyor
xxx = (String, (Int => Boolean)) burasi da bize aslinda bunun arguman olarka bir String bir de Int alip Boolean donduren bir fonksiyon aldigini soyluyor.

hof ornegi: oyle bir fonksiyon yazmak istiyoruz ki, icine fonksiyon alsin, o fonksiyonun kac kez tekrar edileceginin value'sunu alsin ve fonksiyona verilecek degeri alsin
```scala
def nTimes(myFunc: Int => Int, n: Int, x: Int) = {
    if(n <= 0) x
    else(nTimes(myFunc, n-1, myFunc(x)))
}

val plusOne = (x: Int) => x + 1
println(nTimes(plusOne, 10, 1)) // prints 11
```
yukaridaki fonksiyon istedigimizi yapiyor. Simdi bu fonksiyonu inceleyelim.
eger hic tekrar etme dersek yani n e 0 verirsek sadece x degerini donuyor, yani x i hic fonksiyon icine sokmadan bize veriyor. Eger n degeri 0 dan buyukse o zaman n degeri kadar fonksiyonu cagiriyor ama soyle bir durum var

nTimes(myFunc, 2, 1) demek : myFunc( myFunc(1) ) demek oluyor, yani bir kez myFunc u cagirdik ve ondan donen degeri tekrar myFunc a verdik

nTimes(myFunc, 3 ,1) ise : myFunc( myFunc( myFunc(1) ) ) demek oluyor.

o zaman su sekilde genelleyebiliriz.
nTimes(myFunc, n, x) : nTimes(myFunc, n-1, myFunc(x)) = nTimes(myFunc, n-2, myFunc( myFunc(x) ) 
yani o zaman yukaridaki scala kodu gibi bunu recursive sekilde tanimlayabiliriz.


yukaridaki ornekte nTimes fonksiyonu gun sonunda Int donduruyordu, simdiki ornekte ise Int yerine baska bir fonksiyon dondurecek.

```scala
def nTimesBetter(myFunc: Int => Int, n: Int): Int => Int = { //nTimes better takes 2 arguments first is a function(a function that takes and returns int) second one is Int and returns another function (that function takes and returns Int)
    if(n<=0) (x:Int) => x
    else (x:Int) => nTimesBetter(myFunc, n-1)(myFunc(x))
}
```

yukaridaki ornekte hem if hem else kismi yeni birer fonksiyon donduruyorlar, fakat else kismi nTimesBetter i bir kez daha cagiriyor ve arguman olarka myFunc(x) in sonucu veriliyor.
```scala
val plus10 = nTimesBetter(plusOne, 10)
println(plus10(1)) // prints 11
```

`nTimesBetter` i biraz daha acalim simdi. `nTimesBetter(addOne, 2)` seklinde kullandigimizi varsayalim. 
ilk geri donucek fonksiyon su sekildedir
```scala
(x: Int) => nTimesBetter(addOne, 1)(addOne(x))
// same as:
(x: Int) => nTimesBetter(addOne, 1).apply(addOne(x))
```
`nTimesBetter(addOne, 1)` ise asagidaki sekilde donucek
```scala
(x: Int) => nTimesBetter(addOne, 0)(addOne(x))
// same as:
(x: Int) => nTimesBetter(addOne, 0).apply(addOne(x))
```
`nTimesBetter(addOne, 0)` ise asagidaki sekilde donuce
```scala
(x: Int) => x(addOne(x))
// same as:
(x: Int) => x.apply(addOne(x))
```
hepsini toparlarsak asagidaki gibi bir sonuc elde ediyoruz.
```scala
(x: Int) => ((x.apply(addOne(x))).apply(addOne(x))).apply(addOne(x))
```
apply methodu aslinda x gordugun yere argumani koy demek
asagidaki basit ornege bakalim mesela
```scala
val func = (x: Int) => x + 1
func(2)
// same as:
func.apply(2)
```
`func.apply(2)` ise func yani `x => x + 1` fonksiyonunda x argumani 2 alicak demek o da `x => 2 + 1` yapar.
o zaman `x.apply(addOne(x))` te `x` gordugun yere `addOne(x)` koy demektir.
bu da direk `addOne(x)` yapar. O zaman bizim 2 ustteki fonksiyonu yeniden duzenlersek su sekilde olucaktir.
```scala
(x: Int) => (addOne(x).apply(addOne(x))).apply(addOne(x))
// same as:
(x: Int) => addOne(addOne(x)).apply(addOne(x))
// same as:
(x: Int) => addOne(addOne(addOne(x)))
```
`nTimesBetter` yukaridaki fonksiyonu bize dondurecektir. daha sonra bu fonksiyonu x parametresi ile cagirirsak yani `nTimesBetter(addOne, 2)` bize yukaridaki fonksiyonu dondu bunu `val funcX` e atadik diyelim 

`val funcX = nTimesBetter(addOne, 2)`  
daha sonra `funcX(1)` dedigimizde yukaridaki fonksiyonda x yerine 1 koymus olucaz. `funcX.apply(1)` yani o da bu demek aslinda

```scala
addOne(addOne(addOne(x))).apply(1)
// same as:
addOne(addOne(addOne(1)))
```
hatirlarsak `addOne(1)` bize `2` donucek, `addOne(2)` ise `3` donucek. `addOne(3)` ise `4` donmus olucak.

another Example:
![when addOne method changes](pics/d076c561-8e80-4b14-9565-174a0696404e.jpg "another example")

## Scala curries

Bir tane adder tanimlayalim
```scala
def superAdder(x: Int): (Int => Int) = (y: Int) => x + y
```
bu goruldugu gibi arguman olarka Int alip Int => Int bir fonksiyon dondurmekte.bunu assagidaki gibi kullanabiliriz.
```scala
val temp1 = superAdder(2) // meaning : 2 + y
val temp2 = temp1(5) // meaning : 2 + 5
println(temp2) // prints 7
```
asagidaki yazim ise tamamen ayni yukaridaki islem ile
```scala
def superAdderCurried(x: Int)(y: Int): Int = x + y
```
bunu da assagidaki gibi kullanabiliriz
```scala
val temp4: (Int => Int) = superAdderCurried(2)
val temp5 = temp4(5)
println(temp5)

// or
val temp6 = superAdderCurried(2)(5)
println(temp6) // prints 7
```
burda onemli olan yukaridakinden farkli olarak
`val temp4: (Int => Int) = superAdderCurried(2)` seklinde temp4 un tipini belirttik, aksi halde compiler dan hata aliriz, cunku temp4 superAdderCurried(2) nin ne tip dondurecegibi bilemez.

Yani aslinda `def superAdder(x: Int): (Int => Int) = (y: Int) => x + y`  
demek, ben `superAdder()` i cagirdigimda bana bir fonksiyon donucek, ve bu fonksiyon da `(y: Int) => x + y` olan bir fonksiyon, yani `superAdder` in dondugu fonksiyon da icine bir parametre alicak `y` diye ve `x + y` sonucunu bana donucek.

Baska bir ornek:
```scala
def curriedFormatter(c: String)(x: Double): String = c.format(x)

val standartFormat: Double => String = curriedFormatter("%4.2f") // meaning : "%4.2f".format(x)
val preciseFormat: Double => String = curriedFormatter("%10.8f") // meaning : "%10.8f".format(x)

println(standartFormat(Math.PI)) // meaning : "%4.2f".format(Math.PI) prints: 3.14
println(preciseFormat(Math.PI))  // meaning : "%10.8f".format(Math.PI) prints: 3.14159265
```

## exercises for curries
a function that takes a function and returns a curried function
```scala
def toCurry(f: (Int, Int) => Int): (Int => Int => Int) = x => y => f(x, y)

val myAdder: (Int, Int) => Int = (x, y) => x + y
val temp10 = toCurry(myAdder)
println(temp10(3)(5)) // prints 8
```

toCurry fonksiyonunu inceleyelim. `x => func1` diyelim. yani x bir fonksiyon dondurecek. Dondurdugu fonksiyon da `y => f(x,y)` seklinde bir fonksyion, f ise herhangi bir baska fonksiyon, yukaridaki ornekte mesela f fonksiyonunu x + y olarka tanimaldik. o zaman aslinda bizim dondurdugumuz fonksiyon su sekilde oluyor  
`x => y => x + y`  
yani curried bir fonksiyon dondurmus oluyoruz.

simdi assagidaki ornege bakalim
```scala
def superAdder2: (Int => Int => Int) = toCurry(_ + _)
def add4 = superAdder2(4)
println(add4(17)) // prints 21
```
yukaridaki ile cok benzer bir islem yaptik (_ + _) demek toCurry fonksiyonuna f(x,y) => x + y seklinde bir fonksiyon veriyorum demek. Ve bize return olarak curried fonksiyon donuyor.

simdi assagidaki ornegi inceleyelim
```scala
def fromCurry(f: Int => Int => Int): (Int, Int) => Int = (x, y) => f(x)(y)

val myCurryAdder: (Int => Int => Int) = x => y => x + y
val temp11 = fromCurry(myCurryAdder)
println(temp11(3, 5))
```

bu sefer fromCurry fonksiyonuna bir curried fonksiyon verdik. donusu icin de bize iki int argumani alan ve int donen bir fonksiyon vermesini sagladik. 
`(x, y) => f(x)(y)` demek aslinda `[f.apply(x)].apply(y)` demektir. Yani fromCurry bize `[f.apply(x)].apply(y)` donmus oldu. f ise `y => x + y` diye bir fonksiyon.
o zaman aslinda  
`[(y => x + y).apply(x)].apply(y)` seklinde bir fonksiyonumuz oluyor. x yerine 3 koyarsak  
`[(y => x + y).apply(3)].apply(y)` = `[(y => 3 + y)].apply(y)` oluyor. daha sonra y yerine 5 koyarsak toplam 8 i elde ediyoruz.

baska bir ornek
```scala
val simpleAdder = fromCurry(superAdder2)
println(simpleAdder(4, 17)) // prints 21
```

yukarida superAdder2 yi bir curried function a donusturmustuk, burda ise onu tekrardan 2 parametre alip int donen bir fonksiyona donusturduk.

compose ve andThen ornekleri
```scala
def compose[A, B, T](f: A => B, g: T => A): T => B = x => f(g(x))
def andThen[A, B, C](f: A => B, g: B => C): A => C = x => g(f(x))

val add2 = (x: Int) => x + 2
val times3 = (x: Int) => x * 3

val composeResult = compose(times3, add2)
println(composeResult(2)) // prints 12

val andThenResult = andThen(times3, add2)
println(andThenResult(2)) // print 8
```

-----------

## Map FlatMap and Filter

```scala
val list = List(1,2,3)
// same as
val list2 = List.apply(1,2,3)
```

```scala
val returnList1 = list.map(_ + 1)
println(returnlist1)
```

listedeki her elemana 1 ekleyip yeni bir liste doner, unutma map methodu her zaman yeni bir liste doner.  
Hatirlarsak `list.map(_ + 1)` demek `list.map(x => x + 1)` ile tamamen ayni sey idi. Yani scala'nin map fonksiyonu da, java da oldugu gibi arguman olarak bir fonksiyon bekliyor.

```scala
println(list.filter(_ % 2 == 0))
println(list.filter(x => {x % 2 == 0}))
```

ayni sekilde filter methodu da icine bir fonksiyon bekliyor, ve map methodunda oldugu gibi filter methodu da yeni bir list doner. Sadece verdigimiz fonksiyonu her elemana uygular ve sadece true degerlerini geri doner.

flatMap ise List icinde baska List ler varsa bunlarin hepsini bir liste olarak doner, ornek olarak:
```scala
val toPair = (x: Int) => List(x, x+1)
println(list.flatMap(toPair)) // prints List(1, 2, 2, 3, 3, 4)
```
burda olan su, flatMap list'in her elemani icin toPair fonksiyonunu calistirdi yani elimizde ilk eleman icin yeni bir list dondu ve bu `List(1,2)` daha sonra ikinci eleman icin yeni bir list daha dondu ve bu `List(2,3)` bu sekilde listenin sonuna kadar gitti, eger flatMap yerine map kullanmis olsaydik ana listemizin altinda ufak listeler olucakti ve bu sekilde gorunecekti  
`List(List(1, 2), List(2, 3), List(3, 4))`  
fakat flatMap kullandigimiz icin List altindaki List ler tek bir list e cevrildi ve bu sonuc print edildi:  
`List(1, 2, 2, 3, 3, 4)`

map ve flatMap e ornek
```scala
// print all combinations for two lists
val numbers = List(1,2,3,4)
val chars = List('a', 'b', 'c', 'd')

val test = numbers.flatMap(x => chars.map(y => x.toString + y)) 
println(test)
```
burda yaptigimiz, flatMap e normal function yerine curried function verdik. Yani numbers in her elemani icin `chars.map(y => x.toString + y)` fonksiyonu calisacak, numbers in ilk elemani 1 oldugu icin fonksiyon ilk eleman icin sunu yapicak  
`chars.map(y => 1.toString + y)`  
daha sonra chars in her elemani icin `1.toString + y` calisacak, yani charstaki her eleman icin `1a, 1b, 1c, 1d` listesi donucek, eger `numbers.map(x => chars.map(y => x.toString + y))` deseydik elimizde List icinde List olucakti fakat `numbers.flatMap` kullandigimiz icin, List in icindeki List'ler tek bir listeye indirgenecek ve asafidaki sonucu basicaktir  
`List(1a, 1b, 1c, 1d, 2a, 2b, 2c, 2d, 3a, 3b, 3c, 3d, 4a, 4b, 4c, 4d)`

peki elimizde bir de 3. bir liste olsaydi
```scala
// what if we need 3 loops
val colors = List("black", "white")
val testWithColors = numbers.flatMap(x => chars.flatMap(y => colors.map(z => x.toString+y+z)))
println(testWithColors)
// prints List(1ablack, 1awhite, 1bblack, 1bwhite, 1cblack, 1cwhite, 1dblack, 1dwhite, 2ablack, 2awhite, 2bblack, 2bwhite, 2cblack, 2cwhite, 2dblack, 2dwhite, 3ablack, 3awhite, 3bblack, 3bwhite, 3cblack ...)
```

forEach java daki forEach ile hemen hemen ayni, forEach te arguman olarak bir fonksiyon aliyor fakat birsey dondurmuyor
```scala
(numbers.foreach(println))
```

### scala for comprehensions
```scala
val forCombinations = for {
    n <- numbers
    c <- chars
    color <- colors
} yield n.toString + "-" + c + "-" + color

println(forCombinations)
```

yukarida 3 liste icin nasil tum kombinasyonlari basabilecegimizi gormustuk, bu da aslinda ayni seyi yapiyor, fakat scala nin for comprehension ozelligini kullaniyor. burdaki `yield` keyword'u python un yield'inden farkli sekilde calisiyor, python da yield bir generator dondururken burda sadece, neyin return degeri oalcagini belirtiyor, ve for Comprehension lar da bize bir List donuyor, yani burdaki `forCombinations` aslinda bir List

yani yukaridaki kod sunla ayni  
`numbers.flatMap(n => chars.flatMap(c => colors.map(color => n.toString+ "-" + c + "-"+ color)))`

peki bir de buna filter eklemek istersek, o zaman assagidaki gibi bir kullanim gerekicek
```scala
val forCombinations2 = for {
    n <- numbers if (n % 2 == 0)
    c <- chars
    color <- colors
} yield n.toString + "-" + c + "-" + color
```
bu da asagidaki kod ile ayni  
`numbers.filter(_ % 2 == 0).flatMap(x => chars.flatMap(y => colors.map(z => x.toString+y+z)))`

eger for comprehension lari forEach gibi kullanmak istiyorsa:
```scala
val sameWithForEach = for {
    n <- numbers
} println(n)
```
bu sefer `yield` keyword une gerek yok, cunku bir sey return etmemiz gerekmiyor

### Udemy deki egitimdeki Maybe alistirmasi
Egitimde bizden bir veya hic eleman icermeyen bir collection yapmamizi ve buna, map, flatMap ve filter methodlarini eklenmemiz istendi.

```scala
abstract class Maybe[+T] {
  def map[B](f: T => B): Maybe[B]
  def flatMap[B](f: T=> Maybe[B]): Maybe[B]
  def filter(p: T => Boolean): Maybe[T]
}

case object MaybeNot extends Maybe[Nothing]{
  override def map[B](f: Nothing => B): Maybe[B] = MaybeNot
  override def flatMap[B](f: Nothing => Maybe[B]): Maybe[B] = MaybeNot
  override def filter(p: Nothing => Boolean): Maybe[Nothing] = MaybeNot
}

case class Just[+T](value: T) extends Maybe[T] {
  override def map[B](f: T => B): Maybe[B] = Just(f(value))
  override def flatMap[B](f: T=> Maybe[B]): Maybe[B] = f(value)
  override def filter(p: T => Boolean): Maybe[T] = {
    if (p(value)) this
    else MaybeNot
  }
}

object MaybeTest extends App {
  val just3 = Just(3)
  println(just3)
  println(just3.map(_ * 2))
  println(just3.flatMap(x => Just(x % 2 == 0)))
  println(just3.filter(x => x % 2 == 0))
}
```

tek tek inceleyelim simdi.  
abstract class java da oldugu gibi ayni ozellikleri tasiyor burda da, implementasyonu yapmiyoruz (istesek yapabiliriz yapmamiza bir engel yok) ve abstract classtan yeni instance olusturamiyoruz.  
`[+T]` ise covariant sembolu, yani T ve T'nin subtype'larini kabul ediyoruz demek. JAva daki `<? extends Number>` gibi dusunebiliriz. `[+Number]` ile ayni sey. Yani tipi Number olan veya Number'dan turemis seyleri kabul et demek, mesela Int, Long etc.

`case object` ve `case class` ise normal class ve object'ten biraz daha farkli. Oncelikle `case class` a bakalim. Bunun bize yarari, new keywordu kullanmadan instance yaratabilmemiz ve apply methodunun otomatik olarak gelmesi.  
`case object` ile `object` arasindaki fark ise, case object in toString, hashCode gibi hazir methodlarla gelmesi ve serialized edilebilmesi.

`Nothing` ise aslinda bir Trait, `Everything` in subtype i fakat `Anything` in super i degil. Nothing bir instance i yok.
`Null` ise yine bir trait ve instance i `null`. Bu javadaki null ile hemen hemen ayni.
`Nil` ise Empty list veya zero degerindeki lenght leri berlitmek icin kullaniliyor. `None` ise nullPointerException donmemesi icin yaratilmis birsey, java daki Options gibi dusunebiliriz, burda da Options in iki degeri var `some` ve `none`. `Unit` ise fonksiyon veya method hicbirsey donmeyecegi zaman kullaniliyor. Java daki void gibi.
 













