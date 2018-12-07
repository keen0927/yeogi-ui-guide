(function(exports, document) {
	'use strict';

	var CheckBox = function(target, options) {
		this.target = target;
		this.options = options;
		var template = null;
		/**
		 * 템플릿을 돔에 그린다.
		 */
		var _bindTemplate = function(target, options) {
			var values = options.values;
			for (var i = 0; i < values.length; i++) {
				target.append(_setTemplate(options, i));
			}
		};

		var _setTemplate = function(options, i) {
			var attr = options.attributes;
			var values = options.values;
			var checkBoxWrapper = createElement(
				'<label />',
				'css-control css-control-sm css-checkbox css-control-primary mr-2'
			);

			var checkBoxInput = $('<input />', {
				class: 'css-control-input',
				type: 'checkbox',
				name: attr.name || null,
				checked: values[i].checked || false,
			});

			var checkboxIndicator = createElement('<span />', 'css-control-indicator');
			var checkboxTitle = $('<span>' + values[i].text + '</span>');

			if (attr.class) {
				checkBoxWrapper.addClass(attr.class);
			}

			checkBoxWrapper.append(checkBoxInput);
			checkBoxWrapper.append(checkboxIndicator);
			checkBoxWrapper.append(checkboxTitle);

			return checkBoxWrapper;
		};

		/**
		 *
		 * @param {HTMLElement} el
		 * @param {String} className
		 * @return {HTMLElement}
		 */
		var createElement = function(el, className) {
			return $(el, { class: className });
		};

		this.create = function() {
			console.log('target', target);
			console.log('options', options);
			_bindTemplate(this.target, this.options);
		};
		/**
		 * 체크된 value를 가져온다.
		 * @return Array
		 */
		this.getCheckedValue = function() {};
		/**
		 * 체크된 텍스트를 가져온다.
		 * @return Array
		 */
		this.getCheckedText = function() {};
		/**
		 * 모든 박스를 체크한다.
		 */
		this.checkAll = function() {};
		/**
		 * 모든 박스를 체크 해제한다.
		 */
		this.uncheckAll = function() {};
		/**
		 * 모든 박스를 토글한다.
		 */
		this.toggle = function() {};
		/**
		 * onChange event에 콜백.
		 */
		this.onChange = function() {};
	};

	exports.CheckBox = CheckBox;
})(window, document);
var checkboxTarget1 = $('#checkbox1');
var examValues = [
	{ value: 'bnn', text: 'banana', checked: false, disable: false },
	{ value: 'app', text: 'apple', checked: true, disable: false },
	{ value: 'grp', text: 'grape', checked: false, disable: true },
];

var checkbox1 = new CheckBox(checkboxTarget1, {
	attributes: { name: 'name', class: 'selected' },
	values: examValues,
});

checkbox1.create();

//TODO: Check all
//TODO: Check Toggle
//TODO: Uncheck all
//TODO: onChange event callback
