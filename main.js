function main(key){
    this.keyString = key;
    var arrayKey=[];
    var string=''; 
    var self = this;
    
   
    
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
 
 this.encryption = function() {
     
    read(function(output){
        console.log(output);
    });
    while(1) {
        
        
    }
}
 
}

$('#q').on('click',function(){
    var key = $('#key').val();
    var mainА = new main(key);
    
});




////123456789012345678901234567890ab








