# Chapter 2 System Models

- ## Physical Model
Descrie hardware composition. 

- ## Architectiural Models
Defines structure of components of system and interconnections. 
Entities 2 sekilde tanimlanabilir, system-oriented and problem-oriented. System-oriented icin 2ye ayiririz, nodes ve threads. Problem oriented icin 3e ayiririz, objects, components ve web services

**what is difference between objects and components and real world example?**

communication paradigm olarak entitiy ler 3 ayriliyor   
-> interprocess communication : low level haberlesme, genelde socket programming
-> remote invication : RPC ve RMI. RMI ile RPC nin farki ise, RMI da remote object'lere referans verip veya alip o sekilde remote methodlari calistirabiliyoruz. RPC ise structural, RMI java'ya ozel. 
-> indirect communication : request - reply methods

peer to peer de herkes hemen hemen ayni processleri kosup ayni interfacelere sahipler.

Placementlarina gore 4 e ayriliyor
- mapping of services to multiple servers
- caching
- mobile code : mesela java applets
- mobile agents : **buna ornek nedir?**

architectural patterns ta kaldin