# hadoop grep

* for 1gb grep job id : job_1573038684292_0001
* output
```
2019-11-06 12:16:00,869 INFO mapreduce.Job: Job job_1573038684292_0001 completed successfully
2019-11-06 12:16:00,958 INFO mapreduce.Job: Counters: 55
	File System Counters
		FILE: Number of bytes read=14006
		FILE: Number of bytes written=2063052
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=1010029648
		HDFS: Number of bytes written=9
		HDFS: Number of read operations=29
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=2
		HDFS: Number of bytes read erasure-coded=0
	Job Counters 
		Killed map tasks=1
		Launched map tasks=8
		Launched reduce tasks=1
		Data-local map tasks=8
		Total time spent by all maps in occupied slots (ms)=51967
		Total time spent by all reduces in occupied slots (ms)=2371
		Total time spent by all map tasks (ms)=51967
		Total time spent by all reduce tasks (ms)=2371
		Total vcore-milliseconds taken by all map tasks=51967
		Total vcore-milliseconds taken by all reduce tasks=2371
		Total megabyte-milliseconds taken by all map tasks=425713664
		Total megabyte-milliseconds taken by all reduce tasks=19423232
	Map-Reduce Framework
		Map input records=10000000
		Map output records=1000
		Map output bytes=12000
		Map output materialized bytes=14048
		Input split bytes=976
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=14048
		Reduce input records=1000
		Reduce output records=1
		Spilled Records=2000
		Shuffled Maps =8
		Failed Shuffles=0
		Merged Map outputs=8
		GC time elapsed (ms)=2720
		CPU time spent (ms)=53180
		Physical memory (bytes) snapshot=4990468096
		Virtual memory (bytes) snapshot=25524379648
		Total committed heap usage (bytes)=7046430720
		Peak Map Physical memory (bytes)=584798208
		Peak Map Virtual memory (bytes)=2835873792
		Peak Reduce Physical memory (bytes)=335626240
		Peak Reduce Virtual memory (bytes)=2846556160
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=1010028672
	File Output Format Counters 
		Bytes Written=9
```

* 13 sn surdu


------

* for 10gb grep task
* job id : job_1573038684292_0003
* output:
```
2019-11-06 12:20:46,388 INFO mapreduce.Job: Counters: 55
	File System Counters
		FILE: Number of bytes read=140006
		FILE: Number of bytes written=17691713
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=10100316624
		HDFS: Number of bytes written=10
		HDFS: Number of read operations=233
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=2
		HDFS: Number of bytes read erasure-coded=0
	Job Counters 
		Killed map tasks=1
		Launched map tasks=76
		Launched reduce tasks=1
		Data-local map tasks=76
		Total time spent by all maps in occupied slots (ms)=858265
		Total time spent by all reduces in occupied slots (ms)=5727
		Total time spent by all map tasks (ms)=858265
		Total time spent by all reduce tasks (ms)=5727
		Total vcore-milliseconds taken by all map tasks=858265
		Total vcore-milliseconds taken by all reduce tasks=5727
		Total megabyte-milliseconds taken by all map tasks=7030906880
		Total megabyte-milliseconds taken by all reduce tasks=46915584
	Map-Reduce Framework
		Map input records=100000000
		Map output records=10000
		Map output bytes=120000
		Map output materialized bytes=140456
		Input split bytes=9424
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=140456
		Reduce input records=10000
		Reduce output records=1
		Spilled Records=20000
		Shuffled Maps =76
		Failed Shuffles=0
		Merged Map outputs=76
		GC time elapsed (ms)=176060
		CPU time spent (ms)=571880
		Physical memory (bytes) snapshot=44208037888
		Virtual memory (bytes) snapshot=218235133952
		Total committed heap usage (bytes)=61998104576
		Peak Map Physical memory (bytes)=585875456
		Peak Map Virtual memory (bytes)=2838892544
		Peak Reduce Physical memory (bytes)=341704704
		Peak Reduce Virtual memory (bytes)=2845057024
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=10100307200
	File Output Format Counters 
		Bytes Written=10

```

* 18 sn surdu

--------

* 100 GB ile deney
* job id : job_1573038684292_0004

```
2019-11-06 12:22:54,636 INFO mapreduce.Job: Job job_1573038684292_0004 completed successfully
2019-11-06 12:22:54,723 INFO mapreduce.Job: Counters: 55
	File System Counters
		FILE: Number of bytes read=1400020
		FILE: Number of bytes written=173302635
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=101003175070
		HDFS: Number of bytes written=11
		HDFS: Number of read operations=2264
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=2
		HDFS: Number of bytes read erasure-coded=0
	Job Counters 
		Killed map tasks=1
		Launched map tasks=753
		Launched reduce tasks=1
		Data-local map tasks=754
		Total time spent by all maps in occupied slots (ms)=8949016
		Total time spent by all reduces in occupied slots (ms)=33986
		Total time spent by all map tasks (ms)=8949016
		Total time spent by all reduce tasks (ms)=33986
		Total vcore-milliseconds taken by all map tasks=8949016
		Total vcore-milliseconds taken by all reduce tasks=33986
		Total megabyte-milliseconds taken by all map tasks=73310339072
		Total megabyte-milliseconds taken by all reduce tasks=278413312
	Map-Reduce Framework
		Map input records=1000000000
		Map output records=100001
		Map output bytes=1200012
		Map output materialized bytes=1404532
		Input split bytes=94878
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=1404532
		Reduce input records=100001
		Reduce output records=1
		Spilled Records=200002
		Shuffled Maps =753
		Failed Shuffles=0
		Merged Map outputs=753
		GC time elapsed (ms)=1924962
		CPU time spent (ms)=5607130
		Physical memory (bytes) snapshot=434681548800
		Virtual memory (bytes) snapshot=2136574341120
		Total committed heap usage (bytes)=608216023040
		Peak Map Physical memory (bytes)=589099008
		Peak Map Virtual memory (bytes)=2841083904
		Peak Reduce Physical memory (bytes)=393261056
		Peak Reduce Virtual memory (bytes)=2849976320
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=101003080192
	File Output Format Counters 
		Bytes Written=11

```
52 sn surdu

-----------

* 1TB icin
* job id : job_1573038684292_0005
* sonuc
```
2019-11-06 13:07:52,938 INFO mapreduce.Job: Job job_1573038684292_0005 completed successfully
2019-11-06 13:07:53,024 INFO mapreduce.Job: Counters: 55
	File System Counters
		FILE: Number of bytes read=2800034
		FILE: Number of bytes written=346149162
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=202006343994
		HDFS: Number of bytes written=11
		HDFS: Number of read operations=4520
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=2
		HDFS: Number of bytes read erasure-coded=0
	Job Counters 
		Killed map tasks=1
		Launched map tasks=1505
		Launched reduce tasks=1
		Data-local map tasks=1505
		Total time spent by all maps in occupied slots (ms)=22819572
		Total time spent by all reduces in occupied slots (ms)=101209
		Total time spent by all map tasks (ms)=22819572
		Total time spent by all reduce tasks (ms)=101209
		Total vcore-milliseconds taken by all map tasks=22819572
		Total vcore-milliseconds taken by all reduce tasks=101209
		Total megabyte-milliseconds taken by all map tasks=186937933824
		Total megabyte-milliseconds taken by all reduce tasks=829104128
	Map-Reduce Framework
		Map input records=2000000000
		Map output records=200002
		Map output bytes=2400024
		Map output materialized bytes=2809058
		Input split bytes=183610
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=2809058
		Reduce input records=200002
		Reduce output records=1
		Spilled Records=400004
		Shuffled Maps =1505
		Failed Shuffles=0
		Merged Map outputs=1505
		GC time elapsed (ms)=5332569
		CPU time spent (ms)=14725400
		Physical memory (bytes) snapshot=869182095360
		Virtual memory (bytes) snapshot=4267802320896
		Total committed heap usage (bytes)=1215079383040
		Peak Map Physical memory (bytes)=598781952
		Peak Map Virtual memory (bytes)=2842050560
		Peak Reduce Physical memory (bytes)=431366144
		Peak Reduce Virtual memory (bytes)=2864918528
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=202006160384
	File Output Format Counters 
		Bytes Written=11
```

* 2 dakika 1 sn surdu

------

## spark deneyleri
* spark in history serverini sbin altindaki start-history-server.sh ile aciyorsun portu 18080

* spark ta memory managementini duzenlemen lazim

* 1gb grep 15sn surdu : job id app-20191106131510-0000

* 10gb grep 22sn surdu job id : app-20191106131843-0001

* 100 gb job id : app-20191106132047-0003 23 sn surdu

* 1 TB job id app-20191106132304-0004 2.1 dakika surdu

-------

## flink deneyleri

# Start or stop the HistoryServer
bin/historyserver.sh (start|start-foreground|stop)
By default, this server binds to localhost and listens at port 8082.

* su sekilde de calistirdik `./flink run /home/senko/projects/uni_project/FlinkGrep/target/FlinkGrep-0.1.jar --input /user/hadoop/input/generated.txt --output /user/hadoop/output/ --mode local
` burda tabii cluster da local degil cluster diycez

