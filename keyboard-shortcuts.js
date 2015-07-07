var I_KEY = 73;
var J_KEY = 74;
var K_KEY = 75;
var N_KEY = 78;
var SLASH_KEY = 191;

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
  if (focusNextLinkPressed(e)) {
    linkFinder.focusNext()
  } else if (textEntered(e)) {
    linkFinder.addChar(enteredChar(e.keyCode));
  }
}

function LinkFinder() {
  var linkText = "";
  var matchingLinks = [];
  var currentFocus = 0;
  var _this = this;
  var FOCUS_CLASS = "keyboard-shortcuts-focus-highlight";

  function resetLinkText() {
    linkText = "";
  }

  function resetMatchingLinks() {
    clearLinkFocus();
    matchingLinks = [];
  }

  function addLinkText(text) {
    linkText += text;
  }

  function targetFocus() {
    console.log(_this.matchingLinks());
    return _this.matchingLinks()[currentFocus];
  }

  function clearLinkFocus() {
    doIfTargetFocus(function() {
      targetFocus().blur();
      removeFocusClass();
    });
  }

  function addFocusClass() {
    doIfTargetFocus(function() {
      targetFocus().classList.add(FOCUS_CLASS);
    });
  }

  function removeFocusClass() {
    doIfTargetFocus(function() {
      targetFocus().classList.remove(FOCUS_CLASS);
    });
  }

  function doIfTargetFocus(callback, fail) {
    if (typeof targetFocus() !== "undefined") {
      callback();
    } else if (typeof fail !== "undefined") {
      fail();
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
    removeFocusClass();
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
    console.log(linkText);
    findLink();
    console.log(targetFocus());
    focusLink();
  }

  function focusLink() {
    doIfTargetFocus(function() {
      targetFocus().focus();
      addFocusClass();
    }, function() {
      document.activeElement.blur();
      removeFocusClass();
    });
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
  return keyPressed(e) === SLASH_KEY;
}

function focusNextLinkPressed(e) {
  return keyPressed(e) === N_KEY && e.ctrlKey;
}

function textEntered(e) {
  return String.fromCharCode(e.keyCode).match(/[a-zA-Z]/) || e.keyCode.toString().match(/[0-9]/) ;
}

function enteredChar(code) {
  if (code >= 0 && code <= 9) {
    return code.toString();
  } else {
    return String.fromCharCode(code);
  }
}

function defaultArgument(argument, defaultArg) {
  if (typeof argument === "undefined") {
    return defaultArg;
  } else {
    return argument;
  }
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

function WindowScroller(_window) {
  var SCROLL_AMOUNT = 100;

  _window = defaultArgument(_window, window);

  this.scrollDown = function() {
    _window.scrollBy(0, SCROLL_AMOUNT);
  };

  this.scrollUp = function() {
    _window.scrollBy(0, SCROLL_AMOUNT * -1);
  };
}

var shortcutMode = new ModeHandler();
var linkMode = new ModeHandler();
var scroller = new WindowScroller();
var linkFinder = new LinkFinder();
