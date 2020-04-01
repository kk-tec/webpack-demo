import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import './assets/main.css'
import './assets/color.scss'

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button />, window.document.getElementById('app'));