import { readFile } from 'fs'

export function mjlogLexer(path) {
  readFile(path, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
}
