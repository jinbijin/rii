import { Element, Stats, PlayerStats } from './types'

function ensurePlayerExists(record: PlayerStats, player: string) {
  if (record[player] == null) {
    record[player] = new Stats();
  }
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
        record[p[j]].matches++;
      }
    }
    else if (element.name == 'INIT') {
      for (var j in p) {
        record[p[j]].rounds++;
      }
    }
    // Find `owari`
    if (element.attrs['owari'] != null) {
      for (var j in p) {
        var beforeUmaTenfold = Number(element.attrs['owari'][2*Number(j)]) - 250;
        var afterUmaRounded = Number(element.attrs['owari'][2*Number(j)+1]);
        record[p[j]].matchScoreBeforeUmaTenfold += beforeUmaTenfold;
        record[p[j]].matchScoreBeforeUmaTenfoldSquared += beforeUmaTenfold * beforeUmaTenfold;
        record[p[j]].matchScoreAfterUmaRounded += afterUmaRounded;
        record[p[j]].matchScoreAfterUmaRoundedSquared += afterUmaRounded * afterUmaRounded;
      }
    }
  }
  return record;
}
