- first we need to install "create react app". For this we need to run  
`npm install -g create-react-app`  
`-g` makes this package global.  
To run this, create a project folder and under this folder run
`create-react-app <your-app-name>`  
it will start to install neccessary react scripts and tools.

After his finishes. you can run your envoirment by `npm start`  
npm start looks for package.json and run scripts which starts with `start` key in that json file.

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hi - Hello World</h1>
    </div>
  );
}

export default App;
```

burda export default yapmamizin sebebi, daha sonra import ederken buna farkli bir isim verebiliyoruz.

Eger normal export yapsaydik su sekidle mesela  
```js
export function double(x) {
  return x + x;
};
```
daha sonra su sekilde kullanicaktik
```js
import { double } from 'mymodule';
double(2); // 4
```
`import React, { component } from 'react'`  
yukaridaki koddan sunu anliyacaz mesela, React modulu defult export edilmis, component ise named export edilmis, yani normal export edilmis. eger module u sadece 'react' diye yazarsak, js direk bulundugu folderda react.js e bakicaktir, eger ozellikle berlitmek istiyorsak './App' diye belirtmemiz lazim.



