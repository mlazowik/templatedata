//var Param = Backbone.Model.extend({});

var Param = Backbone.Model.extend({
	initialize: function () {
		Backbone.Model.prototype.initialize.apply(this, arguments);
		this.on("change", function (model, options) {
			templatedata(params, $("#desc").val());
			if (options && options.save === false) return;
			model.save();
		});
	}
});

var Params = Backbone.Collection.extend({
	model: Param,
	url: "data/params.json"
});

var params = new Params();

var headerLabel = Backgrid.HeaderCell.extend({
	tagName: "th class=\"span1 tip\" data-toggle=\"tooltip\" id=\"tipLabel\" data-original-title=\"" + $.t("table.tipLabel") + "\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

var headerName = Backgrid.HeaderCell.extend({
	tagName: "th class=\"span1 tip\" data-toggle=\"tooltip\" id=\"tipName\" data-original-title=\"" + $.t("table.tipName") + "\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

var colspan2span1 = Backgrid.HeaderCell.extend({
	tagName: "th colspan=\"2\" class=\"span1\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

var span6 = Backgrid.HeaderCell.extend({
	tagName: "th class=\"span6\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

var span1 = Backgrid.HeaderCell.extend({
	tagName: "th class=\"span1\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

var hidden = Backgrid.HeaderCell.extend({
	tagName: "th style=\"display: none\"",
	render: function () {
		this.$el.empty();
		var $label = this.column.get("label");
		this.$el.text($label);
		this.delegateEvents();
		return this;
	}
});

Backgrid.DuplicateCell = Backgrid.Cell.extend({
	render: function() {
		this.$el.empty();
		this.$el.html('<div class="btn-group"><button class="btn btn-small btn-primary" data-dup>' + $.t("table.dup") + '</button><button class="btn btn-small btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" data-dup>' + $.t("table.dup-below") + '</a></li><li><a href="#" data-dup-end>' + $.t("table.dup-end") + '</a></li></ul></div>');
		this.$el.find("[data-dup]").click({cid: this.model.cid}, dupRow);
		this.$el.find("[data-dup-end]").click({cid: this.model.cid, end: true}, dupRow);
		this.delegateEvents();
		return this;
	}
});

Backgrid.RemoveCell = Backgrid.Cell.extend({
	render: function() {
		this.$el.empty();
		this.$el.html('<button class="btn btn-small btn-danger">' + $.t("table.del") + '</button>');
		this.$el.find(":button").click({cid: this.model.cid}, deleteRow);
		this.delegateEvents();
		return this;
	}
});

Backgrid.AliasesEditor = Backgrid.Extension.TextareaEditor.extend({
	template: _.template('<form><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>' + $.t("table.param-name-header") + '</small></h3></div><div class="modal-body"><div class="well">' + $.t("table.param-name-help") + '</div><textarea class="input-block-level" rows="<%= rows %>"><%- content %></textarea></div><div class="modal-footer"><div><button class="btn" data-dismiss="modal">' + $.t("table.cancel") + '</button><input class="btn btn-primary" type="submit" value="' + $.t("table.save") + '"/></div></div></form>'),
	rows: 5,
	saveOrCancel: function (e) {
		if (e && e.type == "submit") {
			e.preventDefault();
			e.stopPropagation();
		}

		var model = this.model;
		var column = this.column;
		var val = this.$el.find("textarea").val();
		var newValue = this.formatter.toRaw(val);

		if (_.isUndefined(newValue)) {
			model.trigger("backgrid:error", model, column, val);

			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
		else if (!e || e.type == "submit") {
			model.set(column.get("name"), newValue);
			this.$el.modal("hide");
		}
		else if (e.type != "hide")
			this.$el.modal("hide");
	}
});

Backgrid.AliasesCell = Backgrid.Extension.TextCell.extend({
	render: function() {
		this.$el.empty();
		var names = this.model.get(this.column.get("name")).split("\n");
		var hr = (names.length > 1) ? true : false;
		var that = this;
		$.each(names, function(index, value) {
			if ( value != "" )
				that.$el.append($('<code/>').text(value), ' ');
			if (hr) {
				that.$el.append("<hr>");
				hr = false;
			}
		});
		this.delegateEvents();
		return this;
	},
	editor: Backgrid.AliasesEditor
});

Backgrid.EmEmptyCell = Backgrid.StringCell.extend({
	render: function() {
		this.$el.empty();
		var content = this.model.get(this.column.get("name"));
		if (content == "") {
			this.$el.html('<em>' + $.t("table.empty-placeholder") + '</em>');
		} else {
			this.$el.text(content);
		}
		this.delegateEvents();
		return this;
	}
});

Backgrid.EmUnknownCell = Backgrid.SelectCell.extend({
	render: function () {
		this.$el.empty();

		var optionValues = this.optionValues;
		var rawData = this.formatter.fromRaw(this.model.get(this.column.get("name")));

		var selectedText = [];

		try {
			if (!_.isArray(optionValues) || _.isEmpty(optionValues)) throw new TypeError;

			for (var k = 0; k < rawData.length; k++) {
				var rawDatum = rawData[k];

				for (var i = 0; i < optionValues.length; i++) {
					var optionValue = optionValues[i];

					if (_.isArray(optionValue)) {
						var optionText  = optionValue[0];
						var optionValue = optionValue[1];

						if (optionText == "nieokreślony")
							optionText = "<em>nieokreślony</em>";

						if (optionValue == rawDatum) selectedText.push(optionText);
					}
					else if (_.isObject(optionValue)) {
						var optionGroupValues = optionValue.values;

						for (var j = 0; j < optionGroupValues.length; j++) {
							var optionGroupValue = optionGroupValues[j];
							if (optionGroupValue[1] == rawDatum) {
								selectedText.push(optionGroupValue[0]);
							}
						}
					}
					else {
						throw new TypeError;
					}
				}
			}

			this.$el.append(selectedText.join(this.delimiter));
		} catch (ex) {
			if (ex instanceof TypeError) {
				throw TypeError("'optionValues' must be of type {Array.<Array>|Array.<{name: string, values: Array.<Array>}>}");
			}
			throw ex;
		}

		this.delegateEvents();

		return this;
	},
	optionValues: [
		[$.t("table.type-unknown"), "unknown"],
		[$.t("table.type-number"), "number"],
		[$.t("table.type-string"), "string"],
		[$.t("table.type-user"), "string/wiki-user-name"],
		[$.t("table.type-page"), "string/wiki-page-name"]
	]
});

Backgrid.HoverBoolCell = Backgrid.BooleanCell.extend({
	events: {
		"mouseenter": "enterEditMode"
	}
});

var columns = [{
	name: "label",
	label: $.t("table.label"),
	cell: "string",
	sortable: false,
	headerCell: headerLabel
}, {
	name: "param",
	label: $.t("table.name"),
	cell: "aliases",
	sortable: false,
	headerCell: headerName
}, {
	name: "desc",
	label: $.t("table.desc"),
	cell: "string",
	sortable: false,
	headerCell: span6
}, {
	name: "type",
	label: $.t("table.type"),
	cell: "emUnknown",
	sortable: false,
	headerCell: span1
}, {
	name: "default",
	label: $.t("table.default"),
	cell: "emEmpty",
	sortable: false,
	headerCell: span1
}, {
	name: "required",
	label: $.t("table.required"),
	cell: "hoverBool",
	sortable: false,
	headerCell: span1
}, {
	name: "dup",
	label: $.t("table.actions"),
	cell: "duplicate",
	sortable: false,
	editable: false,
	headerCell: colspan2span1
}, {
	name: "remove",
	label: "",
	cell: "remove",
	sortable: false,
	editable: false,
	headerCell: hidden
}];

var AddFooter = Backgrid.Footer.extend({
	render: function () {
		this.$el.empty();
		this.$el.html('<tr><td colspan="8"><button class="btn btn-primary" data-add>' + $.t("table.add") + '</button> <div class="btn-group"><button data-toggle="modal" data-target="#import" class="btn btn-info">' + $.t("table.import") + '</button><button class="btn btn-info dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#import" data-toggle="modal">' + $.t("table.import-append") + '</a></li><li><a href="#import-replace" data-toggle="modal">' + $.t("table.import-replace") + '</a></li></ul></div></td></tr>');
		this.$el.find("[data-add]").click(addRow);
		this.delegateEvents();
		return this;
	}
});

// Initialize a new Grid instance
var grid = new Backgrid.Grid({
	columns: columns,
	collection: params,
	className: "table table-hover table-bordered table-editable",
	footer: AddFooter
});

$(document).ready(function() {
	// Render the grid and attach the root to your HTML document
	$("#params").append(grid.render().$el);
	$(".tip").tooltip({
		container: '.table-editable',
		placement: 'top'
	});
});

// Akcje
function addRow() {
	grid.insertRow([{
		"label": "",
		"param": "",
		"desc": "",
		"type": "string",
		"default": "",
		"required": false
	}]);

	templatedata(params, $("#desc").val());
}

function dupRow(event) {
	event.preventDefault();
	var ind = params.indexOf(params.get(event.data.cid));

	if (event.data.end)
		params.add(params.get(event.data.cid).toJSON());
	else
		params.add(params.get(event.data.cid).toJSON(), {at: ind + 1});

	templatedata(params, $("#desc").val());
}

function deleteRow (event) {
	event.preventDefault();
	params.remove(params.get(event.data.cid));

	templatedata(params, $("#desc").val());
}

function deleteAllRows() {
	params.reset();
}

/* create templatedata json */

function templatedata(collection, description) {
	var data = { description: description };

	var params = {};
	collection.each( function(mParam) {
		var param = {
			label: mParam.get("label"),
			type: mParam.get("type"),
			required: mParam.get("required"),
			description: mParam.get("desc")
		};

		if (mParam.get("default") != "")
			param.default = mParam.get("default");

		var paramNames = mParam.get("param").split("\n");

		var paramName = paramNames[0];
		if (paramNames.length > 1) {
			var aliases = new Array();

			for (var i = 1; i < paramNames.length; ++i) {
				aliases.push( paramNames[i] );
			}

			param.aliases = aliases;
		}

		params[paramName] = param;
	} );

	data.params = params;

	$("#templatedata").text( "<templatedata>\n" + JSON.stringify( data, null, "\t" ) + "\n</templatedata>" );
}

/* import existing templatedata */

function importData(input) {
	try {
		var data = input.replace(/^\s*<templatedata(?:\s.*?)?>/i, '')
				.replace(/<\/templatedata\s*>\s*$/i, '');
		data = $.parseJSON( data );
	} catch (err) {
		return;
	}

	description = $("#desc").val();
	if ( $.type( data.description ) === "string" ) {
		description = data.description;
		$("#desc").val( description );
	}

	if (data.params != null) {
		var model;
		$.each( data.params, function(name, param) {
			model = {
				"label": "",
				"param": "",
				"desc": "",
				"type": "string",
				"default": "",
				"required": false
			};

			model.param = name;

			if ( $.isArray( param.aliases ) ) {
				$.each( param.aliases, function(i, alias) {
					model.param += "\n" + alias;
				} );
			}

			$.each( {
				"label": "label",
				"desc": "description",
				"type": "type",
				"default": "default",
				"required": "required"
				},
				function(m, j) {
					if ( param[j] != null ) {
						model[m] = param[j];
					}
				}
			);

			grid.insertRow([model]);
		} );
	}

	templatedata(params, description);
}

function clearImportForm(el) {
	el.find(".control-group").removeClass("error");
	el.find(".help-inline").text("");
	el.trigger("reset");
	el.find('button[type="submit"]').attr("disabled", "disabled");
}

$(document).ready( function() {
	templatedata(params, $("#desc").val());

	// validate json input
	$("#import, #import-replace").find("textarea").keyup( function() {
		try {
			var data = $(this).val().replace(/^\s*<templatedata(?:\s.*?)?>/i, '')
				.replace(/<\/templatedata\s*>\s*$/i, '');
			
			data = $.parseJSON( data );
			
			$(this).closest(".control-group").removeClass("error");
			$(".help-inline").text("");
			$(this).closest("form").find('button[type="submit"]').removeAttr("disabled");
		
		} catch (err) {
		
			$(this).closest(".control-group").addClass("error");
			$(this).parent().children(".help-inline").text( err );
			$(this).closest("form").find('button[type="submit"]').attr("disabled", "disabled");
		
		}
	} );

	// clear input on hide
	$("#import, #import-replace").on("hidden", function() {
		clearImportForm( $(this).children("form") );
	} );

	// submit import
	$("#import").children("form").submit( function(event) {
		event.preventDefault();

		importData( $(this).find("textarea").val() );

		$(this).parent().modal("hide");
	} );

	$("#import-replace").children("form").submit( function(event) {
		event.preventDefault();

		deleteAllRows();
		importData( $(this).find("textarea").val() );

		$(this).parent().modal("hide");
	} );

	/* on description edit */
	$("#desc").keyup( function() {
		templatedata(params, $(this).val());
	} );
} );
