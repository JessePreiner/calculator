$(document).ready(function() {
  let areaWrap = $('.area-wrap');
  let actions = areaWrap.find('.area-actions');

  const calculate = () => {
    alert('calculating');
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
