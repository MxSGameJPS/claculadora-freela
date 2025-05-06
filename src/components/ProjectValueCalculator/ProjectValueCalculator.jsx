import React, { useState, useEffect } from "react";
import styles from "./ProjectValueCalculator.module.css";
import appStyles from "../../App.module.css"; // Para reutilizar estilos globais de botão, etc.

function ProjectValueCalculator({ initialHoraTecnica = "" }) {
  const [horaTecnicaInput, setHoraTecnicaInput] = useState(initialHoraTecnica);
  const [horasEstimadas, setHorasEstimadas] = useState("");
  const [margemLucro, setMargemLucro] = useState(""); // Pode ser deixado em branco

  const [valorBaseProjeto, setValorBaseProjeto] = useState(null);
  const [valorFinalProjeto, setValorFinalProjeto] = useState(null);

  const [erro, setErro] = useState("");

  // Atualiza o campo se uma hora técnica inicial for passada (ex: vinda da outra calculadora)
  useEffect(() => {
    setHoraTecnicaInput(initialHoraTecnica);
  }, [initialHoraTecnica]);

  const handleInputChange = (setter, value) => {
    if (value === "" || parseFloat(value) >= 0) {
      setter(value);
      setErro(""); // Limpa erro ao digitar valor válido
    } else {
      setErro("Por favor, insira apenas valores positivos.");
    }
  };

  const calcularValorProjeto = () => {
    setErro("");
    const ht = parseFloat(horaTecnicaInput);
    const he = parseFloat(horasEstimadas);
    const ml = parseFloat(margemLucro) || 0; // Margem é opcional, 0 se não preenchida

    if (isNaN(ht) || isNaN(he) || ht <= 0 || he <= 0) {
      setErro("Hora técnica e horas estimadas devem ser valores positivos.");
      setValorBaseProjeto(null);
      setValorFinalProjeto(null);
      return;
    }
    if (ml < 0) {
      setErro("A margem de lucro não pode ser negativa.");
      setValorBaseProjeto(null);
      setValorFinalProjeto(null);
      return;
    }

    const base = ht * he;
    setValorBaseProjeto(base.toFixed(2));

    const final = base + base * (ml / 100);
    setValorFinalProjeto(final.toFixed(2));
  };

  return (
    <div className={styles.projectCalculatorContainer}>
      <h1 className={appStyles.titulo}>Calculadora de Valor de Projeto</h1>

      {erro && <p className={styles.erroMensagem}>{erro}</p>}

      <div className={appStyles.formGroup}>
        <label htmlFor="horaTecnicaInput">Sua Hora Técnica (R$):</label>
        <input
          type="number"
          id="horaTecnicaInput"
          value={horaTecnicaInput}
          onChange={(e) =>
            handleInputChange(setHoraTecnicaInput, e.target.value)
          }
          placeholder="Ex: 80.00"
          className={appStyles.formGroupInput} // Reutilizando estilo de input
        />
      </div>

      <div className={appStyles.formGroup}>
        <label htmlFor="horasEstimadas">Horas Estimadas para o Projeto:</label>
        <input
          type="number"
          id="horasEstimadas"
          value={horasEstimadas}
          onChange={(e) => handleInputChange(setHorasEstimadas, e.target.value)}
          placeholder="Ex: 30"
          className={appStyles.formGroupInput}
        />
      </div>

      <div className={appStyles.formGroup}>
        <label htmlFor="margemLucro">Margem de Lucro (% - Opcional):</label>
        <input
          type="number"
          id="margemLucro"
          value={margemLucro}
          onChange={(e) => handleInputChange(setMargemLucro, e.target.value)}
          placeholder="Ex: 20 (para 20%)"
          className={appStyles.formGroupInput}
        />
      </div>

      <button
        type="button"
        onClick={calcularValorProjeto}
        className={`${appStyles.botao} ${appStyles.botaoCalcular} ${styles.botaoCalcularProjeto}`}
      >
        Calcular Projeto
      </button>

      {(valorBaseProjeto !== null || valorFinalProjeto !== null) && (
        <div className={`${appStyles.resultado} ${styles.resultadoProjeto}`}>
          <h3>Estimativa do Projeto:</h3>
          {valorBaseProjeto !== null && (
            <p>
              Valor Base do Projeto: <strong>R$ {valorBaseProjeto}</strong>
            </p>
          )}
          {valorFinalProjeto !== null && parseFloat(margemLucro) > 0 && (
            <p>
              Valor com Margem de Lucro ({margemLucro}%):{" "}
              <strong>R$ {valorFinalProjeto}</strong>
            </p>
          )}
          {valorFinalProjeto !== null &&
            (parseFloat(margemLucro) === 0 || margemLucro === "") && (
              <p>
                Valor Final do Projeto: <strong>R$ {valorFinalProjeto}</strong>
              </p>
            )}
        </div>
      )}
    </div>
  );
}

export default ProjectValueCalculator;
