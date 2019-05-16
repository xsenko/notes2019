Class in icindeyken 2 sekilde fonksiyon yaratabiliyoruz, ilki su sekilde
```js
togglePersonHandler() {
    ....
}
```
bunun problemi, eger baska bir yerde bu methodu `this` keywordu ile kullanirsak problem olabiliyor. Onun yerine eger lambda notasyonu kullanirsak
```js
togglePersonHandler = () => {
    ...
}
```
o zaman bu fonksoynu ne zaman this ile kullanirsak hep bu fonksiyonun bagli oldugu class i isaret etmis oluruz.

Simdi 3 tane person vardi elimizde button ile bunlarin gizlenip gozukmesini istiyoruz.
Ilk once o person taglarini bir div icine aldik, boylece div i gizleyip gosterebiliriz, daha sonra da togglePersonHandler diye yeni bir fonksiyon yazdik
daha sonra state'imize yeni bir field daha ekledik showPersons diye
en son olarak ta asagida aciklayacagim jsx olayini yaptik
app.js:
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
    ],
    otherState: 'deneme',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    console.log('Was clicked?');
    // dont use this way: this.state.persons[0].name = 'maximilian'
    // above style dom won't change because react can't notify from the change,
    // to tell react that something changed we need to use setState 
    this.setState({
      persons: [
        {name: newName, age: 280},
        {name: 'Manu', age: 290},
        {name: newName, age: 260}
      ]
    } 
    )
  }

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

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

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
        onClick={this.togglePersonHandler}>Switch name</button>
        {
          this.state.showPersons ?
        <div>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'joe')} changed={this.nameChangeHandler}></Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
        </div> : null
        }

      </div>
    )

  }

}
```
burda personlari div icine aldiktan sonra { } kullandik. Burda amac burda yazdgimiz da alsinda ne kadar html olarak gozukse de bir jsx yani javascript kodu. ve tenary operation kullanabiliriz
Su sekilde de bakabiliriz duruma, this.state.showPerson dedikten sonra aslinda react gidip bir createComponent cagiracak, bu da bizim iki div arasina koydugumuz seyler olucak, o yuzden aslinda su sekilde bakabilirsin
`this.state.showPersons ? react.createElement(div ve icindeki personlar buraya gelicek) : null`

**Conditional gosterme olayini farkli sekilde yapma**
unutma ki react bir seyi renderlayacagi zaman veya o komponenti yenileyecegi zaman gidip render() methodunu cagiriyor.

ilk once classimiz icinde persons diye bir variable yarattik
daha sonra bir if clause i icinde eger showPersons dogru ise persons a o personlarin oldugu bolumu koyduk.
render methodu butona her bastigimizda degisecegi icin persons degiskeni hep null basliyacak, eger false ise zaten null kalicak eger true ise bu sefer icine koydugumuz seyleri tasiyacak.

```js
    let persons = null;
    
    if(this.state.showPersons) {
      persons = (
        <div>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}></Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this, 'joe')} 
          changed={this.nameChangeHandler}></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>
        </div>
      )
    }


    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
    )
```

**Arraylari vs List halinde gosterme**
```js
   if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map(person => {
            return <Person 
            name={person.name} 
            age={person.age}/>
          })}
        </div>
      )
    }
```

yukardaki if clause u biraz degistirdik, burda yaptigimiz, state.persons bir array tutuyordu, bu arrayin map fonksiyonunu kullanarak, array icindeki her elemani gittik bir person a ekledik.

**listeden eleman silme**
```js

 deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState(
      {persons: persons}
    )

let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}/>
          })}
        </div>
      )
    }


    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
    )

  }
```

ilk yaptigimizi biraz degistridik, map bize arraydaki her elemanla birlikte bir de key verir, bu sefer hangi array indexindeki elemani silcegimizi bulmak icin o key i kullandik.  
`click={() => this.deletePersonHandler(index)}` burda bunu 2 sekilde yapabiliriz, (fonksiyona arguman verirken) ya bu sekilde fonksiyon donduren fonksiyon yazicaz ya da bir onceki konuda yaptigimiz gibi `.bind(this, 'index')` sekilnde yapicaz.

bu yontemle silmenin bir flaw i var yalniz: 
```js
 deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState(
      {persons: persons}
    )

  }
```

burda `const persons = this.state.persons` dedigimizde aslinda sadece referansini aliyoruz, ve daha sonra splice dedigimzide orjinal state'imize splice uygulamis oluyoruz, problem burda. Biz state'i mutate etmekten kacinmaliyiz, bunu da o state'in bir kopyasini alarak yapabiliriz mesela

slice() methodu o arrayi yeni bir array olarak kopyalar  
`const persons = this.state.persons.slice();` olarak degistirecez.

bir diger yontemi de spread operatorunu kullanmak, bu es6 ile gelen bir operator
`const persons = [...this.state.persons]`  
dersek state.persons taki elemanlari tek tek persons a atar.

simdi eger chrome developer toola bakarsak soyle bir hata aliyoruz

![alt text](Pictures/key_problem.png "Title")
bunun nedeni de `<Person />` lara bir key vermememiz, simdi bunu duzelticez.

```js
  state = {
    persons: [
      {id: '12', name: 'Max', age: 28},
      {id: '13', name: 'Manu', age: 29},
      {id: '14', name: 'Stephanie', age: 26}
    ],
    otherState: 'deneme',
    showPersons: false
  }

      if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key = {person.id}/>
          })}
        </div>
      )
    }
```

bunu react in istemesinin sebebi, react eski dom ile yeni dom u karsilastiriyor ve sadece gerekli dom elemanlarini yeniliyor.

**flexible lists**
```js
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // const person = this.state.persons[personIndex]; if we use like this, we get only reference because every item in persons array are objects
    // and assign object like this only assings with reference, but we want another copy because we don't want to mutate state
    
    // this spread operator also works for objects, it copies every attrbiute in object to person
    const person = {...this.state.persons[personIndex]};

    // another way to get a copy
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {
      persons: persons
    })

  }
```

nameChangeHandler i yukaridaki gibi duzenledik, cunku artik icine event ile birlikte id de almasi gerekiyor, hangi person oldugunu bilmesi icin. Burda ayni zamanda orjinal state i mutate etmekten kacindik hep, o yuzden hep kopyasini aldik state icindeki elemanlarin.

```js
   if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key = {person.id}
            changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
      )
    }
```

render() methodu icindeki if te de, changed attribute u ekledik, ve bunu yine lambda function seklinde yaptik cunku icine arguman alicak, yine diger bir yontemi bind methodunu kullanmak olabilirdi.  
Person'daki onChange, keyboard ta her tusa basildiginda bir event objesi gonderiyor, ve bizim app.js deki changed bu eventi aliyor, daha sonra bu event i hangi person cagirdiysa onun id si ile birlikte nameChangeHandler a gonderiyor.