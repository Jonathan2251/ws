
function drawSkillBarChart() {
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var color = Chart.helpers.color;
  var horizontalBarChartData = {
      labels: ["Embedded system (c/c++, linux, bare metal, mips, assembly)", "Linux programming (gcc, device driver, bash, usb)", 
      "CPU design (simulator, python, Verilog, mips, arm)", "Compiler design (yacc/lex, llvm/lld, cmake/make)", 
      "Software engineering (OOP/OOA, design pattern)", "UI design (VC, Borland C++, VB, html/css/java script)", 
      "Documentation writing(Sphinx, uml, html/css/java script)", "Equipment usage (scope, spectrum, power meter, ...)"],
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

function drawCmakeSharedObjectBarChart() {
  var color = Chart.helpers.color;
  var horizontalBarChartData = {
      labels: ["No using Shared Object", "Using Shared Object"],
      datasets: [{
          label: 'Minutes',
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
          borderWidth: 1,
          data: [
              13.9,
              4.5,
              0
          ]
      }]

  };

  function draw() {
      var ctx = document.getElementById("canvas3").getContext("2d");
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
                  text: 'cmake Shared Object time save'
              }
          }
      });

  };
  draw();
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
  var str = "";
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

function createWorkPeriod() {
  var period = [];
  
  var MonthYear = makeStruct("month year");
  var Period = makeStruct("startDate endDate");
  // !! input your work period
  period[0] = new Period(new MonthYear(11, 2016), "current");
  period[1] = new Period(new MonthYear(3, 2013), new MonthYear(11, 2016));
  period[2] = new Period(new MonthYear(8, 2012), new MonthYear(3, 2013));
  period[3] = new Period(new MonthYear(9, 2004), new MonthYear(8, 2012));
  period[4] = new Period(new MonthYear(6, 1999), new MonthYear(9, 2004));
  
  return period;
}

function createWorkContent() {
  var str;
  
  // !! input your work content
  str = new Array(5);
  str[0] = new Array(1);
  str[1] = new Array(3);
  str[2] = new Array(1);
  str[3] = new Array(1);
  str[4] = new Array(1);
  str[0][0] = "Web and document software study and design (html/css/javascript, Graphivz, ...)";
  str[1][0] = "Senior software engineer in Marvell       (lvm open source team at my personal time)";
  str[1][1] = "  llvm optimization for ARM";
  str[1][2] = "  The simulator programmer of Marvell's ARM SOC chips";
  str[2][0] = "Programmer in llvm (a compiler) open source team";
  str[3][0] = "Senior software engineer in Motorola";
  str[4][0] = "Software engineer in a few Taiwan's companies";
  
  return str;
}

function Experience(workPeriod, workContent) {
  if (workPeriod.length != workContent.length)
    alert("workPeriod.length != workContent.length");
  this.period = workPeriod;
  this.work = workContent;
  
  this.draw = function (config) {
    var canvasId = config.canvasId;
    var fontSize = config.fontSize; // !! input fontSize then the font's size and canvas2.height will set according it
    var gap =  config.gap; // !! input the gap (between dot and work content)
    var radius = config.radius; // !! input dot (small circle) size
    var dotX = config.dotX; // !! input the position of x-axis for dot.
    
    var dot = [];
    var item = [];
    
    var c=document.getElementById(canvasId);
    
    var Dot = makeStruct("color px py radius");
    var Item = makeStruct("dotStart dotEnd");
  
    var height = (fontSize+fontSize/4);
    var y1 = 15;
    
    for (i = 0; i < period.length; i++) {
      y2 = y1 + radius + 0 + work[i].length*height+2*gap;
      item[i] = new Item(new Dot("lightgreen", dotX, y2, radius), new Dot("lightgreen", dotX, y1, radius));
      y1 = y2;
    }
    y2 = y1 + radius + 0 + work[i-1].length*height;
    c.height = y2; // set canvas2.height changed according the font size
    var ctx=c.getContext("2d");
    ctx.font=String(fontSize)+"px Arial"; // must set font after set c.height, otherwise will make the fontSize smaller than 12 and worse
  
    // Draw period
    ctx.textAlign="right";
    for (i = 0; i < item.length; i++) {
      if (i == 0) {
        if (period[i].endDate == "current") {
          ctx.fillText("current",item[i].dotEnd.px-2*radius,item[i].dotEnd.py+4);
        }
      }
      else if ((period[i].endDate.month != period[i-1].startDate.month) || (period[i].endDate.year != period[i-1].startDate.year)) {
        ctx.fillText(monthToString(period[i].endDate.month)+" "+period[i].endDate.year,item[i].dotEnd.px-2*radius,item[i].dotEnd.py+4);
      }
      ctx.fillText(monthToString(period[i].startDate.month)+" "+period[i].startDate.year,item[i].dotStart.px-2*radius,item[i].dotStart.py+4);
    }
    
    // Draw work
    ctx.textAlign="left";
    for (i = 0; i < item.length; i++) {
      var posy = item[i].dotEnd.py+height+gap;
      for (j = 0; j < work[i].length; j++) {
        ctx.fillText(work[i][j],item[i].dotEnd.px+2*radius,posy);
        posy += height;
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
    ctx.lineTo(item[i-1].dotStart.px,item[i-1].dotStart.py+10);
    ctx.stroke();
    
    // Draw circles according item[i].dot
    for (i = 0; i < item.length; i++) {
      if (i == 0 || (item[i].dotEnd.py != item[i-1].dotStart.py)) {
        ctx.beginPath();
        ctx.arc(item[i].dotEnd.px,item[i].dotEnd.py,item[i].dotEnd.radius,0,2*Math.PI);
        ctx.fillStyle = item[i].dotEnd.color;
        ctx.fill();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(item[i].dotStart.px,item[i].dotStart.py,item[i].dotStart.radius,0,2*Math.PI);
      ctx.fillStyle = item[i].dotStart.color;
      ctx.fill();
      ctx.stroke();
    }
  };
  return this;
}