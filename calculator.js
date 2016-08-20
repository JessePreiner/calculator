(function () {

  let buildCalculator = function() {
    updateButton('buildReset', 'Reset', resetForm);

    let numSquares = document.getElementById('numSquares').value;
    let squares = buildSquares(numSquares);
    let form = document.getElementById("frmSquares");
    squares.forEach(square => {
      form.appendChild(square);
    });
  }

  let buildSquares = function(numSquares) {
    if (!numSquares || numSquares < 1) {return 1;}
    let results = [];
    for (let i=1; i <= numSquares; i++) {
      let dimensions = ['Length', 'Height', 'Width'];
      let label = document.createElement("p");
      label.innerHTML= `Volume ${i}`;
      results.push(label);

      for (let j=0; j<3; j++) {

        let input = document.createElement("input");
        let name = `${dimensions[j]}`;
        let lowerName = name.toLowerCase();

        input.setAttribute("name", `${lowerName}${i}`);
        input.setAttribute("id", `${lowerName}${i}`)

        let label = document.createElement("label");
        label.setAttribute("for", `${lowerName}${i}`);
        label.innerHTML= `${name}: `;

        let result = document.createElement('div');
        result.innerHTML = `${label.outerHTML}${input.outerHTML}`;
        results.push(result);
      }
    }

    let btnCalculate = document.createElement('button');
    btnCalculate.onclick = calculateResults;
    btnCalculate.innerHTML = "Calculate";
    results.push(btnCalculate);
    return results;
  }

  let calculateResults = function () {
    alert('calculating!');
  }

  let updateButton = function(buttonId, innerHtml, fnOnClick) {
    let btnBuildReset = document.getElementById(buttonId);
    btnBuildReset.onclick=fnOnClick;
    btnBuildReset.innerHTML = innerHtml;
  }

  let resetForm = function() {
    let frmSquares = document.getElementById('frmSquares');
    frmSquares.innerHTML = '';

    updateButton('buildReset', 'Build', buildCalculator);
  }

  updateButton('buildReset', 'Build', buildCalculator);
}


)();
