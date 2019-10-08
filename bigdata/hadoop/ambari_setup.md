* FQDN nameleri ve hostnameleri hazirlayacaksin
* her bilgisayarda hadoop diye kullanici yarat, sudo ya ekle
* master-node da ssh key yarat ve digerlerine at
* ufw i disable et, sudo ufw disable komutu ile
* ambari nin repository .list file ini yuklemen lazim onun icin bu link takip ettim https://docs.hortonworks.com/HDPDocuments/Ambari-2.7.3.0/administering-ambari/content/amb_download_the_ambari_repository_on_ubuntu_16.html

* sonra sudo apt-get install ambari-server ile yukleyeceksin main node un hangisi ise

* root altinda ambari yi calistirmamak icin
By default, Ambari Server runs under root. Accept the default (n) at the Customize
user account for ambari-server daemon prompt, to proceed as root. If
you want to create a different user to run the Ambari Server, or to assign a previously
created user, select y at the Customize user account for ambari-server
daemon prompt, then provide a user name.

gittim root ile kurdum, hadoop ile kurunca sorun cikiyordu.
ve diger bilgisayarlara da ambari-agent i yukledim.

ambari-setup derken deamon da kullaniciyi hadoop secip ama ssh lari root ustunden yaparsan da olmuyor

sadece hem ambari setup ta useri hadoop secip hem de hadoop kullanicisinin private key ini kullaninca olmuyor.

repo file: http://public-repo-1.hortonworks.com/ambari/ubuntu18/2.x/updates/2.7.3.0/ambari.list

komutlar:

wget -O /etc/apt/sources.list.d/ambari.list http://public-repo-1.hortonworks.com/ambari/ubuntu18/2.x/updates/2.7.3.0/ambari.list
apt-key adv --recv-keys --keyserver keyserver.ubuntu.com B9733A7A07513CAD
apt-get update

eger hive kurulurken mysql error verirse sunu yapcan
sudo apt-get install libmysql-java
daha sonra /usr/share/java ya git burda connectoru bul
ve bu conncetoru 
/var/lib/ambari-server/resources/ altina at
ve adini mysql-connector-java.jar olarak degistir.

