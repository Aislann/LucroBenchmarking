import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoLucro = ({ dadosDaApi, valorPagoFornecedor }) => {
  const [resultadosLucroAberto, setResultadosLucroAberto] = useState(false);

  const calcularMargemLucro = (precoProduto, valorPagoFornecedor) => {
    const precoCompra = parseFloat(valorPagoFornecedor);
    if (!isNaN(precoCompra)) {
      const lucro = precoProduto - precoCompra;
      const margemLucro = (lucro / precoProduto) * 100;
      const lucroEmReais = lucro.toFixed(2);
      return { margemLucro: margemLucro.toFixed(2), lucroEmReais };
    } else {
      return 'Valor pago ao fornecedor inválido';
    }
  };

  const produto = dadosDaApi.find(item => item.idProduto === 9001);
  const margemLucro = calcularMargemLucro(produto.preco, valorPagoFornecedor);

  const data = {
    labels: ['Lucro por Unidade', 'Lucro por Estoque', 'Margem de Lucro'],
    datasets: [
      {
        label: 'Valores',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          parseFloat(margemLucro.lucroEmReais),
          parseFloat(margemLucro.lucroEmReais) * parseFloat(produto.estoqueAtual),
          parseFloat(margemLucro.margemLucro)
        ],
      },
    ],
  };

  return (
    <section className="resultadosLucro" onClick={() => setResultadosLucroAberto(!resultadosLucroAberto)}>
      <h3>Análise de Lucro</h3>
      {resultadosLucroAberto && (
        <div>
          <Bar
            data={data}
            width={100}
            height={300}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }}
          />
        </div>
      )}
    </section>
  );
};

export default GraficoLucro;
