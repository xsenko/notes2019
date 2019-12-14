* first install mysql with `sudo apt install mysql-server`
* install apache server with `sudo apt install apache2`
* sudo systemctl status apache2 command will show status of apache
* sudo systemctl status mysql will show the status of mysql-server

for installing zabbix
first install zabbix repository
* wget https://repo.zabbix.com/zabbix/4.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_4.4-1+bionic_all.deb
* dpkg -i zabbix-release_4.4-1+bionic_all.deb
* sudo apt update

install zabbix-server, zabbix-frontned and zabbix-agent
* sudo apt -y install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-agent


zabbit server configuration file is in
/etc/zabbix/zabbix_server.conf

PHP related configuration file
/etc/zabbix/apache.conf

zabbix configuration
/usr/share/zabbix/conf/zabbix.conf.php

* zabbix_server.conf ta 2 tane timezone var dikkat et, ikisini de editlemen lazim daha sonra da apache yi restart etmen lazim.

zabbix frontend de giris Admin / zabbix

* zabbix_server.conf ta dbpassword girmeyi unutma!

