$(document).ready(function() {
  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');
  const CUBIC_INCH_TO_CUBIC_YARD = .0000214335;

  const removeArea = (event) => {
    $(event.target).parents('.area').remove();
  }

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
        let convertedSingleAreaTotal = areaTotal * CUBIC_INCH_TO_CUBIC_YARD;
        $(`#area-number-${idx+1}`).html(convertedSingleAreaTotal.toFixed(2));
        total += convertedSingleAreaTotal;
      });
      updateTotal(total);
    });
  }

  const updateTotal = (newAmount) => {
    $('#area-number-all').html(newAmount.toFixed(2));
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
      let nextIndex =  parseInt(areaWrap
          .find('.area')
          .last()
          .find('span.area-number')
          .html()) || numberOfAreas;

      areaModel.index = nextIndex+1;
      let source = $(x).html();
      let template = Handlebars.compile(source);
      let test = $('#area-list').append(template(areaModel));
      if (numberOfAreas > 0) {
        let currArea = $('.area').eq(nextIndex);
        currArea.find('.area-header').append(`<a class="area-remove">X</a>`);
        currArea.find('.area-remove').on('click', removeArea);


      }
    })
  }

  setupButtons(actions);
  addArea();
});
