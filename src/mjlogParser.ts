import { readFileSync } from 'fs'
import { Element } from './types'

const outerRegex = RegExp('^\<mjloggm ver\="2\.3"\>(.*)\<\/mjloggm\>$');
const elementsRegex = RegExp('^(\<.*?\/\>)*$');
const elementRegex = RegExp('\<(.*?)\/\>(.*)$');
const attrsRegex = RegExp('^[a-zA-Z]+[0-9]*( [a-zA-Z]+[0-9]*\=".*?")* ?$');
const attrNameRegex = RegExp('^([a-zA-Z]+)([0-9]*) ?(.*?) ?$');
const attrRegex = RegExp('^([a-zA-Z]+[0-9]*)\="(.*?)" ?(.*)$');

// Turns the specified file into an AST, which is an array of items, each of
// which is an array `[<name>, <index>, <attribute dict>]`.
export function mjlogParser(path : string): Element[] {
  let elements: Element[] = [];
  let elementStrings: string[] = [];
  let data: string = readFileSync(path, 'utf-8');

  // Match and extract the content of the outermost element.
  let elementsRaw = outerRegex.exec(data);
  if (elementsRaw == null) {
    throw new Error('Failure matching "mjloggm" element as outermost element of file.');
  }
  let others = elementsRaw[1];

  // Match and extract the content of the elements.
  if (!elementsRegex.test(others)) {
    throw new Error('Failure recognising content of "mjloggm" element as a sequence of elements.');
  }
  while (others != '') {
    let match = elementRegex.exec(others);
    elementStrings.push(match[1]);
    others = match[2];
  }

  // Process each individual element.
  let i;
  for (i = 0; i < elementStrings.length; i++) {
    if (!attrsRegex.test(elementStrings[i])) {
      throw new Error('Failure recognising element ' + i.toString() + ' of file.');
    }
    let match = attrNameRegex.exec(elementStrings[i]);
    let name = match[1];
    let index = Number(match[2]);
    let others = match[3];
    let value: string[];
    elements.push(new Element(name, index, {}));
    while (others != '') {
      match = attrRegex.exec(others);
      name = match[1];
      value = match[2].split(',');
      elements[i].attrs[name] = value;
      others = match[3];
    }
  }

  return elements;
}
