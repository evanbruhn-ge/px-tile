"use strict";/**
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
 */(function(){Polymer({is:"px-tile-edit-title-form",properties:{},/**
     * Attach event listeners for dropdown action buttons.
     */attached:function attached(){//this.listen(this, "px-dropdown-selection-changed", "_itemSelected");
},/**
     * Detach event listeners for dropdown action buttons.
     */detached:function detached(){}//this.unlisten(this, "px-dropdown-selection-changed", "_itemSelected");
/**
     * Observer when actionButtons changes.
     * Sets flag _isDisplayDropdown true if actionButtons size is greater than default items size 3, false otherwise.
     * Sets flag _isDisplayButtons true if actionButtons size is less or equal than default items size 3, false otherwise.
     * If _isDisplayDropdown === true it will update px-dropdown options menu
     *//**
     * Sets dropdown
     *//**
     * Callback for on-tap event for action items when the list size is 3 or less
     *//**
     * Callback for selected/unselected action title dropdown items when the list is greater than 3
     *//**
     * Fires px-title-action with selection detail. E.g. {"id": "1", "label": "Favorite", "selected": true}
     *//**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     *//**
     * Returns button type class
     *//**
     * Returns button size class
     *//**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */})})();
//# sourceMappingURL=px-tile-edit-tile-form.js.map
