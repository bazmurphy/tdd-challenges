const fs = require("fs");
const { parse } = require("csv-parse/sync");

// Synchronous Loading the CSV into a list of objects
// Look here
let content = fs.readFileSync("./matches.csv");
const records = parse(content, {
  columns: true,
  skip_empty_lines: true,
}); // array of objects

// input:
// [
//   {
//   'home_team_goal_count': '5',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team B'
//  },
//  {
//   'home_team_goal_count': '5',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team C'
//  }
// ]

// output:
// ["Team A", "Team B", "Team C"]

function listAllTeams(records) {
  const result = [];
  records.forEach(({ home_team_name, away_team_name }) => {
    result.push(home_team_name, away_team_name);
  });
  // keep only unique team names and then sort alphabetically
  return [...new Set(result)].sort((a, b) => a.localeCompare(b));
}

function sortString(strings) {
  return strings.sort((a, b) => a.localeCompare(b));
}

// input:
// [{ 'home_team_name': 'Faz' }, { 'home_team_name': 'Jarrod' }]

// output:
// ['Faz', 'Jarrod']

function mapTeamHomeNames(names) {
  return names.map((name) => name.home_team_name);
}

function mapTeamAwayNames(names) {
  return names.map((name) => name.away_team_name);
}

function sortValues(values) {
  return values.sort((a, b) => a - b);
}

function listUniqNumbers(nums) {
  return [...new Set(nums)];
}

// input:
// {
//   home_team_name: 'Manchester United',
//   away_team_name: 'Leicester City',
//   home_team_goal_count: '2', // string
//   away_team_goal_count: '1', // string
// }

// output:
// "Manchester United"

function getWinner(record) {
  const htgc = Number(record.home_team_goal_count);
  const atgc = Number(record.away_team_goal_count);
  const { home_team_name: htn, away_team_name: atn } = record;

  if (htgc > atgc) {
    return htn;
  } else if (htgc < atgc) {
    return atn;
  } else {
    return null;
  }
}

// input:
// {
//   'home_team_goal_count': '5',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team B'
// }

// output:
// 3

function getGoalDifferenceWinner(record) {
  const htgc = Number(record.home_team_goal_count);
  const atgc = Number(record.away_team_goal_count);

  if (htgc > atgc) {
    return htgc - atgc;
  } else if (htgc < atgc) {
    return atgc - htgc;
  } else {
    return 0;
  }
}

// input:
// {
//   'home_team_goal_count': '9',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team B'
// }

// output:
// -1

function getGoalDifferenceLoser(record) {
  const htgc = Number(record.home_team_goal_count);
  const atgc = Number(record.away_team_goal_count);

  if (htgc > atgc) {
    return atgc - htgc;
  } else if (htgc < atgc) {
    return htgc - atgc;
  } else {
    return 0;
  }
}

// input:
// param1:
// [{
//     'home_team_goal_count': '5',
//     'away_team_goal_count': '8',
//     'home_team_name': 'Team A',
//     'away_team_name': 'Team B'
//   },
//   {
//     'home_team_goal_count': '5',
//     'away_team_goal_count': '8',
//     'home_team_name': 'Team A',
//     'away_team_name': 'Team B'
//   }]

// param2:
// "Team B"

// output: 2

function countWinsForTeam(record, name) {
  let count = 0;
  record.forEach((game) => {
    if (getWinner(game) === name) {
      count++;
    }
  });
  return count;
}

// input:
// param1: [{
//   'home_team_goal_count': '5',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team B'
// },
// {
//   'home_team_goal_count': '5',
//   'away_team_goal_count': '8',
//   'home_team_name': 'Team A',
//   'away_team_name': 'Team B'
// }]

// param2:
// ['Team A', 'Team B']

// output:
// {
//   'Team A': 0,
//   'Team B': 2
// }

function countWinsForAllTeams(record, names) {
  const result = {};
  names.forEach((name) => {
    result[name] = countWinsForTeam(record, name);
  });
  return result;
}

// input:
// [{
//     'home_team_goal_count': '5',
//     'away_team_goal_count': '8',
//     'home_team_name': 'Team A',
//     'away_team_name': 'Team B'
//   },
//   {
//     'home_team_goal_count': '5',
//     'away_team_goal_count': '8',
//     'home_team_name': 'Team A',
//     'away_team_name': 'Team B'
//   }]

// output:
// [
//   { 'name': 'Team B', 'wins': 2 },
//   { 'name': 'Team A', 'wins': 0 }
// ]

function countWinsForAllTeamsSorted(record) {
  const allTeamNames = listAllTeams(record);
  // [ 'Team A', 'Team B' ]

  const allTeamWinCounts = countWinsForAllTeams(record, allTeamNames);
  // { 'Team A': 0, 'Team B': 2 }

  const result = [];

  // iterate over the object and push a newly structured object into the results array
  for (const key in allTeamWinCounts) {
    result.push({ name: key, wins: allTeamWinCounts[key] });
  }
  // [
  //   { 'name': 'Team A', 'wins': 0 },
  //   { 'name': 'Team B', 'wins': 2 }
  // ]

  // sort the array (in place) by wins (highest to lowest)
  result.sort((a, b) => b.wins - a.wins);
  // [
  //   { 'name': 'Team B', 'wins': 2 },
  //   { 'name': 'Team A', 'wins': 0 }
  // ]

  return result;
}

function getLeagueWinner(records) {
  // fun little function :)
  const allTeamsSortedByWins = countWinsForAllTeamsSorted(records);
  const winningTeam = allTeamsSortedByWins[0].name;
  return `${winningTeam} won the League!`;
}

////////////////////////////////////////////////////////////////////////////////////
// Do not change from here
////////////////////////////////////////////////////////////////////////////////////

test("get winner", () => {
  expect(getWinner(records[0])).toStrictEqual("Manchester United");
});

test("get goal difference (winner)", () => {
  expect(getGoalDifferenceWinner(records[0])).toStrictEqual(1);
});

test("list all unique values", () => {
  expect(listUniqNumbers(["a", -1, -1, 1, 1, 1, 2, 2, 3, 3, 4])).toStrictEqual([
    "a",
    -1,
    1,
    2,
    3,
    4,
  ]);
});

test("list all unique values II", () => {
  expect(listUniqNumbers(["a", -1, -1, 1, 1, 1, 2, 2, 3, 3])).toStrictEqual([
    "a",
    -1,
    1,
    2,
    3,
  ]);
});

test("map team names", () => {
  expect(
    mapTeamHomeNames([{ home_team_name: "Faz" }, { home_team_name: "Jarrod" }])
  ).toStrictEqual(["Faz", "Jarrod"]);
});

test("sort String", () => {
  expect(sortString(["Jarrod", "Faz"])).toStrictEqual(["Faz", "Jarrod"]);
});

test("get goal difference (loser)", () => {
  expect(
    getGoalDifferenceLoser({
      home_team_goal_count: "9",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(-1);
});

test("list all teams", () => {
  expect(
    listAllTeams([
      {
        home_team_goal_count: "5",
        away_team_goal_count: "8",
        home_team_name: "Team A",
        away_team_name: "Team B",
      },
      {
        home_team_goal_count: "5",
        away_team_goal_count: "8",
        home_team_name: "Team A",
        away_team_name: "Team B",
      },
    ])
  ).toStrictEqual(["Team A", "Team B"]);
});

test("list all teams", () => {
  expect(
    listAllTeams([
      {
        home_team_goal_count: "5",
        away_team_goal_count: "8",
        home_team_name: "Team A",
        away_team_name: "Team B",
      },
      {
        home_team_goal_count: "5",
        away_team_goal_count: "8",
        home_team_name: "Team A",
        away_team_name: "Team C",
      },
    ])
  ).toStrictEqual(["Team A", "Team B", "Team C"]);
});

test("get winner part II", () => {
  expect(
    getWinner({
      home_team_goal_count: "5",
      away_team_goal_count: "7",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual("Team B");
});

test("get winner part III (draw)", () => {
  expect(
    getWinner({
      home_team_goal_count: "5",
      away_team_goal_count: "5",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(null);
});

test("count wins for team", () => {
  let data = [
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
  ];
  expect(countWinsForTeam(data, "Team A")).toStrictEqual(0);
});

test("count wins for teams II", () => {
  let data = [
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
  ];
  expect(countWinsForAllTeams(data, ["Team A", "Team B"])).toStrictEqual({
    "Team A": 0,
    "Team B": 2,
  });
});

test("count wins for teams (sorted)", () => {
  let data = [
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
    {
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    },
  ];
  let result = countWinsForAllTeamsSorted(data);
  // console.log(result)
  expect(result).toStrictEqual([
    { name: "Team B", wins: 2 },
    { name: "Team A", wins: 0 },
  ]);
});

test("get goal difference (winner) II", () => {
  expect(
    getGoalDifferenceWinner({
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(3);
});

test("get goal difference (winner) II", () => {
  expect(
    getGoalDifferenceWinner({
      home_team_goal_count: "5",
      away_team_goal_count: "100",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(95);
});

test("get goal difference (loser)", () => {
  expect(
    getGoalDifferenceLoser({
      home_team_goal_count: "5",
      away_team_goal_count: "8",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(-3);
});

test("get goal difference (loser)", () => {
  expect(
    getGoalDifferenceLoser({
      home_team_goal_count: "5",
      away_team_goal_count: "80",
      home_team_name: "Team A",
      away_team_name: "Team B",
    })
  ).toStrictEqual(-75);
});

test("sortValues values", () => {
  expect(sortValues([2, 5, 1])).toStrictEqual([1, 2, 5]);
});

test("list all teams", () => {
  expect(listAllTeams(records)).toStrictEqual([
    "AFC Bournemouth",
    "Arsenal",
    "Brighton & Hove Albion",
    "Burnley",
    "Cardiff City",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Huddersfield Town",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Southampton",
    "Tottenham Hotspur",
    "Watford",
    "West Ham United",
    "Wolverhampton Wanderers",
  ]);
});

// console.log(countWinsForAllTeamsSorted(records))

test("get the league winner", () => {
  expect(getLeagueWinner(records)).toStrictEqual(
    "Manchester City won the League!"
  );
});
