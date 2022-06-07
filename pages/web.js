class StickyNav {

  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabHeight = 70;
    let self = this;
    $('hero-hero-tab').click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop = $(element.attr('href')).offset().top - this.tabHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkTabPosition();
    this.findCurrentTab();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabPosition() {
    let offset = $('.hero-hero').offset().top + $('.hero-hero').height() - this.tabHeight;
    if ($(window).scrollTop() > offset) {
      $('.hero-hero-tab-container').addClass('.hero-hero-tab-container--top');
    }
    else {
      $('.hero-hero-tab-container').removeClass('.hero-hero-tab-container--top');
    }
  }

  findCurrentTab(element) {
    let newCurrenId;
    let newCurrentTab;
    let self = this;
    $('.hero-hero-tab').each(function () {
      let id = $(this).attr('href');
      let offsetTop = $(id).offset().top - self.tabHeight;
      let offsetBottom = $(id).offset().top - self.height - self.tabHeight;
      if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css('width');
      left = this.currentTab.offset().left;
    }
    $('.hero-hero-tab-slider').css('width', width);
    $('.hero-hero-tab-slider').css('left', left);
  }
}

new StickyNav();