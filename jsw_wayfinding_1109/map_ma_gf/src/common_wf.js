function showClock(){
    var currentDate = new Date();
    var divClock = document.getElementById("divClock");
    var divTime = document.getElementById("crtTime");
    var crtM = "0"+ currentDate.getMinutes();
    crtM = crtM.substring(crtM.length - 2);
    var msg = currentDate.getHours()+":";
    msg += crtM;
    divTime.innerText = msg;
    setTimeout(showClock,1000);
}
function dateCrt (){
    var currentDateF = new Date();
    var day = currentDateF.getDate();
    var month = currentDateF.getMonth() + 1;
    var year = currentDateF.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "년" + month + "월" + day + "일";
    document.getElementById("theDate").innerText = today;
    showClock();
}
dateCrt();


function detailLinkUi (){
    $('.nav_list').children('.active').each(function(i){
        var idx = $(this).find('.active').index();
        $('.linkMenu').find('.map_area').hide();
        $('.linkMenu').find('.map_area').eq(idx).show();
    })
};

$('#controls button').click(function (e) {
    e.preventDefault();
    $('#myMaps').wayfinding('destroy');
    $('#myMaps').wayfinding('currentMap', $(this).prop('id'));
});

/* 
* NAV Ui :: tit clk
*/
$('.nav_list .nav_list_tit a').click(function (e) {
    e.preventDefault();
    var navLi = $(this).parent().parent();
    var navLiDepth2= $(this).parent().siblings('.depth_02');
    $('.nav_list').find('.active').removeClass('active');
    $(navLi).addClass('active');
    $(navLiDepth2).find('li').eq(0).addClass('active');
    if($(navLi).index() <= 0) {
        $('.linkMenu').find('.map_area').eq( $('.nav_list').find('.active').index()).show();
    }
    var navDepth2MapId = $(navLiDepth2).find('li').eq(0).find('a').attr('id');
    $('#myMaps').wayfinding('currentMap', navDepth2MapId);
});
/* 
* NAV Ui :: map link clk
*/
$('.nav_list .depth_02 a').click(function (e) {
    e.preventDefault();
    var idxLi = $(this).parent().index();
    var depth1Li = $(this).parent().parent().parent().attr('id');
    var liMapIdx = $('.nav_list').children('.active').index();
    $('.nav_list').find('.active').removeClass('active');
    $(this).parent().parent().parent().addClass('active');
    $(this).parent().addClass('active');
    $('.linkMenu').find('.map_area').hide();
    // 
    if(depth1Li != 'nav_map') {
        var pname =  $(this).prop('name');
        if(pname) findPathUi (pname);
    }
    if(liMapIdx <= 0) {
        $('.linkMenu').find('.map_area').eq(idxLi).show();
        $('#myMaps').wayfinding('currentMap', $(this).prop('id'));
    }
    // 로비셋팅
    //$('#myMaps').wayfinding('startpoint', $(this).prop('name'));
});

// room 연결
function findPathUi (r){
    var objRoom = r;
    if(objRoom) $('#myMaps').wayfinding('routeTo', objRoom);
}

function lobbyHide(stp){
    $('.svg_lobby_mark').each(function(i){
        var thisId = $(this).attr('id');
        if(thisId != stp) {
            $(this).css('opacity',0);
        }
    })
}

/* 
* detail floor linkMenu Ui 
*/
$('.linkMenu ol li ul li button').click(function (e) {
    e.preventDefault();
    $('#myMaps').wayfinding('currentMap', $(this).prop('id'));
});


var fooN = 0;
$('.quickIcon a').each(function(){
    var me = $(this);
    $(me).click(function(){
        event.preventDefault();
        var meData = $(me).attr('data-name');
        var meImg = $('#myMaps').find('.i_'+meData);
        if(fooN <= 0) {
            $(me).find('img').attr('src','./images/2x/'+meData+'_on@2x.png')
            $(meImg).attr('xlink:href','./images/2x/'+meData+'_on@2x.png');
            fooN = 1;
        } else {
            $(me).find('img').attr('src','./images/2x/'+meData+'_off@2x.png')
            $(meImg).attr('xlink:href','./images/2x/'+meData+'_off@2x.png');
            fooN = 0;
        }
    })
})

// dim 생성 fn
function moveProgress(img,t){
    if(!t) t = 3000;
    var objCon = $('.con'); //컨텐츠영역
    var dim = $("<div/>").addClass("dim"); //모달 생성
    var imgName = img; //매개변수 이미지 파일명
    var imgSrc =  './images/layer/'+imgName+'.gif';
    dim.append($('<img/>').attr("src", imgSrc));
    $(objCon).append(dim);

    setTimeout(function() { // 몇초 후 dim 삭제 fn 실행 ()
        clearProgress(dim)
    }, t);
}

// dim 삭제 fn
function clearProgress(layerObj){
    $(layerObj).remove();
}
