* After SSH connection, first create a user  
`adduser hadoop`  

* then update and upgrade the system  
`sudo apt-get update && sudo apt-get upgrade`  

* install java 8  
`sudo apt-get install openjdk-8-jdk`

* set JAVA_HOME mostly java is installed into /usr/lib/jvm. First create JAVA_HOME variable into /etc/environments, then use `source /etc/environments`

* add hadoop user to the sudoers  
`usermod -aG sudo hadoop`

* for all nodes (both workers and master) add other devices to /etc/hosts and set hostname for all devices

* download hadoop extract and move to home folder  
`wget http://mirrors.ae-online.de/apache/hadoop/common/hadoop-3.1.2/hadoop-3.1.2.tar.gz`  `tar zxvf hadoop-3.1.2.tar.gz`  
`mv hadoop-3.1.2.tar.gz /home/hadoop`

* add hadoop bin and sbin folders into .profile in hadoop user

* add fs.defaut.name configuration to core-site.xml  
```    
<configuration>    
        <property>
            <name>fs.default.name</name>
            <value>hdfs://node-master:9000</value>
        </property>
</configuration>
```

* add below configurations into hdfs-site.xml
```
<configuration>
    <property>
            <name>dfs.namenode.name.dir</name>
            <value>/home/hadoop/data/nameNode</value>
    </property>

    <property>
            <name>dfs.datanode.data.dir</name>
            <value>/home/hadoop/data/dataNode</value>
    </property>

    <property>
            <name>dfs.replication</name>
            <value>1</value>
    </property>
</configuration>
```
dfs.namenode.name.dir specifies where the name table sohuld be hold
dfs.datanode.data.dir specifies where the data blocks should be hold

* add below configuration to mapred-site.xml
```
<configuration>
    <property>
            <name>mapreduce.framework.name</name>
            <value>yarn</value>
    </property>
</configuration>
```

* add below configuration to yarn-site.xml
```
<configuration>
    <property>
            <name>yarn.acl.enable</name>
            <value>0</value>
    </property>

    <property>
            <name>yarn.resourcemanager.hostname</name>
            <value>node-master</value>
    </property>

    <property>
            <name>yarn.nodemanager.aux-services</name>
            <value>mapreduce_shuffle</value>
    </property>
</configuration>
```

* edit workers file 
```
node1
node2
```

* go to yarn-site.xml and add this configurations
```
<property>
        <name>yarn.nodemanager.resource.memory-mb</name>
        <value>1536</value>
</property>

<property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>1536</value>
</property>

<property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>128</value>
</property>

<property>
        <name>yarn.nodemanager.vmem-check-enabled</name>
        <value>false</value>
</property>
``` 
these are for linode because we are using 2gb servers. 

* go to mapred-site.xml and add these properties
```
<property>
        <name>yarn.app.mapreduce.am.resource.mb</name>
        <value>512</value>
</property>

<property>
        <name>mapreduce.map.memory.mb</name>
        <value>256</value>
</property>

<property>
        <name>mapreduce.reduce.memory.mb</name>
        <value>256</value>
</property>
```

* create two other nodes named node1 and node2 in linode and first apply apt-get update && apt-get upgrade then create hadoop user for these nodes and configure /etc/hosts files for three of them.

* in main node create ssh public private key pair with  
`ssh-keygen -b 4096`  
then copy it to two other nodes
```
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadoop@node-master
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadoop@node1
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadoop@node2
```

* make hadoop folder .tar.gz archive in main node
`tar -czvf hadoop-3.1.2.tar.gz hadoop-3.1.2 `  
then use scp and send two other nodes  
`scp hadoop-*.tar.gz node1:/home/hadoop`  
`scp hadoop-*.tar.gz node2:/home/hadoop`

* in node1 and node2 untar the file

* if it isn't setted, set JAVA_HOME in node1 and node2

* if there are some mistakes in configuration check and correct it in main node, then you can send configuration files to node1 and node2 with this script  
```
for node in node1 node2; do
    scp ~/hadoop/etc/hadoop/* $node:/home/hadoop/hadoop/etc/hadoop/;
done
```
* in main node run `hdfs namenode -format`

* in main node start hdfs by running `start-dfs.sh`

* you can check processes with jps command

* then run yarn with start-yarn.sh to stop yarn use stop-yarn.sh

* 



