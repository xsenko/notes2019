hellospark calisan bi koddu su sbt yi kullanmisim
```
name := "HelloSpark"

version := "0.1"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "2.4.3",
  "org.apache.spark" %% "spark-sql" % "2.4.3"
)
```

* sbt uzerinden scala ya girmek icin once sbt diyoruz komut satirina daha sonra console diyoruzoru

* scala versiyonu ogrenmek icin util.Properties.versionNumberString diyoruz.

------

uni servlerarina spark cluster kurmak
bu yalniz yarn olmadan olan kurulum.

* java zaten yuklu olmasi lazim

* tum aletlere scala yukle scala -version ile de veryionunu ogrenebiliyorsun en son 2.11.12 yukledik

* spark i indir wget ile, ve bashrc ye spark home ve path e bin ile sbin ekle
```
export SPARK_HOME=/home/hadoop/spark-2.4.3                                           
export PATH="$SPARK_HOME/bin:$SPARK_HOME/sbin:$PATH"  
```

* daha sonra master node hangisi ise onda  
cp spark-env.sh.template spark-env.sh  
yapican daha sonra spark-env.sh da bunlari ekliyeceksin en alta
```
export HADOOP_CONF_DIR=/home/hadoop/hadoop-3.1.2/etc/hadoop 
export SPARK_MASTER_HOST='134.34.224.132'
export JAVA_HOME=$JAVA_HOME 
```

* conf altinda  
cp slaves.template slaves
vim slaves diyip hem master node uu hem de diger node lari greicez (burda master node umuzu da worker yapmis oluyoruz ayni zamanda)

* daha sonra sbin altinda ./start.all.sh i baslatcaz, ve stop-all.sh ile de kapatabiliyoruz.

* daha sonra mond45:8080 ile web interfaceine girebiliyoruz.

* bu sekilde hdfs ile de iletisim kurabiliyor
```
var input = spark.read.textFile("inputs/alice.txt")
// Count the number of non blank lines
input.filter(line => line.length()>0).count()
```
dedigimizde calisti

* mond45:4040 ta da bisiler var. spark jobs diye.

* tuning spark: https://spark.apache.org/docs/latest/tuning.html

* partitioning : https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd-partitions.html