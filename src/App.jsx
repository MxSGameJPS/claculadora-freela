import { useState, useEffect } from "react";
import styles from "./App.module.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import ProjectValueCalculator from "./components/ProjectValueCalculator/ProjectValueCalculator.jsx";

function CalculatorApp({ setCalculatedHoraTecnica }) {
  const [salarioDesejado, setSalarioDesejado] = useState("");
  const [horasPorDia, setHorasPorDia] = useState("");
  const [diasPorSemana, setDiasPorSemana] = useState("");
  const [semanasFerias, setSemanasFerias] = useState("");
  const [custosFixos, setCustosFixos] = useState([{ nome: "", valor: "" }]);
  const [horaTecnica, setHoraTecnica] = useState(null);

  useEffect(() => {
    if (horaTecnica !== null) {
      setCalculatedHoraTecnica(horaTecnica);
    }
  }, [horaTecnica, setCalculatedHoraTecnica]);

  const calcularHoraTecnica = () => {
    const S = parseFloat(salarioDesejado) || 0;
    const HPD = parseFloat(horasPorDia) || 0;
    const DPS = parseFloat(diasPorSemana) || 0;
    const SF = parseFloat(semanasFerias) || 0;

    const totalHorasAnuais = DPS * HPD * (52 - SF);

    const somaCustosFixosMensais = custosFixos.reduce(
      (acc, custo) => acc + (parseFloat(custo.valor) || 0),
      0
    );
    const custoAnual = S * 12 + somaCustosFixosMensais * 12;

    if (totalHorasAnuais > 0) {
      const valorHora = custoAnual / totalHorasAnuais;
      setHoraTecnica(valorHora.toFixed(2));
    } else {
      setHoraTecnica(null);
    }
  };

  const adicionarCustoFixo = () => {
    setCustosFixos([...custosFixos, { nome: "", valor: "" }]);
  };

  const removerCustoFixo = (index) => {
    const novosCustos = custosFixos.filter((_, i) => i !== index);
    setCustosFixos(novosCustos);
  };

  const atualizarCustoFixo = (index, campo, valor) => {
    const novosCustos = custosFixos.map((custo, i) => {
      if (i === index) {
        return { ...custo, [campo]: valor };
      }
      return custo;
    });
    setCustosFixos(novosCustos);
  };

  return (
    <div className={styles.calculatorContainer}>
      <h1 className={styles.titulo}>Calculadora de Hora Técnica</h1>

      <div className={styles.formGroup}>
        <label htmlFor="salarioDesejado">Salário (R$):</label>
        <input
          type="number"
          id="salarioDesejado"
          value={salarioDesejado}
          onChange={(e) => setSalarioDesejado(e.target.value)}
          placeholder="5000"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="horasPorDia">Horas por dia:</label>
        <input
          type="number"
          id="horasPorDia"
          value={horasPorDia}
          onChange={(e) => setHorasPorDia(e.target.value)}
          placeholder="8"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="diasPorSemana">Dias por semana:</label>
        <input
          type="number"
          id="diasPorSemana"
          value={diasPorSemana}
          onChange={(e) => setDiasPorSemana(e.target.value)}
          placeholder="5"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="semanasFerias">Férias (semanas/ano):</label>
        <input
          type="number"
          id="semanasFerias"
          value={semanasFerias}
          onChange={(e) => setSemanasFerias(e.target.value)}
          placeholder="4"
        />
      </div>

      <h2 className={styles.subtitulo}>Custos Fixos</h2>
      {custosFixos.map((custo, index) => (
        <div key={index} className={styles.custoFixoItem}>
          <input
            type="text"
            value={custo.nome}
            onChange={(e) => atualizarCustoFixo(index, "nome", e.target.value)}
            placeholder="Nome do Custo"
            className={styles.custoNome}
          />
          <input
            type="number"
            value={custo.valor}
            onChange={(e) => atualizarCustoFixo(index, "valor", e.target.value)}
            placeholder="Valor (R$)"
            className={styles.custoValor}
          />
          {custosFixos.length > 1 && (
            <button
              type="button"
              onClick={() => removerCustoFixo(index)}
              className={`${styles.botao} ${styles.botaoRemover}`}
            >
              Remover
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={adicionarCustoFixo}
        className={`${styles.botao} ${styles.botaoAdicionar}`}
      >
        Adicionar Custo
      </button>

      <button
        type="button"
        onClick={calcularHoraTecnica}
        className={`${styles.botao} ${styles.botaoCalcular}`}
      >
        Calcular
      </button>

      {horaTecnica !== null && (
        <div className={styles.resultado}>
          <h3>Sua Hora Técnica:</h3>
          <p>R$ {horaTecnica}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [calculatedHoraTecnica, setCalculatedHoraTecnica] = useState("");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.appGlobalContainer}>
      {currentPage === "home" && (
        <HomePage
          onNavigateToCalculator={() => navigateTo("hourCalculator")}
          onNavigateToProjectCalculator={() => navigateTo("projectCalculator")}
        />
      )}
      {currentPage === "hourCalculator" && (
        <div className={styles.calculatorContainerWrapper}>
          <CalculatorApp setCalculatedHoraTecnica={setCalculatedHoraTecnica} />
        </div>
      )}
      {currentPage === "projectCalculator" && (
        <div className={styles.calculatorContainerWrapper}>
          <ProjectValueCalculator initialHoraTecnica={calculatedHoraTecnica} />
        </div>
      )}

      <footer className={styles.rodape}>
        <p>Desenvolvido por Saulo Pavanello</p>
        <div className={styles.footerNavLinks}>
          {currentPage !== "home" && (
            <button
              onClick={() => navigateTo("home")}
              className={styles.linkParaHome}
            >
              Home
            </button>
          )}
          {currentPage !== "hourCalculator" && currentPage !== "home" && (
            <button
              onClick={() => navigateTo("hourCalculator")}
              className={styles.linkParaHome}
            >
              Calcular Hora Técnica
            </button>
          )}
          {currentPage !== "projectCalculator" && currentPage !== "home" && (
            <button
              onClick={() => navigateTo("projectCalculator")}
              className={styles.linkParaHome}
            >
              Calcular Valor do Projeto
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
