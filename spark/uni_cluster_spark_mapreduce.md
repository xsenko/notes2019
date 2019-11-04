* hdfs dfs -rm -r ile directory'leri recursive olarak silebiliyorsun.

* spark'ta jar calistirmak icin once hadoop cluster'i sonra spark cluster'i baslatman lazim.

* hadoop calisiyor mu diye bakmak icin jps komutunu kullanabilirsin

* ./spark-submit --master spark://134.34.224.132:7077 /home/dbisroot/SparkMapReduceWithScala-assembly-0.1.jar /home/senko/pagerankInput/deneme.txt  
bu sekilde calistiriyorsun, gidip file input verirken basina hdfs:// demene gerek yok.

* spark history server'i sbin altindaki start-history-server.sh ile calistirorsun. Eger su sekilde hata verirse  
```
failed to launch: nice -n 0 /home/dbisroot/spark-2.3.4-bin-hadoop2.7/bin/spark-class org.apache.spark.deploy.history.HistoryServer
  	at org.apache.spark.deploy.history.FsHistoryProvider.<init>(FsHistoryProvider.scala:203)
  	at org.apache.spark.deploy.history.FsHistoryProvider.<init>(FsHistoryProvider.scala:84)
  	... 6 more
  Caused by: java.io.FileNotFoundException: File file:/tmp/spark-events does not exist
  	at org.apache.hadoop.fs.RawLocalFileSystem.deprecatedGetFileStatus(RawLocalFileSystem.java:611)
  	at org.apache.hadoop.fs.RawLocalFileSystem.getFileLinkStatusInternal(RawLocalFileSystem.java:824)
  	at org.apache.hadoop.fs.RawLocalFileSystem.getFileStatus(RawLocalFileSystem.java:601)
  	at org.apache.hadoop.fs.FilterFileSystem.getFileStatus(FilterFileSystem.java:421)
  	at org.apache.spark.deploy.history.FsHistoryProvider.org$apache$spark$deploy$history$FsHistoryProvider$$startPolling(FsHistoryProvider.scala:253)
  	... 9 more
```

gidip /tmp altinda spark-events diye bir folder olusturman yeterli.

* hdfs e file koymak icin hdfs dfs -put \<local file> \<target hadoop path> seklinde yapiyorsun

* --executor-memory her node'da yani executor da ne kadar memory kullancagini gosteriyor

* son kullandigimiz komut soc-LiveJournal1.txt icin  
./spark-submit --master spark://134.34.224.132:7077 --executor-memory 100G /home/dbisroot/SparkMapReduceWithScala-assembly-0.2.jar /home/senko/pagerankInput/soc-LiveJournal1.txt 20 


