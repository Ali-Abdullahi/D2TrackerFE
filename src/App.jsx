import * as React from 'react';
import Rankings from './Rankings';
import ExpandedRankings from './ExpandedRankings'
import Button from '@mui/material/Button';
import { Route,Routes } from 'react-router-dom';
import Home from './Home';
 


export default function App() {

  return <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/rankings" element={<Rankings />} />
    <Route path="/rankings/ExpandedRankings" element={<ExpandedRankings />} />
    </Routes>

  </>
}
