* step 1 tum bilgisayarlara flink i yukle ve tar dan ac

* sonra master da flink altinda conf/flink-conf.yaml a gir ve jobmanager.rpc.address e main nodunu gir, biz mond45 girdik.
jobmanager ve taskmanager in heap sizelarini gir, number of task slots u gir.

* masters dosyasina mond45 i girdik slaves e diger mondlari girdik.

* bu configurasyon dosyalarini diger tum node lara da aticaksin

* sonra bin/start-cluster.sh ile baslatip stop-cluster.sh ile durdurabilirsin

* hdfs i gorebilmesi icin HADOOP_CLASSPATH in tanimli olmasi lazim environment te.

* flink in web interface i 8081 den calisiyor.

* 