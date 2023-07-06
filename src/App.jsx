
import './App.css';
import React from 'react';
import useTheme from './useTheme';
import useWindowSize from 'react-use-window-size-hook';
import './styles.css';

function App() {
  const [theme, toggleTheme] = useTheme();
  const { width } = useWindowSize();

  return (
   
    <div  >
      <div>
      <TodoList/>
    </div>
    </div>
  



  );
}

export default App;
