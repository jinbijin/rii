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
        }
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
  }
  return record;
}
