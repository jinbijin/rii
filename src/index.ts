import { recordGenerator } from './recordGenerator'

let dataDiv = document.getElementById('data');
let record = recordGenerator('logs'); // Should I pass this to main process?

// Generate table
let table = document.createElement('table');
dataDiv.appendChild(table);
// Generate header row
let headerRow = document.createElement('tr');
table.appendChild(headerRow);
// Generate header cell
addHeaderCellWithContents(headerRow, 'Tenhou name');
addHeaderCellWithContents(headerRow, 'Matches');
addHeaderCellWithContents(headerRow, 'Total score');
addHeaderCellWithContents(headerRow, '(avg. pre)');
addHeaderCellWithContents(headerRow, '(avg. post)');
addHeaderCellWithContents(headerRow, 'Win rate');
addHeaderCellWithContents(headerRow, '(avg.)');
addHeaderCellWithContents(headerRow, 'Deal-in rate');
addHeaderCellWithContents(headerRow, '(avg.)');
addHeaderCellWithContents(headerRow, 'Riichi');
addHeaderCellWithContents(headerRow, 'Open');
addHeaderCellWithContents(headerRow, 'Avg. calls');

// Generate data rows
for (var p in record) {
  let row = document.createElement('tr');
  table.appendChild(row);

  addDataCellWithContents(row, decodeURI(p));
  addNumericDataCellWithContents(row, String(record[p].matches));
  addNumericDataCellWithContents(row, String(record[p].matchScoreAfterUmaRounded));
  let preUma = record[p].matchScoreBeforeUmaTenfold / (10 * record[p].matches);
  addNumericDataCellWithContents(row, '(' + preUma.toFixed(1) + ')');
  let postUma = record[p].matchScoreAfterUmaRounded / (record[p].matches);
  addNumericDataCellWithContents(row, '(' + postUma.toFixed(1) + ')');
  let agari = record[p].roundAgari / record[p].rounds;
  addNumericDataCellWithContents(row, agari.toFixed(3));
  if (record[p].roundAgari == 0) {
    addNumericDataCellWithContents(row, '(---)');
  }
  else {
    let agariValue = record[p].roundAgariScoreTenfold / (10 * record[p].roundAgari);
    addNumericDataCellWithContents(row, '(' + agariValue.toFixed(1) + ')');
  }
  let furikomi = record[p].roundFurikomi / record[p].rounds;
  addNumericDataCellWithContents(row, furikomi.toFixed(3));
  if (record[p].roundFurikomi == 0) {
    addNumericDataCellWithContents(row, '(---)');
  }
  else {
    let furikomiValue = record[p].roundFurikomiScoreTenfold / (10 * record[p].roundFurikomi);
    addNumericDataCellWithContents(row, '(' + furikomiValue.toFixed(1) + ')');
  }
  let riichi = record[p].roundRiichi / record[p].rounds;
  addNumericDataCellWithContents(row, riichi.toFixed(3));
  let opening = record[p].roundCalled / record[p].rounds;
  addNumericDataCellWithContents(row, opening.toFixed(3));
  let callFreq = record[p].roundCalls / record[p].rounds;
  addNumericDataCellWithContents(row, callFreq.toFixed(3));
}

function addHeaderCellWithContents(tableRow : HTMLElement, content : string) {
  let newCell = document.createElement('th');
  tableRow.appendChild(newCell);
  newCell.appendChild(document.createTextNode(content));
}

function addDataCellWithContents(tableRow : HTMLElement, content : string) {
  let newCell = document.createElement('td');
  tableRow.appendChild(newCell);
  newCell.appendChild(document.createTextNode(content));
}

function addNumericDataCellWithContents(tableRow : HTMLElement, content : string) {
  let newCell = document.createElement('td');
  tableRow.appendChild(newCell);
  newCell.appendChild(document.createTextNode(content));
  newCell.setAttribute('style', 'text-align:right');

}
