# Scala Types

## Nothing type

scala da tum typelar `any` den extend olur. Ve 2 ye ayrilir biri `anyValue` digeri de `anyRef`. `anyValue` daha sonra temel data tipleri olan `Integer`, `Long` gibi type'lara ayrilir. 'anyRef' ise referans verilebilen, trait, object ve class'lar icindir. Tum tipleri extend eden ozel bir tip vardir bu da `Nothing`. Yani `Nothing` icin aslinda herseyi kapsar diyebiliriz.  
Scala offical documentation `Nothing is a subtype of all types.` diyor. Yani mesela random bi `List[Person]` tipimiz olsun `Nothing` bunun bir subtype'idir.  
Onemli olan bir nokta ise **Nothing in bir value su yoktur** 

Peki `Nothing` i nerelerde kullaniyoruz. Ilk kullanim alani expection throw ederken.

```scala
  def oneOrThrow(arg: Int): Int = {
    if(arg == 1) arg
    else throw new Exception(s"$arg is not 1")
  }

  val y = oneOrThrow(1)
  println(y) // prints 1

  val x = oneOrThrow(2)
  println(x) // throws exception
```
burdaki ornekte mesela if clause'u Int donucek onu biliyoruz, peki else clause'u ne donucek? Birsey donmek zorunda oldugu icin (scala da tum expressionlarin return degeri vardir) `Nothing` donucek. Exception oldugu icin bir deger dondurmesine gerek yok ve zaten `Nothing` te bir deger donmuyor.

yani aslinda else kismini
```scala
  def oneOrThrow(arg: Int): Int = {
    if(arg == 1) (arg: Int)
    else (throw new Exception(s"$arg is not 1")): Int
  }
```
seklinde yapsak ta birsey degismez, cunku Nothing extends Int.

Nothing in bir baska kullanim alani da Stub konusunda.
```scala
  // TODO: Implement them later.
  def resolveAuthor(name: String) = ???

  val x = resolveAuthor("abc")
```
burda mesela, def te `???` kullandigimiz icin zaten `scala.NotImplementedError` donecektir ama aslinda burda da resolveAuthor un dondugu tip Nothing tir.

cunku gercekte ??? aslinda bir methodtur aslinda. ve su sekildedir
```scala
def ??? : Nothing = throw new NotImplementedError
```

Nothing'in asil onemli kullanim alani da asagida oldugu gibi.
```scala
sealed abstract class Option[+A]
final case class Some[+A](value: A) extends Option[A] { ... }
case object None extends Option[Nothing] { ... }
```
Burda ilk once covariant bir tip kullaniyoruz Option icin Option[+A] diyerek. Yani aslinda java daki <? extends A> ile ayni seyi demis olduk, bu da Option in icine A veya A dan turemis, yani A nin subtype'i bir baska degis ile A yi extends etmis tipler gelebilir demek.  
Ornek olarak Java'daki Integer ve Number'i alabiriz. Option[+Number] demek aslinda Number'i extend eden herseyi al demek, mesela Integer. Ayni <? extends Number>.

`sealed` keywordu ise o class'in direkt olarka inherit edilemiyecegini belirtir. Inherit etmek icin Base Class ile Sub Class in ayni file icinde olmasi gerekir.

Option[Nothing] kullanmamizin amaci ise Option[+A] oldgunu biliyoruz yani Option icine A tipini veya A'dan turemis herhangi bir tipi olabilir. A'dan turemus her tip icin ayni zamanda Nothing onlarin subtype'i olacagindan Option[Nothing] diyebiliyoruz. Baska bir degis ile Option[Nothing] tum muhtemel Option[A] larin subtype'i mesela B extends A diyelim Option[Nothing] yine Option[B] nin subtype i oluyor. Yalniz bu Nothing koyma isini sadece Null Nil gibi degerler donecegi zaman yapiyoruz.

## Nothing ve Null farki

Null subtype of all reference types. Nothing is subtype of all types. Yani anyVal den turemis bir tipe, mesela Int veya Long Null'in degerini atayamayiz. Cunku anyRef degil anyVal ler, ama Bir class a Null atayabiliriz. Onemli bir nokta `Null` bir trait ve `null` da onun tek degeri.

```scala
  class Person(name: String)
  
  val invValue2: Int = null // we can't do that.
  val myPerson: Person = null // we can do that
```

yukaridaki ornekte mesela Int e null degeri veremeyiz anyVal oldugundan dolayi, ama Person a verebilriz, cunku anyRef.

`Unit` ise java daki void ile tamamen ayni, eger bir fonksiyon hicbir sey dondurmuyorsa aslinda Unit donduruyor demektir.
