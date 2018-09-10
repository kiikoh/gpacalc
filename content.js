if (window.location.href.includes('parents.chatham-nj.org/genesis/parents?tab1=studentdata&tab2=gradebook')) {
  var classesOdd = document.getElementsByClassName('listrowodd');
  var classesEven = document.getElementsByClassName('listroweven');
  var classes = [];
  for (i of classesEven) {
    classes.push(i);
  }
  for (i of classesOdd) {
    classes.push(i);
  }

  var classText = [];
  for (var i = 0; i < classes.length; i++) {
    classText.push(classes[i].innerText);
  }

  var classInfo = [];
  for (var i = 0; i < classes.length; i++) {
    classInfo.push(classText[i].split(/\n+/));
  }

  var grade = [];
  var weight = [];
  for (var i = 0; i < classes.length; i++) {
    if (classInfo[i][2] != 'No Grades' && !classInfo[i][0].includes('Phys Ed')) {
      if (classInfo[i][0].includes('AP') || classInfo[i][0].includes('Honors')) {
        weight.push(1.25);
      } else {
        weight.push(1);
      }
      grade.push(classInfo[i][2].substring(0, 5));
    }
  }

  var weightedClassGPA = [];
  for (var i = 0; i < grade.length; i++) {
    g = grade[i];
    g = Math.round(g);
    switch (true) {
      case (g <= 59):
        {
          weightedClassGPA[i] = 0;
          break;
        }
      case (g <= 62):
        {
          weightedClassGPA[i] = .67;
          break;
        }
      case (g <= 66):
        {
          weightedClassGPA[i] = 1;
          break;
        }
      case (g <= 69):
        {
          weightedClassGPA[i] = 1.33;
          break;
        }
      case (g <= 72):
        {
          weightedClassGPA[i] = 1.67;
          break;
        }
      case (g <= 76):
        {
          weightedClassGPA[i] = 2;
          break;
        }
      case (g <= 79):
        {
          weightedClassGPA[i] = 2.33;
          break;
        }
      case (g <= 82):
        {
          weightedClassGPA[i] = 2.67;
          break;
        }
      case (g <= 86):
        {
          weightedClassGPA[i] = 3;
          break;
        }
      case (g <= 89):
        {
          weightedClassGPA[i] = 3.33;
          break;
        }
      case (g <= 92):
        {
          weightedClassGPA[i] = 3.67;
          break;
        }
      case (g <= 96):
        {
          weightedClassGPA[i] = 4;
          break;
        }
      case (true):
        {
          weightedClassGPA[i] = 4.33;
          break;
        }
    }
    weightedClassGPA[i]*=weight[i];
  }

  var gpa = 0;
  for (w of weightedClassGPA) {
    gpa += w;
  }
  if (grade.length != 0) {
    gpa /= grade.length;
    alert('Your GPA is ' + (Math.round(gpa * 100) / 100));
  } else {
    alert('No Grades');
  }
} else {
  window.location.replace('https://parents.chatham-nj.org');
}
