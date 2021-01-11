/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T11:52:16-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T19:13:14-04:00
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import './index.css';

ReactDOM.render(
  <Header />,
  document.querySelector("#header")
);

ReactDOM.render(
  <Content />,
  document.querySelector("#body")
);

ReactDOM.render(
  <Footer />,
  document.querySelector("#footer")
);
