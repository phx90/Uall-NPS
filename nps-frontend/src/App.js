import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroAvaliacao from './pages/CadastroAvaliacao';
import AnaliseNPS from './pages/AnaliseNPS';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Cadastro</Link> | <Link to="/analise">Análise NPS</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CadastroAvaliacao />} />
        <Route path="/analise" element={<AnaliseNPS />} />
      </Routes>
    </Router>
  );
}

export default App;
