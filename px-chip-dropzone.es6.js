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
    is: 'px-chip-dropzone',

    properties: {
      /**
       * An array of strings that's reflected as nested px-chips within this component.
       */
      chips: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      },
      /**
       * The message to display when the chips array is empty.
       */
      defaultMessage: {
        type: String,
        value: 'No chips, pal.',
        notify: true
      }
    },
    /**
     * Add a chip by name
     */
    addChip: function(name) {
      if (!this.chips.includes(name)) this.push('chips', name);
    },
    /**
     * Remove a chip by name
     */
    removeChip: function(name) {
      const index = this.chips.indexOf(name);
      if (index != -1) {
        this.splice('chips', index, 1);
      }
    },
    /**
     * Sort function used by dom-repeat template, sorts chips alphabetically
     */
    _sortChipsByName: function(a, b) {
      return a > b;
    }
  });
})();
