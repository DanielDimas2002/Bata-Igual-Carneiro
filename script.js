let players = JSON.parse(localStorage.getItem("players")) || [];

function addPlayer() {
  const playerName = document.getElementById("playerName").value;
  if (playerName === "") {
    alert("Por favor, insira um nome.");
    return;
  }

  // Verifica se o jogador já foi adicionado
  if (players.some(player => player.name === playerName)) {
    alert("Jogador já adicionado!");
    return;
  }

  // Adiciona novo jogador
  players.push({
    name: playerName,
    victories: 0,
    defeats: 0
  });

  document.getElementById("playerName").value = ""; // Limpa o campo de entrada
  savePlayers();  // Salva no localStorage
  updateTable();
}

function updateTable() {
    const tbody = document.getElementById("playersTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Limpa a tabela
  
    // Ordena os jogadores pelo win rate (decrescente)
    players.sort((a, b) => {
      const winRateA = a.victories / (a.victories + a.defeats) || 0;
      const winRateB = b.victories / (b.victories + b.defeats) || 0;
      return winRateB - winRateA; // Ordena de forma decrescente
    });
  
    players.forEach((player, index) => {
      const totalGames = player.victories + player.defeats;
      const winRate = totalGames > 0 ? (player.victories / totalGames * 100).toFixed(2) : 0;
  
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td contenteditable="true">${player.name}</td>
        <td>${player.victories}</td>
        <td>${player.defeats}</td>
        <td>${totalGames}</td>
        <td>${winRate}%</td>
        <td>
          <button onclick="updateStats(${index}, 'victory')">Vitória +</button>
          <button onclick="updateStats(${index}, 'defeat')">Derrota +</button>
          <button class="delete" onclick="deletePlayer(${index})">Deletar</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  }
 
  
  // Adiciona um ouvinte para detectar a tecla "Enter" no campo de entrada
document.getElementById("playerName").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addPlayer(); // Chama a função para adicionar o jogador
  }
});

function updateStats(index, type) {
  if (type === "victory") {
    players[index].victories++;
  } else if (type === "defeat") {
    players[index].defeats++;
  }
  savePlayers();  // Salva no localStorage após a atualização
  updateTable();
}

function deletePlayer(index) {
    const confirmation = confirm("Tem certeza que deseja excluir este jogador?");
    if (confirmation) {
      players.splice(index, 1);
      savePlayers();  // Salva no localStorage após a exclusão
      updateTable();
    }
  }
  

// Função para salvar os dados no localStorage
function savePlayers() {
  localStorage.setItem("players", JSON.stringify(players));
}

// Carrega os dados do localStorage ao carregar a página
window.onload = updateTable;

