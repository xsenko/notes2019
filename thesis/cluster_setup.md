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

* 

