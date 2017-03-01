
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

function drawExperiences() {
  var dot = [];
  var experiences = [];
  
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
  
  var Dot = makeStruct("color px py radius");
  var Item = makeStruct("dot leftText rightText");
  experiences[0] = new Item(new Dot("lightgreen", 150, 20, 5), "November 2016", ["Senior software engineer in Marvell       (lvm open source team at my personal time)", "  llvm optimization for ARM", "  The simulator programmer of Marvell's ARM SOC chips"]);
  experiences[1] = new Item(new Dot("lightgreen", 150, 75, 5), "March 2013", ["Programmer in llvm (a compiler) open source team"]);
  experiences[2] = new Item(new Dot("lightgreen", 150, 100, 5), "August 2012", ["Software engineer in Set Top Box TV"]);
  experiences[3] = new Item(new Dot("lightgreen", 150, 140, 5), "September 2004", ["Software engineer in a few Taiwan's companies"]);
  experiences[4] = new Item(new Dot("lightgreen", 150, 160, 5), "June 1999", [""]);

  var c=document.getElementById("canvas2");
  var ctx=c.getContext("2d");
  
  ctx.font="12px Arial";
  
  // Draw leftText
  ctx.textAlign="right";
  for (i = 0; i < experiences.length; i++) {
    ctx.fillText(experiences[i].leftText,experiences[i].dot.px-10,experiences[i].dot.py+5);
  }
  
  // Draw rightText
  ctx.textAlign="left";
  for (i = 0; i < experiences.length; i++) {
    var posy = experiences[i].dot.py+15;
    for (j = 0; j < experiences[i].rightText.length; j++) {
      ctx.fillText(experiences[i].rightText[j],experiences[i].dot.px+10,posy);
      posy += 15;
    }
  }

  ctx.stroke();
  
  // Draw arrow vertical line
  ctx.beginPath();
  ctx.moveTo(experiences[0].dot.px,0);
  ctx.lineTo(experiences[0].dot.px,experiences[0].dot.py);
  ctx.moveTo(experiences[0].dot.px,0);
  ctx.lineTo(experiences[0].dot.px-5,5);
  ctx.moveTo(experiences[0].dot.px,0);
  ctx.lineTo(experiences[0].dot.px+5,5);
  for (i = 0; i < experiences.length - 1; i++) {
    ctx.moveTo(experiences[i].dot.px,experiences[i].dot.py);
    ctx.lineTo(experiences[i+1].dot.px,experiences[i+1].dot.py);
  }
  ctx.moveTo(experiences[i].dot.px,experiences[i].dot.py);
  ctx.lineTo(experiences[i].dot.px,experiences[i].dot.py+20);
  ctx.stroke();
  
  // Draw circles according experiences[i].dot
  for (i = 0; i < experiences.length; i++) {
     ctx.beginPath();
     ctx.arc(experiences[i].dot.px,experiences[i].dot.py,experiences[i].dot.radius,0,2*Math.PI);
     ctx.fillStyle = experiences[i].dot.color;
     ctx.fill();
     ctx.stroke();
  }
}