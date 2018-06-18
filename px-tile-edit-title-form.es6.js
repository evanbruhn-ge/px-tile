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
    is: 'px-tile-edit-title-form',

    properties: {
      /**
       * Validator that's executed when the title is changed via the title form.
       */
      validator: {
        type: Function,
        value: function() {
          return { valid: true };
        }
      },
      valid: {
        type: Boolean
      },
      currentTitle: {
        type: String,
        value: '',
        notify: true
      },
      newTitle: {
        type: String,
        value: ''
      },
      showEditForm: {
        type: Boolean,
        notify: true
      }
    },
    commitEdit: function() {
      this.currentTitle = this.newTitle;
      this.showEditForm = false;
    },

    cancelEdit: function() {
      this.newTitle = this.currentTitle;
      this.showEditForm = false;
      this.isValid();
    },

    isValid: function() {
      const titleInput = this.$$('#titleInput');
      const invalidTitleError = this.$$('#invalidTitleError');
      const saveButton = this.$$('#commitEdit');

      var result = this.validator(this.newTitle);
      if (result.valid) {
        invalidTitleError.classList.add('hidden');
        invalidTitleError.innerText = '';
        titleInput.classList.remove('validation-error');
        saveButton.disabled = false;
      } else {
        invalidTitleError.classList.remove('hidden');
        invalidTitleError.innerText = result.message || 'Invalid title';
        titleInput.classList.add('validation-error');
        saveButton.disabled = true;
      }
    }
  });
})();
