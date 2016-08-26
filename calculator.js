$(document).ready(function() {
  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');

  const calculate = () => {
    // store each area separately
    let total = 0;
    let areas = $('.area');

    areas.each((idx, area)=> {
      let jArea = $.makeArray($(area));
      let test = jArea.map((area) => {
        let length = $(area).find('.input-length');
        let width = $(area).find('.input-width');
        let depth = $(area).find('.input-depth');
        return {
          'length': {
            'ft': length.eq(0).val(),
            'in': length.eq(1).val(),
          },
          'width':  {
            'ft': width.eq(0).val(),
            'in': width.eq(1).val(),
          },
          'depth':  {
            'ft': depth.eq(0).val(),
            'in': depth.eq(1).val(),
          }
        }
      });

      console.log(test);

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
