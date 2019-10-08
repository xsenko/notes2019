* ilk once hadoop kullanicisi yaratildi ve sudoers e eklendi.  
adduser hadoop ve usermod -aG sudo hadoop

* daha sonra apt-get update ve apt-get upgrade yapildi

* tmux yuklendi

* home folderinda .tmux.conf yaratildi ve asagidaki configler girildi
```bash
#set mouse off/on - if off, forces you to use keyboard with prefix-[
set -g mouse on

#256 colours
set -g default-terminal "screen-256color"

# use vi mode
setw -g mode-keys vi
set -g status-keys vi

# force tmux to use utf-8
setw -gq utf8 on

#-------------------------------------------------------#
#Pane colours
#-------------------------------------------------------#
# set inactive/active window styles
set -g window-style 'fg=colour247,bg=colour236'
set -g window-active-style 'fg=colour250,bg=black'

#pane border
set -g pane-border-bg colour235
set -g pane-border-fg colour238
set -g pane-active-border-bg colour236
set -g pane-active-border-fg colour51
#-------------------------------------------------------#

#-------------------------------------------------------#
#PANE NAVIGATION/MANAGEMENT
#-------------------------------------------------------#
# Use Alt-arrow keys WITHOUT PREFIX KEY to switch panes
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D
#-------------------------------------------------------#

```

surdaki vim gray renk olayini da ypman lazim
http://www.deanbodenham.com/learn/tmux-conf-file.html



* tum makinelerde /etc/hosts ayarlarini yap

* ssh key ayarlarini yap


* elindeki .tmux.conf dosyasini diger tum makinelere at
bunun icin su scripti kullanabilirsin
```bash
for node in node1 node2; do
    scp ~/hadoop/etc/hadoop/* $node:/home/hadoop/hadoop/etc/hadoop/;
done
```

* java home i ayarliyacaksin  
eger java -version veya javac -version 1.8 i gostermiyorsa update-alternatives --config java  
komutu ile dogru java yi bulman lazim
daha sonra java_home u .profile da set edebilirsin
.profile e giriyorsan export JAVA_HOME diye baslaman lazim

* hadoop u indirdikten sonra home folderi altina kur ve diger bilgisayarlara da at
```bash
#!/bin/bash
for mond in mond46 mond47 mond48 mond49
    do
        scp -r /home/hadoop/hadoop-3.1.2 $mond:/home/hadoop
    done
```
yukardaki gibi bisi ypatim da burda mallik folder i atiyor bunun yerine indirdigin tar.gz yi at sonra her makinada ac daha mantikli

* hadoop_home u belirle ve hadoop/bin ve hadoop/sbin i .profile e at (tum serverlar icin) duzeltme!! .profile e degil .bashrc ye aticaz

* daha sonra core-site.xml, yarn-site.xml, mapred-site.xml ve hdfs-site.xml i gireceksin main node icin
(hadoop duzgun calisirsa bilgisayardaki confilari buraya at)

* daha sonra bu conflari diger tum pc lere atican

* hadoop_env.sh ta JAVA_HOME ve HADOOP_HOME u ayarliyacan

* daha sonra ilk start-dfs.sh sonra da start-yarn.sh ile calistircaksin

* eger hdfs web ui 9870 acik degilse
sudo ufw allow 443/tcp ile acican.

* eger ufw i kapatmazsan datanode lar namenodu u goremiyor, o yuzden hangi portlari kullanman gerektigini bulana kadar calismadan once ufw i kapat
sudo ufw disable
sudo ufw enable
sudo ufw status verbose

* historyserver i calistirmak icin  
[mapred]$ $HADOOP_HOME/bin/mapred --daemon start historyserver demek lazim.

* web interfaces
```
Daemon	Web Interface	Notes
NameNode	http://nn_host:port/	Default HTTP port is 9870.
ResourceManager	http://rm_host:port/	Default HTTP port is 8088.
MapReduce JobHistory Server	http://jhs_host:port/	Default HTTP port is 19888.
```


* hadoop standalone modda direk dosya sisteminden okuyup yazabiliyorsun ama, pseudocluster veya normal clusterda hdfs ten okuyor mapreduce programlari. Senin yazdigin grep taski standlone da gidip normal file system den dosya verebilirsin, clusterda calistirdiginda da gidip hdfs ten dosya verebilirsin birseyi degistirmeden

* sed komutlarina bak sed -i -e galiba sona ekleme yapiyordu

* 
mapreduce.map.memory.mb is the upper memory limit that Hadoop allows to be allocated to a mapper, in megabytes. The default is 512. If this limit is exceeded, Hadoop will kill the mapper with an error like this:

Container[pid=container_1406552545451_0009_01_000002,containerID=container_234132_0001_01_000001] is running beyond physical memory limits. Current usage: 569.1 MB of 512 MB physical memory used; 970.1 MB of 1.0 GB virtual memory used. Killing container.
burdan aldik: https://stackoverflow.com/questions/24070557/what-is-the-relation-between-mapreduce-map-memory-mb-and-mapred-map-child-jav


burda da yarn nasil config ayar cekeriz var : https://www.cloudera.com/documentation/enterprise/5-3-x/topics/cdh_ig_yarn_tuning.html

* bir de yarn in tum node icin ve container basina ayiracagi ram var, onlari da burda anlatmislar : https://stackoverflow.com/questions/43826703/difference-between-yarn-scheduler-maximum-allocation-mb-and-yarn-nodemanager

* burda da bisiler var sanki : https://community.hortonworks.com/questions/29469/yarn-container-size-flexible-to-satisfy-what-appli.html

* bu bizim aldigimiz hata : https://community.hortonworks.com/questions/222992/yarn-container-is-running-beyond-physical-memory-l.html

* https://dzone.com/articles/configuring-memory-for-mapreduce-running-on-yarn

* guzel anlatiyor: https://blog.cloudera.com/untangling-apache-hadoop-yarn-part-1-cluster-and-yarn-basics/

* lessons learned from scaling yarn 40k : https://www.slideshare.net/Hadoop_Summit/lessons-learned-from-scaling-yarn-to-40k-machines-in-a-multi-tenancy-environment








