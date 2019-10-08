# Cou 1 Characterizaion of Distributed Systems

* what is distributed system?  
Distributed system is, hardware or software components in a networked computer and commununicating and coordinating their actions only with message passing.

* consequences of distributed systems?  
    * concurrency -> parallel sekilde islem yapabilmek
    * no global clock -> clocks are different for each individual system in distributed environment, they can be synced and asynced, but can't share same or global clock value.  
    * Independent failures -> each part of distributed system can fail individually, and other systems can't know if that system really failed, or network is slow. Also when part of a system failed other systems can't know at same moment.

* Challanges of distributed systems
    * heterogeneity -> birden cok cihaz, os, protokol implementasyonu var. Mesela bir sistemin x86 kullanirken digerinin RISC-V kullanmasi, biri IoT cihazken digerinin pc olmasi, biri litte endian iken digerinin big endian olmasi vs
    * openness -> Spesificationlarda veya implementasyonda eksik olursa bunlar sikinti olur. Spesifikasyonlarda her adimin nasil yapilcagi anlatilmaz, bazi yerlere implemente eden kendi handle eder, mesela TCP de gelen paketlerin nasil bufferlanacagi gibi.
    * security -> data ve source'larda bu 3 bilesenin korunmasi lazim, integrity, confidentiality, availability
    * scalability -> resource sayisi arttikca sistemin kaldirabilecegi yukun de o oranda artmasi lazim, 1 server ile 100 kisiye hizmet veriyorsa, 2 server ile 200 olmasi lazim, ama bu pratikte yakalanan birsey degil.
    * failure handling -> failure handling icin cesitli yontemler var.
        1. Detecting faults = checksum gibi yontemlerde datanin hatali oldugunu bulma, yapilabiliyorsa duzeltme.
        2. masking failures = mesela msj gitmediginde yeniden gondermek, veya data tutarken kopyasini da tutup aslina bisi oldugunda kopyasini kullanmak
        3. tolerating faults = web servis cevap vermediginde sonsuza kadar beklemek yerine, kullanicaya bu web servis cevap vermiyor diye donmek
        4. redundancy = ayni processten birden cok olmasi, birinin fail ettiginde digerinin calismasi, HA (High Avability) sistemler.
    * concurrency -> objectlerin, variable'larin concurrent calisirken safe olmalari lazim. Concurrent ortamda bir liste ekleme cikarma yapiliyorsa bu list e o anda sadece bir object'in yazabilmesi lazim. Mutual exclusion
    * transparency -> sistemin collections of independent modules yerine, kullaniciya whole olarak gozukmesi. Mesela spark bir tek user interface sunuyor ve arkadaki clusterda calisan distributed system'i sakliyor.
    * quality of service -> 

    Types of Distributed Systems = Web Pages, MMOGs, Financial Trading, 
    
# Cou 2 System Models
Hardware Model -> Most explicit (acik, belirgin) olan model. Direk Hardware e odaklaip, sistem modelini hardware uzerinden tanimliyor.  
Architecutre Model -> computational ve communicational task'lar ustunden tanimliyor.  
Fundemental Model -> Daha abstract sekilde tanimliyor, 3 tipi var, interaction model elementlar arasindaki iliskileri inceliyor, failure model, sistem ne sekillerde fail edebilir ve ne sekillerde failt ederse calismaya devam etmelidir i inceliyor. Security Model ise datanin calinmasini disardan gelen ataklarin engellenmesini modelliyor.

Distributed system tasarlarken belli zorluklar ve threadler var bunlar
* Distributed system'i olusturan modullerin, birden fazla kullanim alani olabiliyor, mesela web page yapinca bazisi az hit aliyor bazisi cok fazla hit aliyor, veya isin icine mobil cihazlar girdi mi bunlarin her an kopabilecekmis sekilde degerlendirilip sistemin oyle tasarlanmasi gerekiyor.
* Cok fazla degisik environment var, bazi durumlarda sistemin parcalari fark OS farkli hardware'e sahip olabilir. Bagli olduklari network degisebilir, bazen wireless bazen optik olabilir
* Internal problems : Non-sync clocklar, data update ederken cakisma olmasi, cok cesitli hardware ve software failure'lari olabilir.
* External threads : mevcut sisteme attack yapmak isteyenler

## 2.2 Physical Model
Hardware elementlerinin representationi.

## 2.3 Architectural Models
Distributed systemin komponentlerini ve bu komponentler arasindaki communicationi inceliyor. Bu modelin amaci sistemin simdiki ve gelecekti istekleri yerine getirebilecek sekilde yapilandirmak ve sistemi reliable, cost effective ve managable sekilde kurmak.

## 2.4 Fundemental Model
Fundemental modelin 2 maaci, ilki tum yaptigimiz assumptionlari acik ve belirgin yapmak, digeri de generalization ile bu assumptionlari kullanarak neyin possible neyin impoissble oldugunu bulmak.  
Fundemental model sadee essential ingredientleri bulundurmali icinde. Fundemental model 3 farkli model altinda incelenir, bunlar interaction model, failure model ve security model.
ceky
* Interaction Model : Processlerin veya objectlerin birbiri arasinda mesaj ile iletisim kurmasini inceler. 2 onemli faktor Interaction model'i etkiler bunlardan ilki communication channellar her zaman reliable degildir, reliable oldugunda bile jitter delay olur. Ikincisi ise hicbir zaman tam olarak bir global clock yakalanamaz. Bunlara dayanarak sync ve async modeller cikmistir. Sync modelde, process suresi, mesaj gitme suresi ve clock drift suresi belli min max degerleri vardir, async de ise hicbir kisitlama yoktur.

* Failure Model : distributed systemlerde hem process hem de communication channel fail edebilir. Omission failure'lar communication channel in veya process in fail ederek durdugu senaryolar. Arbitrary failure'lar ise fail edip yasamaya devam ettigi senaryolar.

* Security Model : 








# Mar 4 - Parallel and Distributed Systems
Parallelism'in asil yukselisi, cpu'lar artik hiz limitine takiliyorlar silikon teknolojisi yuzunden ve boylece ureticiler daha fazla clock cycle'a degil parallelism'e yoneliyorlar. Ikinci yukselis ise cloud computing in yayginlasmasi ile oluyor.

## 4.1 Data, Thread-Level and Task-Level Parallelism
* fine-grained parallelism = ufak code parcalari parallel sekilde calisiyor, fakat aralarindaki mesajlasma sayisi fazla oluyor, genelde cpu'larin shared cache'lerini kullaniyorlar.
* coarse-grained parallelism = paralel islemler icin daha tercih edilen cesit. Islenen parcalar daha buyuk oluyor ve aralarinda mesajlasma sayisi azaliyor.

* Data Level Parallelism = Coarse-grained bir tip, cok buyuk bir datayi alarak parallel isleniyor, problemler genelde embrassingly parallel. Hadoop spark bunlara ornek

* Thread Level Paralellism = Genelde GPU threadleri icin kullanilan bir tabir, multi-threadingte de kullaniliyor (Single core CPU da birden cok threadin ayni anda calismasi). Fine Grained

* Task Level Parallelism = Single machine'deki scheduling ve schedule edilen tasklarin birbiri ile calismasi. Fine Grained.

## 4.2 Parallel Architectures
Temelde 2 tane architecutre var, control flow ve data flow. Bizim gunumuzde kullandigimiz von neumann modeli control flow. Fakat nadir de olsa data flow da kullaniliyor. Control flow'da program counter next instruction'i belirliyor ve buna gore if else jump varsa flow bunlara gore ilerliyor. Data flow'da ise islem input available olnca yapiliyor. Bazi router'lar data flow'a gore calisiyor. Control flow, data flow'u simule edebiliyor.

* Bit level ve Instruction level parallelism = Modern cpu'larda instruction'lar stage'lere bolunur ve pipelining sayesinde bir anda birden cok instruction'in bir stage'i islem gorebilir.

## 4.7 Distributed System - System Modularity
* Modularity, Layering ve Hierarchy distribured systemlerde complexity ile cope edebilmenin en onemli 3 yontemi.

Moduler sistemlerde, moduller tekrardan kullanilabiliniyor, debugging daha kolay oluyor ve her modul bir konuda veya taskta specialized olabiliyor. 

## 4.8 Soft vs Enforced Modularity
Soft modularity genelde sistem icindeki modularitydir. Moduller genelde shared memory ustunden iletisim kurarlar.  
Enforced Modularity ise, client-server paradigmasini baz alir ve moduller mesajlasarak haberlesirler.

## 4.9 Layering and Hierarchy
* Layering i uygulayabilmek icin zaten modularity i kullanmamiz gerekiyor.
* Layering complex problemleri parcalayip daha sonra parca parca cozmemize yariyor. Layerler aralarinda 2 layer arasindaki interface ile haberlesiyorlar. Ornek olarak OSI layers.

## 4.10 Virtualization, Layering and Virtualization
* Virtualization, hardware layer'inin ustune bir layer daha cikarak, hardware abstract hale getiriyor. Boylece Virtualize edilen operating systemler hardware layeri ile direk temasa gecmiyor, bu layer onlara hypervisor tarafindan sunuluyor simule edilerek.
* Virtualizaion'in yarari performance user ve app'leri isolate hale getiriyor, resource'larin daha iyi kullanilmasini sagliyor. 
* Virtualizaion'in side effect'i ise performance penalty, cunku priviledge instruction'larin traplanmasi gerekiyor hypervisor tarafindan daha sonra bunlari hypervisor isleyip hardware layer'ina gonderiyor. Bu performance kaybi yasatiyor. Diger negatif yon ise hardware cost. Virtualization icin daha fazla hardware resource gerekiyor.

## 4.11 Peer to Peer Systems
* Cloud sistemlerden farkli olarak peer to peer systemlar decenteralized, ve self organizing, cogunda da single point of administration yok. Cloud'ta ise single administrative domain ve central management var.
* P2P nin cikmasinin nedeni ise daha ucuza memory, storage ve CPU power'dan yararlanabilmek.

## 4.12 Large-Scale Systems
* Computing Grid = Heterogenous, looesly coupled and geographcly seperated distributed systemleri ifade eder.


# Mar 10 - Cloud Resource Virtualization
Virtualizaition traditional cloud computing management'i degistirmistir. Eskiden hardware resource utiliazitaion iyi yapilamiyordu, cunku ya user basina bir server veriliyordu, veya birden cok user ayni server i paylasiyordu. Bunun admin yukumlugulugu operasyonel yukumlulugu fazla idi. Kullanici tarafinda ise applicationlarini o serverdaki OS a ve environment'e gore yazmak / ayarlmaak zorunda idi.  

## 10.1 Performance and Security Isolation in Computer Clouds
Virtualization olmadan 2 application'in performansini olcmek zor olur cunku bir app digerini interfere edebilir. Ama hypervisor kullanarak yuksek bir isolation saglayabiliyoruz. Bu ayni zamanda guvenlik icin de yararli. Hypervisorlar cpu'lari multiplexliyerek VM'lere virtual CPU'lar sunarlar.
* Processor virtualization ile Processor emulation farkli seyler, Processor virtualzion'da vm'lere ayni processor'un multiple copies'i sunulur ve kod direk cpu ustunde calistirilir. Processor emulation'da ise her instruction emulate edilir. Ornegin MAC'teki powerPC

# 10.2 Virtual Machines
Temelde 2 tip virtualazion var, process VM and System VM.
* Process VM'de process'in kendisi bir virtual machine yaratir application burda kosar ve isi bitince destroy edilir, ornegin JVM.
* System VM ise, tum operating system'i virtualize eder. System VM'in de 3 tipi var.
    * Traditional = Bare Metal hypervisor, hardware ustune hypervisor yuklenir daha sonra ustune guest OS'lar eklenir. Orn VMWare ESX, Xen
    * Hybrid = Hypervisor ile host OS ayni hardware'i paylasir, ornegin VMWare workstation.
    * Hosted = User-Mode Linux mesela, hypervisor Host OS'un ustunde kosuyor ve host OS'un paging, scheduler gibi fonksiyonlarindan faydalaniyor. Kurmasi kolay fakat VM'lerin tum call'lari direk hardware yerine once host OS'a geliyor. Bu yuzden performans yavas ve diger 2 cesitte oldugu kadar bir isolation yaratamiyor.

# 10.3 Full Virtualization and Paravirtualization
Hypervisor efficenty icin 3 tane madde var bunlar;
* Hypervisor altinda calisan sistem, hypervisorsuz sekilde calistigi ile ayni davranislari gostermeli
* Virtual Machine'den gelen instructionlarin buyuk bir cogunlugu hypervisor tarafindan mudahale edilmeden direk calistirlamli
* Hypervisor tam kontrole sahip olmali

Non-virtualizable instructionlari calistirmak icin iki cozum var
* binary translation = Hypervisor guest operating systemi izler, guest operating system non-virtuazlize bir instruction execute ettiginde, hypervisor bunu yakalayarak degistirir.
* paravirtualization = Guest OS modifiye edilir ve sadece virtualizable instructionlari execute eder.

Bunlari kullanan 2 tip software based virtualiztaion vardir, bunlarin ilki Full virtualization, binary translation kullanir. Burda Guest operating system bir hypervisor ustunde kostugunu bilmez, ve emulated hardware'i gercek hardware'mis gibi kullanir. Eger priviledged instruction execute ederse hypervisor tarafindan silent sekilde fail edilip traplenir. Performansi para-virtualiazation'a gore daha yavastir ama operating system e ek bir modifiye istemez.  
Para-Virtulazion'da ise hypervisor guest operating systemlere bir API sunar ve guest OS'lar bunu kullanarak calisirlar, bu durumda guest OS'un kernelinde degisiklik gereklidir, bu yuzden tum os'lar tarafindan support edilmeyebilir. Ama performans full virtualization a gore cok daha hizlidir.  

# 10.4 Hardware Support for Virtualization
Diger adi hardware assisted virtualization, Intel VT-x and AMD-V olarak farkli 2 teknolojisi var. Normalde Ring 0'da VMM (Virtual machine monitor) veya hypervisor yasar, bu yuzden de privilaged instruction execute edemez guest OS, cunku o ring 1 de yasamaktadir. Bu problem full virtualization veya paravirtualization ile asilmistir ama overhead ikisinde de fazla ve bunlar software depended cozumler.  

Hardware assisted virtualization'da ise VMEntry ve VMExit komutlari ile ring0 kontrolu hypervisor'dan guest OS'a gecebilir, boylece hypervisor privilaged komutlari trap edip sliently fail edip onu emulate etmekle ugrasmaz, guest os direk execute edebilir. VMCS'te (Virtual Machine Control Structure) da guest state, host state ve control data bolumleri bulunur cpu da. Ve de VMX root ve VMX non-root adinda 2 state vardir, bu iki state'de VMM VMX-root'ta guest os ise VMX non-root'ta bulunur ve state'er degisebilir VMEntry, VMExit komutlari ile.

