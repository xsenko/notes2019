after install lubuntu I need to make some things

1) Install JDK
    
    -> check JAVA_HOME: if it is not set, go /etc/profile.d and create .sh script
    write export JAVA_HOME="java home directory"
    generally java will be installed in /usr/lib/jvm/java-8-openjdk-amd64/

2) Install Maven

3) check if ssh server is installed. To check we can look systemctl first
    
    sudo systemctl list-units --type=service --state=running<br/>
    sudo systemctl list-units --type=service --state=active  
    if there is no sshd, install sshd  
    sudo apt update  
    sudo apt install openssh-server  
    then check if ssh is working by:  
    sudo systemctl status ssh  
    if working than you can connect with mobaXterm or other ssh client

4) eclipse i command line dan calistirmak icin  
setsid ./eclipse &>/dev/null  
boylece console a log filelari da basmaz eclipse ve konsolu da sonra kapatabilirsin





