**Word Count Stream Example**
```java
public class WordCountStreaming {

    public static void main(String[] args) throws Exception {

        System.out.println("Start Working");

        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        DataStream<Tuple2<String, Integer>> dataStream = env
                .socketTextStream("localhost", 9999)
                .flatMap(new Splitter())
                .keyBy(0)
                .timeWindow(Time.seconds(5))
                .sum(1);

        dataStream.print();

        env.execute("Window WordCount");

    }

    public static class Splitter implements FlatMapFunction<String, Tuple2<String, Integer>> {
        @Override
        public void flatMap(String sentence, Collector<Tuple2<String, Integer>> out) throws Exception {
            for (String word : sentence.split(" ")) {
                out.collect(new Tuple2<String, Integer>(word, 1));
            }
        }
    }

    public static final class Tokenizer implements MapFunction<String, Tuple2<String, Integer>> {

        public Tuple2<String, Integer> map(String value) {
            return new Tuple2(value, Integer.valueOf(1));
        }

    }
```

Above code, flatMap method takes a function. But we gave it a class, but our Splitter class implements FlatMapFunction so there is no problem. If your function will be so long, you can create a class and override the method and gave a method which takes a function as an argument. It is a valid method. 
Also sometimes in flink, while developing in java, giving function directly doesn't work.

flatMap method takes 2 arguments, first is, the real argument, which our dataStream passes, second is output.
for example
```java
  @Override
        public void flatMap(String sentence, Collector<Tuple2<String, Integer>> out) throws Exception {
            for (String word : sentence.split(" ")) {
                out.collect(new Tuple2<String, Integer>(word, 1));
            }
        }
```
here sentence is coming from our data structure and we going to return a collection, includes Tuple2<String, Integer>

groupby and sum functions are taking the tuple's index, for example
in code we use
```java
.keyBy(0)
.timeWindow(Time.seconds(5))
.sum(1);
```
keyBy(0) means group by first index of tuple which is our words, and sum 1 is sum by 2nd index of tuple which is Integer value. after keyBy the output will be
<Car, 1>  
<Car, 1>  
<Car, 1>  
<Train, 1>  
<Train, 1>  
<Train, 1>  
...  
but KeyBy doesn't return a new DataStream, it returns different type which is KeyedStream, so methods you can apply to DataStream and KeyedStream are different. You can apply sum method to KeyedStream by this way you can sum these '1's by Word.

**Stream Reduce Example**
```java
public class ReduceExample {

    public static void main(String[] args) throws Exception {

        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        DataStream<String> data = env.readTextFile("/home/senko/Desktop/reduce-operator/avg");
                         //month, product, category, profit, count
        DataStream<Tuple5<String, String, String, Integer, Integer>> mapped = data.map(new Splitter());

        // group by month
        DataStream<Tuple5<String, String, String, Integer, Integer>> grouped = mapped.keyBy(0).reduce(new ReduceData());

        // why below statement didn't worked??
        //DataStream<Tuple2<String, Double>> profitMe = grouped.map((MapFunction<Tuple5<String, String, String, Integer, Integer>, Tuple2<String, Double>>) value -> new Tuple2<String, Double>(value.f0, new Double(value.f3*1.0)/value.f4));

        DataStream<Tuple2<String, Double>> profitPerMonth = grouped.map(new MapFunction<Tuple5<String, String, String, Integer, Integer>, Tuple2<String, Double>>()
        {
            public Tuple2<String, Double> map(Tuple5<String, String, String, Integer, Integer> input)
            {
                return new Tuple2<String, Double>(input.f0, new Double((input.f3*1.0)/input.f4));
            }
        });


        profitPerMonth.print();

        env.execute();

    }

    public static class Splitter implements MapFunction<String, Tuple5<String, String, String, Integer, Integer>> {

        @Override
        public Tuple5<String, String, String, Integer, Integer> map(String value) throws Exception {
            String[] words = value.split(",");
            return new Tuple5<String, String, String, Integer, Integer>(words[1], words[2],	words[3], Integer.parseInt(words[4]), 1);
        }
    }

    public static class ReduceData implements ReduceFunction<Tuple5<String, String, String, Integer, Integer>> {

        @Override
        public Tuple5<String, String, String, Integer, Integer> reduce(Tuple5<String, String, String, Integer, Integer> value1, Tuple5<String, String, String, Integer, Integer> value2) throws Exception {
            Tuple5<String, String, String, Integer, Integer> returnValue =
                    new Tuple5<>(value1.f0, value1.f1, value1.f2, value1.f3 + value2.f3, value1.f4 + value2.f4);
            return returnValue;
        }
    }
}
```

again we used the technique before, which is impelementing a functional interface and creating a new class and overriding the methods. 
reduce method we give a class implements ReduceFuntion, and reduce method takes 2 same type arguments like reduce(int, int) and returns same type so in reduce method we actually get 2 consecutive elements of DataStraem and do any operations but return a new same type, above code we sum the first and second elements price and count number.

```java
(MapFunction<Tuple5<String, String, String, Integer, Integer>, Tuple2<String, Double>>) value -> new Tuple2<String, Double>(value.f0, new Double(value.f3*1.0)/value.f4));
```
this code didn't worked. here actually I gave the as a function but flink couldn't resolve the types.

