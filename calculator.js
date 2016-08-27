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
      let values = areaArray.forEach((area) => {
        let length = $(area).find('.input-length');
        let width = $(area).find('.input-width');
        let depth = $(area).find('.input-depth');
        lengthVal = convertStringValuesToInches(length.eq(0).val(), length.eq(1).val());
        widthVal = convertStringValuesToInches(width.eq(0).val(), width.eq(1).val());
        depthVal = convertStringValuesToInches(depth.eq(0).val(), depth.eq(1).val());
        let areaTotal = lengthVal * widthVal * depthVal;
        let convertedSingleAreaTotal = areaTotal * CUBIC_FEET_TO_CUBIC_YARD_CONVERSION_FACTOR;
        $(`#area-number-${idx+1}`).html(convertedSingleAreaTotal.toFixed(2));
        total += convertedSingleAreaTotal;
      });
      $('#area-number-all').html(total.toFixed(2));
    });
  }

  const convertStringValuesToInches = (feet, inches) => {
    return (parseInt( feet ) || 0 ) * 12 + (parseInt(inches || 0 ));
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
