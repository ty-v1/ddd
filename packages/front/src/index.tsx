import React from 'react';
import ReactDOM from 'react-dom';
import { a } from 'api';

console.log(a);

ReactDOM.render(<React.StrictMode>{a}</React.StrictMode>, document.getElementById('root'));
