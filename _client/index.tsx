/// <reference path="index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import App from './routes';

const csrf = document.querySelector('#csrf');
if (csrf) {
  window.CSRFToken = csrf['value'];
  csrf.remove();
}
render(<App />, document.querySelector('#app'));
