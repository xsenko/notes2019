`sudo apt install qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils virt-manager`  
first enter this command to install kvm and libvirt, libvirt is a graphical user interface for kvm.

**building NAT network with libvirt**

* first we need to know that ip forwarding is enable
`cat /proc/sys/net/ipv4/ip_forward` should return 1  
if not enabled with this `sudo sysctl -w net.ipv4.ip_forward=1` make it enable  
then go to /etc/sysctl.conf and make net.ipv4.ip_forward=1 this will make permenantly enable

* daha sonra libvirt ustunden yapiyoruz vm creation islemini. Bir sekilde 22 portunu otomatik forward ediyor heralde kvm

* static ip nasil atiyorsun : https://www.cyberciti.biz/faq/linux-kvm-libvirt-dnsmasq-dhcp-static-ip-address-configuration-for-guest-os/

* 

**mysql installation**

* eger apt ile indireceksek burdaki guide i takip edicez: https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/  
bir deb file indirip onla neleri yuklemek istedigimizi secip sonra apt update yapip sonra apt install ile istedigimiz paketleri yukluyoruz.

* mysql i kurduktan sonra vm icinde 3306 da claismali lazim, bunu test etmek icin  
netcat -z -v \<hostname> \<port> diyerek 3306 portuna bakaliriy bizim host icinden burda v : -v' Have nc give more verbose output. z ise : -z' Specifies that nc should just scan for listening daemons, without sending any data to them. It is an error to use this option in conjunction with the -l option. isi yapiyor. Eger dns ile resolve olmasin diyorsak -n diyip ip adresini yazicaz.  

* bir baska yontem de netstat ile bakmak  
netstat -l -> tum listen yapan portlari gosterir, -t sadece tcp gosterir, -n numeric adreslerini gosterir, -e additioanl information gosterir -a tum socketleri gosterir, -u udp leri gosterir  
netstat ile guzel baska bir yazi: https://sites.google.com/site/xiangyangsite/home/technical-tips/linux-unix/networks-related-commands-on-linux/how-to-read-netstat--an-results

* mysql -u root -p ile mysql ile girecez serverda  
daha sonra su komutlari yazicaz
```
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```

bu sekilde remote olarakta baglanabilecegiz.

**wildfly kurlumu**

* wildfly i indirip tar.gz den cikar
* java var mi diye kontrol et makinede. sonra java_home dogru set edilmis mi ona bak, JAVA_HOME u /etc/environment e ekledim ben bu sefer

* wildfly klasorunde /bin altinda add-user.sh ile once kullanici yaraticaz, daha sonra da standalone.sh ile baslaticaz.

* normalde standalone.sh ile baslatinda wildfly sadece localhost u dinler o yuzden bunu degistirmemiz lazim, 2 sekilde yapabiliriz, ya standolone.sh -b 0.0.0.0 diyecez ya da 
```
<interface name="public">
    <inet-address value="${jboss.bind.address:0.0.0.0}"/>
</interface>
```

* management konsolu aktif yapmak icin
```
<interface name="management">
            <inet-address value="${jboss.bind.address.management:0.0.0.0}"/>
        </interface>
```
yapmamiz lazim yine standalone.xml dosyasinda

* wildfly host a ping atamiyordu, bunun nedeni iptables tan kaynaklaniyor ama tam niye bilmiyorum, iptables nasil calisiyor nasil kural ekleniyor vs bunu ogrenmen lazim!  
ama soyle bisi yaptim
```
ilk once mevcut kurallarin yedegini aldim
sudo iptables-save > /home/senko/firewall.rules

iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT

eger yedekten donmek istiyorsak
iptables-restore < /home/senko/firewall.rules
```

* normalde senin host oldugun linuxte ssh server olmayabilir, bunu kontrol etmek icin `sudo systemctl status ssh` diyecksin eger servis yoksa, `sudo apt install openssh-server` diyeceksin.

* daha sonra wildfire admin konsoluna girip deploy deyip bizim connector u seciceksin

* datasource eklerken non-XA data source ekliyeceksin, burda JNDI name icin projendeki persistence.xml i bulup ordaki \<jta-data-source> ile ayni olucak.

* xpm projesi ile mysql connector 8 calismiyor, gidip 5i indirmemiz lazim.

* manuel yapim icin da burda link var : https://tomylab.wordpress.com/2016/07/24/how-to-add-a-datasource-to-wildfly/

* 