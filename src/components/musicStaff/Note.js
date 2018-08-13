/**
 * Created by Lu on 8/12/2018.
 */
import fabric from 'fabric';

const Note = () => {
  console.log(fabric);
  const fabAPI = fabric.fabric;
  const rect = new fabAPI.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : 'red'
  });
  rect.set('selectable', true);
  rect.set('hasRotatingPoint', false);
  rect.setControlsVisibility({
    tl: false, tr: false, br: false, bl: false,
    ml: false, mt: false, mr: false, mb: false,
    mtr: false
  });
  return rect;
};

export default Note;
