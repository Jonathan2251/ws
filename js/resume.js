
function drawSkillBarChart() {
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var color = Chart.helpers.color;
  var horizontalBarChartData = {
      labels: ["Embedded system (c/c++, linux, bare metal, mips, assembly)", "Linux programming (gcc, device driver, bash, usb)", "CPU design (simulator, python, Verilog, mips, arm)", "Compiler design (yacc/lex, llvm/lld, cmake/make)", "Software engineering (OOP/OOA, design pattern)", "UI design (VC, Borland C++, VB, html/css/java script)", "Documentation writing(Sphinx, uml, html/css/java script)", "Equipment usage (scope, spectrum, power meter, ...)"],
      datasets: [{
          label: 'Quality',
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [
              16,
              8,
              5,
              7,
              10,
              4,
              5,
              3,
              0
          ]
      }]

  };

  window.onload = function() {
      var ctx = document.getElementById("canvas").getContext("2d");
      window.myHorizontalBar = new Chart(ctx, {
          type: 'horizontalBar',
          data: horizontalBarChartData,
          options: {
              // Elements options apply to all of the options unless overridden in a dataset
              // In this case, we are setting the border of each horizontal bar to be 2px wide
              elements: {
                  rectangle: {
                      borderWidth: 2,
                  }
              },
              responsive: true,
              legend: {
                  position: 'right',
              },
              title: {
                  display: true,
                  position: 'top',
                  text: 'SKILLS'
              }
          }
      });

  };
}

function createRightText() {
  var result;
  
  result = new Array(5);
  result[0] = new Array(3);
  result[1] = new Array(1);
  result[2] = new Array(1);
  result[3] = new Array(1);
  result[4] = new Array(1);
  result[0][0] = "Senior software engineer in Marvell       (lvm open source team at my personal time)";
  result[0][1] = "  llvm optimization for ARM";
  result[0][2] = "  The simulator programmer of Marvell's ARM SOC chips";
  result[1][0] = "Programmer in llvm (a compiler) open source team";
  result[2][0] = "Software engineer in Set Top Box TV";
  result[3][0] = "Software engineer in a few Taiwan's companies";
  result[4][0] = "";
  
  return result;
}

// factory pattern
function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

function monthToString(month) {
  var str = "1234567890";
  switch (month) {
    case 1:
      str = "January";
      break;
    case 2:
      str = "Feburary";
      break;
    case 3:
      str = "March";
      break;
    case 4:
      str = "April";
      break;
    case 5:
      str = "May";
      break;
    case 6:
      str = "June";
      break;
    case 7:
      str = "July";
      break;
    case 8:
      str = "August";
      break;
    case 9:
      str = "September";
      break;
    case 10:
      str = "October";
      break;
    case 11:
      str = "November";
      break;
    case 12:
      str = "December";
      break;
    default:
      str = "";
      break;
  }
  return str;
}

function drawExperiences() {
  var rightText;
  var dot = [];
  var period = [0, 1, 2, 3, 4, 5];
  var item = [];
  
  rightText = createRightText();

  var Dot = makeStruct("color px py radius");
  var MonthYear = makeStruct("month year");
  var Period = makeStruct("startDate endDate");
  var Experience = makeStruct("period work");
  var Item = makeStruct("dotStart dotEnd experience");

  item[0] = new Item(new Dot("lightgreen", 150, 75, 5), new Dot("lightgreen", 150, 20, 5), new Experience(new Period(new MonthYear(3, 2013), new MonthYear(11, 2016)), rightText[0]));
  item[1] = new Item(new Dot("lightgreen", 150, 100, 5), new Dot("lightgreen", 150, 75, 5), new Experience(new Period(new MonthYear(8, 2012), new MonthYear(3, 2013)), rightText[1]));
  item[2] = new Item(new Dot("lightgreen", 150, 140, 5), new Dot("lightgreen", 150, 100, 5), new Experience(new Period(new MonthYear(9, 2004), new MonthYear(8, 2012)), rightText[2]));
  item[3] = new Item(new Dot("lightgreen", 150, 160, 5), new Dot("lightgreen", 150, 140, 5), new Experience(new Period(new MonthYear(6, 1999), new MonthYear(9, 2004)), rightText[3]));

  var c=document.getElementById("canvas2");
  var ctx=c.getContext("2d");
  
  ctx.font="12px Arial";
  

  // Draw period
  ctx.textAlign="right";
  for (i = 0; i < item.length; i++) {
    ctx.fillText(monthToString(item[i].experience.period.startDate.month)+" "+item[i].experience.period.startDate.year,item[i].dotEnd.px-10,item[i].dotEnd.py+5);
  }
  
  // Draw work
  ctx.textAlign="left";
  for (i = 0; i < item.length; i++) {
    var posy = item[i].dotEnd.py+15;
    for (j = 0; j < item[i].experience.work.length; j++) {
      ctx.fillText(item[i].experience.work[j],item[i].dotEnd.px+10,posy);
      posy += 15;
    }
  }

  ctx.stroke();
  
  // Draw arrow vertical line
  ctx.beginPath();
  
  // Draw vertical arrow
  ctx.moveTo(item[0].dotEnd.px,0);
  ctx.lineTo(item[0].dotEnd.px,item[0].dotEnd.py);
  ctx.moveTo(item[0].dotEnd.px,0);
  ctx.lineTo(item[0].dotEnd.px-5,5);
  ctx.moveTo(item[0].dotEnd.px,0);
  ctx.lineTo(item[0].dotEnd.px+5,5);
  
  for (i = 0; i < item.length; i++) {
    ctx.moveTo(item[i].dotEnd.px,item[i].dotEnd.py);
    ctx.lineTo(item[i].dotStart.px,item[i].dotStart.py);
  }
  ctx.moveTo(item[i-1].dotStart.px,item[i-1].dotStart.py);
  ctx.lineTo(item[i-1].dotStart.px,item[i-1].dotStart.py+20);
  ctx.stroke();
  
  // Draw circles according item[i].dot
  for (i = 0; i < item.length; i++) {
     ctx.beginPath();
     ctx.arc(item[i].dotEnd.px,item[i].dotEnd.py,item[i].dotEnd.radius,0,2*Math.PI);
     ctx.fillStyle = item[i].dotEnd.color;
     ctx.fill();
     ctx.stroke();
     ctx.beginPath();
     ctx.arc(item[i].dotStart.px,item[i].dotStart.py,item[i].dotStart.radius,0,2*Math.PI);
     ctx.fillStyle = item[i].dotStart.color;
     ctx.fill();
     ctx.stroke();
  }
}