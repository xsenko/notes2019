* spark kullanirken onun destekledigi scala versiyonunu da bulman lazim. mesela spark 2.4.3 scala 2.12.x ve uzeri ile calisiyor. Bunu ayarlamak icin build.sbt dosyasina istedigin scala versiyonunu da yazman gerekyor. daha sonra intellij icinde console dan sbt yazip calistirip daha sonra da console yazarak o versiyondaki scala nin shell ine ulasabiliyorsun.  
Ornek  
```
 name := "SparkTest2"

version := "0.1"

scalaVersion := "2.12.8"

// https://mvnrepository.com/artifact/org.apache.spark/spark-core
libraryDependencies += "org.apache.spark" %% "spark-core" % "2.4.3"
```

* spark in dependecylerini de yine maven repository den bulabiliyorsun, sanirim sbt ivy denilen bisi kullaniyor ve standart olarak maven repositorylerini kullaniyor yine.

* spark boyle bir hata veriyor nedenini bilmiyorum
```
19/08/24 18:20:02 WARN Utils: Your hostname, senko-XPS-15-9570 resolves to a loopback address: 127.0.1.1; using 10.20.20.86 instead (on interface wlp59s0)
19/08/24 18:20:02 WARN Utils: Set SPARK_LOCAL_IP if you need to bind to another address
```

* spark calistiriken  
 `val conf = new SparkConf().setMaster("local[2]").setAppName("My Spark App")`   
 bu sekilde conf girmen lazim ozellikle setMaster'a local demen onemli, parantez icindeki 2, 2 tane thread kullan demek.

 *  
