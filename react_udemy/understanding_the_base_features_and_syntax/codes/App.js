import React, {useState} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Person from './Person/Person'
import { throwStatement } from '@babel/types';

function myFunc() {}

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
    otherState: 'deneme'
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

}



/*
* Functional example of App
*/

/*
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
*/

export default App;
