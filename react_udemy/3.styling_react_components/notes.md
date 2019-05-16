**css i dinamik olarak degistirmek**
```js
  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }

    let persons = null;

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

      style.backgroundColor = 'red';
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

burda ilk once style i biraz degistridik background u default ta green yaptik, daha sonra if statementi i icinde istedigimiz gibi style objesini degistirebiliriz. orda da red yaptik, boylece buton clicklendiginde green veya red olarka degisecektir rengi. 
Nasil oluyor dersen, buton togglePersonHandler i calistiriyor, togglePersonHandler da gidip state i degistirdigi icin, react her state degisiminde gidip o component in render modulunu yeniden cagiriyor. 

**className i dynamic olarak degistirme**
ilk once app.css i guncelledik biraz
```css
.App {
  text-align: center;
}

.red {
  color: red;
}

.bold {
  font-weight: bold;
}
```

daha sonra app.js i degistirdik su sekilde
```js
render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }

    let persons = null;

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

      style.backgroundColor = 'red';
    }


    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); 
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p className={classes.join(' ')}>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
    )

  }
```

burda '\<p>' icin bir classnName yarattik, daha sonra yukari da 2 tane if statement ile state.persons arrayindeki eleman sayisina gore red ve bold css classlarini ekledik. classes.join(' ') yapmamizin nedeni de, classes aslinda bir array ve bunu string haline getirmemiz lazim. sonunda `<p className=red bold>` seklinde olmali.

**Adding and using Radium**
ilk once radium diye 3rd party bir tool yuklememiz lazim bunun icin  
`npm install --save radium`  diyecez, --save dememizin nedeni gitsin package.json a da eklesin diye.

daha sonra radim u import ettik  
`import Radium from 'radium';`   
ve export ederken App i Radium(App) diyerek export olmasini sagladik
`export default Radium(App);`  

Radium un olayi pseudoselector lari kullanmamizi sagliyor inline css'lerde hover gibi mesela. (pseudoselector nedir? hover nedir?) -> hover imlecle mouse un ustune geldiginde olmasini istedigin efekt oluyor.

daha sonra App.js de hover i su sekilde ekledik:
```js
 render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

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

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }


    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); 
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p className={classes.join(' ')}>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
    )

  }
```

yukarda gorulecegi gibi `':hover': { ... }` diyerek hover durumunda olmasini istedigimiz seyleri yazdik daha sonra da degistiginde 
`style[':hover']= { ... }` seklinde ypatik, peki burda neden style.':hover: demedik te, gittik array secermis gibi style[':hover'] dedik?

**adding radium for media queries**
@media gibi seyleri kullanmak icin yine radium a ihtiyacimiz var ama bu sefer biraz farkli kullaniyoruz, asagidaki Person.js e bakalim
```js
import React from 'react';
import Radium from 'radium';

import './person.css';

const person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />

        </div>
         
    )
    
};

export default Radium(person);
```
simdi buarada ilk Radium u import ettik daha sonra, hemen bizim person u export default yaparken Radium ile wrap ettik.
icinde de 
```js
 const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
```
su kullanim onemli, bir onceki ornekteki hover i kullanir gibi kullandik.

daha sonra da App.js te degisiklik yapmamiz gerekiyor
```js
import Radium, { StyleRoot } from 'radium';
```
ile Radium ile beraber StyleRoot u ekledik ve daha sonra ReactComponent olarak ne donduruyorsak hepsini <SytleRoot> tagi icine almamiz lazim;
```js
 return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p className={classes.join(' ')}>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
      </StyleRoot>
    )
```
tabii App.js te de Radium(App) yapmamiz lazim default export yaparken

**Adding CSS modules support**
bunu yapmak icin birkac step gitmemiz lazim
ilki
`nmp run eject`  
diyecez, bu komut react-scripts in kullandigi scriptleri bizim editlememizi sagliyacak, bu scriptleri gidip node_modules altinda da bulabiliriz, ama burda editlersek her seferinde default haline donecek, o yuzden yaptiklarimizin kalici olmasini istiyorska bu komut ile scriptleri bizim editlememize expose etmesini sagliyacaz.

daha sonra tum Radium ile ilgili seyleri sil
son durumda soyle gozukmeli js filelarin
app.js
```js
import React, {useState} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Person from './Person/Person'
import { throwStatement } from '@babel/types';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    persons: [
      {id: '12', name: 'Max', age: 28},
      {id: '13', name: 'Manu', age: 29},
      {id: '14', name: 'Stephanie', age: 26}
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

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState(
      {persons: persons}
    )

  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }

    let persons = null;

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

      style.backgroundColor = 'red';
      }
    }


    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); 
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm react app</h1>
        <p className={classes.join(' ')}>This is working</p>
        <button 
        style={style}
        onClick={this.togglePersonHandler}>Switch name</button>
        {persons}
      </div>
    )

  }

}

export default App;

```

Person.js
```js
import React from 'react';


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

daha sonra config klasoru altindaki (npm run eject dedigimizde bu klasorlerin yaratilmis olmasi lazim) webpack.config.js i bulucaz ve
module objecti i altindaki 
```js
// "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
                sourceMap: isEnvProduction && shouldUseSourceMap
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
```

burdaki bolulme
modules: true  
localIdentName: '[name]__[local]__[hash:base64:5]'  
satirlarini ekliyecez.

bundan sonra import ettigimiz css ler sadece o module e ozel olucak.  
`import classes from './App.css';`
bu sekilde import etmemiz lazim ama artik.
daha sonra css'leri su sekilde kullanabiliriz
```js
const classesAssigned = [];
      if(this.state.persons.length <= 2) {
        classesAssigned.push(classes.red); 
      }
      if(this.state.persons.length <= 1) {
        classesAssigned.push(classes.bold);
      }
  
      return (
        <div className={classes.App}>
          <h1>Hi, I'm react app</h1>
          <p className={classesAssigned.join(' ')}>This is working</p>
          <button 
          style={style}
          onClick={this.togglePersonHandler}>Switch name</button>
          {persons}
        </div>
      )
  
    }
```

goruldugu gibi burda artik classes.red diyerek sanki bir attrbiute mus gibi alabiliyorum css classlarini

personu da su sekilde yapicaz;
```js
import React from 'react';


import classes from './person.css';

const person = (props) => {
 
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />

        </div>
         
    )
    
};

export default person;
```
ayni sekilde classes.Person diyerek className de properties i kullanarak css atatik.

By the way, if you somehow also want to define a global (i.e. un-transformed) CSS class in such a .css  file, you can prefix the selector with :global .

Example:

:global .Post { ... } 

Now you can use className="Post"  anywhere in your app and receive that styling.

**Adding pseudoSelectors with CSS modules**
simdi Radium u kullanmadan yapicaz
once App.css i guncelledik
```css
.App {
  text-align: center;
}

.red {
  color: red;
}

.bold {
  font-weight: bold;
}

.App button {
  border: 1px solid blue;
  padding: 16px;
  background-color: green;
  font: inherit;
  color: white;
}

.App button:hover {
  background-color: lightgreen;
  color: black;
}

.App button.Red {
  background-color: red;
}

.App button.Red:hover {
  background-color: salmon;
  color: black;
}

```

burda .App button dedin mi App classi altindaki tum buttonlarda gecerli demek artik.
veya button.Red dedin mi, tum buttonlar icin gecerli demek yine

daha sonra App.js i gunceeliked
```js
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    persons: [
      {id: '12', name: 'Max', age: 28},
      {id: '13', name: 'Manu', age: 29},
      {id: '14', name: 'Stephanie', age: 26}
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

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState(
      {persons: persons}
    )

  }

  render() {

    let persons = null;
    let buttonClass = '';

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
      );

      buttonClass = classes.Red
      }
      
      const classesAssigned = [];
      if(this.state.persons.length <= 2) {
        classesAssigned.push(classes.red); 
      }
      if(this.state.persons.length <= 1) {
        classesAssigned.push(classes.bold);
      }
  
      return (
        <div className={classes.App}>
          <h1>Hi, I'm react app</h1>
          <p className={classesAssigned.join(' ')}>This is working</p>
          <button
          className={buttonClass}
          onClick={this.togglePersonHandler}>Switch name</button>
          {persons}
        </div>
      )
  
    }

    }

```

burda yine direk classes.Red seklinde vs kullanabiliyoruz

**Working with media queries**
bu islemi Person classinda yapicaz, once person.css i guncelledik media ekledik
```js
.Person {
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
}

@media (min-width: 500px) {
    .Person {
        width: 450px;
    }
}
```

bunu yapmamiz yeterli cunku zaten, person.js de 
```js
 return (
        <div className={classes.Person}>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />

        </div>
         
    )
```

burda classes.Person diyerek o css i cagirmis olduk


