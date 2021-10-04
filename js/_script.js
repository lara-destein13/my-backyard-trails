
function vcalc(age)
{
var sp = document.mhr.sport.options[document.mhr.sport.selectedIndex].value;
var age = document.mhr.age.value;
var sexp = document.mhr.exper.options[document.mhr.exper.selectedIndex].value;

age=age*1;
beats = 217 - (0.85 * age);

if (sp=='3')beats=beats-3;
if (sp=='4')beats=beats-5;
if(sexp=='1')
 {
  if(age>=55)beats=beats+4;

  if ((age>49) && (age<55)) {beats=beats+2};

  if (age<=30)beats=beats-3;
 }

 document.mhr.bpm.value = nt2dp(beats,0);
 document.mhr.bpm2.value = nt2dp(206.3 - (0.711*age),0);
 document.mhr.bpm3.value = nt2dp(217 - (0.85*age),0);
 document.mhr.bpm4.value = nt2dp(206.9 - (0.67*age),0);
 document.mhr.bpm5.value = nt2dp(202 - (0.55*age),0);
 document.mhr.bpm6.value = nt2dp(216 - (1.09*age),0);
 document.mhr.bpm7.value = nt2dp(206 - (0.88*age),0);
}

function vclear()
{
  document.mhr.bpm.value = "";
  document.mhr.bpm2.value = "";
  document.mhr.bpm3.value = "";
  document.mhr.bpm4.value = "";
  document.mhr.bpm5.value = "";
  document.mhr.bpm6.value = "";
  document.mhr.bpm7.value = "";
}

function rcalcv()
// calculate vo2 max
{
  var age = document.hrmax.rage.value;
  var bm = document.hrmax.rkg.value;
  var rhr = document.hrmax.rhrr.value;
  rlm= 3.542 + (-0.014 * age) + (0.015 * bm) + (-0.011 * rhr);
  rmlkg = rlm*1000/bm;
  document.hrmax.rlm.value=nt2dp(rlm,2);
  document.hrmax.rvo2.value=nt2dp(rmlkg,1);
}

function rvclear()
{
	document.hrmax.rvo2.value="";
	document.hrmax.rlm.value="";
}

function calcv()
// calculate vo2 max
{
  var h1 = document.hrmax.hrm.value;
  var h2 = document.hrmax.hrr.value;
  ans= 15 * (h1/h2);
  document.hrmax.vo2.value=nt2dp(ans,0);
}

function vclear()
{
	document.hrmax.vo2.value="";
}

function calculate()
{
  var conv = document.stride.conv.value;
  var con = document.stride.con.options[document.stride.con.selectedIndex].value;

  if (con=='MHR')
    {
      r1=(conv-37)/0.64;
      document.stride.ans2.value=nt2dp(r1,2);
      document.stride.ans3.value="VO2 max";
    }
  else
    {
      r1=(conv*0.64)+37;
      document.stride.ans3.value="MHR";
      document.stride.ans2.value=nt2dp(r1,0);
    }
}

function valclear()
{
  document.stride.ans2.value = "";
  document.stride.ans3.value = "";
}

function calcpw()
{
  var h1 = document.pw.vo2m.value;
  ans= (h1 - 0.435) / 0.01141;
  document.pw.power.value=nt2dp(ans,0);
}

function vclearp()
{
	document.pw.power.value="";
}

function nt2dp(num,dp)
{
// rounds num to dp decimal places 
  num=num*1+(0.55/Math.pow(10,dp));
  if (dp>0) dp=dp+1;
  b=Math.floor(num).toString().length+dp;
  return num.toString().substr(0,b);
}