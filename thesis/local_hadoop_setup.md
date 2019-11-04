To test hadoop mapreuce programs, it is useful that run a local hadoop, but with a single node. This is called single node cluster. There are 2 types of this one is standalone operation, with this hadoop can start as a single process but we don't want this, we want to run hdfs on our local computer.
For doing this we need to do this operations

* First check if JAVA_HOME is set.
* go to hadoop-env.sh and enter JAVA_HOME value in the hadoop-env.sh too 
* download and extract hadoop under /opt
* edit core-site.xml as
    ```
    <configuration>
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://localhost:9000</value>
        </property>
    </configuration>
    ```

* then config hdfs-site.xml to make replication 1
    ```
    <configuration>
        <property>
                <name>dfs.replication</name>
                <value>1</value>
        </property>
    </configuration>
    ```

* then you need to ssh your localhost without needing password to make this execute these commands
    ```
    $ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
    $ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    $ chmod 0600 ~/.ssh/authorized_keys
    ```
    first command `-t rsa`  selects the algorithm. `-f ` specifies the filename and `-P` is specify the pharaphrase  
    second command add/append the info in id_rsa.pub to authorized_keys  
    chmod 0600 -> same with 600, 6 means 2+4 (can read(2) and can write(4)) so it means that only owner of this file can read and write

* then we need to make configurations on YARN
* go to mapred-site.xml and set these configurations  
    ```
    <configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.application.classpath</name>
        <value>$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/*:$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/lib/*</value>
    </property>
    </configuration>
    ```  

* then set yarn-site.xml
    ```
    <configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
    </configuration>
    ```

* format hdfs with `hdfs namenode -format` 
* then run start-dfs.sh
* run start-yarn.sh
* ypi can check hadoop ui with port 9870
* yarn ui port is 8088

* create user folder with hdfs dfs -mkdir user/
* create your user folder with hdfs dfs -mkdir user/senko

--------

# Grep Task

* ilk once bi grepGenerator ile ornek dosya yarat ve hdfs icine koy  
python3 Generated.py -s 100 diyerek 100MB lik bi dosya yarattik sonra da  
hdfs dfs -put komutu ile /user/senko/input altina koyduk, input folderi yoksa yarat

* hadoop jar mapReduceGrep-0.1.jar com.senko.GrepDriver /user/hadoop/input /user/hadoop/output cluster  
sekilnide calistirdik clusterda, sonuna cluster veya local yazman hdfs://mond45:9000 veya hdfs://localhost:9000 yapiyor.

* clusterda calistirken mapred-site.xml de sunlarin da girili olmasi lazim
    ```
        <property>
    <name>yarn.app.mapreduce.am.env</name>
    <value>HADOOP_MAPRED_HOME=/home/dbisroot/hadoop-3.2.1</value>
    </property>
    <property>
  <name>mapreduce.map.env</name>
  <value>HADOOP_MAPRED_HOME=/home/dbisroot/hadoop-3.2.1</value>
    </property>
    <property>
  <name>mapreduce.reduce.env</name>
  <value>HADOOP_MAPRED_HOME=/home/dbisroot/hadoop-3.2.1</value>
    </property>
    ```

* ve de bu lazim mi bilmiyorum ama benim jar i gidip hadoop klasorunun atlinda gidip /share/hadoop/mapreduce altina koydum. mapReduceGrep-0.1.jar dosyanin adi

------------

# YARN memeory Management
Yarn 2 parcadan olusuyor, bunlardan biri resourceManager, master node'ta yasiyor, digeri de worker'lar da yasayan NodeManager. Yarn bir worker node icinde birden cok container yaratabilir. Her container'da da bir tane job kosuyor, bu map veya reduce job'u olabilir.

* yarn.nodemanager.resource.memory-mb : Bir node icinde toplamdaki tum container'larda verilebilecek memory miktari. mesela node'da 48gb fiziksel ram var, sen bunun value'suna 40 dersen, cihazda yaratilacak tum container'larin toplam memory'si 40i asmaz.

* yarn.scheduler.minimum-allocation-mb ve yarn.scheduler.maximum-allocation-mb : bunlar ise tek bir container'in alabilecegi ram miktarini belirtir.

* Eger bir job atiyorum 1200MB ram isterse ResourceManager bu job'un kostugu container'a 2048 atar, yani devamli 2'nin katlari seklinde memory atiyor, tabii max sinirini gecmedigi surece.

* yarn.scheduler.minimum-allocation-vcores 1 : container basina kac vcore verilecegi. yarn.scheduler.maximum-allocation-vcores 32 da max.

* yarn.nodemanager.resource.cpu-vcores  8 : bu da muhtemleen toplamda container'lara ne kadar vcore verilebilecegi.

* Verdigimiz bir job'u AM yani application Master izliyor. Job tamamlaninca Application Master'da destroy ediliyor. 

* In general the java heap size should be equal to 1/3 memory of the container size.

* mapreduce.map.memory.mb : bir map taskina ne kadar ram vericez, genelde container'a atadigin ram kadar ata diyorlar

* mapreduce.reduce.memory.mb : bir reduce job'una ne kadar ram vericez

* mapreduce.map.java.opts = 0.8 * mapreduce.map.memory.mb

* mapreduce.reduce.java.opts = 0.8 * 2 * mapreduce.reduce.memory.mb

* yarn.app.mapreduce.am.resource.mb : application master'a ne kadar ram verecegin, genelde container a verdiginin 2 kati ver

* yarn.app.mapreduce.am.command-opts : container'a verdigiin 0.8 * 2 kati kadar ver

* yukarda bahsedilenler hep container'in minimum degeleri icin

* cok kabaca onerilen minimum u 64gb ram icin 6gb taraflarnda tutup, maximumu da toplam containerlara verdigin rakami vermke, yani en kotu durumda en azinda 1 buyuk container olussun

* yarn timelineserver i deamon olarak calistircaksan
$HADOOP_YARN_HOME/sbin/yarn-daemon.sh start timelineserver
dieyceksin portu 8188


-----------

## Learning server's informations

* lscpu : cpu ile iligili tum ozellikleri soyluzor, Bide AMD EPYC 7351 16-Core islemci var, toplamda 16*4 : 64 core ediyor. (64 vcore var diye dusuncez)

* free -h ile toplam ram i ogrenebiliyoruz. 500gb ram var her serverda

* lsblk -o MODEL,SIZE,NAME -d ile takili diskleri ogrenebiliyruz.



