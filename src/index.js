import React from 'react';
import ReactDOM from 'react-dom/client';

function Main(){
  // data-color-mode="light"
  return(
    <div>
      Hello! This is a test!
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
