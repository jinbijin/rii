import { Element, Stats, PlayerStats } from './types'

function ensurePlayerExists(record: PlayerStats, player: string) {
  if (record[player] == null) {
    record[player] = new Stats();
  }
}

export function mjlogRecorder(elements : Element[], record: PlayerStats): PlayerStats {
  let foundUN = false;
  let p: string[] = [null,null,null,null];
  let currentN: number[] = [0,0,0,0];
  let currentREACH: boolean[] = [false,false,false,false];

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
        currentN[j] = 0;
        currentREACH[j] = false;
      }
    }
    else if (element.name == 'N') {
      let who = element.attrs['who'][0];
      if (currentN[who] == 0) {
        record[p[who]].roundCalled++;
      }
      record[p[who]].roundCalls++;
      record[p[who]].roundCallsSquared += 2 * currentN[who] + 1;
      currentN[who]++;
    }
    else if (element.name == 'REACH' && element.attrs['step'][0] == '2') {
      let who = element.attrs['who'][0];
      currentREACH[who] = true;
      record[p[who]].roundRiichi++;
    }
    else if (element.name == 'AGARI') {
      let who = element.attrs['who'][0];
      let fromWho = element.attrs['fromWho'][0];
      record[p[who]].roundAgari++;

      let agariScoreTenfold = Number(element.attrs['sc'][2*Number(who)+1]);
      if (currentREACH[who]) {
        agariScoreTenfold -= 10;
      }
      record[p[who]].roundAgariScoreTenfold += agariScoreTenfold;
      record[p[who]].roundAgariScoreTenfoldSquared += agariScoreTenfold * agariScoreTenfold;

      if (who != fromWho) {
        record[p[fromWho]].roundFurikomi++;
        let furikomiScoreTenfold = Number(element.attrs['sc'][2*Number(fromWho)+1]);
        if (currentREACH[who]) {
          furikomiScoreTenfold -= 10;
        }
        record[p[fromWho]].roundFurikomiScoreTenfold += furikomiScoreTenfold;
        record[p[fromWho]].roundFurikomiScoreTenfoldSquared += furikomiScoreTenfold * furikomiScoreTenfold;
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
