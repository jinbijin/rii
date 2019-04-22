import { readFile } from 'fs'

export function mjlogLexer(path : string) {
  readFile(path, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  })
}
