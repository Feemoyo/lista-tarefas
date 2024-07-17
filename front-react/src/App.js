import React, {useEffect, useState} from 'react';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []);

  return (
    <div>
      {/* {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.users.map((user, index) => (
          <p key={index}>{user}</p>
        ))
      )} */}
    </div>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // const express = require('express');
// // const app = express();

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3000/')
//       .then(response => {
//         setMessage(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error!', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>This is a request: {message}</h1>
//     </div>
//   );
// }

// export default App;
