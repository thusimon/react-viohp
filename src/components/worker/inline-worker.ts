export const InlineWorker = (fn: Function) => {
  var blob = new Blob(['(' + fn.toString() + ')()'], { type: 'text/javascript' });
  var url = URL.createObjectURL(blob);
  
  return new Worker(url);
};
