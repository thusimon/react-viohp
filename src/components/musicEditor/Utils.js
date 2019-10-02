// the line string should contain label at the beginning
/**
 * notes should be an array
 * [
 *   {0: {}, 1: {}, 2： {}}
 * ]
 *
*/

export const ConvertNotesToText = (notes) => {

  return notes.map(noteLine=>{
    return Object.values(noteLine).join(';');
  }).join(`
`);
};

/**
 * @param {string} text 
 * noteLine: [<sym type>, <pitch name>, <x>;]
 * 'QF.R', 'A3', 20: A quarter note with Flat scale, augment, and reversed symbol, pitch name is A3, x position is 20
 */
export const ConvertTextToNotes = (text) => {
  const textSplit = text.split('\n');
  const notesRaw = textSplit.map(textLine=>{
    if (!textLine) {
      return [];
    } else {
      return textLine.split(';');
    }
  });
  console.log(notesRaw);
};
