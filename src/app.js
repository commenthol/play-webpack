import React from 'react'
import ReactDOM from 'react-dom'

import Test from './components/Test'
import Show from './components/Show'

const d = document
const div = d.createElement('div')
div.id = 'root'
d.body.appendChild(div)


ReactDOM.render(
  <Test>
    <Show />
  </Test>,
  document.getElementById('root')
);
