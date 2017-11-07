function main(key){
    this.keyString = key;
    var arrayKey=[];
    var string=''; 
    var self = this;
    var array= [];


    function write(leter) {
        $.ajax({
            url:"http://idea/write.php", 
            type: "POST",
            dataType:"HTML",
            data:({
                leter:leter
            }),
        });
    }

    function read(handleData) {
        $.ajax({
            url:"http://idea/open.php", 
            type: "GET",
            dataType:"HTML",
            success:function(data){
                handleData(data); 
            }
        });  
    }

    this.keyFunc =function() {

        let array = [], key = parseInt(self.keyString,16),flag=0;

        for(let i=0;i<32;i++) {
            if(i%4==0) {
                let buf= ''+self.keyString[i]+self.keyString[i+1]+self.keyString[i+2]+self.keyString[i+3];
                array.push(parseInt(buf,16).toString(2));
                let size = 16-array[flag].length; 
                for(let j = 0; j<size;j++) {
                    array[flag] = '0'+array[flag]; 
                }
                flag++;
            }
        }
        flag=0;
        for(let i = 0;i<52;i++) {
            if(flag==7)
                flag=0;
            arrayKey[i] = array[flag].slice(25*i);
            arrayKey[i] += array[flag].slice(0, 25*i);
            flag++;
        }

    }

    this.getArrayKey = function() {
        return arrayKey;
    }
    this.stringArray = function(string) {
        let flag=0,offset=0;
        let size = string.length,stringBuf = string;

        while(1) {


            if(offset+7<size) {

                for(let i = flag; i<flag+4 ;i++) {
                    let bufStr ='';
                    bufStr+=string[i*2]+string[i*2+1];
                    array.push(bufStr);
                }
                flag+=4;
                offset+=8;
            }
            else {
                for(let i = 0; i<8-(size-offset) ;i++) {
                    stringBuf+=0;

                }

                for(let i = flag; i<flag+4 ;i++) {
                    let bufStr ='';
                    bufStr+=stringBuf[i*2]+stringBuf[i*2+1];
                    array.push(bufStr);
                }


                break;
            }

        }
    }
 
    this.encryption = function() {
        let offset = 0,offsetArr=0;
        for(let i = 0;i<8;i++) {
            let step1=0,step2=0,step3=0,step4=0,step5=0,step6=0,step7=0,step8=0,step9=0,step10=0,step11=0,step12=0,step13=0,step14=0;
            step1 = (key[i+offset]*array[i+offsetArr])%65537;
            step2 = (key[i+1+offset]+array[i+1+offsetArr])%65536;
            step3 = (key[i+2+offset]+array[i+2+offsetArr])%65536;
            step4 = (key[i+3+offset]*array[i+3+offsetArr])%65537;
            step5 =  step1^ step3;
            step6 =  step2^ step4;
            //        (a * b) % 65537
            //        (a + b) % 65536
            //        a^b
            step7= (step5*key[i+4+offset])%65537;
            step8=  (step6 + step7) % 65536;






            offset+=6;
            offsetArr+=4;
        }
    }

}

$('#q').on('click',function(){
    var key = $('#key').val();
    var mainА = new main(key);

});




//function parseStrToBuffer (string) {
//    var result = [],
//        index = 0,
//        length = string.length,
//        code;
//
//    for (; index < length; index++) {
//        code = string.charCodeAt(index);
//        if (code <= 0x7f) {
//            result.push(code);
//        } else if (code <= 0x7ff) {
//            result.push(code >>> 6 | 0xc0,
//                        code & 0x3f | 0x80);
//        } else if (code <= 0xffff) {
//            result.push(code >>> 12 | 0xe0,
//                        code >>> 6 & 0x3f | 0x80,
//                        code & 0x3f | 0x80);
//        } else if (code <= 0x1fffff) {
//            result.push(code >>> 18 | 0xf0,
//                        code >>> 12 & 0x3f | 0x80,
//                        code >>> 6 & 0x3f | 0x80,
//                        code & 0x3f | 0x80);
//        } else if (code <= 0x3ffffff) {
//            result.push(code >>> 24 | 0xf8,
//                        code >>> 18 & 0x3f | 0x80,
//                        code >>> 12 & 0x3f | 0x80,
//                        code >>> 6 & 0x3f | 0x80,
//                        code & 0x3f | 0x80);
//        } else if (code <= 0x7fffffff) {
//            result.push(code >>> 30 | 0xfc,
//                        code >>> 24 & 0x3f | 0x80,
//                        code >>> 18 & 0x3f | 0x80,
//                        code >>> 12 & 0x3f | 0x80,
//                        code >>> 6 & 0x3f | 0x80,
//                        code & 0x3f | 0x80);
//        }
//    }
//
//    return result;
//}

// Test string: ﻰﺠ﷼ﺒ╤Ή
// Result: [ 239, 187, 176, 239, 186, 160, 239, 183, 188, 239, 186, 146, 226, 149, 164, 206, 137 ]
//alert(JSON.stringify(parseStrToBuffer(prompt('Enter string'))));

////123456789012345678901234567890ab








