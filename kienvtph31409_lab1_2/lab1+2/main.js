const game = {
  team1: "Real Madrid",
  team2: "Fc Barcelona",
  players: [
    [
      'Thibaut Courtois',
      'Dani Carvajal',
      'Éder Militão',
      'David Alaba',
      'Jude Bellingham',
      'Vinícius Junior',
      'Toni Kroos',
      'Luka Modrić',
      'Rodrygo',
      'Eduardo Camavinga',
      'Cristiano Ronaldo',
    ],
    [
      'Marc-Andre ter Stegen ',
      'Joao Cancelo ',
      'Alex Balde',
      'Ronald Araujo',
      'Inigo Martinez',
      'Gavi',
      'Pedri',
      'Frenkie De Jong',
      'Robert Lewandowski',
      'Ferran Torres',
      'Lionel Messi',
    ],
  ],
  Date: '2024-01-08',
  score: [3, 0],
  scored: ['Cristiano Ronaldo', 'Jude Bellingham', 'Vinícius Junior'],
  odds: {
    team1: 4.33,
    draw: 2.25,
    team2: 3.42,
  }
};
//1
const [players1, players2] = game.players;
const match = ["Real Madrid vs Fc Barcelona"];
console.log(match);

//2
const [gk, ...fieldPlayers] = players1;

const [gk2, ...fieldPlayers2] = players2;

//3
const allPlayers = [...players1, ...players2];

//4
const players1Final = [...players1, 'Kaká', 'Sergio Ramos', 'Gareth Bale'];
//5
const { odds: team1, draw, team2 } = game.odds;
//6
const printGoals = function (...player) {
  console.log(player);
}
printGoals(...game.scored);
//7
team1 > team2 && console.log("team1 win");
team1 < team2 && console.log("team2 win");


// Task 1
console.log('--- Goals Scored ---');
game.scored.forEach((player, index) => {
  console.log(`Goal ${index + 1}: ${player}`);
});

// Task 2
const totalGoals = game.score.reduce((total, goals) => total + goals, 0);
const team1Percentage = (game.score[0] / totalGoals) * 100;
const drawPercentage = (game.score[1] / totalGoals) * 100;
const team2Percentage = 100 - team1Percentage - drawPercentage;
console.log('\n--- Result Percentages ---');
console.log(`Team 1: ${team1Percentage.toFixed(2)}%`);
console.log(`Draw: ${drawPercentage.toFixed(2)}%`);
console.log(`Team 2: ${team2Percentage.toFixed(2)}%`);

// Task 3
console.log('\n--- Odds ---');
console.log(`Win odds for ${game.team1}: ${team1}`);
console.log(`Draw odds: ${draw}`);
console.log(`Win odds for ${game.team2}: ${team2}`);

// Task 4
const scorers = {};
game.scored.forEach(player => {
  scorers[player] = scorers[player] ? scorers[player] + 1 : 1;
});
console.log('\n--- Scorers ---');
console.log(scorers);

const winner = game.score[0] > game.score[1] ? game.team1 : game.score[0] < game.score[1] ? game.team2 : 'Draw';
console.log('\n--- Winner ---');
console.log(`Winner: ${winner}`);


/////////////lab2
const eventsData = [
  [10, 'Goal by Cristiano Ronaldo'],
  [23, 'Substitution: Sergio Ramos in, David Alaba out'],
  [30, 'Goal by Jude Bellingham'],
  [45, 'Yellow Card for Éder Militão'],
  [64, 'Red Card for Sergio Ramos'],
  [75, 'Substitution: Kaká in, Luka Modrić out'],
  [85, 'Goal by Vinícius Junior'],
  [87, 'Substitution: Gareth Bale in, Rodrygo out'],
];

// Task 1
const uniqueEvents = [...new Set(eventsData.map(event => event[1]))];

// Task 2
const indexToRemove = eventsData.findIndex(event => event[0] === 64 && event[1].includes('Yellow Card'));
if (indexToRemove !== -1) {
  eventsData.splice(indexToRemove, 1);
}

// Task 3
const totalMinutes = [90];
const totalEvents = eventsData.length;
const averageEventsPerMinute = totalEvents / totalMinutes;
console.log(`1 event occurred, on average every ${Math.round(1 / averageEventsPerMinute)} minutes.`);

// Task 4
console.log('\n--- Events in First and Second Half ---');
eventsData.forEach(event => {
  const minute = event[0];
  const eventType = event[1];
  const half = minute <= 45 ? 'First Half' : 'Second Half';
  console.log(`${half} - Minute ${minute}: ${eventType}`);
});


////lab2.3
// String Methods Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')}).padStart(36)`;
  console.log(output);
}