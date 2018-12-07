var SelectBox = function(target, options) {
	this.target = target;
	this.options = options;
	var template = null;

	var _bindTemplate = function(target, options) {
		var values = options.values;
		template = _setTemplate(options);

		for (var i = 0; i < values.length; i++) {
			template.append('<option value=' + values[i].value + '>' + values[i].text + '</option>');
		}
		target.append(template);
	};

	var _setTemplate = function(options) {
		var attributes = options.attributes;
		var selectWrapper = $('<select />', {
			class: 'form-control custom-select ',
		});
		if (attributes.name) {
			selectWrapper.attr('name', attributes.name);
		}
		if (attributes.id) {
			selectWrapper.attr('id', attributes.id);
		}
		if (attributes.class) {
			selectWrapper.addClass(attributes.class);
		}
		return selectWrapper;
	};

	var _getSelectedValue = function() {
		return template.val();
	};

	var _getSelectedText = function() {
		return template.children('option:selected').text();
	};

	/**
	 * create 후에 callback 을 전달받을 수 있다.
	 * @param { function } callback
	 */
	this.create = function(callback) {
		_bindTemplate(this.target, this.options);
		if (callback && typeof callback === 'function') {
			callback();
		}
	};

	/**
	 * 사용자가 선택한 밸류를 가져온다.
	 * @return { String }
	 */
	this.getSelectedValue = function() {
		return _getSelectedValue();
	};

	/**
	 * 사용자가 선택한 텍스트를 가져온다.
	 * @return { String }
	 */
	this.getSelectedText = function() {
		return _getSelectedText();
	};

	/**
	 * value를 재셋팅한다.
	 * @param { Array } arr
	 */
	this.setValues = function(arr) {
		if (arr) {
			template.text('');
			for (var i = 0; i < arr.length; i++) {
				template.append('<option value="' + arr[i].value + '">' + arr[i].text + '</option>');
			}
		}
	};

	this.onChange = function(callback) {
		if (callback && typeof callback === 'function') {
			this.target.children().on('change', function() {
				callback();
			});
		}
	};
};
