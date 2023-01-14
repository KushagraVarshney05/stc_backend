var regex = /[+-]?\d+(\.\d+)?/g;

var str = '<tag value="20.434" value1="-12.334" />';
var floats = str.match(regex).map(function(v) { return parseFloat(v); });
const x = 12.1;
console.log(floats);
console.log(floats.map((m)=>{
  if(m>=x)
    {
     console.log(m);
     return true; 
    }
  else
   return false;  
}))