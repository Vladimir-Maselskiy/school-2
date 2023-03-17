import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return <h1>hi</h1>;
}
<Routes>
  <Route path="/" element={<h1>hi1</h1>}></Route>
  <Route path="/:current" element={<h1>hi2</h1>}></Route>
</Routes>;
export default App;
