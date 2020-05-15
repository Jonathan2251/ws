function setHint() {
  var spec = document.getElementById("hint_spec");
  spec.title = "D7.3.19 MDRAR_EL1, Monitor Debug ROM Address Register\n\
  ...\n\
  Traps and Enables\n\
  For a description ...\n\
  If MDCR_EL2.TDRA==1, Non-secure accesses to this register will trap from DL1 and EL0 to EL2.\n\
  If MDCR_EL3.TDA==1, accesses to this register will trap from EL2, EL1 and EL0 to EL3.";
  
  var script = document.getElementById("hint_script");
  var h = document.getElementById("hint_h");
  var cpp = document.getElementById("hint_cpp");
  
// string variable include double quot, "&quot;, refer the following"
// http://htmlhelp.com/reference/html40/entities/special.html
  script.title = "/* MDRAR register */\n\
define_reg(MDRAR, EL1, 3)\n\
define_trap(&quot;MDCR_EL2.TCPAC == 1 && NS && (level <= EL1)&quot;, EL2)\n\
define_trap(&quot;MDCR_EL3.TDA == 1 && !NS && (level <= EL2)&quot;, EL3)\n\
define_end";

  h.title = "extern TypException CheckPermission_define_regMDRAR(TypSysRegRW RW, TypExceptionLevel level, TypContext& context);";

  cpp.title = "TypException CheckPermission_define_regMDRAR(TypSysRegRW /*RW*/, TypExceptionLevel level, TypContext& context)\n\
{\n\
  if (QueryRegField(MDCR, EL2, nsFIELD::TCPAC) == 1 && !IsSecureAccess() && (level <= EL1))\n\
  {\n\
    return Trap(EL2, context, 3);\n\
  }\n\
  if (QueryRegField(MDCR, EL3, nsFIELD::TDAA) == 1 && IsSecureAccess() && (level <= EL2))\n\
  {\n\
    return Trap(EL3, context, 3);\n\
  }\n\
\n\
  return NO_TRAP;\n\
}";
  
  // Skip using the following jquery since 1. ../dir/permission.def not work  2. error in debug console for xml parsing even the results is right
/*
  var data;
  $.get('permission.def', function(data) {
    script.title = data; 
  }, 'text');

  $.get('permission_codegen.h', function(data) {
    h.title = data; 
  }, 'text');

  $.get("permission_codegen.cpp", function(data) {
    cpp.title = data; 
  }, 'text');*/
}

function drawSkillBarChart() {
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var color = Chart.helpers.color;
  var horizontalBarChartData = {
      labels: [
      /*"Embedded system (c/c++, linux, bare metal, mips, assembly)",*/ "Linux programming (gcc, device driver, usb)", 
      "CPU & GPU design (simulator, Verilog, mips, arm)", "Compiler design (llvm/lld/polly, glsl, yacc/lex, cmake)", 
      "Software engineering (OOP/OOA, design pattern)", "UI design (VC, Borland C++, html/css/java script)", 
      "Documentation writing(Sphinx, uml, ...)", "Equipment usage (scope, spectrum, power meter, ...)"],
      datasets: [{
          label: 'Quality',
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [
             /* 16,*/
              8,
              6,
              18,
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
  draw();

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

function createDefaultConfig() {
  var Config = makeStruct("canvasId fontSize gap radius dotX");
  var config = new Config("canvas2", 12, 2, 5, 150);
  
  return config;
}

function createWorkPeriod() {
  var period = [];
  
  var MonthYear = makeStruct("month year");
  var Period = makeStruct("startDate endDate");
  // !! input your work period
  period[0] = new Period(new MonthYear(7, 2019), "current");
  period[1] = new Period(new MonthYear(4, 2017), new MonthYear(7, 2019));
  period[2] = new Period(new MonthYear(11, 2016), new MonthYear(4, 2017));
  period[3] = new Period(new MonthYear(3, 2013), new MonthYear(11, 2016));
  period[4] = new Period(new MonthYear(8, 2012), new MonthYear(3, 2013));
  period[5] = new Period(new MonthYear(9, 2004), new MonthYear(8, 2012));
  period[6] = new Period(new MonthYear(6, 1999), new MonthYear(9, 2004));
  
  return period;
}

function createWorkContent() {
  var str;
  
  // !! input your work content
  str = new Array(7);
  str[0] = new Array(1);
  str[1] = new Array(1);
  str[2] = new Array(1);
  str[3] = new Array(1);
  str[4] = new Array(1);
  str[5] = new Array(1);
  str[6] = new Array(1);
  str[0][0] = "Seniror compiler developer in Kneron";
  str[0][1] = "  NPU compiler";
  str[1][0] = "Principle engineer in Hisilcon";
  str[1][1] = "  glsl/spirv frontend + LLVM backend compiler development for a whole new GPU to support OpenGL/OpenCL";
  str[2][0] = "LLVM compiler";
  str[3][0] = "Senior software engineer in Marvell       (llvm open source team at my personal time)";
  str[3][1] = "  llvm optimization and simulator for ARM";
  str[4][0] = "Programmer in llvm open source team";
  str[5][0] = "Senior software engineer in Motorola";
  str[6][0] = "Software engineer in a few Taiwan's companies";
  
  return str;
}

function Experience(workPeriod, workContent) {
  if (workPeriod.length != workContent.length)
    alert("workPeriod.length != workContent.length");
  this.period = [];
  for (i = 0; i < workPeriod.length; i++) {
    this.period[i] = workPeriod[i];
  }
  this.work = new Array(workContent.length);
  for (i = 0; i < workContent.length; i++) {
    this.work[i] = new Array(workContent[i].length);
  }
  for (i = 0; i < workContent.length; i++) {
    for (j = 0; j < workContent[i].length; j++) {
      this.work[i][j] = workContent[i][j];
    }
  }
}

Experience.prototype.draw = function (config) {
  var canvasId = config.canvasId;
  var fontSize = config.fontSize; // !! input fontSize then the font's size and canvas2.height will set according it
  var gap =  config.gap; // !! input the gap (between dot and work content)
  var radius = config.radius; // !! input dot (small circle) size
  var dotX = config.dotX; // !! input the position of x-axis for dot.
  
  var dot = [];
  var height = (fontSize+fontSize/4);
  var c=document.getElementById(canvasId);
  dot = createDots(dotX, radius, gap, height, this.period, this.work);
  
  c.height = dot[dot.length-1].py + radius + 0 + this.work[this.work.length-1].length*height;; // set canvas2.height changed according the font size
  var ctx=c.getContext("2d");
  ctx.font=String(fontSize)+"px Arial"; // must set font after set c.height, otherwise will make the fontSize smaller than 12 and worse
  
  var me = this;

  draw(config);

  function createDots(dotX, radius, gap, height, period, work) {
    var dot = [];
    var Dot = makeStruct("color px py radius");
    var y1 = 15;
    
    for (i = 0; i < period.length; i++) {
      dot[i] = new Dot("lightgreen", dotX, y1, radius);
      y1 = y1 + config.radius + 0 + work[i].length*height+2*gap;
    }
    dot[i] = new Dot("lightgreen", dotX, y1, radius);
    
    return dot;
  }
  
  function drawVerticalLine(ctx, dot) {
    // Draw arrow vertical line
    ctx.fillStyle = "grey";
    ctx.beginPath();
    
    // Draw vertical arrow
    ctx.moveTo(dot[0].px,0);
    ctx.lineTo(dot[0].px,dot[dot.length-1].py+10);
    
    ctx.moveTo(dot[0].px,0);
    ctx.lineTo(dot[0].px-5,5);
    ctx.moveTo(dot[0].px,0);
    ctx.lineTo(dot[0].px+5,5);
    
    ctx.stroke();
  }
  
  function drawDots(ctx, dot) {
    // Draw circles according dot[i]
    for (i = 0; i < dot.length; i++) {
      ctx.beginPath();
      ctx.arc(dot[i].px,dot[i].py,dot[i].radius,0,2*Math.PI);
      ctx.fillStyle = dot[i].color;
      ctx.fill();
      ctx.stroke();
    }
  }
  
  function outputWorkPeriod(ctx, dot, period, radius) {
    ctx.fillStyle = "grey";
    ctx.textAlign="right";
    for (i = 0; i < period.length; i++) {
      if (i == 0 && period[i].endDate == "current") {
        ctx.fillText("current",dot[i].px-2*radius,dot[i].py+4);
      }
      else {
        ctx.fillText(monthToString(period[i].endDate.month)+" "+period[i].endDate.year,dot[i].px-2*radius,dot[i].py+4);
      }
    }
    ctx.fillText(monthToString(period[i-1].startDate.month)+" "+period[i-1].startDate.year,dot[i].px-2*radius,dot[i].py+4);
  }
  
  function outputWorkContent(ctx, dot, work, height, gap, radius) {
    ctx.fillStyle = "grey";
    ctx.textAlign="left";
    for (i = 0; i < work.length; i++) {
      var posy = dot[i].py+height+gap;
      for (j = 0; j < work[i].length; j++) {
        ctx.fillText(work[i][j],dot[i].px+2*radius,posy);
        posy += height;
      }
    }
  }
  
  function draw() {
    drawVerticalLine(ctx, dot);
    drawDots(ctx, dot);
    outputWorkPeriod(ctx, dot, me.period, radius);
    outputWorkContent(ctx, dot, me.work, height, gap, radius);
  }
};
