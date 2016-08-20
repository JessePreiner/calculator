(function () {

  let buildCalculator = function() {
    let btnBuildReset = document.getElementById('buildReset');
    btnBuildReset.onclick=resetForm;
    btnBuildReset.innerHTML = 'Reset';

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

        input.setAttribute("name", lowerName);
        input.setAttribute("id", `${lowerName}${i}`)

        let label = document.createElement("label");
        label.setAttribute("for", lowerName);
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

  let resetForm = function() {
    let frmSquares = document.getElementById('frmSquares');
    frmSquares.innerHTML = '';

    let btnBuildReset = document.getElementById('buildReset');
    btnBuildReset.onclick=resetForm;
    btnBuildReset.innerHTML = 'Build';
    btnBuildReset.onclick = buildCalculator;
  }

  let btnBuildReset = document.getElementById('buildReset');
  btnBuildReset.onclick=buildCalculator;
  btnBuildReset.innerHTML = 'Build';

}


)();
