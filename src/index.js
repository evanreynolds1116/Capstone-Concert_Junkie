import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import ConcertJunkie from './components/ConcertJunkie'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.render(
  <Router>
      <ConcertJunkie />
  </Router>
  , document.getElementById('root'))
