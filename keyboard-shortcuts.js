(function() {
  var I_KEY = 73;
  var J_KEY = 74;
  var K_KEY = 75;
  var L_KEY = 76;
  var N_KEY = 78;

  document.addEventListener("keydown", function(e) {
    if (shortcutKeyPressed(e)) {
      shortcutMode.toggle();
    } else if (shortcutMode.enabled()) {
      if (linkModeKeyPressed(e)) {
        linkMode.toggle();
        linkFinder.setUp();
      } else if (linkMode.enabled()) {
        handleLinkInput(e);
      } else {
        handleKeyDown(e);
      }
    }
  });

  function handleLinkInput(e) {
    if (focusNextLinkPressed(e).length) {
      linkFinder.focusNext()
    } else if (textEntered(e)) {
      linkFinder.addChar(String.fromCharCode(e.keyCode));
    }
  }

  function LinkFinder() {
    var linkText = "";
    var matchingLinks = [];
    var currentFocus = 0;
    var _this = this;

    function resetLinkText() {
      linkText = "";
    }

    function resetMatchingLinks() {
      matchingLinks = [];
    }

    function addLinkText(text) {
      linkText += text;
    }

    function targetFocus() {
      return _this.matchingLinks()[currentFocus];
    }

    function clearLinkFocus() {
      if (typeof targetFocus() !== "undefined") {
        targetFocus().blur();
      }
    }

    _this.setUp = function() {
      clearLinkFocus();
      resetMatchingLinks();
      resetLinkText();
    }

    _this.matchingLinks = function() {
      return matchingLinks;
    }

    _this.focusNext = function() {
      if (_this.matchingLinks().length) {
        currentFocus += 1;
        if (currentFocus > _this.matchingLinks().length - 1) {
          currentFocus = 0;
        }
        focusLink();
      }
    }

    _this.addChar = function(char) {
      resetMatchingLinks();
      addLinkText(char);
      findLink();
      focusLink();
    }

    function focusLink() {
      if (typeof targetFocus() !== "undefined") {
        targetFocus().focus();
      } else {
        document.activeElement.blur();
      }
    }

    function findLink() {
      var links = document.getElementsByTagName("a");
      for (var i=0, len=links.length; i<len; i++) {
        if (nameMatch(links[i])) {
          matchingLinks.push(links[i]);
        }
      }
    }

    function nameMatch(link) {
      return link.innerText.toLowerCase().match(linkText.toLowerCase());
    }
  }

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

  function linkModeKeyPressed(e) {
    return keyPressed(e) === L_KEY && e.ctrlKey;
  }

  function focusNextLinkPressed(e) {
    return keyPressed(e) === N_KEY && e.ctrlKey;
  }

  function textEntered(e) {
    return String.fromCharCode(e.keyCode).match(/[a-zA-Z]/);
  }

  function ModeHandler() {
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

  var shortcutMode = new ModeHandler();
  var linkMode = new ModeHandler();
  var scroller = new WindowScroller();
  var linkFinder = new LinkFinder();
})();
