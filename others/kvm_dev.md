bu dosya da kvm ile kendime dev environment yapicam, hadoop spark vs calismak icin.

* libvirt ile xubuntu kurdum direk iso dan
* ilk once ip adresi almadi lab networkunden ben de static ip ekledim
* virsh net-list ile tum virtual networklere bakabiliyoruz  
virsh net-dumpxml lab ile lab networkune bakabiliyoruz  
daha sonra dev vm'imin mac adresini almam lazim onun icin  
virsh dumpxml <vm_name> | grep -i '<mac' dersen mac adresini verir direk  
-i -> ignore case demek, http://droptips.com/using-grep-and-ignoring-case-case-insensitive-grep burda anlatiyor.  

+ daha sonra virsh net-edit lab diyerek yeni static ip adresini ekledim
* daha sonra virsh net-destroy lab  virsh net-start lab diyerek dns serveri restart yaptim
* daha sonra xubuntu ipv4 ve ipv6 icin ip forwardingi enable ettim, bunu /etc/sysctl.conf dan yapabiliyorsun.

* daha sonra yapilacaklar

    * xubuntu ya java yukle, JAVA_HOME set ed OK
    * .tmux.conf u cek senin githubtan OK
    * eclipse yukle OK
    * spark yukle