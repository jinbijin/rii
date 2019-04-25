export function mjlogRecorder(elements : any[], record) {
  let foundUN = false;
  let p = [null,null,null,null];
  for (var element of elements) {
    if (!foundUN && element[0] == 'UN') {
      foundUN = true;
      for (var j in p) {
        p[j] = element[2]['n'+j.toString()][0];
        if (record[p[j]] == null) {
          record[p[j]] = {};
          record[p[j]]['Matches'] = 0;
        }
        record[p[j]]['Matches']++;
      }
    }
    else if (element[0] == 'INIT') {
      for (var j in p) {
        if (record[p[j]]['Rounds'] == null) {
          record[p[j]]['Rounds'] = 0;
        }
        record[p[j]]['Rounds']++;
      }
    }
    // Find `owari`
    if (element[2]['owari'] != null) {
      for (var j in p) {
        if (record[p[j]]['MatchScoreBeforeUmaTenfold'] == null) {
          record[p[j]]['MatchScoreBeforeUmaTenfold'] = 0;
          record[p[j]]['MatchScoreBeforeUmaTenfoldSquared'] = 0;
          record[p[j]]['MatchScoreAfterUmaRounded'] = 0;
          record[p[j]]['MatchScoreAfterUmaRoundedSquared'] = 0;
        }
        var beforeUmaTenfold = Number(element[2]['owari'][2*j] - 250);
        var afterUmaRounded = Number(element[2]['owari'][2*j+1]);
        record[p[j]]['MatchScoreBeforeUmaTenfold'] += beforeUmaTenfold;
        record[p[j]]['MatchScoreBeforeUmaTenfoldSquared'] += beforeUmaTenfold * beforeUmaTenfold;
        record[p[j]]['MatchScoreAfterUmaRounded'] += afterUmaRounded;
        record[p[j]]['MatchScoreAfterUmaRoundedSquared'] += afterUmaRounded * afterUmaRounded;
      }
    }
  }
  return record;
}
