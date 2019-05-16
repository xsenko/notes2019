# Ben Ari - Chapter 1 & 2

## 1 - What is concurrent programming
concurrent: potential paralellism, executions may but need not, overlap. Concurrency is a abstraction.

## 2 - The concurrent programming abstraction
2.1 Role of Abstraction  
computer scienceta 3 tip abstraction var.
- System and libraries: API'ler
- Programming language
- Instruction set  
Software engineeringte abstraction 2 sekilde yapilir, biri encapsulation digeri concurrency. 
Encapsulation: Hide the implementation, public the spesification.  
Concurrency: designed to make it possible to reason about dynamic behaviour of programs.

2.2 Concurrent execution as interleaving of atomic statements  


-----------------------

justification of the abstraction ile iligili, en onemli sey: concurrency'i sequential olarka gosterebiliyoruz gun sonunda, boylece bir abstraction yapmis oluyoruz.

paralellism olmasi icin ayri computing source olmasi lazim diyor hoca. Yani 2 farkli bilgisayarda ayni islemi yapmak parallelism. Concurrency ise may be paralell, yani paralel olabilir de olmayabilir de, belki virtual parallelism den bahsedebiliriz.

sen yine de paralellism ile concurrency arasindaki fark bak, birbirinden farklari ne?

cache coherency protocols?? -> neymis bunlar, cache teki verinin her concurrent program icin ayni gorunmesini sagliyorlar.
https://en.wikipedia.org/wiki/Cache_coherence  
x86 islemciler MESI protokolunu kullaniyor
https://en.wikipedia.org/wiki/MESI_protocol

"x86 CPUs use a variation on the MESI protocol (MESIF for Intel, MOESI for AMD) to keep their caches coherent with each other (including the private L1 caches of different cores). A core that wants to write a cache line has to force other cores to invalidate their copy of it before it can change its own copy from Shared to Modified state.
"

