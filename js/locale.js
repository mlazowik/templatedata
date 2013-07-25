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
	$("#lang-select").val( $.i18n.lng() );

	$("#lang-select").change( function() {
		document.location.href = '?lang=' + $(this).val();
	} )
} );
