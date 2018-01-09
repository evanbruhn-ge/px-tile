suite('Custom Automation Tests for px-tile', function() {
  let tileEl;

  setup(function(done) {
    tileEl = fixture('px_tile_1');
    flush(()=>{
      done();
    });
  });

  test('Title, subtitle and description are displayed', function() {
    var tileTextWrapper = Polymer.dom(tileEl.root).querySelector('.tile-text-wrapper');
    var mainTitle = tileTextWrapper.querySelector('.title-span').textContent.trim();
    var subtitle = tileTextWrapper.querySelector('.subtitle-span').textContent.trim();
    var description = tileTextWrapper.querySelector('.text').textContent.trim();

    assert.equal(mainTitle, 'Title text');
    assert.equal(subtitle, 'Subtitle text');
    assert.equal(description, 'Description');
  });

  test('Image is displayed', function() {
    var img = tileEl.getEffectiveChildren()[0];
    assert.equal(img.tagName, 'IMG');
  });

  test('Hover works, overlay has mainTitle, subtitle, description, and footer text', function(done) {
    var overlay = Polymer.dom(tileEl.root).querySelector('.overlay');
    overlay.classList.add('hovered');
    flush(function() {
      window.setTimeout(function() {
        var opacity = window.getComputedStyle(overlay).getPropertyValue('opacity');
        assert.equal(opacity, '1');
        var mainTitle = overlay.querySelector('.title-span').textContent.trim();
        var subtitle = overlay.querySelector('.subtitle-span').textContent.trim();
        var overlayDescription = overlay.querySelector('.text').textContent.trim();
        assert.equal(mainTitle, 'Title text');
        assert.equal(subtitle, 'Subtitle text');
        assert.equal(overlayDescription, 'Overlay Description text');
        done();
      },500);
    });

  });
});


suite('Action Buttons Test for px-tile', function(){
  let tileEl;
  let actionButtons3items;
  let actionButtons4items;
  
  //setup async calls to load required mock json before running the test
  $.ajaxSetup({
    async: false
  });
  $.getJSON('mock/actionButtons3items.json', function(data){
    actionButtons3items = data;
  });
  $.getJSON('mock/actionButtons4items.json', function(data){
    actionButtons4items = data;
  });
  $.ajaxSetup({
    async: true
  });
  
  setup(function(done) {
    tileEl = fixture('px_tile_1');
    flush(()=>{
      done();
    });
  });
  
  test('Set actionButtons when items <= 3', function(done) {
    tileEl.set('actionButtons', actionButtons3items);
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      let totalButtons = Polymer.dom(pxActionButtons.root).querySelectorAll('button').length;
      assert.equal(pxActionButtons._isDisplayDropdown, false);
      assert.equal(totalButtons, actionButtons3items.items.length);
      done();
    });
  });
  
  test('Select first action button when items <= 3', function( done) {
    tileEl.set('actionButtons', actionButtons3items);
    let selectedValue;
    window.addEventListener('px-tile-action-tapped', function(evt) {
      selectedValue = evt.detail;
    });
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      let btn = Polymer.dom(pxActionButtons.root).querySelectorAll('button')[0];
      $(btn).click();
      assert.equal(selectedValue.id, actionButtons3items.items[0].id);
      done();
    });
  });

  test('Verify booleans with no primary buttons', function(done) {
    tileEl.set('actionButtons', actionButtons3items);
    flush(function() {
      assert.equal(tileEl._hasActionButtons, true);
      assert.equal(tileEl._hasPrimaryBtn, false);
      assert.equal(tileEl._hasTitleActionBtn, true);
      assert.equal(tileEl._hasTitleSubtitleActionBtn, true);
      assert.equal(tileEl._hasData, true);
      done();
    });
  });
  
  test('Set actionButtons when items > 3 with 1 item with isPrimary flag', function(done) {
    tileEl.set('actionButtons', actionButtons4items);
    flush(function() {
      window.setTimeout(function() {
        let pxActionButtons = tileEl.$$('#pxActionButtons');
        assert.equal(pxActionButtons._isDisplayDropdown, true);
        assert.equal(pxActionButtons._items.length, 4);
  
        let pxTilePrimaryBtns = tileEl.$$('#pxTilePrimaryBtns');
        assert.equal(pxTilePrimaryBtns._items.length, 1);
        done();
      },200);
    });
  });

  test('Verify booleans with primary buttons', function(done) {
    tileEl.set('actionButtons', actionButtons4items);
    flush(function() {
      assert.equal(tileEl._hasActionButtons, true);
      assert.equal(tileEl._hasPrimaryBtn, true);
      assert.equal(tileEl._hasTitleActionBtn, true);
      assert.equal(tileEl._hasTitleSubtitleActionBtn, true);
      assert.equal(tileEl._hasData, true);
      done();
    });
  });

  test('Select one item when items > 3', function(done) {
    let selectedValue;
    window.addEventListener('px-tile-action-tapped', function(evt) {
      selectedValue = evt.detail;
    });
    actionButtons4items.multi = true;
    tileEl.set('actionButtons', actionButtons4items);
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxActionButtons');
      pxActionButtons._actionButtonsChanged();
      let pxDropdown = pxActionButtons.$$('#pxDropdown');
      let item = actionButtons4items.items[0];
      pxDropdown._displayValueSelected = item.label;
      pxDropdown.fire('iron-select', {item: {key: item.id, val: item.label}});
      assert.equal(selectedValue.id, item.id);
      done();
    });
  });
  
  test('Set overlay action buttons btn-overlay class', function(done) {
    tileEl.set('actionButtons', actionButtons3items);
    var overlay = Polymer.dom(tileEl.root).querySelector('.overlay');
    overlay.classList.add('hovered');
    tileEl._hovered = true;
    flush(function() {
      let pxActionButtons = tileEl.$$('#pxOverlayActionButtons');
      let hasBtnOverlay = Polymer.dom(pxActionButtons.root).querySelector('button').classList.contains('btn-overlay');
      assert.equal(hasBtnOverlay, true);
      done();
    });
  });
  
});


