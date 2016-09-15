$(document).ready(function() {
  const CUBIC_INCH_TO_CUBIC_YARD = .0000214335;

  const removeArea = (event) => {
    $(event.target).parents('.area').remove();
    calculateAndRenderAll();
  }

  const calculateAndRenderAll = () => {
    let areas = $('.area');
    total = 0;
    areas.each((idx,area) => {
      let currTotal = calculateAreaTotal(area);
      renderSingleAreaTotal(idx, currTotal);
      total += currTotal;
    });
    renderNewTotal(total);
  }

  const renderSingleAreaTotal = (idx, amount) => {
    $(`#area-number-${idx+1}`).html(amount.toFixed(2));
  }

  const calculateAreaTotal = (area) => {
    let length = $(area).find('.input-length');
    let width = $(area).find('.input-width');
    let depth = $(area).find('.input-depth');
    lengthVal = convertStringValuesToInches(length.eq(0).val(), length.eq(1).val());
    widthVal = convertStringValuesToInches(width.eq(0).val(), width.eq(1).val());
    depthVal = convertStringValuesToInches(depth.eq(0).val(), depth.eq(1).val());
    let areaTotal = (lengthVal * widthVal * depthVal) * CUBIC_INCH_TO_CUBIC_YARD;
    return areaTotal;
  }

  const renderNewTotal = (newAmount) => {
    $('#area-number-all').html(newAmount.toFixed(2));
  }

  const convertStringValuesToInches = (feet, inches) => {
    return (parseInt( feet ) || 0 ) * 12 + (parseInt(inches || 0 ));
  }

  const setupButtons = (actions) => {
    let btnAddArea = actions.find('.area-add').find('button');
    let btnCalculate = actions.find('.area-calculate').find('button');

    btnAddArea.on('click', addArea);
    btnCalculate.on('click', calculateAndRenderAll);
  }

  const addArea = () => {
    $.get('./area-template.mustache.html', (templateContents) => {
      let numberOfAreas = areaWrap.find('.area').length;
      let nextIndex =  (parseInt(areaWrap
          .find('.area')
          .last()
          .find('span.area-number')
          .html()) || numberOfAreas)+1;

      let source = $(templateContents).html();
      let template = Handlebars.compile(source);
      $('#area-list').append(template({index: nextIndex}));
      if (numberOfAreas > 0) {
        let currArea = $('.area').eq(numberOfAreas);
        currArea.find('.area-header').append(`<a class="area-remove">X</a>`);
        currArea.find('.area-remove').on('click', removeArea);
      }
    });
  }

  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');
  let total = 0;
  setupButtons(actions);
  addArea();
});
