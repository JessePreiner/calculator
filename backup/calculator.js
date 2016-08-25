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
      let currDiv = document.createElement('div');
      currDiv.classList.add('square');
      for (let j=0; j<3; j++) {

        let input = document.createElement("input");
        let name = `${dimensions[j]}`;
        let lowerName = name.toLowerCase();

        input.setAttribute("name", `${lowerName}${i}`);
        input.setAttribute("id", `${lowerName}${i}`)

        let label = document.createElement("label");
        label.setAttribute("for", `${lowerName}${i}`);
        label.innerHTML= `${name}: `;

        currDiv.innerHTML = `${currDiv.innerHTML}${label.outerHTML}${input.outerHTML}`;
      }
      results.push(currDiv);
    }

    let btnCalculate = document.createElement('button');
    btnCalculate.onclick = calculateResults;
    btnCalculate.innerHTML = "Calculate";
    results.push(btnCalculate);

    let total = document.createElement('p');
    total.setAttribute("id", "total");
    results.push(total);

    return results;
  }

  let calculateResults = function () {
    let squares = document.getElementsByClassName('square');
    let results = 0;
    let inputGroups = Array.prototype.map.call(squares, x=> x.getElementsByTagName('input'));

    Array.prototype.forEach.call(inputGroups,
       (currGroup) => {
         let sumForCurrentSquare = parseInt(currGroup[0].value) * parseInt(currGroup[1].value) * parseInt(currGroup[2].value);
         results += sumForCurrentSquare;
         }
     );
     let total = document.getElementById('total');
     total.innerHTML = `Result: ${results}`;
  }

  let updateButton = function(buttonId, innerHtml, fnOnClick) {
    let btnBuildReset = document.getElementById(buttonId);
    btnBuildReset.onclick=fnOnClick;
    btnBuildReset.innerHTML = innerHtml;
  }

  let resetForm = function() {
    updateButton('buildReset', 'Build', buildCalculator);
    frmSquares.innerHTML = '';
    let frmSquares = document.getElementsByClassName('frmSquares');
  }
  updateButton('buildReset', 'Build', buildCalculator);
}


)();
