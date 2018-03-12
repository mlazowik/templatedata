var options = {
	resGetPath: 'locales/__lng__/__ns__.json',
	detectLngQS: 'lang',
	fallbackLng: 'en',
	useDataAttrOptions: true,
	useCookie: false,
	getAsync: false
};

function rtl() {
	$("html").attr( "dir", "rtl" );

	var floated = [
		$("#lang-box"),
		$("tfoot").find(":button"),
	];

	$.each( floated, function( index, el ) {
		if ( el.css("float") == "right" )
			el.css( "float", "left" );
		else
			el.css( "float", "right" );
	} );

	$("#params").addClass("rtl");
	$("#import").addClass("rtl");
	$("#import-replace").addClass("rtl");
}

$.i18n.init( options, function(t) {
	$("body").i18n();
	$("#desc").attr( "placeholder", t("placeholders.desc") );

	var lang = $.i18n.lng();
	$("#lang-select").val( lang );
	$("html").attr( "lang", lang );

	var rtl_langs = [
		"ar",
		"arc",
		"dv",
		"fa",
		"ha",
		"he",
		"khw",
		"ks",
		"ku",
		"ps",
		"ur",
		"yi"
	];

	if ( $.inArray( lang, rtl_langs ) >= 0 ) {
		rtl();
	}

	$("#lang-select").change( function() {
		document.location.href = '?lang=' + $(this).val();
	} )
} );
