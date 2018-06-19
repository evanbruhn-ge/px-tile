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
        type: Function
      },
      /**
       * The mainTitle property set on the px-tile when the px-tile-edit-title-form component was revealed
       */
      currentTitle: {
        type: String,
        value: '',
        notify: true
      },
      /**
       * The current value of the px-tile edit title input field. If valid, this property is used to set the mainTitle property on save.
       */
      newTitle: {
        type: String,
        value: ''
      },
      /**
       * Property used internally for showing or hiding the edit title form
       */
      showEditForm: {
        type: Boolean,
        notify: true
      }
    },
    /**
     * Applies the input form value to the parent px-tile's mainTitle property (reflected via the currentTitle property) and hides the edit form
     */
    commitEdit: function() {
      const inputValidState = this.getValidity();
      this.applyValidationStyle(inputValidState.valid, inputValidState.message);
      if (inputValidState.valid) {
        this.currentTitle = this.newTitle;
        this.showEditForm = false;
      }
    },

    /**
     * Hides the edit form without saving
     */
    cancelEdit: function() {
      this.newTitle = this.currentTitle;
      this.showEditForm = false;
      this.isValid();
    },

    /**
     * Applies validation styles to the edit form based on the result from the validator function,
     * and triggers save and cancel with the Enter and Escape keys respectively.
     */
    handleKeypress: function(e) {
      const inputValidState = this.getValidity();
      this.applyValidationStyle(inputValidState.valid, inputValidState.message);
      if (inputValidState.valid && e.key === 'Enter') {
        // Save on enter if input is valid
        this.commitEdit();
      }
      if (this.currentTitle && e.key === 'Escape') {
        // Cancel on escape if there's a valid input to revert to
        this.cancelEdit();
      }
    },

    /**
     * Applies validation styles to the edit form.
     */
    applyValidationStyle(valid, message) {
      const titleInput = this.$$('#titleInput');
      const invalidTitleError = this.$$('#invalidTitleError');
      const saveButton = this.$$('#commitEdit');

      if (valid) {
        invalidTitleError.classList.add('hidden');
        invalidTitleError.innerText = '';
        titleInput.classList.remove('validation-error');
        saveButton.disabled = false;
      } else {
        invalidTitleError.classList.remove('hidden');
        invalidTitleError.innerText = message || 'Invalid title';
        titleInput.classList.add('validation-error');
        saveButton.disabled = true;
      }
    },

    /**
     * Determines the validity of the input value. If no validator function is provided, will always report true (ie. valid)
     */
    getValidity: function() {
      return typeof this.validator === 'function' ? this.validator(this.newTitle) : { valid: true };
    }
  });
})();
