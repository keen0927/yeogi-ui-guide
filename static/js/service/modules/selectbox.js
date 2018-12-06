(function(exports, document) {
	function SelectBox(target, options) {
		this.target = target;
		this.options = options;
		this.template = null;

		var _bindTemplate = function(target, options) {
			var values = options.values;
			this.template = _setTemplate(options);

			for (var i = 0; i < values.length; i++) {
				this.template.append('<option value=' + values[i].value + '>' + values[i].text + '</option>');
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
			return this.template.val();
		};

		var _getSelectedText = function() {
			return this.template.children('option:selected').text();
		};

		this.create = function(callback) {
			_bindTemplate(this.target, this.options);
			if (callback) {
				callback();
			}
		};

		this.getSelectedValue = function() {
			return _getSelectedValue();
		};

		this.getSelectedText = function() {
			return _getSelectedText();
		};

		this.onChange = function(callback) {
			this.target.children().on('change', function() {
				callback();
			});
		};
	}

	exports.SelectBox = SelectBox;
})(window, document);
// // selectBox 생성
// var selectboxTarget = $('#checkbox1');
// var selectbox = new SelectBox(selectboxTarget, {
// 	attributes: { name: 'name', id: 'Example', class: 'selectbox-example' },
// 	values: [{ value: 'bnn', text: 'banana' }, { value: 'app', text: 'apple' }, { value: 'grp', text: 'grape' }],
// });

// // selected value를 가져온다.

// selectbox.create(); // do(필수)

// var callback = function() {
// 	alert(selectbox.getSelectedValue() + '가 선택 되었습니다.'); // select된 value을 가져온다.
// 	console.log(selectbox.getSelectedText() + '가 선택 되었습니다.'); // select된 text를 가져온다.
// };
// selectbox.onChange(callback); // onChange event에 콜백을 보낸다.
