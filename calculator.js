$(document).ready(function() {
  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');
  const CUBIC_FEET_TO_CUBIC_YARD_CONVERSION_FACTOR = .0000214335;
  const calculate = () => {
    let total = 0;
    let areas = $('.area');

    areas.each((idx, area)=> {
      let jqArea = $(area);
      let areaArray = $.makeArray(jqArea);
      let values = areaArray.map((area) => {
        let length = $(area).find('.input-length');
        let width = $(area).find('.input-width');
        let depth = $(area).find('.input-depth');
        let result = {
          'length': (parseInt( length.eq(0).val() ) || 0 ) * 12 + (parseInt(length.eq(1).val() || 0 )),
          'width':  (parseInt( width.eq(0).val() ) || 0) * 12 + (parseInt(width.eq(1).val() || 0 )),
          'depth':  (parseInt( depth.eq(0).val() ) || 0 ) * 12 + (parseInt(depth.eq(1).val() || 0 ))
        }
        result.total = result.length * result.width * result.depth;
        let convertedSingleAreaTotal = result.total * CUBIC_FEET_TO_CUBIC_YARD_CONVERSION_FACTOR;
        $(`#area-number-${idx+1}`).html(convertedSingleAreaTotal.toFixed(2));
        total += convertedSingleAreaTotal;
        return result;
      });
      $('#area-number-all').html(total.toFixed(2));
    });
  }

  const setupButtons = (actions) => {
    let btnAddArea = actions.find('.area-add').find('button');
    let btnCalculate = actions.find('.area-calculate').find('button');

    btnAddArea.on('click', addArea);
    btnCalculate.on('click', calculate);
  }

  const addArea = () => {
    $.get('./area-template.mustache.html', (x)=>{
      let areaModel = {};
      let numberOfAreas = areaWrap.find('.area').length;
      areaModel.index = numberOfAreas+1;
      let source = $(x).html();
      let template = Handlebars.compile(source);
      $('#area-list').append(template(areaModel));
    })
  }
  setupButtons(actions);
  addArea();
});
