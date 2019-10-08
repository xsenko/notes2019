burda ansible ile ilgili notelar var.

* ansbile yukelemek icin
sudo apt-add-repository ppa:ansible/ansible
demek lazim.  
daha sonra apt-get install ansible   
diyerek yukluyorsun.

* ssh key yaratmak icin
ssh-keygen -b 4096  
-b 4096 bit boyutunu belirtiyor

* daha sonra ssh-copy-id diyip username@userhost diyecez  
burda hem ssh key i yarattigin bilgisayara hem de diger bilgisaylara senin id_rsa.pub i kopyaliyacan bu komut ile

* eger manuel yapmak istersen, diger bilgisayarda eger yoksa .ssh/ altinda authorized_keys diye bir file yaratican ve buna senin id_rsa.pub i ekliyeceksin. ve .ssh/ folderinin chmod u su sekilde olmali  
chmod -R go= ~/.ssh  
burda -R recursive yani bu folder altindaki tum dosyalar icin uygula demek go= ise group ve others in hicbi yetkisi olmaycak demek

*  ilk once inventory eklememiz lazim, bunun icin /etc/ansible/hosts dosyasina gidip, ansible#nin hangi cihazlara erismesini istiyorsak onlari giricez.
```
[linode]
ansible1
ansible2
```
seklinde girdik, ansible1 ile ansible2 yi zaten /etc/hosts da belitrmistik. bu arada ansible1 bizim ansbile i calistirdigimiz cihaz olucak, ansible2 ise remote makine olucak test amacli olan.

`ansible all -m ping`  
komutu ansible in bildigi tum makinelere ping gonderiyor burda -m module demek oluyor ping de ansible in bir modulu

soyle bisi de var
```
# as bruce
$ ansible all -m ping -u bruce
# as bruce, sudoing to root (sudo is default method)
$ ansible all -m ping -u bruce --become
# as bruce, sudoing to batman
$ ansible all -m ping -u bruce --become --become-user batman
```

`ansible all -a "/bin/echo hello"`  
ansible in bildigi tum aletlerde /bin/echo hello komutunu calistirir. burda -a module argument veya --args ayni sey

* simdi yeni user yaratman icin sifresini hash li sekilde vermen lazim, cleartext veremiyorsun.  
`ansible all -i localhost, -m debug -a "msg={{ '13' | password_hash('sha512', 'mysecretsalt') }}"`  
dedik bu bize soyle bir string verdi  
"$6$mysecretsalt$/AHHGbdmZR4pWSPbCPMkHUjWqi2b/R3XWKmX8ZmqlDgb8VGPjmaSP7Mqsy3cmHIe8gRzUDLOaF3FqSX6zQn9p/"  
simdi bu stringi kullanarak karsi tarafta kullanici yaraticaz

* ansible da yazdigimiz yaml i syntax kontrol etmek icin  
`ansible-playbook rds_prod.yml  --syntax-check` diyoruz.

* daha sonra boyle bir playbook yazdik
```yaml
---
- hosts: all
  user: root
  vars:
          password: $6$mysecretsalt$/AHHGbdmZR4pWSPbCPMkHUjWqi2b/R3XWKmX8ZmqlDgb8VGPjmaSP7Mqsy3cmHIe8gRzUDLOaF3FqSX6zQn9p/

  tasks:
          - name: add user
            user:
                    name: hadoop
                    password: "{{password}}"
                    shell: /bin/bash
                    generate_ssh_key: yes
                    ssh_key_bits: 4096

```

* bu sekilde yeni kullanici yaratmis olduk




