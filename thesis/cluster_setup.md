+ First in your own computer add mond45 - mond49 to hosts file
```bash
sudo vim /etc/hosts

then enter
134.34.224.132  mond45
134.34.224.133  mond46
134.34.224.134  mond47
134.34.224.135  mond48
134.34.224.136  mond49
```

* for all monds use `sudo passwd dbisroot` and enter new password

* execute `sudo apt-get update -y && sudo apt-get upgrade -y` for all servers

* for all servers add other servers to /etc/hosts example for mond45:
```
127.0.0.1       localhost
134.34.224.132  mond45
134.34.224.133  mond46
134.34.224.134  mond47
134.34.224.135  mond48
134.34.224.136  mond49
```

* mond45 should establish ssh connection to others without using password for this you need to create public/private key  
first create public/private key pair with
`ssh-keygen -t rsa -b 4096 -C "selcuk.cabuk@uni-konstanz.de"`
then copy your public key to all servers (include mond45)
`ssh-copy-id dbisroot@mond45-49`  
then test if mond45 can connect all other monds

* install java 8 to all machines if it already installed use `update-alternatives --config java` and set java8 

* set JAVA_HOME for all mond servers, for this  
`sudo vim ~/.bashrc`  
then add this to last line
`export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64`  
then use `source ~/.bashrc` then check with `echo $JAVA_HOME`  

* for spark 2.4.4 you need to install scala 2.12, you need to install min 2.12.3. I install 2.12.10 because of some bug in xterm color.  
`sudo wget http://scala-lang.org/files/archive/scala-2.12.10.deb` daha sonra  
`sudo dpkg -i scala-2.12.10.deb`  
not: scala REPL'dan cikmak icin :q kullaniyorsun.

* then we need to adjust firewall with UFW (uncomplicated firewall)  
all nodes should reach each other with all ports  
in mond 45 tpye `sudo ufw allow from 134.34.224.133` -> this is for mond46, you need to make it to all monds to all monds  

## Hadoop setup
* first download hadoop with wget, we are using hadoop 3.1.2  
http://mirror.softaculous.com/apache/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz  
then extract the tar.gz

* copy hadoop folder to other monds
    ```bash
        for mond in mond46 mond47 mond48 mond49
            do
                scp -r /home/hadoop/hadoop-3.1.2 $mond:/home/hadoop
            done
    ```

* for all monds define hadoop_home and add ${HADOOP:HOME}/bin and ${HADOOP_HOME}/sbin to /.bashrc
    ```bash
    export HADOOP_HOME=/home/dbisroot/hadoop-3.2.1
    export PATH="${HADOOP_HOME}/bin:${HADOOP_HOME}/sbin:${PATH}"
    ```
    then `source ~/.bashrc`
* make configurations on mond45

* config core-site-xml
    ```xml
    <configuration>
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://mond45:9000</value>
        </property>
    </configuration>
    ```

* config hdfs-site.xml
    ```xml
    <configuration>
	<property>
		<name>dfs.replication</name>
		<value>3</value>
	</property>

	<property>
		<name>dfs.namenode.name.dir</name>
		<value>/home/dbisroot/data/nameNode</value>
	</property>

	<property>
		<name>dfs.datanode.data.dir</name>
		<value>/home/dbisroot/data/dataNode</value>
	</property>
    </configuration>
    ```

* config yarn-site.xml
    ```xml
    <configuration>

    <!-- Site specific YARN configuration properties -->

    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>

    <property>
	<name>yarn.resourcemanager.hostname</name>
        <value>mond45</value>
    </property>

    <property>
	<name>yarn.acl.enable</name>
	<value>0</value>
    </property>

    </configuration>
    ```
* config mapred-site.xml
    ```xml
    <configuration>
    <property>
            <name>mapreduce.framework.name</name>
            <value>yarn</value>
    </property>
    </configuration>
    ```

* edit workers file
    ```
    mond46
    mond47
    mond48
    mond49
    ```

* then send this all configuration to other monds
    ```
    for node in node1 node2; do
        scp ~/hadoop/etc/hadoop/* $node:/home/hadoop/hadoop/etc/hadoop/;
    done`bash
    ```

* in hadoop_env.sh set JAVA_HOME and HADOOP_HOME

* in main node run `hdfs namenode -format`

* in main node start hdfs by running `start-dfs.sh`

* you can check processes with jps command

* then run yarn with start-yarn.sh to stop yarn use stop-yarn.sh

* you can check hdfs web UI from port 9870, but for this you need to allow yourself (your ip) from ufw in main node which is mond45

* web interfaces
    ```
    Daemon	Web Interface	Notes
    NameNode	http://nn_host:port/	Default HTTP port is 9870.
    ResourceManager	http://rm_host:port/	Default HTTP port is 8088.
    MapReduce JobHistory Server	http://jhs_host:port/	Default HTTP port is    19888.
    ```

## Spark setup

* for installing spark, first download spark to all servers  
`http://ftp-stud.hs-esslingen.de/pub/Mirrors/ftp.apache.org/dist/spark/spark-2.3.4/spark-2.3.4-bin-hadoop2.7.tgz`  
then extract via `tar -zxvf `

* in ~/.bashrc add SPARK_HOME and add {SPARK_HOME}/bin and sbin
    ```bash
    export HADOOP_HOME=/home/dbisroot/hadoop-3.2.1
    export SPARK_HOME=/home/dbisroot/spark-2.3.4-bin-hadoop2.7
    export PATH="${HADOOP_HOME}/bin:${HADOOP_HOME}/sbin:${SPARK_HOME}/bin:${SPARK_HOME}/sbin:${PATH}"
    ```

* spark conf altinda spark-env.sh a bunlari ekle  
export HADOOP_CONF_DIR=/home/dbisroot/hadoop-3.2.1/etc/hadoop  
export SPARK_MASTER_HOST='134.34.224.132'  (mond45 yani main node ipsi)
export JAVA_HOME=$JAVA_HOME

* conf altinda
cp slaves.template slaves vim slaves diyip hem master node uu hem de diger node lari greicez (burda master node umuzu da worker yapmis oluyoruz ayni zamanda)

* daha sonra sbin altinda ./start.all.sh i baslatcaz, ve stop-all.sh ile de kapatabiliyoruz.

* daha sonra mond45:8080 ile web interfaceine girebiliyoruz.

* spark default olarak cluster olunca hdfs ten veri okuyor. o yuzden sparki acmadan once hadoop u calistirmak gerekli

* ./spark-submit --master spark://mond45:7077 --class com.senko.PageRankScala --deploy-mode client /home/dbisroot/SparkMapReduceWithScala-assembly-0.1.jar /user/hadoop/sparfiles/deneme.txt  
diyerek baslattik bizim programi

* scala tarafinda ise ilk once project folder inin altinda plugins.sbt olusturduk ve bunu ekledik `addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.14.6")`  

* daha sonra built.sbt ye bunu ekledik
```scala
assemblyMergeStrategy in assembly := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case x => MergeStrategy.first
}
```

* daha sonra intellij de terminal a tiklayip
`sbt assembly` diyince bize uber jar i verdi


* eger sonradan datanode eklemke istiyorsan hadoop-daemon.sh start datanode demen lazim.

* daha sonra hdfs dfsadmin -report ile bakabilirsin

* yarn icin de yarn-daemon.sh start nodemanager diyeceksin eklemek icin sonradan.

* yarn icin timeline server yarn timelineserver komutu ile calisiyor, default portu ise 8188

* bu arada yarn-site.xml de bir degisiklik yaptiktan sonra bu dosyayi diger tum node'lara da kopyalaman lazim. Ve yarn i restart emen lazim.

* 









