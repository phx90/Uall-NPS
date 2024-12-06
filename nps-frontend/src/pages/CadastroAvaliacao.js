import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../services/api';

const schema = yup.object().shape({
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  nota: yup
    .number()
    .required('Nota é obrigatória')
    .min(0, 'A nota deve ser entre 0 e 10')
    .max(10, 'A nota deve ser entre 0 e 10'),
});

function CadastroAvaliacao() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post('/avaliacao', data);
      alert('Avaliação enviada com sucesso!');
    } catch (error) {
      alert(error.response?.data || 'Erro ao enviar avaliação.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro de Avaliação</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>CPF:</label>
          <input type="text" {...register('cpf')} />
          <p>{errors.cpf?.message}</p>
        </div>
        <div>
          <label>Nota (0-10):</label>
          <input type="number" {...register('nota')} />
          <p>{errors.nota?.message}</p>
        </div>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  );
}

export default CadastroAvaliacao;
