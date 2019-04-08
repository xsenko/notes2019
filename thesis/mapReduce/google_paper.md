# combiner function
Significant repetition oldugunu zamanlarda kullanilabilinir, mesela word count yapiyoruz ve <the, 1> bir cok kez olusacaktir Map job'unda, tum <the, 1> lerin network uzerinde dolasmasini onlemek icin, bir combiner yazilir ve bu Map job u icinde tum the lari toplar ve oyle network e gonderir.

Combiner ile Reducer arasindaki fark ise, Reducer direk output file a yazarken, combiner intermediate medium a yazar, daha sonra bu data reducer tarafindan okunur.

# google paperi onemli!
greping ve sorting de ne tur bir data kullanildigi bilgisi yok!!
asd