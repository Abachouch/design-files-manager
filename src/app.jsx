import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Index } from './index.jsx';
import { createRoot } from 'react-dom/client';
import './app.css';

function render() {

const rootEl = document.getElementById('appRoot')

const root = createRoot(rootEl)
root.render(<Index></Index>)

}

render();