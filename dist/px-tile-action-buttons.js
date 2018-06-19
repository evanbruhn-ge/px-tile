'use strict';/**
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
 */(function(){Polymer({is:'px-tile-action-buttons',properties:{/**
       * Current text color of overlay to apply other elements when hovering
       */hoverTextColor:{type:String,value:''},/**
       * Boolean to find out if items list is in overlay
       */overlay:{type:Boolean,value:false},/**
       * Boolean to display primary button
       */primary:{type:Boolean,value:false},/**
       * Action buttons to display below the description/copy text.
       * Please refer to px-dropdown (https://github.com/PredixDev/px-dropdown) for a list of supported properties
       */actionButtons:{type:Object,value:{},observer:'_actionButtonsChanged'}},/**
     * Attach event listeners for dropdown action buttons.
     */attached:function attached(){this.listen(this,'px-dropdown-selection-changed','_itemSelected')},/**
     * Detach event listeners for dropdown action buttons.
     */detached:function detached(){this.unlisten(this,'px-dropdown-selection-changed','_itemSelected')},/**
     * Observer when actionButtons changes.  
     * Sets flag _isDisplayDropdown true if actionButtons size is greater than default items size 3, false otherwise.
     * Sets flag _isDisplayButtons true if actionButtons size is less or equal than default items size 3, false otherwise.
     * If _isDisplayDropdown === true it will update px-dropdown options menu
     */_actionButtonsChanged:function _actionButtonsChanged(){// set _notifyActionChange false to prevent firing px-dropdown-selection-changed while updating the new set of buttons
this._notifyActionChange=false;var actionBtns=JSON.parse(JSON.stringify(this.actionButtons));// set default max buttons if not passed in the JSON object
var maxButtons=actionBtns.maxButtons||3;// set default max primary buttons if not passed in the JSON object
var maxPrimaryButtons=actionBtns.maxPrimaryButtons||1;var primaryBtns=[];var btns=[];for(var x in actionBtns.items){if(actionBtns.items[x].isPrimary){if(primaryBtns.length<maxPrimaryButtons){// add primary button to array
primaryBtns.push(actionBtns.items[x])}else{// just delete isPrimary to add to btns array
delete actionBtns.items[x].isPrimary}}if(!actionBtns.items[x].isPrimary){btns.push(actionBtns.items[x])}}this._isDisplayDropdown=false;if(this.primary){actionBtns.items=primaryBtns}else{actionBtns.items=btns;this._isDisplayDropdown=actionBtns.items.length>maxButtons}this._isDisplayButtons=false;if(this._isDisplayDropdown){this._setupDropdownButtons(actionBtns)}else{this._items=actionBtns.items;this._isDisplayButtons=true}this._notifyActionChange=true},/**
     * Sets dropdown 
     */_setupDropdownButtons:function _setupDropdownButtons(actionBtns){this.async(function(){var pxDropdown=this.$$('#pxDropdown');pxDropdown.style.height='20px';for(var x in actionBtns.items){// px-dropdown has key and val
var item=actionBtns.items[x];item.key=item.id||item.key;item.val=item.label||item.val;delete item.id;delete item.label;if(!actionBtns.multi){delete item.selected}}// there are only two options for sortMode and selectBy in px-dropdown
if(actionBtns.sortMode&&actionBtns.sortMode==='label'){actionBtns.sortMode='val'}else if(actionBtns.sortMode!=='val'){actionBtns.sortMode='key'}if(actionBtns.selectBy&&actionBtns.selectBy==='label'){actionBtns.selectBy='val'}else if(actionBtns.selectBy!=='val'){actionBtns.selectBy='key'}for(var id in actionBtns){// set other properties from dropdown if passed
pxDropdown.set(id,actionBtns[id])}// set _items here 
this._items=actionBtns.items;this.async(function(){// adjust dropdown to appear aligned to the right
var dropdown=Polymer.dom(pxDropdown.root).querySelector('#content');dropdown.set('horizontalAlign','right');var button=Polymer.dom(pxDropdown.root).querySelector('#button');this.button=button;this.pxIcon=Polymer.dom(button).querySelector('px-icon');if(this.pxIcon){this.pxIcon.style.right='-6px';if(this.overlay){this.pxIcon.style.color=this.hoverTextColor}}})},100)},/**
     * Callback for on-tap event for action items when the list size is 3 or less
     */_onSelected:function _onSelected(evt){var item=evt.detail.model||evt.model.item;this._handleSelection({label:item.label,id:item.id})},/**
     * Callback for selected/unselected action title dropdown items when the list is greater than 3
     */_itemSelected:function _itemSelected(evt){this._handleSelection({label:evt.detail.detail.item.title,id:evt.detail.detail.selected})},/**
     * Fires px-title-action with selection detail. E.g. {"id": "1", "label": "Favorite", "selected": true}
     */_handleSelection:function _handleSelection(detail){if(this._notifyActionChange){this.fire('px-tile-action-tapped',detail)}},/**
     * Return button class type and size if any
     * See https://github.com/PredixDev/px-buttons-design for more details.
     */_getBtnClazz:function _getBtnClazz(item){var clazzset=this._getBtnSize(item.size);clazzset=this._getBtnType(item.type,clazzset);if(item.buttonIcon===true){clazzset.push('btn--icon')}if(item.disabled===true){clazzset.push('btn--disabled')}if(this.primary&&!item.isPrimary||!this.primary&&item.isPrimary){clazzset.push('hidden')}return clazzset.join(' ').trim()},/**
     * Returns button type class
     */_getBtnType:function _getBtnType(type,array){array=array||[];if(type){switch(type.trim()){case'primary':array.push('btn--primary');break;case'call to action':array.push('btn--call-to-action');break;case'tertiary':array.push('btn--tertiary');break;case'bare':array.push('btn--bare');if(this.overlay){array.push('btn-overlay')}break;case'bare primary':array.push('btn--bare--primary');if(this.overlay){array.push('btn-overlay')}else{array.push('btn-tile-bare-primary')}break;}}return array},/**
     * Returns button size class
     */_getBtnSize:function _getBtnSize(size,array){array=array||[];if(size){switch(size.trim()){case'small':array.push('btn--small');break;case'large':array.push('btn--large');break;case'huge':array.push('btn--huge');break;case'full':array.push('btn--full');break;}}return array},/**
     * Return style for color.  This property is part of px-button so honor if passed on.
     */_getBtnColor:function _getBtnColor(item){var color='';if(item.color){color='color: '+item.color+'; stroke: '+item.color+'; '}return color}})})();
//# sourceMappingURL=px-tile-action-buttons.js.map
