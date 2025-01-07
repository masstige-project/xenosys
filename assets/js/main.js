$(function () {
  var controller;

  let breakpoint = {
    xl: window.matchMedia("(min-width: 1200px)"),
  };

  let obj = {};

  createScrollMagic(controller);

	$(window).resize(function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		controller.destroy(true);
		createScrollMagic(controller);
	}).trigger('resize');

  function createScrollMagic() {
    controller = new ScrollMagic.Controller();
    var vh = $(window).innerHeight();

    setTimeout(function () {
      $("#msVisual .tit").addClass("enter");
    }, 100);

    new ScrollMagic.Scene({
      triggerElement: "#msVisualTrigger",
      offset: vh / 2,
      triggerHook: 0,
    })
      .setClassToggle("#msVisual .tit", "leave")
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#msVisualTrigger",
      offset: vh / 2,
      triggerHook: 0,
      duration: vh,
    })
      .setTween("#msVisual .txt", { opacity: 0, x: "-50" })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#msVisualTrigger",
      offset: vh * 3,
      triggerHook: 0,
    })
      .setClassToggle("#msVisual .prd-render", "on")
      .addTo(controller);

    const img1 = document.querySelector("#prd1 img");
    const img2 = document.querySelector("#prd2 img");
    const frameCount1 = 16;
    const frameCount2 = 19;
    const playhead1 = { frame: 1 };
    const playhead2 = { frame: 1 };
    const images1 = [];
    const images2 = [];

    for (let i = 1; i <= frameCount1 + 1; i++) {
      var imgArr1 = new Array();
      imgArr1.src = `../assets/images/main/prd1/${i
        .toString()
        .padStart(2, "0")}.png`;
      if (i === 1) {
        imgArr1.onload = updateImage;
      }
      images1.push(imgArr1);
    }

    for (let i = 1; i <= frameCount2 + 1; i++) {
      var imgArr2 = new Array();
      imgArr2.src = `../assets/images/main/prd2/${i
        .toString()
        .padStart(2, "0")}.png`;
      if (i === 1) {
        imgArr2.onload = updateImage2;
      }
      images2.push(imgArr2);
    }

    function updateImage() {
      var nsrc1 = JSON.stringify(Math.round(playhead1.frame));
      img1.setAttribute(
        "src",
        `../assets/images/main/prd1/${nsrc1.toString().padStart(2, "0")}.png`
      );
    }

    function updateImage2() {
      var nsrc2 = JSON.stringify(Math.round(playhead2.frame));
      img2.setAttribute(
        "src",
        `../assets/images/main/prd2/${nsrc2.toString().padStart(2, "0")}.png`
      );
    }

    gsap.to(playhead1, {
      frame: frameCount1,
      ease: "none",
      onUpdate: updateImage,
      scrollTrigger: {
        start: vh * 4,
        end: vh * 8,
        scrub: true,
      },
    });

    new ScrollMagic.Scene({
      triggerElement: "#msVisual",
      offset: vh * 9,
      triggerHook: 0,
      duration: vh * 1.2,
    })
      .setTween("#msVisual #prd1", { opacity: 0 })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#msVisual",
      offset: vh * 11,
      triggerHook: 0.8,
      duration: vh * 1.2,
    })
      .setTween("#msVisual #prd2", { opacity: 1})
      .addTo(controller);

    gsap.to(playhead2, {
      frame: frameCount2,
      ease: "none",
      onUpdate: updateImage2,
      scrollTrigger: {
        start: vh * 12,
        end: vh * 16,
        scrub: true,
      },
    });

    new ScrollMagic.Scene({
      triggerElement: "#msVisual",
      offset: vh * 17,
      triggerHook: 0,
      duration: vh * 1.2,
    })
      .setTween("#msVisual #prd2", { opacity: 0 })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#msVisual",
      offset: vh * 18.5,
      triggerHook: 0.9,
      duration: vh * 3,
    })
      .setTween("#msVisual #prd3 img", {opacity: 1,transform: "translateY(-50%",})
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#msContactTrigger",
      triggerHook: 0.8,
      offset: vh / 3,
      duration: vh / 3,
    })
      .setTween("#msContact .link", { opacity: 1, marginTop: "0" })
      .addTo(controller);
  }

  var $cursorBx = $(".cursor-bx");

  $(document).mousemove(function (e) {
    $cursorBx.css({
      left: e.clientX + "px",
      top: e.clientY + "px",
    });
  });

  $(".prd-link").hover(
    function () {
      $cursorBx.addClass("active");
    },
    function () {
      $cursorBx.removeClass("active");
    }
  );
});

//241209 추가
$(function () {
  new Swiper(".main-section.product .swiper-container", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
	loopAdditionalSlides: 3, 
    speed: 1000, 
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1400: {
        slidesPerView: 1,
        spaceBetween: 60,
      },
    },
	on: {
      init: function () {
        console.log("Swiper initialized with loop.");
      },
    },
  });
});