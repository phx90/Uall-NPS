import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnaliseNPS() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNPS() {
      try {
        const response = await api.get('/avaliacao/nps');
        console.log('Dados da API:', response.data);
        setData({
          Detratores: response.data.detratores || 0,
          Neutros: response.data.neutros || 0,
          Promotores: response.data.promotores || 0,
          Total: response.data.total || 0,
          NPS: response.data.nps || 0,
        });
      } catch (err) {
        console.error('Erro ao carregar dados do NPS:', err);
        setError('Erro ao carregar os dados. Verifique a conexão com o servidor.');
      }
    }
    fetchNPS();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Carregando dados...</p>;
  }

  const chartData = {
    labels: ['Detratores', 'Neutros', 'Promotores'],
    datasets: [
      {
        label: 'Quantidade',
        data: [data.Detratores, data.Neutros, data.Promotores],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Análise de NPS</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribuição de NPS',
            },
          },
        }}
      />
      <p>Total de Avaliações: {data.Total}</p>
      <p>NPS: {data.NPS.toFixed(2)}</p>
    </div>
  );
}

export default AnaliseNPS;
