var C = {
    ISGAMEOVER : false,
    SCORE : 0,
    SW : 640,
    SH : 960,
    SW_2 : 320,
    SH_2 : 480
}
module.exports = C;

Array.prototype.remove=function(obj){ 
for(var i =0;i <this.length;i++){ 
var temp = this[i]; 
if(!isNaN(obj)){ 
temp=i; 
} 
if(temp == obj){ 
for(var j = i;j <this.length;j++){ 
this[j]=this[j+1]; 
} 
this.length = this.length-1; 
} 
} 
} 