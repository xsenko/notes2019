* step 1 tum bilgisayarlara flink i yukle ve tar dan ac

* sonra master da flink altinda conf/flink-conf.yaml a gir ve jobmanager.rpc.address e main nodunu gir, biz mond45 girdik.
jobmanager ve taskmanager in heap sizelarini gir, number of task slots u gir.

* masters dosyasina mond45 i girdik slaves e diger mondlari girdik.

* bu configurasyon dosyalarini diger tum node lara da aticaksin

* sonra bin/start-cluster.sh ile baslatip stop-cluster.sh ile durdurabilirsin

* hdfs i gorebilmesi icin HADOOP_CLASSPATH in tanimli olmasi lazim environment te.

* flink in web interface i 8081 den calisiyor.

* HADOOP_CLASSPATH icin sunu ypatik ~/.bashrc de  
```
Open your bash profile (~/.profile or ~/.bash_profile) for editing and add the following:

export HADOOP_HOME="/usr/local/Cellar/hadoop" then Replace with your own path
export HADOOP_CLASSPATH=$(find $HADOOP_HOME -name '*.jar' | xargs echo | tr ' ' ':') Save the changes and reload.

source ~/.profile
```
* ve bunu tum mond lara yaptik sadece master a degil

* eger gelly i kullanicaksan gelly'nin library'leri opt altinda bunlari /lib e eklemek lazim
```
cp flink-gelly_*.jar ../lib/
cp flink-gelly-scala_*.jar ../lib/ -> bu scala icin haliyle
```
* bunu da hepsine uyguladik tum mondlara yani

* copy isini yaptikran sonra flink i stop yapip sonra yeniden bi baslatman lazim

* sunu yaparak deneyebilirsin gelly calisiyor mu duzgun diye
```
./flink run ../examples/gelly/flink-gelly-examples_2.11-1.9.1.jar \
    --algorithm GraphMetrics --order directed \
    --input RMatGraph --type integer --scale 20 --simplify directed \
    --output print
```

* soyle bi error aldik
```
Caused by: org.apache.flink.core.fs.UnsupportedFileSystemSchemeException: Could not find a file system implementation for scheme 'hdfs'. The scheme is not directly supported by Flink and no Hadoop file system to support this scheme could be loaded.
```
bunun icin HADOOP_CONF_DIR i yapin demisler
benim icin de HADOOP_CONF_DIR degeri = /home/dbisroot/hadoop-3.2.1/etc/hadoop

sunu girdim .bashrc ye export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop


bunu tum mond'lar icin yaptim.

* flink te hdfs e link vericeksen hdfs://mond45:9000/home/senko/wordcountInput.txt seklinde vermen lazim 

* flink run pagerank  
./flink run ~/FlinkPageRankJava-1.0-SNAPSHOT.jar --input hdfs://mond45:9000/home/senko/pagerankInput/wiki-Vote.txt --output hdfs://mond45:9000/home/senko/result/flinkResult --iter 5








