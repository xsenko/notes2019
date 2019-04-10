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

**bu kismi tam anlayamadim ama yaziyorum:**
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





