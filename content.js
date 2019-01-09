function classToString(c) {
  console.log(c);
  return "" + c.name + ": " + (c.gpa * c.weight) + "\n";
}

function getClassGPA(g) {
  switch (true) {
    case (g <= 59):
      return 0;
    case (g <= 62):
      return .67;
    case (g <= 66):
      return 1;
    case (g <= 69):
      return 1.33;
    case (g <= 72):
      return 1.67;
    case (g <= 76):
      return 2;
    case (g <= 79):
      return 2.33;
    case (g <= 82):
      return 2.67;
    case (g <= 86):
      return 3;
    case (g <= 89):
      return 3.33;
    case (g <= 92):
      return 3.67;
    case (g <= 96):
      return 4;
    case (true):
      return 4.33;
  }
}
if (window.location.href.includes('parents.chatham-nj.org/genesis/parents?tab1=studentdata&tab2=gradebook')) {
  console.log('running')
  let classes = [];
  let data = document.querySelectorAll('body > table.notecard > tbody > tr:nth-child(2) > td > table > tbody > tr:not(:first-child)');
  for (let i = 0; i < data.length; i++) {
    console.log("running");
    let info = data[i].innerText.split(/\n+/);
    if (info[2] != 'No Grades' && !info[0].includes('Phys Ed')) {
      classes.push({
        name: info[0],
        gpa: getClassGPA(Math.round(info[2].split('%')[0])),
        weight: info[0].includes('AP') || info[0].includes('Honors') ? 1.25 : 1
      });
    }
  }
  let unweighted = 0;
  let weighted = 0;
  let result = "";
  for (let c of classes) {
    console.log('running')
    unweighted += c.gpa;
    weighted += c.gpa * c.weight;
    result += classToString(c);
  }
  unweighted /= classes.length;
  weighted /= classes.length;
  result += "Weighted: " + weighted + "\nUnweighted: " + unweighted;
  alert(result);
} else {
  window.location.replace('https://parents.chatham-nj.org');
}