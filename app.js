// Dicionário de dificuldades com valores associados.
const dificuldades = {
    muito_bom: 1,
    bom: 2,
    intermediario: 3,
    ruim: 4,
    pessimo: 5
  };
  
  // Aguarda o carregamento completo do documento.
  document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form-ciclo-estudos');
    const inputsMaterias = document.getElementById('inputs-materias');
    const resultadosDiv = document.getElementById('resultados');
  
    // Evento para atualizar os inputs de matérias dinamicamente.
    document.getElementById('num-materias').addEventListener('change', function () {
      const numMaterias = parseInt(this.value);
      inputsMaterias.innerHTML = ''; // Limpa inputs existentes.
  
      for (let i = 1; i <= numMaterias; i++) {
        const divInput = document.createElement('div');
        divInput.classList.add('form-group');
        divInput.innerHTML = `
          <label for="materia-${i}-nome">Nome da Matéria ${i}:</label>
          <input type="text" id="materia-${i}-nome" name="materia-${i}-nome" required>
          <label for="materia-${i}-dificuldade">Dificuldade da Matéria ${i}:</label>
          <select id="materia-${i}-dificuldade" name="materia-${i}-dificuldade" required>
            <option value="muito_bom">Muito Bom</option>
            <option value="bom">Bom</option>
            <option value="intermediario">Intermediário</option>
            <option value="ruim">Ruim</option>
            <option value="pessimo">Péssimo</option>
          </select>
        `;
        inputsMaterias.appendChild(divInput);
      }
    });
  
    // Evento de submit no formulário.
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault(); // Impede envio padrão.
  
      const numMaterias = parseInt(document.getElementById('num-materias').value);
      const tempoDisponivel = parseInt(document.getElementById('tempo-disponivel').value);
  
      // Primeiro, calcula a soma das dificuldades.
      let somaDificuldades = 0;
      const materias = [];
      for (let i = 1; i <= numMaterias; i++) {
        const dificuldadeMateria = dificuldades[document.getElementById(`materia-${i}-dificuldade`).value];
        somaDificuldades += dificuldadeMateria;
      }
  
      // Calcula tempos proporcionais.
      let tempoDistribuido = 0;
      for (let i = 1; i <= numMaterias; i++) {
        const nomeMateria = document.getElementById(`materia-${i}-nome`).value;
        const dificuldadeMateria = dificuldades[document.getElementById(`materia-${i}-dificuldade`).value];
        const tempoEstudoMateria = Math.floor((dificuldadeMateria / somaDificuldades) * tempoDisponivel); // Tempo inicial
        tempoDistribuido += tempoEstudoMateria;
  
        materias.push({ nome: nomeMateria, dificuldade: dificuldadeMateria, tempoEstudo: tempoEstudoMateria });
      }
  
      // Ajuste para garantir que o tempo distribuído não exceda o tempo disponível.
      let tempoRestante = tempoDisponivel - tempoDistribuido;
      let index = 0;
      while (tempoRestante > 0) {
        materias[index].tempoEstudo += 1;
        tempoRestante -= 1;
        index = (index + 1) % materias.length; // Redistribui ciclicamente.
      }
  
      exibirResultados(materias);
    });
  
    // Função para exibir resultados.
    function exibirResultados(materias) {
      resultadosDiv.innerHTML = `
        <h2>Resultados:</h2>
        <table>
          <tr>
            <th>Matéria</th>
            <th>Dificuldade</th>
            <th>Tempo de Estudo (horas/semana)</th>
          </tr>
          ${materias.map(materia => `
            <tr>
              <td>${materia.nome}</td>
              <td>${materia.dificuldade}</td>
              <td>${materia.tempoEstudo}</td>
            </tr>
          `).join('')}
        </table>
      `;
    }
  
    // Evento para exibir/ocultar a explicação dos cálculos.
    document.getElementById('btn-como-funciona').addEventListener('click', function () {
      const comoFuncionaDiv = document.getElementById('como-funciona');
      comoFuncionaDiv.style.display = comoFuncionaDiv.style.display === 'none' ? 'block' : 'none';
    });
  });