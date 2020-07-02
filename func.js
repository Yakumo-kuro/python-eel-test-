
var _default=[['https://www.8591.com.tw/mallList-wareDetail.html?id=2178193026', '【YA專賣】『寵物店』永久寵物強化寵物　鈴鈴　小熊', '價格:300元','數量:893', '1668160'],['https://www.8591.com.tw/mallList-wareDetail.html?id=2363187240', '【YA專賣】『複製點裝』有貨以庫存為主3/18更新願望快遞員制服', '價格:480元','數量:31', '1668160']];
var games=['新楓之谷']
var collegeSelect=document.getElementById("game-list");
var inner="";
for(var i=0;i<games.length;i++){
    inner=inner+'<option value='+games[i]+'>'+games[i]+'</option>';
}
collegeSelect.innerHTML=inner;

var servers=['全伺服','艾麗亞','普力特','琉德','優伊娜','愛麗西亞','殺人鯨','燃燒','reboot','其它']
var collegeSelect=document.getElementById("server-list");
var inner="";
for(var i=0;i<servers.length;i++){
    inner=inner+'<option value='+servers[i]+'>'+servers[i]+'</option>';
}
collegeSelect.innerHTML=inner;

var type=['全部','遊戲幣','道具','帳號','點數卡','代練','送禮','其它']
var collegeSelect=document.getElementById("type-list");
var inner="";
for(var i=0;i<type.length;i++){
    inner=inner+'<option value='+type[i]+'>'+type[i]+'</option>';
}
collegeSelect.innerHTML=inner;

var sort=['默認','低到高','高到低']
var collegeSelect=document.getElementById("sort-list");
var inner="";
for(var i=0;i<sort.length;i++){
    inner=inner+'<option value='+sort[i]+'>'+sort[i]+'</option>';
}
collegeSelect.innerHTML=inner;

function loger(){
    var gl=document.getElementById("game-list").value;
    var sl=document.getElementById("server-list").value;
    var il=document.getElementById("type-list").value;
    var it=document.getElementById("item").value;
    var stl=document.getElementById("sort-list").value;
    var rg1=document.getElementById("rg1").value;
    var rg2=document.getElementById("rg2").value;
    var chs=document.querySelectorAll("[type=checkbox]:checked");
    var uid=document.getElementById("uid").value;
    var ch1='0',ch2='0';
    for (var i = 0; i < chs.length; i++){
        var a = chs[i].value
        if (a=='1'){
            var ch1='1';
        }
        if (a=='2'){
            var ch2='2';
        }
    }
    //console.log('test');
    eel.www(gl,sl,il,stl,it,rg1,rg2,ch1,uid)(itemlist);
}
function itemlist(colleges){
    var letters="";
    for (var i = 0; i < colleges.length; i++) {
        var ul = document.getElementById("items-list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(colleges[i]));
        ul.appendChild(li);
        letters += "<li><a class='t' href="+ colleges[i][0] + " target='iframe_a'><span class='test'>"  + colleges[i][1] + "</span><span class='text'>"+colleges[i][2]+"</span><span class='text2'>"+colleges[i][3]+"</span><span class='text1'>編號:"+colleges[i][4]+"</span></a></li>";
    }
    document.getElementById("items-list").innerHTML = letters;
}

itemlist(_default);

var ck
function au(){
    var chs=document.querySelectorAll("[type=checkbox]:checked");
    if(chs.length==0){
        for(i=0;i<=ck;i++){
            clearInterval(i);
        }
    }
    for (var i=0;i<chs.length;i++){
        var a = chs[i].value
        if (a=='2'){
            ck = setInterval(loger, 60000);
        }
    }
}


