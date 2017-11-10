function main(key){
    this.keyString = key;
    var arrayKey=[];
    var string=''; 
    var self = this;
    var array= [];
    var res= [];


    this.write = function(leter,url) {
        var buf ='';
        for(let a=0;a<leter.length;a++)
            buf+=leter[a];
       
        $.ajax({
            url:"http://idea/write.php", 
            type: "POST",
            data:({
                leterPOST:buf,
                url:url
            })

        });
    }

    this.read =function() {
        $.ajax({
            url:"http://idea/open.php", 
            type: "GET",
            dataType:"HTML",
            success:function(data){
               stringArray(data);
            }
        }); 

    }

    this.keyFunc =function() {
        arrayKey=[];
        let array = [],arraySlice =[], key ='',flag=0;

        for(let i=0;i<32;i++) {
            if(i%4==0) {
                let buf= ''+self.keyString[i]+self.keyString[i+1]+self.keyString[i+2]+self.keyString[i+3];
                buf=parseInt(buf,16).toString(2);
                let size = 16-buf.length; 
                for(let j = 0; j<size;j++) {
                    buf = '0'+buf; 
                }
                key+=buf;
                flag++;
            }
        }


        for(let a=0;a<7;a++) {

            for(let i = 0;i<8;i++)
            {
                let buf ='';
                for(let q=0;q<16;q++)
                {
                    buf+=key[i*16+q];
                }
                array.push(parseInt(buf,2));

            }
            key = key.slice(25) + key.slice(0, 25);

        }
        for(let a=0;a<52;a++)
            arrayKey[a]=array[a];

    }

    this.getArrayKey = function(string) {

        return array;



    }
    function stringArray(string) {
        let flag=0,offset=0;
        let size = string.length,stringBuf = string;
        for(;size%8!=0;size++){
            string+=0;
        }


        for(let i=0;i<size;i+=2){

            let buf = string[i+1].charCodeAt(0).toString(2);
            for(;buf.length<8;){
                buf='0'+buf;
            }

            let buf2=string[i].charCodeAt(0).toString(2);
            for(;buf2.length<8;){
                buf2='0'+buf2;
            }
            buf+=buf2;
            array.push(parseInt(buf,2));

        }
        console.log(array);
    }
    function add(val,val1){
        return (val+val1)%65536;

    }
    function mul(val,val1){
        if(val==0)
            val=65536;
        if(val1==0)
            val1=65536;
        let res = (val*val1)%65537;
        if(res>=65536)
            res=0;
        return res;

    }
    function mult(num) {
        if (num == 0) { 
            return 0; 
        } 
        let res = 1; 
        while ((res * num) % 65537 != 1) {

            res++; } 
        return res;
    }
    function adit(num){
        return 65536- num;
    }
    this.decryption =function(){
        this.keyFunc();
        let arrKay =[52];
        arrKay[0]=(mult(arrayKey[48]));
        arrKay[1] =(adit(arrayKey[49]));
        arrKay[2] =(adit(arrayKey[50])); 
        arrKay[3]=(mult(arrayKey[51]));
        var a=4;
        for(let i=46;i>=0;a+=6){
            arrKay[a]=arrayKey[i];
            arrKay[a+1]=arrayKey[i+1];
            i-=4;
            arrKay[a+2]=(mult(arrayKey[i]));
            arrKay[a+4] =(adit(arrayKey[i+1]));
            arrKay[a+3] =(adit(arrayKey[i+2])); 
            arrKay[a+5]=(mult(arrayKey[i+3]));
            i-=2;

        }
        var buf =  arrKay[a+4];
        arrKay[a+4] = arrKay[a+3];
        arrKay[a+3] = buf;

        for(let i=0;i<52;i++)
            arrayKey[i]=arrKay[i];

    }
    this.encryption = function(b1,b2,b3,b4) {
        let offsetArr=0,buf=[4];

        buf[0] =b1;
        buf[1] =b2;
        buf[2] =b3;
        buf[3] =b4;

        for(let i = 0;i<8;i++) {
            let step1=0,step2=0,step3=0,step4=0,step5=0,step6=0,step7=0,step8=0,step9=0,step10=0;

            step1 = mul(arrayKey[i*6],buf[0]);
            step2 = add(arrayKey[i*6+1],buf[1]);
            step3 = add(arrayKey[i*6+2],buf[2]);
            step4 = mul(arrayKey[i*6+3],buf[3]);
            step5 = step1^ step3;
            step6 = step2^ step4;
            step7 = mul(step5,arrayKey[i*6+4]);
            step8 = add(step6 , step7);
            step9 = mul(step8,arrayKey[i*6+5]);
            step10 = add(step7 , step9);
            buf[0] = step1^step9;
            buf[2] = step2^step10;
            buf[1] = step3^step9;
            buf[3] =  step4^step10;



        }

        var bufr = buf[1];
        buf[1]=buf[2];
        buf[2]=bufr;

        buf[0] = mul(arrayKey[48],buf[0]);
        buf[1] = add(arrayKey[49],buf[1]);
        buf[2] = add(arrayKey[50],buf[2]);
        buf[3] = mul(arrayKey[51],buf[3]);


        return buf;


    }

}

$('#q').on('click',function(){
    //    var key = $('#key').val();
    var mainА = new main('12341234123412341234123412341234');
    var arr1 = [],arr2 =[];
    mainА.keyFunc();

  

    var arr = mainА.getArrayKey(),decryptio = [];
    mainА.read();
    setTimeout(function(){
       for(let i =0;i<arr.length/4;i+=4){
            var buf =[];  
            buf=mainА.encryption(arr[i],arr[i+1],arr[i+2],arr[i+3]);
            for(let i=0;i<4;i++)
                arr1.push(buf[i]);
        }
    
        mainА.write(arr1,'wrire.txt');
        mainА.decryption();
        for(let i =0;i<arr1.length/4;i+=4){
            var buf =[];
    
            buf=mainА.encryption(decryptio[i],decryptio[i+1],decryptio[i+2],arr1[i+3]);
            for(let i=0;i<4;i++)
                arr2.push(buf[i]);
        }
         mainА.write(arr2,'wrire1.txt'); 
    },100);
        
});










