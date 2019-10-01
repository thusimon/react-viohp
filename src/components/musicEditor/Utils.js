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
