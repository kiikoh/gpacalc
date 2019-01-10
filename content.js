function classToString(c) {
  return "\n" + c.name + ": " + numFormat(c.gpa * c.weight);
}

function nameFormat(name) {
  let comma = name.indexOf(',');
  while (name.charAt(comma) !== '\t') {
    comma--;
  }
  return name.substring(0, comma);
}

function numFormat(num) {
  return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}

function getClassGPA(g) {
  if (g <= 59) return 0;
  if (g <= 62) return .67;
  if (g <= 66) return 1;
  if (g <= 69) return 1.33;
  if (g <= 72) return 1.67;
  if (g <= 76) return 2;
  if (g <= 79) return 2.33;
  if (g <= 82) return 2.67;
  if (g <= 86) return 3;
  if (g <= 89) return 3.33;
  if (g <= 92) return 3.67;
  if (g <= 96) return 4;
  return 4.33;
}

if (window.location.href.includes('parents.chatham-nj.org/genesis/parents?tab1=studentdata&tab2=gradebook')) {
  let classes = [];
  let data = document.querySelectorAll('body > table.notecard > tbody > tr:nth-child(2) > td > table > tbody > tr:not(:first-child)');
  for (let i = 0; i < data.length; i++) {
    let info = data[i].innerText.split(/\n+/);
    if (info[2] != 'No Grades' && !info[0].includes('Phys Ed')) {
      classes.push({
        name: nameFormat(info[0]),
        gpa: getClassGPA(Math.round(info[2].split('%')[0])),
        weight: info[0].includes('AP') || info[0].includes('Honors') ? 1.25 : 1
      });
    }
  }
  let unweighted = 0;
  let weighted = 0;
  let result = "";
  for (let c of classes) {
    unweighted += c.gpa;
    weighted += c.gpa * c.weight;
    result += classToString(c);
  }
  unweighted /= classes.length;
  weighted /= classes.length;
  result = "Weighted: " + numFormat(weighted) + "\nUnweighted: " + numFormat(unweighted) + result;
  alert('hello');
} else {
  window.location.replace('https://parents.chatham-nj.org');
}