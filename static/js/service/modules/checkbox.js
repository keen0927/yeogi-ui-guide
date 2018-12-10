(function(exports, document) {
	'use strict';

	var CheckBox = function(target, options) {
		this.target = target;
		this.options = options;
		var template = null;
		var self = this;
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
			var values = options.values[i];
			var checkBoxWrapper = createElement(
				'<label />',
				'css-control css-control-sm css-checkbox css-control-primary'
			);

			var checkBoxInput = $('<input />', {
				class: 'css-control-input',
				type: 'checkbox',
				name: attr.name || null,
				value: values.value || '',
				checked: values.checked || false,
			});

			var checkboxIndicator = createElement('<span />', 'css-control-indicator');
			var checkboxTitle = $('<span>' + values.text + '</span>');

			if (attr.class) {
				checkBoxWrapper.addClass(attr.class);
			}
			if (!!values.disable) {
				checkBoxInput.attr('disabled', true);
			} else {
				checkBoxInput.removeAttr('disabled');
			}

			checkBoxWrapper.append(checkBoxInput);
			checkBoxWrapper.append(checkboxIndicator);
			checkBoxWrapper.append(checkboxTitle);

			return checkBoxWrapper;
		};

		var _getChecked = function() {
			var options = self.options;
			var checkedBox = self.target.find('input[name=' + options.attributes.name + ']:checked');
			return checkedBox;
		};

		var _getCheckedValue = function() {
			var checkedBox = _getChecked();
			var checkedValue = [];
			checkedBox.each(function() {
				checkedValue.push($(this).val());
			});
			return checkedValue;
		};

		var _checkAll = function() {
			return self.target
				.find(':checkbox')
				.filter(':not(:disabled)')
				.filter(':visible')
				.prop('checked', true)
				.trigger('change');
		};
		var _unCheckAll = function() {
			return self.target
				.find(':checkbox')
				.filter(':not(:disabled)')
				.filter(':visible')
				.prop('checked', false)
				.trigger('change');
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
			_bindTemplate(this.target, this.options);
		};
		/**
		 * 체크된 value를 가져온다.
		 * @return Array
		 */
		this.getCheckedValue = function() {
			return _getCheckedValue();
		};
		/**
		 * 모든 박스를 체크한다.
		 */
		this.checkAll = function() {
			return _checkAll();
		};
		/**
		 * 모든 박스를 체크 해제한다.
		 */
		this.unCheckAll = function() {
			return _unCheckAll();
		};
		/**
		 * onChange event에 콜백.
		 */
		this.onChange = function() {
			return _onChange();
		};
	};

	exports.CheckBox = CheckBox;
})(window, document);
