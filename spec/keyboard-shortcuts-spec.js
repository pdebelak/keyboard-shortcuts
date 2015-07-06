describe("keyboard-shortcuts", function() {
  describe("ModeHandler", function() {
    var modeHandler = new ModeHandler();

    it("starts out not enabled", function() {
      expect(modeHandler.enabled()).toBe(false);
    });

    it("toggles from false to true", function() {
      modeHandler.toggle();
      expect(modeHandler.enabled()).toBe(true);
    });

    it("toggles back and forth", function() {
      modeHandler.toggle();
      modeHandler.toggle();
      expect(modeHandler.enabled()).toBe(true);
    });
  });

  describe("WindowScroller", function() {
    var mockWindow = jasmine.createSpyObj("mockWindow", ["scrollBy"]);
    var windowScroller = new WindowScroller(mockWindow)

    it("scrolls up", function() {
      windowScroller.scrollUp();
      expect(mockWindow.scrollBy).toHaveBeenCalledWith(0, -100);
    });

    it("scrolls down", function() {
      windowScroller.scrollDown();
      expect(mockWindow.scrollBy).toHaveBeenCalledWith(0, 100);
    });
  });
});
