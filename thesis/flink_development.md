Batch programming icin DataSet API kullaniliyor, streaming ler icin ise DataStream API kullaniliyor.

* flink application gelistirirken hdfs'i kullanmak icin, eger hdfs localdeyse ki benim durumumda lokaldeydyi, hdfs://localhost:9000/file demen gerekiyor ve assagidaki pom larin olmasi lazim minimum
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.senko</groupId>
    <artifactId>FlinkGrep</artifactId>
    <version>0.1</version>

    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.flink/flink-java -->
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-java</artifactId>
            <version>1.9.1</version>
        </dependency>

        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-java_2.11</artifactId>
                <version>1.9.1</version>
            <scope>provided</scope>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.flink/flink-clients -->
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-clients_2.11</artifactId>
            <version>1.9.1</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.flink/flink-shaded-hadoop2-uber -->
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-shaded-hadoop2-uber</artifactId>
            <version>2.8.3-1.8.2</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-hdfs -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>
            <version>3.1.2</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-common -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>3.1.2</version>
        </dependency>

    </dependencies>

</project>
```

* ayni zamanda da bashrc'ye hadoop classpath'i koyman lazim lazim, bunun icin once hadoop classpath komutunu calistirip bunun ciktisini export HADOOP_CLASSPATH olarak vericeksin

* Su hatayi aliyorsan eger: `Exception in thread "main" java.lang.RuntimeException: No new data sinks have been defined since the last execution. The last execution refers to the latest call to 'execute()', 'count()', 'collect()', or 'print()'.` bunun nedeni, print collect veya count gibi bir method ile env.execute() u beraber kullanmissindir, bunlari kullandiysan bir daha env.execute demene gerek yok.

* flink veya spark nerde olursan ol, hdfs e erismek icin gidip hdfs in kendi lib lerini kullanman gerekiyor bunun icin de hadoop-hdfs ve hadoop-common bunlari maven de kullanmak lazim

* 
    ```
     Configuration hadoopConf = new Configuration();
     hadoopConf.set("fs.defaultFS", hdfsURI);

     FileSystem hdfs = FileSystem.get(URI.create(hdfsURI), hadoopConf);
    ```
    bu sekilde de hdfs e erisip folder yaratma / silme vs gibi islemleri yapabiliyorsun.


* flink in ui portu 8081, ve start-cluster.sh ile baslatiyorsun

* flink e jar dosyasi verirken flink run blabla.jar --input ... seklinde vericeksin

* flink i hadoop'ta yaptgimiz gibi jumbo jar yaptik fakat bu sefer bir de main classi belirttik.
    ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.1.0</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>com.senko.FlinkGrep</mainClass>
                                </transformer>
                            </transformers>
                            <filters>
                                <filter>
                                    <artifact>*:*</artifact>
                                    <excludes>
                                        <exclude>META-INF/**</exclude>
                                    </excludes>
                                </filter>
                            </filters>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>
    ```

* eger bu jar i direk calistirmaya calitirirsan calismayacaktir, hdfs i tanimayacak bunun icin ilk once pomda da belirttigimiz flink-shaded-hadoop2-uber jar i flink/lib in altina da indirmemiz lazim

* diger bir islem de dependecy cakismasi oluyormus, hadoop-hdfs ile o yuzden hadoop-hdfs i pom a eklerken soyle yapicaz
    ```xml
            <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>
            <version>3.1.2</version>
            <exclusions>
                <exclusion>
                    <groupId>xml-apis</groupId>
                    <artifactId>xml-apis</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    ```
    exclusion yapmadan ide de calisiyor ama jar halinde calistirmak icin bu sekilde yapmamiz lazim.

* su sekilde de calistirdik `./flink run /home/senko/projects/uni_project/FlinkGrep/target/FlinkGrep-0.1.jar --input /user/hadoop/input/generated.txt --output /user/hadoop/output/ --mode local
` burda tabii cluster da local degil cluster diycez

* bu javax.xml.parsers ile ilgili problemi cluster'da da aldik, ypatigim is, clusterdaki flink/lib altindaki flink-shaded-hadoop-2-uber-2.8.3-3.7.0.jar vardi bunu benim localde olan flink-shaded-hadoop2-uber-2.8.3-1.8.2.jar ile degistirdim. sonra calisti