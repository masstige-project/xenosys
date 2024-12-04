$(document).ready(function(){
     /* 개수 단순 복사 */
    $('[data-copy]').each(function() {
        var $element = $(this);
        var copyCount = parseInt($element.data('copy'), 10);

        for (var i = 1; i < copyCount; i++) {
            var $clone = $element.clone();
            $clone.attr("data-copy","")
            $element.after($clone);  // 원래 요소 바로 뒤에 복사된 요소 추가
        }
    });
    checkScroll(); // 페이지가 로드될 때 스크롤 위치를 확인하고 클래스 추가

    $(window).scroll(function(){
        checkScroll(); // 스크롤 시에도 스크롤 위치를 확인하고 클래스 추가
        if($(this).scrollTop()>0){
          $('body').addClass('is-scroll');
        }else{
          $('body').removeClass('is-scroll');
        }
      }).trigger('scroll');

    function checkScroll() {
        var curr = $(window).scrollTop();

        if(curr > 50){
        $('.header').addClass('scrolled');
        } else {
        $('.header').removeClass('scrolled');
        }
    }

    /* 전화번호 정규식 */
    function formatPhoneNumber(input) {
        // 숫자만 추출
        let numbers = input.value.replace(/\D/g, '');
      
        // 3-4-4 형식으로 나누어주기
        if (numbers.length <= 3) {
          input.value = numbers;
        } else if (numbers.length <= 7) {
          input.value = numbers.slice(0, 3) + '-' + numbers.slice(3);
        } else {
          input.value = numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
        }
      }
    const phoneInputs = document.querySelectorAll('.phone-input');
    phoneInputs.forEach(function (input) {
        input.addEventListener('input', function () {
        formatPhoneNumber(input);
        });
    });
});