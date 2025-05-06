import React from "react";
import styles from "./HomePage.module.css";
// Importe sua foto aqui quando a tiver, por exemplo:
// import minhaFoto from '../../assets/sua-foto.jpg'; // Se colocar em src/assets
// Ou use o caminho direto se estiver na pasta public: const minhaFoto = '/sua-foto.jpg';

// Placeholder para a foto
const minhaFoto = "/foto3.jpeg"; // Substitua pela sua foto

function HomePage({ onNavigateToCalculator, onNavigateToProjectCalculator }) {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Calculadora Freelancer Pro</h1>
        <p className={styles.subtitle}>
          Precifique seus projetos com confiança e alcance o valor justo pelo
          seu trabalho.
        </p>
      </header>

      <section className={styles.introSection}>
        <h2>O que é este projeto?</h2>
        <p>
          Esta calculadora foi desenvolvida para ajudar freelancers,
          especialmente aqueles que estão começando, a definir o valor da sua
          hora técnica de forma clara e objetiva. Chega de "chutes"! Com base
          nos seus custos, metas salariais e tempo de dedicação, você descobrirá
          um valor justo e competitivo para seus serviços.
        </p>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutText}>
          <h2>Sobre Mim</h2>
          <p>
            Olá! Sou <strong>Saulo Pavanello</strong>, React Developer. Criei
            este projeto pensando em simplificar uma das maiores dores de quem
            está iniciando no mundo freelance: a precificação. Muitas vezes, a
            falta de clareza sobre custos e valor do trabalho pode levar à
            desmotivação ou a cobrar valores que não cobrem nem as despesas.
            Espero que esta ferramenta seja um bom ponto de partida para você!
          </p>
        </div>
        <div className={styles.aboutImageContainer}>
          <img
            src={minhaFoto}
            alt="Saulo Pavanello"
            className={styles.profilePic}
          />
        </div>
      </section>

      <div className={styles.ctaButtonContainer}>
        <button
          onClick={onNavigateToCalculator}
          className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
        >
          Calcular Minha Hora Técnica
        </button>
        <button
          onClick={onNavigateToProjectCalculator}
          className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
        >
          Estimar Valor de Projeto
        </button>
      </div>
    </div>
  );
}

export default HomePage;
