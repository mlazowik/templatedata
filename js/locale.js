var options = {
	resGetPath: 'locales/__lng__/__ns__.json',
	detectLngQS: 'lang',
	fallbackLng: 'en',
	useDataAttrOptions: true,
	useCookie: false,
	getAsync: false
};

$.i18n.init( options, function(t) {
	$("body").i18n();
	$("#desc").attr( "placeholder", t("placeholders.desc") );

	var lang = $.i18n.lng().split("-");
	$("#lang-select").val( lang[0] );

	$("#lang-select").change( function() {
		document.location.href = '?lang=' + $(this).val();
	} )
} );
