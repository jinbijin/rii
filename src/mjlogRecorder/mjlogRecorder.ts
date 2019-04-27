import { Element, PlayerStats } from '../types/types'

function ensurePlayerExists(record: PlayerStats, player: string): PlayerStats {
  if (record[player] == null) {
    record[player] = {};
  }
  return record;
}

function addToStat(record: PlayerStats, player: string, stat: string, value: number)
    : PlayerStats {
  if (record[player][stat] == null) {
    record[player][stat] = 0;
  }
  record[player][stat] += value;

  return record;
}

export function mjlogRecorder(elements : Element[], record: PlayerStats): PlayerStats {
  let foundUN = false;
  let p: string[] = [null,null,null,null];
  for (var element of elements) {
    if (!foundUN && element.name == 'UN') {
      foundUN = true;
      for (var j in p) {
        p[j] = element.attrs['n'+j.toString()][0];
        ensurePlayerExists(record, p[j]);
        addToStat(record, p[j], 'Matches', 1);
      }
    }
    else if (element.name == 'INIT') {
      for (var j in p) {
        addToStat(record, p[j], 'Rounds', 1);
      }
    }
    // Find `owari`
    if (element.attrs['owari'] != null) {
      for (var j in p) {
        var beforeUmaTenfold = Number(element.attrs['owari'][2*Number(j)]) - 250;
        var afterUmaRounded = Number(element.attrs['owari'][2*Number(j)+1]);
        addToStat(record, p[j], 'MatchScoreBeforeUmaTenfold', beforeUmaTenfold);
        addToStat(record, p[j], 'MatchScoreBeforeUmaTenfoldSquared', beforeUmaTenfold * beforeUmaTenfold);
        addToStat(record, p[j], 'MatchScoreAfterUmaRounded', afterUmaRounded);
        addToStat(record, p[j], 'MatchScoreAfterUmaRoundedSquared', afterUmaRounded * afterUmaRounded);
      }
    }
  }
  return record;
}
