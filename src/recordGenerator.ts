import { readdirSync } from 'fs';
import { PlayerStats } from './types';
import { mjlogParser } from './mjlogParser';
import { mjlogRecorder } from './mjlogRecorder';

export function recordGenerator(path: string): PlayerStats {
  let files = readdirSync(path);
  let record = {};
  for (var file of files) {
    let elements = mjlogParser('logs/' + file);
    record = mjlogRecorder(elements, record);
  }

  return record;
}
