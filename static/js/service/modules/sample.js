/**
 * handler 생성, data 생성 및 , 사용컨트롤 생성
 */
function consultCodeHandler(){

  this.data = [];
  this.ctrl = null;
  this.targetId = "";
  this.events = {};
  this.selecter = "";

  this.setData = function(data){
      this.data = data;
  }

  this.errorHandler = function(error){
      console.log(error)
  }

  this.getData = function(state, callback){
      var me =this;
      $.ajax({
          type:'GET',
          dataType:'JSON',
          cache:false,
          url:'/ipcc/allConsultCode',
          data:{
              state :  state
          },
          success: function(data){
              callback.call(me, data);
          },
          error: this.errorHandler
      });
  }

  this.getSelectedValue = function(){
      return this.ctrl.getSelectedValue();
  }

  this.setSelectedValue = function(value, dataId) {
      this.ctrl.setSelectedValue(value, null, dataId);
  }

  this.init = function(ctrlName, targetId, callback) {

      this.targetId = targetId;

      var state = '';

      //select ctrl 용 객체 생성
      if(ctrlName == 'select') {
          this.ctrl = new selectCtrl();
      }

      //list ctrl 용 객체 생성
      if(ctrlName == 'list') {
          this.ctrl = new listCtrl();
          state = 'Y';
      }

      this.getData(state, function(data){
          this.setData(data);
          this.ctrl.init(this);

          if(callback){
              callback.call(this);
          }
      });
  }

  this.setSelecter  = function(selecter){
      this.selecter = selecter;
  }

  this.appendEvent = function (eventName, callback){
      this.events[eventName] = callback;
  }

  this.clearSelectedValue = function(){
      this.ctrl.clearSelectedValue();
  }

  this.selectDatas = function(dataId) {

      if(dataId){
          return this.ctrl.selectDatas[dataId];
      } else {
          return this.ctrl.getSelectedValue();
      }
  }

}

/**
* list 컨트롤 사용시
*/
function listCtrl() {

  this.defaultTag = "<a class='list-group-item' data-value='@val' data-depth='@depth' data-parent='@parent'> @name @icon</a>";
  this.iconTag    = "<i class='pull-right glyphicon glyphicon-chevron-right'></i>";
  this.maxDepth   = 5;
  this.data       = null;
  this.me         = null;
  this.targetId   = "";
  this.events     = null;

  this.selectValues = {};

  // key: dataId, value: selecValues
  this.selectDatas = {};


  this.addEvent = function(){
      //event 발생시 This 의 범위가 변경 되므로 변수로 받아서 사용
      var me   = this.me;

      $(document).on("click", '#' + this.targetId  + ' a', function(){
          var depth  = $(this).attr('data-depth');
          var value  = $(this).attr('data-value');
          var parent = $(this).attr('data-parent');
          var dataId = $(this).parent().attr('data-id');
          //값저장
          me.ctrl.setSelectedValue(value, depth, dataId);
          //control select 표시
          me.ctrl.setActive(depth, value, dataId);

          if (depth == 5) {
              me.ctrl.setComment(parent, value, dataId);
              return;
          }

          depth = parseInt(depth);
          var list = me.ctrl.getData(depth, value);
          me.ctrl.appendOptionTag(list, "depth" + (depth+1), depth, value, dataId);

          if(me.events && me.events['click'] != undefined && me.events['click'] != null ) {
              me.events['click'].call(this);
          }
      });

  }

  this.setActive = function (depth, value, dataId) {
      var depth = parseInt(depth);
      $("#depth" + depth + "[data-id='"+dataId+"'] a").removeClass('active');
      if( value ){
          $("#depth" + depth + "[data-id='"+dataId+"'] a[data-value=" + value + "]").addClass('active');
      }
  }

  this.init = function(obj){
      this.me       = obj;
      this.data     = obj.data;
      this.targetId = obj.targetId;
      this.callback = obj.callback;
      this.events   = obj.events;

      for(var i=0; i<this.maxDepth; i++){
          this.selectValues[i+1] = null;
      }

      this.addEvent();
      var list = this.getData(0);
      this.appendOptionTag(list, 'depth1', 0, 0);
  }

  this.getData = function(depth, parentCode) {
      if(!this.data) {
          return [];
      }

      var target = null;
      if(depth == 0){
          target = this.data[1];
      } else {
          target = this.data[depth + 1][parentCode];
      }
      if (target == null) {
          return [];
      }

      return target;
  }

  this.ctrlInit = function (depth, dataId){
      if(depth == undefined && depth == null && depth == "") {
          depth = 0;
      }

      $("#" + this.targetId+ "[data-id='"+dataId+"']"  + " #comment-content").text("");
      for(var i=depth; i<this.maxDepth; i++ ) {
          var targetId = "#"+this.targetId+"[data-id='"+dataId + "'] #depth" + (i+1);

          if(this.selectValues[i + 1]) {
              this.selectValues[i + 1] = "";
          }

          if(this.selectDatas[dataId]) {
              this.selectDatas[dataId][i + 1] = "";
          }
          $(targetId).empty();
      }

  }

  this.setComment = function (parent, value, dataId){
      var data  = this.data[this.maxDepth][parent];
      var comment = "";

      for(var i=0; i< data.length; i++){
          if(value == data[i].code) {
              comment = data[i].comment;
              break;
          }
      }

      if(comment == "") {
          return;
      }
      $("#" + this.targetId + "[data-id='" + dataId + "']"  + " #comment-content").text(comment);
  }

  this.appendOptionTag = function (list, target, depth, value, dataId) {
      var TAG = this.defaultTag;
      var html      = "";
      var depth = parseInt(depth);

      this.ctrlInit(depth, dataId);

      for(var i=0; i< list.length; i++) {
          var tag = TAG.replace('@val', list[i].code);
          tag     = tag.replace('@depth', depth + 1);

          if(depth != 4) {
              tag = tag.replace('@icon', this.iconTag);
          } else {
              tag = tag.replace('@icon', '');
          }
          
          tag = tag.replace('@parent', value);
          html   += tag.replace('@name', list[i].name);
      }

      if(dataId){
          $("#"+this.me.targetId + " #"+target + "[data-id='"+dataId+"']").append(html);
      } else {
          $("#"+this.me.targetId + " #"+target).append(html);
      }
  }

  this.setSelectedValue = function (value, depth, dataId){

      if( typeof value == 'object') {
          this.__setSelectedValue(value, dataId);
      } else {

          if(!this.selectDatas[dataId]) {
              this.selectDatas[dataId] = {
                  1: "", 2: "", 3: "", 4: "", 5: ""
              }
          }
          this.selectDatas[dataId][depth] = value;
          this.selectValues[depth] = value;
      }
  }

  this.__setSelectedValue = function (value, dataId) {
      this.ctrlInit(1, dataId);

      if(dataId){
          $("#" + this.targetId+ "[data-id='"+dataId+"']"  + " #comment-content").text("");
      } else {
          $("#" + this.targetId+ " #comment-content").text("");
      }

      for (var key in value) {
          key = parseInt(key);
          this.setActive(key, value[key], dataId);
          if (value[key] != '') {
              if (key == 5) continue;
              var list = this.getData(key, value[key]);
              if (list) {
                  this.appendOptionTag(list, 'depth' + (key + 1), key, value[key], dataId);
              }
          }
          if(!this.selectDatas[dataId]) {
              this.selectDatas[dataId] = {
                  1: "", 2: "", 3: "", 4: "", 5: ""
              }
          }
          this.selectValues[key] = value[key];
          this.selectDatas[dataId][key] =  value[key];
      }
  }

  this.clearSelectedValue = function() {
      this.__setSelectedValue({
          1 :"",2 :"",3 :"",4:"",5 :""
      });

      this.selectDatas = {};
  }

  this.getSelectedValue = function(dataId){
      return this.selectValues;
  }

}

/**
* select 컨트롤 사용시
*/
function selectCtrl() {

  this.defaultTag = "<option value =''> - 선택 - </option>";
  this.tagTemp    = "<option value ='@val'> @name </option>";
  this.maxDepth   = 5;
  this.data       = null;
  this.me         = null;
  this.targetId   = "";
  this.selectValues = {};
  this.events   = null;

  this.addEvent = function () {
      var me = this.me;
      var eventTargetId = "#" + this.me.targetId + " select";
      $(eventTargetId).on('change', function () {
          var depth = parseInt($(this).attr('data-depth'));

          if(me.events && me.events['change'] != undefined && me.events['change'] != null ) {
              me.events['change'].call(this);
          }

          if (depth == 5) {
              return;
          }
          me.ctrl.ctrlInit(depth);
          var value = $(this).val();
          var target = me.data[depth + 1][value];
          if (target == null) {
              return;
          }
          me.ctrl.appendOptionTag(target, 'depth' + (depth + 1));
      });
  }

  this.init = function (obj) {
      this.me = obj;
      this.data = obj.data;
      this.targetId = obj.targetId;

      for (var i = 0; i < this.maxDepth; i++) {
          this.selectValues[i + 1] = null;
      }

      this.addEvent();
      this.appendOptionTag(this.data[1], 'depth' + 1);
  }

  this.ctrlInit = function (depth) {

      if (depth == undefined && depth == null && depth == "") {
          depth = 0;
      }

      for (var i = depth; i < this.maxDepth; i++) {

          if(this.selectValues[i + 1]) {
              this.selectValues[i + 1] = null;
          }

          var eventTargetId = "#" + this.me.targetId + " select#depth" + (i + 1);
          $(eventTargetId).empty();
          $(eventTargetId).append(this.defaultTag);
      }
  }

  this.appendOptionTag = function (list, target) {
      var html = "";
      for (var i = 0; i < list.length; i++) {
          var tag = this.tagTemp.replace('@val', list[i].code);
          if (list[i].state == 'N') {
              html += tag.replace('@name', '(구)' + list[i].name);
          } else {
              html += tag.replace('@name', list[i].name);
          }
      }
      $("select#" + target).append(html);
  }

  this.clearSelectedValue = function() {
      this.selectValues = {
          1 :"",2 :"",3 :"",4:"",5 :""
      };
  }


  this.getSelectedValue = function () {
      return this.selectValues;
  }

  this.setSelectedValue = function (value) {
      this.selectValues = value;
      for (var key in this.selectValues) {
          var value = this.selectValues[key];
          var eventTargetId = "#" + this.me.targetId + " select#depth" + key;
          $(eventTargetId).val(value);
          key = parseInt(key);

          if(key+1 <= 5) {
              var target = this.data[key + 1][value];
              if (target == null) {
                  return;
              }
          }
          this.appendOptionTag(target, 'depth' + (key + 1));
      }
  }
}
