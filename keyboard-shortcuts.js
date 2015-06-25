(function() {
  var I_KEY = 73;
  var J_KEY = 74;
  var K_KEY = 75;

  document.addEventListener("keydown", function(e) {
    if (shortcutKeyPressed(e)) {
      shortcutMode.toggle();
    } else if (shortcutMode.enabled()) {
      handleKeyDown(e);
    }
  });

  function handleKeyDown(e) {
    switch(keyPressed(e)) {
      case J_KEY:
        scroller.scrollDown();
      break;
      case K_KEY:
        scroller.scrollUp();
      break;
    }
  }

  function keyPressed(e) {
    return e.keyCode;
  }

  function shortcutKeyPressed(e) {
    return keyPressed(e) === I_KEY && e.ctrlKey;
  }

  function ShortcutModeHandler() {
    var mode = false;

    this.toggle = function() {
      mode = !mode;
    };

    this.enabled = function() {
      return mode;
    };
  }

  function WindowScroller() {
    var SCROLL_AMOUNT = 100;

    this.scrollDown = function() {
      window.scrollBy(0, SCROLL_AMOUNT);
    };

    this.scrollUp = function() {
      window.scrollBy(0, SCROLL_AMOUNT * -1);
    };
  }

  var shortcutMode = new ShortcutModeHandler();
  var scroller = new WindowScroller();
})();
