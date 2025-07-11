

//타이틀,페이지네이션 전환용
let slideNo = 0;

function slide(no) {
    slideNo += no;
    if(slideNo > 3) slideNo = 0;
    if(slideNo < 0) slideNo = 3;

    //모든 타이틀 숨긴 후, 현재 번째 타이틀 보이기
    $('.title').hide();
    $('.title').eq(slideNo).show();

    //하단 진행율 표시 막대 크기 변경
    $('.page').css({ 'opacity':'0.5', 'width':'50px' });
    $('.page').eq(slideNo).css({ 'opacity':'1', 'width':'100px' });
}



//다음 버튼용 슬라이드
function next() { 
    $('#slideBox').stop().animate({'marginLeft':'-100%'},500,function(){
        $('.slide:first').appendTo('#slideBox');
        $('#slideBox').css('marginLeft','0');
    });
}

//이전 버튼용 슬라이드
function prev() {
    $('.slide:last').prependTo('#slideBox');
    $('#slideBox').css('marginLeft','-100%');
    $('#slideBox').stop().animate({'marginLeft':'0'},500);
}

//자동 슬라이드
let play;
function playSlide() {   play = setInterval('next(); slide(1)', 3000);  }

//자동 슬라이드 중지
function stopSlide() {  clearInterval(play);  }



$(function(){     //페이지가 열린 후,

    playSlide();    //슬라이드 동작

    $('.slideLeft').click(function(){     //이전 버튼 클릭
        if( !$('#slideBox').is(':animated') ) {
            prev();     //이전 슬라이드로 이동
            slide(-1);
        }
    });

    $('.slideRight').click(function(){    //다음 버튼 클릭
        if( !$('#slideBox').is(':animated') ) {
            next();     //다음 슬라이드로 이동
            slide(1);
        }
    });

    //좌우 버튼에 닿으면, 슬라이드 멈추기
    $('.slideButton').mouseenter(function(){
        stopSlide();
    });

    $('.slideButton').mouseleave(function(){
        playSlide();
    });


    //슬라이드 중지, 재생 버튼 클릭할 때
    $('.pause').click(function(){
        stopSlide();
        $('.control').removeClass('active');
        $(this).addClass('active');
    });

    $('.play').click(function(){
        playSlide();
        $('.control').removeClass('active');
        $(this).addClass('active');
    });


});      //$(function() 끝



$(window).load('load',function(){

    $('#hamburger').click(function(){  //햄버거메뉴(펼침메뉴)를 클릭했을 때
        $(this).toggleClass('is-active');
        $('#menu, #menu2, #blackBox').fadeToggle(300);    //메뉴를 보이거나 숨김
    });

    $('#blackBox').click(function(){  //햄버거메뉴(펼침메뉴)를 클릭했을 때
        $('.hamburger').toggleClass('is-active');
        $('#menu, #menu2, #blackBox').fadeToggle(300);    //메뉴를 보이거나 숨김
    });


    
//화면 폭 조절할 때 900 이상이면 메뉴,검정배경,햄버거 버튼 초기화
$(window).resize(function(){

    if( $(window).width() > 900 ) {
        $('#menu,#menu2, #blackBox').removeAttr('style');
        $('.hamburger').removeClass('is-active');
    }

});
});

