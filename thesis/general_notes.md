## how to automatize terminator

* first prepare your layout and save in prefences -> layout
* then install sshpass via `sudo apt-get install sshpass`
* then open termiator config via `vim ~/.config/terminator/config`
* add command=\<your command> ;bash
---------------

* daha sonra herhangi bir konsoldan su sekilde baslaticaz  
`nohup termiantor -l uni &`  
burda nohup dememizin nedeni calistirdgimiz shell den tamamen ayri olmasi ve & dememdizin nedeni de calistiktan sonra backgrouna atilmasi.
* this document explains well what nohup disown and & are, and how they works  
https://unix.stackexchange.com/questions/3886/difference-between-nohup-disown-and

-----------------

* when making ssh to uni servers, sometimes we are getting `packet_write_wait: Connection to ...` error, to overcome this problem we need to go /etc/ssh/ssh_config and add these two lines  
    ```
    ServerAliveInterval 30
    ServerAliveCountMax 5
    ```

------------




## grep task generator

* python 3'te yazicaz. Ama once serverlara python3 yukleyelim.
* sudo apt-get install python3 demek yeterli oluyor, daha sonra python 2 kullanacagin zaman python, python 3 kullanacagin zaman python3 yazman yeterli oluyor.
* python3 e pip yukelemek icin de sudo apt install python3-pip demek gerekli

* python3 e virtualenv yuklemek icoin pip3 install virtualenv demek yeterli

* virtualenv myVirtualEnv komutu ile yeni bir virtualenv yaratabiliyoruz python2 icin
* python3 icin ise python3 -m venv myVirtualEnv diyecez.
* activate etmek icin de source /bin/activate diyecez, virtualenv yarattigimiz folder in icinde
* deactivate diyerek te otomatik deactivate edebiliyoruz.

* virtualenvwrapper i yukelemek icin ise pip3 install virtualenvwrapper diyecez

* python da debug yaparken vs code'da ilk once F9 ile breakpointleri seciyoruz daha sonra F5 ile debug mode a gecip debug ediyoruz. Burda assagida Debug Console'da ise o anki variable'lar ile oynayabiliyoruz.

* bunu nohup ile calistirmak icin nohup python3 -u ./Filegenerator.py -s /\<istedigin size> > log.out & demen lazim  
python3 -u su ise yario, normalde nohup veya log.out a yazilacak seyleri bufferliyor program bitene kadar sonra basiyor, bunla bufferlamasini onlemis oluyoruz. 
```
-u
Force the stdout and stderr streams to be unbuffered. This option has no effect on the stdin stream.

See also PYTHONUNBUFFERED.

Changed in version 3.7: The text layer of the stdout and stderr streams now is unbuffered.
```


