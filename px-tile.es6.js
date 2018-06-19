/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  Polymer({

    is: 'px-tile',

    properties: {
      /**
       * If true, hovering over the card will cause an overlay to appear
       * with more detailed information, including the description
       * and an optional slot for showing a footer at the bottom.
       * _Note: not recommended for mobile applications due to variation
       * or lack of support for hover on mobile devices._
       */
      hoverable: {
        type: Boolean,
        value: false,
        observer: '_hoverableChanged'
      },
      /**
       * Whether the tile is currently being hovered.
       */
      _hovered: {
        type: Boolean,
        value: false
      },
      /**
       * Main text label for the tile.
       */
      mainTitle: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Subtitle text for the tile.
       */
      subtitle: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
       /**
        * Description information to be displayed underneath tile and subtitle.
        * Default : Only the first ~3 lines of text will be displayed, after which it will be truncated.
        * You can customize by adjusting the `--px-tile-desc-text-height` CSS variable. (e.g. 1 line = 1 rem,
        * to set to 5 lines truncated, set `--px-tile-desc-text-height: 5rem`).
       */
      description: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Description information to be displayed in the overlay of a hoverable card.
       * It has more space to display text content and can be adjusted along with
       * total height of the tile.
       */
      overlayDescription: {
        type: String,
        value: '',
        observer: '_onDataChanged'
      },
      /**
       * Configuration object for the action buttons displayed in the tile.
       * The primary button is displayed in the header/title area of the tile
       * whereas the rest are displayed at the bottom of the tile.
       * The `px-tile-action-tapped` event is fired when any of the action buttons is tapped.
       */
      actionButtons: {
        type: Object,
        value: {},
        observer: '_actionButtonsChanged'
      },
      /**
       * Controls whether the title can be edited via an inline form.
       * Also enables behaviour where the title form will be shown if the title property is blank.
       */
      titleEditable: {
        type: String,
        value: '',
        observer: '_titleEditableChanged'
      },
      /**
       * Validator that's executed when the title is changed via the title form.
       * Utilizes the px-validation component, supplied functions should return an object matching the following spec:
       * { valid: true or false, message: 'optional validation error message here' }
       */
      titleValidator: {
        type: Function,
        observer: '_titleValidatorChanged'
      },
      /**
       * Custom function that's invoked when the drop event is fired
       */
      dropHandler: {
        type: Function,
        observer: '_dropHandlerChanged'
      },
      /**
       * Property used internally for showing or hiding the edit title form
       */
      _showEditForm: {
        type: Boolean,
        value: true
      },
      /**
       * Property used internally for determining the selected state on the px-tile
       */
      _selected: {
        type: Boolean,
        value: false,
        observer: '_selectedChanged'
      }
    },
    /**
     * Method used internally for flipping the hovered status of a tile.
     */
    _hover() {
      if(this.hoverable) {
        this._hovered = !this._hovered;
      }
    },
    /**
     * Method used internally for setting the selected state based on the input event
     */
    _handleDrag(e) {
      e.preventDefault();
      this._selected = e.type === 'dragenter';
    },
    /**
     * Handles the drop event, and prevents other drag events from blocking the drop event.
     * The drop event will be passed to the px-tile's drop-handler function if available.
     */
    _handleDrop(e) {
      e.preventDefault();
      if (e.type === 'drop') {
        this._selected = false;
        if (typeof this.dropHandler === 'function') this.dropHandler(e.dataTransfer.getData('text'), this, e);
      }
    },
    /**
     * Sets or removes the selected class from the px-tile container based on the selected state
     */
    _selectedChanged() {
      if (this._selected) this.$.tile.classList.add('selected');
      else this.$.tile.classList.remove('selected');
    },
    /**
     * On change callback to remove overlay
     */
    _hoverableChanged() {
      this.$.overlay.classList.add('overlay-remove');
      if(this.hoverable) {
        this.$.overlay.classList.remove('overlay-remove');
        // extract overlay text color to pass to other components
        this._hoverTextColor = window.getComputedStyle(this.$.overlay).color;
      }
    },
    /**
     * Attach event listeners for hoverable tiles.
     */
    attached() {
      this.listen(this.$.overlay, 'mouseenter', '_hover');
      this.listen(this.$.overlay, 'mouseleave', '_hover');
      this.listen(this, 'dragenter', '_handleDrag');
      this.listen(this, 'dragleave', '_handleDrag');
      this.listen(this, 'dragover', '_handleDrop');
      this.listen(this, 'drop', '_handleDrop');
    },
    /**
     * Detach event listeners for hoverable tiles.
     */
    detached() {
      this.unlisten(this.$.overlay, 'mouseenter');
      this.unlisten(this.$.overlay, 'mouseleave');
      this.unlisten(this, 'dragenter');
      this.unlisten(this, 'dragleave');
      this.listen(this, 'dragover');
      this.listen(this, 'drop');
    },
    /**
     * Returns class to control overlay for hoverable tiles.
     */
    _getClass(hovered) {
      return hovered ? 'hovered' : '';
    },
    /**
     * On change callback for actionButtons to set _hasActionButtons and _hasPrimaryBtn flag
     */
    _actionButtonsChanged() {
      this._hasPrimaryBtn = false;
      this._hasActionButtons = this.actionButtons && this.actionButtons.items && this.actionButtons.items.length > 0;
      if(this._hasActionButtons) {
        let maxPrimaryButtons = this.actionButtons.maxPrimaryButtons || 1;
        for(let x in this.actionButtons.items) {
          if(this.actionButtons.items[x].isPrimary) {
            this._hasPrimaryBtn = true;
            break;
          }
        }
      }
      this._onDataChanged();
    },
    /**
     * On change callback for either property to set _hasTitleActionBtn, _hasTitleSubtitleActionBtn, and _hasData flags
     */
    _onDataChanged() {
      this._hasTitleActionBtn = this.mainTitle && this.mainTitle.length > 0|| this._hasPrimaryBtn;
      this._hasTitleSubtitleActionBtn = this.subtitle && this.subtitle.length > 0 || this._hasTitleActionBtn;
      this._hasData = this._hasActionButtons || this._hasTitleSubtitleActionBtn;
      this._showEditForm = this.mainTitle.length === 0;
    },

    /**
     * Observer for title-editable property, controls whether the title form will appear when _showEditForm property is true and/or when mainTitle property is blank
     */
    _titleEditableChanged(title) {
      // TODO: This does nothing yet.
    },

    /**
     * Observer for title-validator property changes.
     */
    _titleValidatorChanged(validator) {
      // Handle functions specified in component markup (ie. strings)
      if (typeof validator === 'string') {
        // TODO: There must be a better way!
        this.titleValidator = eval(validator);
        return;
      }
    },

    /**
     * Observer for drop-handler property changes.
     */
    _dropHandlerChanged(dropHandler) {
      // Handle functions specified in component markup (ie. strings)
      if (typeof dropHandler === 'string') {
        // TODO: There must be a better way!
        this.dropHandler = eval(dropHandler);
        return;
      }
    }

    /**
     * @event px-tile-action-tapped
     *
     * Event fired when an item from actionButtons is tapped. `Evt.detail` includes the details of the tapped item, e.g. `{"id": "1", "label": "Favorite"}`
     *
     * Usage:
     * ```
     * window.addEventListener('px-tile-action-tapped', function(evt){
     *   console.log(evt.detail);
     * });
     * ```
     */
  });
})();
