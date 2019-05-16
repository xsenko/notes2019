JSX denen sey aslinda su
normalde kodu biz html mis gibi yaziyoruz mesela
```js
function App() {
  return (
    <div className="App">
      <h1>Hi - Hello World</h1>
    </div>
  );
}
```
ama bu suna convert ediliyor react tarafindan
```js
function App() {
  return (
   React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hello world!!!'))
  );
}
```

yani jsx ile biz html imis gibi yazsakta, hepsi React.createElement diye nested bir sekilde yaratiliyor react tarafidan.

 JSX kullanirken bazi restrictionlarimiz var, bunlardan biri javascript keywordlerini kullanamayiz. Mesela yukarida `<div className="App">` dedik amaa aslinda bunu html de `<div class="App">` seklinde kullaniriz. `class` bir javascript keywordu oldugundan bunu direk degil degistirilmis sekilde kullanabiliyoruz.

 asagidaki gibi kullanim iyi degil (react 16 kismi destekliyor galiba ama bakman lazim):
 ```js
 function App() {
  return (
    <div className="App">
      <h1>Hi - Hello World</h1>
    </div>
    <h1>BLALBALBA</h1>
  );
}
 ```
bunun gibi iki tane root element olmasi guzel bir practise degil, herseyi tek bir root element icinde halletmeye calis, olmuyorsa onu baska bir component olarka yaratmak mantikli olabilir.

**js de function keywordu ile lambda function arasindaki fark ne?**
yani su sekilde fonksiyon yaratabiliyoruz
```js
function() {
  // ...
}
```

ama bu sekilde de yaratabiliyoruz lambda olarak
```js
() => {
  // ...
}
```
bunlarin arasindaki fark nedir?

### simdi yeni bir react component nasil yaratiyoruz ona bakalim
ilk once src altinda Person diye bir folder yaratip daha sonra Person.js diye bir file yarattik icerigi de
```js
import React from 'react'

const person = () => {
    return <p>I'm a person</p>
};

export default person;
```

jsx i bu arada cift tirnak icinde fln kullanmaya gerke yok direk yazabiliyoruz, return ederken vs, react kendi anliyor bunu.

daha sonra da bizim ana App.js e person u koyduk
```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person'

function App() {
  return (
    
    <div className="App">
      <h1>Hi - Hello World</h1>
      <Person/>
    </div>
  );
}

export default App;
```

Boylece person aslinda yeni bir component olmus oldu, ayni bir HTML tagi gibi.

React ile component yaratmanin 2 farkli cesidir var, bir tanesi yukarida oldugu gibi function olarak yaratmak, boylece bu stateless bir component oluyor

diger yolu ise ana App.js de oldugu gibi class olarak yaratmak, bu sefer de stateful bir component oluyor.

bir komponente disardan veri verirken su sekilde yapiyoruz
```js
import React from 'react'

const person = (props) => {
    return (
        <div>
            <p>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
        </div>
    )
};

export default person;
```
props veya ne istersek verebiliriz ama verdigimiz tum attribute lar bu props data structure'inda toplaniyor daha sonra bunu kullanabliyilroz
iki tag arasindaki seyleri ise props.children ile alabiliyoruz.   
**onemli not: eger componenti yaratirken function degil class kullanmissak o zaman this.props dememiz lazim!**

ana App.js de de bu sekilde ypatik
```js
function App() {
  return (
    
    <div className="App">
      <h1>Hi - Hello World</h1>
      <Person name="selcuk" age="20">My hobby is ALU</Person>
      <Person name="ahmet" age="100">My hobby is cooking</Person>
    </div>
  );
}
```

React 16 da eger class tan component yapmak istioyrsak 
`class App extends React.Component` dememiz lazim, bunun disinda `ReactComponent` diye birsey daha var ona dikkat et!

`state` in olayi react'ta, eger state veri tipine koydugumuz degiskenlerden bir tanesi degisirse react sayfayi yeniden render ediyor. state object'i ozel o yuzden.
Simdi asagidaki gibi bisi yaptik, henuz state in ozelligini kullanmadik ama name ve age leri state te attik

```js
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ]
  }

  switchNameHandler = () => {
    console.log('Was clicked?');
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={this.switchNameHandler}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    );

  }

}

export default App;
```

burda onemli bir diger nokta, html de normalde `onclick` kullaniriz ama bunun adi JSX te `onClick` buna dikkat et. ve de buryaza verirken `this.switchNameHandler()` ile `this.switchNameHandler` yani parantez kullanip kullanmamnin farki su, eger parantezliyi kullanirken sayfa render edilirken bu fonksiyon da calisir direk, ama biz sadece butona bastigimizda calismasini istiyoruz, bu yuzden paranteysiz halini kullandik.

state i kullanarak dom un yeniden render edilmesini saglamak icin setState methodunu kullanmamiz gerekiyor, state i eger baska yollarla degistirirsek, react bu degisimden habersiz kalir ve dom u yeniden render etmez
setState ile ilgili baska bir durum da, set state icine bir object aliyor, ve mevcut state ile karsilastiriyor ve sadece degisen yerleri degistiriyor, her seferinde tum state i setState e arguman olarka vermemize gerek yok yani

```js
  switchNameHandler = () => {
    console.log('Was clicked?');
    // dont use this way: this.state.persons[0].name = 'maximilian'
    // above style dom won't change because react can't notify from the change,
    // to tell react that something changed we need to use setState 
    this.setState({
      persons: [
        {name: 'Maximilan', age: 280},
        {name: 'Manu', age: 290},
        {name: 'Stephanie', age: 260}
      ]
    } 
    )
  }
```

fakat yukaridaki islemleri yani setState methodunu eger gidip React.Component i extend ettiysek kullanabiliyoruz. Peki class degil de fonksiyon olarak tanimladigimiz componentlerde nasil state degisiklerini belirtecez?
Bunun icin de react, reactHooks cikarmis.
Simdi nasil kullanildigina bakalim

```js
const App = () => {
  
  const [personsState, setPersonsState] = useState(
    {
      persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    }
  )

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Maximilian', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
      >
        My Hobbies: Racing
      </Person>
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
      />
    </div>
  );

};
```

simdi yukaridaki kodu yavas yavas inceliyecez. useState bizim kullandigimiz reactHook, icine arguman olarak bir object veriyoruz, o da tutmak istedigimiz state, ve bize iki tane array donuyor bu useState, bir tanesi ilk koydugumuz state digeri de son state. Biz gidip `switchNameHandler` ile gidip son state'i degistirdik, boylece react'in bu degisiklikten haberi olmus oldu. 
useState fakat, React.Component teki setState gibi, gidip 2 object e bakip sadece degisiklikleri almiyor, tamamen override ediyor, o yuzden dikkatli olmamiz lazim.
Fakat useState i birden cok kez kullanarak state'ler yaratabiliriz. mesela yukarda bir useState i Persons array i icin, ikincisin ise 'some other value' string i icin klulandik. biz setPersonsState i ne kadar degistirirsek degistirelim ikinci setState ayni kalcak, icindeki bilgi de kaybolmayacak.

<span style="color:red">**soru: asagidaki gibi object icine setPersonsState(bisiler) nasil diyebiliyoruz??**</span>
```js
 const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Maximilian', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
  };
```  

### statefull vs stateless components
eger bir state management varsa class based olsun veya function based olmsun, statefull demektir, bizim yukaridaki Person ise stateless a bir ornek, veya dumb component te deniyormus bunlara, neden cunku icinde bir state logic barindirmiyor.
React'ta best practice elden geldigince stateless componentler ustunden yurumek.

### passing method references between components
componentler arasinda method referans gondermek istedigimizde soyle yapirouz
app.js
```js
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={this.switchNameHandler}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    );
```
burda ikinci person da bir de click diye bir attrbiute ekledik
daha sonra 
person.js
```js
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>

        </div>   
    )
};
```
bunu yaptik

peki fonksiyon icine arguman alsa idi nasil olucakti
burda onemli bir nokta var
```js
switchNameHandler = (newName) => {
    console.log('Was clicked?');
    // dont use this way: this.state.persons[0].name = 'maximilian'
    // above style dom won't change because react can't notify from the change,
    // to tell react that something changed we need to use setState 
    this.setState({
      persons: [
        {name: newName, age: 280},
        {name: 'Manu', age: 290},
        {name: 'Stephanie', age: 260}
      ]
    } 
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={this.switchNameHandler.bind(this)}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    );
```
yukarida `switchNameHandler` newName diye bir arguman aliyor. daha sonra
onClick te `onClick={this.switchNameHandler.bind(this)}` kullandik, bu su demek: bind yeni bir fonksiyon yaratiyor ve bunu orginal fonksiyondaki this neyi gosteriyorsa yani owner i kimse, yeni yaratilan fonksionu da o owner a bagliyor. Yani yukaridaki durumda orjinal switchNameHandler icindeki this -> fonksiyonun bagli oldugu Class i gosterdigi icin, onClick e gonderdigimiz switchNameHandler.bind(this) te bizim App classini gostericek.

Fakat biz bunu istemiyoruz, parametre de gondermek istiyoruz. O zaman assagidaki sekilde ypatik
```js
render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={this.switchNameHandler.bind(this, 'selcuk')}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    );
```
burda `this.switchNameHandler.bind(this, 'selcuk')` diyerek aslinda ilk argumandaki this, bind ile verdigimiz attributelari belirtiyor.

bu methodu eger parametre olarak passlamak istiyorsak, Person taginda
`<Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'selcuk')}></Person>`  
yapicaz.

bir baska syntax ta su sekilde
```js
 render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={() => this.switchNameHandler('selcuk')}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'joe')}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    )
  }
```

burda `<button onClick={() => this.switchNameHandler('selcuk')}>Switch name</button>`  
yaptik, yani lambda function kullanarak lambda fonksiyonunun baska bir fonksiyon return etmesini sagladik. burda eger icine arguman almiyor olsa bile `this.switchNameHandler()` sekilnde kullanmamiz gerekicekti, yukardaki kodlarda () kullanmamistik, burda kullanmamizin nedeni ise, program calistigi anda fonksiyon calismayacak ne zaman ki cagrilirsa o zaman calisacak, cunku lambda fonksiyonu ile aslinda return this.switchNameHandler diyoruz.

not: yukarda lambda yi yazarken () => dedik ama aslinda icine event aliyor, fakat bizim yazmamiza gerek yok.

<span style="color:red">**soru: peki bind etmek ne demek oluyor tamamen, bind(this) ile bind(this, arguments...) arasindaki fark ne? lambda fonksiyonu ile dondurunce neden bind methoduna ihtiyacimiz kalmiyor??**</span>

videoki adam, bu lambda kullanarak fonksiyonu parametre olarak gondermeyi yapmayin, onun yerine bind methodunu kullanin diyor.

### adding two way binding
ilk once gittik person a soyle bir ek yaptik
```js
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} />

        </div>
         
    )
    
};
```

`<input type="text" onChange={props.changed} />` bunu ekleyerek bir input field yarattik ve her degistiginde de git props.changed i calistir dedik, bu fonskyonu da bizim App.js den buraya getiriyoruz.

```js
//bu fonksiyon
  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Max', age: 280},
        {name: event.target.value, age: 290},
        {name: 'Stephanie', age: 260}
      ]
    } 
    )
  }

// bu da cagrildigi yer
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button onClick={() => this.switchNameHandler('selcuk')}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'joe')} changed={this.nameChangeHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    )

  }
```
goruldugu uzere 
`<Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'joe')} changed={this.nameChangeHandler}></Person>`  
burda changed diye yeni bir parametre yarattik ve icine de bizim nameChangeHandler i koyduk, burda bir arguman almadigi icin icine (arguman Person.js den buraya gelicek) bind methodu kullanmamiza gerek yok (bu kisimdan emin degilim)

person.js te  
`<input type="text" onChange={props.changed} value={props.name} />`  
dersek yani value={props.name} diyerek input alanin icine de baslangicta girdigimiz name in gozukmesini saglayabiliriz.

### adding stylesheets
Person folder inin icine person.css yarattik ilk ince

![alt text](Pictures/server_css.png "Title")

daha sonra person.css i su sekilde yazdik
```css
.Person {
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
}
```

ve Person.js i de su sekilde degistirdik
```js
import React from 'react'

import './person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />

        </div>
         
    )
    
};

export default person;
```

burda div e className verdik, dikkat et html de bu class ama JSX te className diye geciyor, ve import person.css dedik. Normalde javascript e bu sekilde css import edilmez ama react ile birlikte webpack kullaniyoruz, ve webpack bizim yerimize handle ediyor bu isi, eger generated html file a gidip inscept dersek, bu css in html icine inject edildigini gormus oluruz. Bunu da webpack yapiyor.

css koymanin bir baska yolu daha var, inline styling deniyor
ilk once App.js teki render methoduna yeni bir object ekledik, daha sonra da button da style diyerek bu objecti i verdik
```js
  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }


    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button 
        style={style}
        onClick={() => this.switchNameHandler('selcuk')}>Switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'joe')} changed={this.nameChangeHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
      </div>
    )

  }
```
burda onemli olan nokta css i object olarak verdik ve dash yani - kullanmak yerine hep camelCase yazdik, cunku - valid bir javascript objesi olmuyor eger string arasina basina vs koyarsak.
gersini jsx ve react bizim icin handle ediyor, bunun bir css oldugunu anlayip ona gore yorumluyor.



