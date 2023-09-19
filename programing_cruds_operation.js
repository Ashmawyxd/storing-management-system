//the main function in this system
//one function to get total
//tow function to add new product
//save the data in local storiage
//function cleare for input
//function read
//function count
//function delete
//function update
//function search
//function clean data
 
//============================== start document ==========================================//
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let kind="create";
let copy;
//console.log(title,price,taxes,ads,discount,total,count,category,submit)
    
    
//===============================function get total=============================================
function gettotal(){
    if(price.value !=''){
        let result=(+price.value+ +taxes.value+ +ads.value)-(+discount.value);
        total.innerHTML=result;
        total.style.backgroundColor="black";
    }
    else{
         total.innerHTML="null";
         total.style.backgroundColor="#6d0909";
        
    }
        
}
$("#price").keyup(function(){
    gettotal();
});
$("#taxes").keyup(function(){
    gettotal();
});  
$("#ads").keyup(function(){
    gettotal();
});  
$("#discount").keyup(function(){
    gettotal();
});
//=================================  create  =============================================

let datapro;
if(localStorage.product !=null){
datapro=JSON.parse(localStorage.product);
}
else{
datapro=[];  
}

$("#submit").click(function(){
let newpro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
if(title.value !="" && count.value<=50){//condition to clean your data
//===part update===
if(kind==="create"){
if(newpro.count>1){
for(let i=0;i<newpro.count;i++){//this for to make product by counter
        datapro.push(newpro);
    }
}
else{
     datapro.push(newpro);//on this case we will push one product
}
}
else{
       datapro[copy]=newpro;
       cleardata();
       kind="create";
       submit.innerHTML="Create Product";
       count.style.display="block";
    }
    //== end update ==
     cleardata();
}
else{
    alert("dont exist data or out of range !!");
}
localStorage.setItem("product",JSON.stringify(datapro));  
//console.log(datapro)

showedata();

});
//======================================= clear ===================================================
function cleardata(){
    title.value=null;
    price.value=null;
    taxes.value=null;
    ads.value=null;
    discount.value=null;
    total.innerHTML=null;
    count.value=null;
    category.value=null;
}


    
//============================================ read ===============================================
function showedata(){
gettotal();
let table="";//var wich will contain all data eche record from the arry
for(let i=0;i<datapro.length;i++){
//``this to wright html code in js
table+=`
<tr>
<td>${i+1}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick=" update(${i})" id="update" >update</button></td>
<td><button onclick=" deletedata(${i})" id="delete" >delete</button></td>
</tr>
`
}
window.tbody.innerHTML=table;
if(datapro.length>0){
window.deleteall.innerHTML=`<button onclick="deletall()">delete all (${datapro.length})</button>` 
window.txtsearch.style.display="block";
}
    else{
        window.deleteall.innerHTML=""; 
    }
}
showedata()
//====================================== delete =========================================
function deletedata(i ,title){
    //console.log(i)
 if(confirm("do you want to delete this product          "+datapro[i].title+"          index "+i)){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showedata()
 }
}  
//==================================== delete all ========================================
   function deletall(){
       if(confirm(("do you want to remove all date ")+(datapro.length)+" !!!")){
       localStorage.clear();
       datapro.splice(0);
       showedata()
       window.txtsearch.style.display="none";
       }
   }

//=================================== update =============================================
function update(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    total.innerHTML=datapro[i].total;
    count.style.display="none";
    category.value=datapro[i].category;
    submit.innerHTML="Update Product";
   // submit.style.backgroundColor="#ff0000";
    kind="update";
    copy=i;
    scroll({top:0,behavair:'smooth',});

}
//==================================== get mood search =================================

let searchmode="title";

function getsearcmode(id){
    let search=window.search;
   if(id=="searchtitle"){
       searchmode="title";
   }
    else{
        searchmode="category";
    }
    //console.log(searchmode)
    search.placeholder="search by "+searchmode;
    search.focus();
    search.value="";
    showedata()
}
//===================================== function search ======================================
function searchelemets(value){
    let table="";
     for(i=0;i<datapro.length;i++){
//====================== search title ===========================
    if(searchmode=="title"){
            if(datapro[i].title.includes(value.toLowerCase())){
                //console.log(i)
table+=`
<tr>
<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick=" update(${i})" id="update" >update</button></td>
<td><button onclick=" deletedata(${i})" id="delete" >delete</button></td>
</tr>
`
            }
        
        
    }
    else{
//============== search category ======================
            if(datapro[i].category.includes(value.toLowerCase())){
                //console.log(i)
table+=`
<tr>
<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick=" update(${i})" id="update" >update</button></td>
<td><button onclick=" deletedata(${i})" id="delete" >delete</button></td>
</tr>
`
            }
        
        
        
    }
    
    window.tbody.innerHTML=table;
     }
}

//============================== search by j-query ============================

$("#txtsearch").keyup(function(){
        let value=$(this).val().toLowerCase();
        $("#tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1);
        });
        $("#new tr:first").show();
    });
//===================================  get sum =================================
/*
 var holds=0;
             for(let i=0;i<datapro.length;i++){
              holds+=parseInt(datapro[i].total);
          }
            window.dis.innerHTML=holds;
*/
$("body").hover(function(){
    
    var holds=0;
             var ftable=document.getElementById("tbody");
             for(let i=0;i<ftable.rows.length;i++){
              holds+=parseInt(ftable.rows[i].cells[6].innerHTML);
          }
            window.dis.innerHTML=holds;
});



//=============================== them one===================================================

$("#color").click(function(){
    $("button").mouseenter(function(){
        $(this).css({backgroundColor:"blue",color:"white"});
    });
    $("button").mouseleave(function(){
        $(this).css({backgroundColor:"#e6e1e1",color:"blue"});
    });
     
    setInterval(function(){
    $("button").css({backgroundColor:"#dcd9dd",boxShadow:" -2px -2px 0px 0px #ffffff , 5px 5px 5px 0px rgb(0, 0, 0,0.45)",color:"blue"});
    $(".color").hide();
    $("body").css({backgroundColor:"#d9d6db",color:"blue"});
    $("input").css({backgroundColor:"#d3d3d3",boxShadow:"inset -3px -3px 5px 0px #ffffff ,inset 5px 5px 5px 0px rgb(0, 0, 0,0.45)",color:"blue"});
    $("table th").css({backgroundColor:"#dcd9dd",boxShadow:" -2px -2px 0px 0px #ffffff , 5px 5px 5px 0px rgb(0, 0, 0,0.45)",color:"blue"});
    $("button:hover").css({backgroundColor:"blue",color:"white"});
    $("tr:nth-child(even)").css({ backgroundColor:"#dddddd",color:"blue"});
    $("tr:nth-child(odd)").css({ backgroundColor:"#e6e1e1",color:"blue"});
    $("tbody td:first-child").css({ backgroundColor:"#f2efef",color:"blue"});
    $("th,td").css({ border:"1px solid white"});
    $(".cruds").css({backgroundColor:"#dcd9dd",boxShadow:" -8px -8px 10px 0px #ffffff , 8px 8px 10px 0px rgb(0, 0, 0,0.45)",borderRadius:"30px"});
    $("#total").css({backgroundColor:"white"});
    $("#dis").css({backgroundColor:"#dcd9dd",boxShadow:"inset -8px -8px 10px 0px #ffffff ,inset 8px 8px 10px 0px rgb(0, 0, 0,0.45)",color:"blue"})
        },0);
    
   
});
//===================================== them tow ==================================================
$("#black").click(function(){
  //setInterval(function(){
       $(".color").hide();
    $("body").css({backgroundColor:"#1919f7",color:"white"});
    $("input").css({backgroundColor:"blue",boxShadow:"inset -7px -7px 7px 0px #3636ff ,inset 7px 7px 7px 0px #1d096f",color:"white"});
    $("button").css({backgroundColor:"blue",boxShadow:" -2px -2px 0px 0px #3d3dff , 5px 5px 5px 0px #0d0433",color:"white"});
    $("table th").css({backgroundColor:"blue",boxShadow:" -2px -2px 0px 0px#3d3dff , 5px 5px 5px 0px #0d0433",color:"white"});
    $("tr:nth-child(even)").css({ backgroundColor:"blue",color:"white"});
    $("tr:nth-child(odd)").css({ backgroundColor:"#0606b5",color:"white"});
    $("tbody td:first-child").css({ backgroundColor:"#00005f",color:"white"});
    $("th,td").css({ border:"1px solid blue"});
    $("button:hover").css({backgroundColor:"white",color:"blue"});
    $(".cruds").css({backgroundColor:"blue",boxShadow:" -8px -8px 10px 0px #3d3dff , 8px 8px 10px 0px #19008b",borderRadius:"30px"});
    $("#total").css({backgroundColor:"blue"});
  //  },0);
});




