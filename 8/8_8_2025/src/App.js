import React from 'react';
import StudentTable from './components/StudentTable';
import MenuBar from './components/MenuBar';
import './styles/App.css';
import './styles/MenuBar.css';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <main>
        <StudentTable />
      </main>
    </div>
  );
}

export default App;