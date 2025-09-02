let players = [];
window.onload = function() {
    loadPlayers();
    updateTable();
    analyzePlayers();

};



async function addPlayer(){
    const name = document.getElementById("playername").value;
    const matches = parseInt(document.getElementById("matches").value);
    const runs = parseInt(document.getElementById("runs").value);
    const wickets = parseInt(document.getElementById("wickets").value);

    if (!name || isNaN(matches) || isNaN(runs) || isNaN(wickets)) {
        alert("Please enter valid player data!");
        return;
    }
    const battingAvg = matches > 0 ? (runs/matches).toFixed(2) : 0;
    const player = {name,matches,runs,wickets,battingAvg};
    players.push(player);

    await updateTable();
    await analyzePlayers();

    document.getElementById("playername").value = '';
    document.getElementById("matches").value = '';
    document.getElementById("runs").value = '';
    document.getElementById("wickets").value = '';

}

async function updateTable(){
    const table = document.getElementById("playersTable");

    table.innerHTML = `
        <tr>
                <th>Name</th>
                <th>Matches</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>Batting Avg</th>
            </tr>
     `;

     players.forEach(player => {
        const row = table.insertRow();
        row.insertCell(0).innerText = player.name;
        row.insertCell(1).innerText = player.matches;
        row.insertCell(2).innerText = player.runs;
        row.insertCell(3).innerText = player.wickets;
        row.insertCell(4).innerText = player.battingAvg;
     });


}

async function analyzePlayers(){
    if(players.length == 0) return;

    const bestBatsman = players.reduce((max,p) => p.battingAvg > max.battingAvg ? p : max, players[0]);
    const bestBowler = players.reduce((max,p) => p.wickets > max.wickets? p : max, players[0]);

    document.getElementById("Bestbatsman").innerText = `🏏 Best Batsman: ${bestBatsman.name} (Avg: ${bestBatsman.battingAvg})`;
    document.getElementById("Bestbowler").innerText = `🎯 Best Bowler: ${bestBowler.name} (Wickets: ${bestBowler.wickets})`;
}

function saveData() {
    localStorage.setItem("players",JSON.stringify(players));
}

function loadData() {
    let data = localStorage.getItem("players");
    if(data){
        JSON.parse(data);
    }
}

function showRawData(){
    let data = localStorage.getItem("players");
    if(data){
        document.getElementById("rawData").innerText = JSON.stringify(JSON.parse(data),null,2);
    }
    else{
        document.getElementById("rawData").innerText = "No data found in localStorage.";
    }
}