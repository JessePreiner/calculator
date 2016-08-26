$(document).ready(function() {
  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');

  const calculate = () => {
    // store each area separately
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
          'length': parseInt( length.eq(0).val() ) * 12 + parseInt(length.eq(1).val()),
          'width': parseInt( width.eq(0).val() ) * 12 + parseInt(width.eq(1).val()),
          'depth': parseInt( depth.eq(0).val() ) * 12 + parseInt(depth.eq(1).val())
        }
        result.total = result.length * result.width * result.depth;
        $(`#area-number-${idx+1}`).html(result.total);
        return result;
      });

      console.log(values);

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
