
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
  var xLine = 150;
  var px = [20, 75, 100, 140, 160];
  var c=document.getElementById("canvas2");
  var ctx=c.getContext("2d");
  
  ctx.font="12px Arial";
  
  // Show the different textAlign values
  ctx.textAlign="right";
  ctx.fillText("November 2016",xLine-10,px[0]+5);
  ctx.fillText("March 2013",xLine-10,px[1]+5);
  ctx.fillText("August 2012",xLine-10,px[2]+5);
  ctx.fillText("September 2004",xLine-10,px[3]+5);
  ctx.fillText("September 2004",xLine-10,px[4]+5);
  
  ctx.textAlign="left";
  ctx.fillText("Senior software engineer in Marvell",xLine+10,px[0]+15);
  ctx.fillText("llvm optimization for ARM",xLine+20,px[0]+2*15);
  ctx.fillText("The simulator programmer of Marvell's ARM SOC chips",xLine+20,px[0]+3*15);
  
  ctx.fillText("Programmer in llvm (a compiler) open source team",xLine+10,px[1]+15);
  
  ctx.fillText("Senior software engineer in Mortorola",xLine+10,px[2]+15);
  ctx.fillText("Software engineer in Set Top Box TV",xLine+20,px[2]+2*15);
  
  ctx.fillText("Software engineer in a few Taiwan companies",xLine+10,px[3]+15);
  
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(xLine,0);
  ctx.lineTo(xLine,canvas2.height-1);
  ctx.moveTo(xLine,0);
  ctx.lineTo(xLine-5,5);
  ctx.moveTo(xLine,0);
  ctx.lineTo(xLine+5,5);
  ctx.stroke();
  
  for (i = 0; i < px.length; i++) {
     ctx.beginPath();
     ctx.arc(xLine,px[i],5,0,2*Math.PI);
     ctx.fillStyle = "green";
     ctx.fill();
     ctx.stroke();
  }
}