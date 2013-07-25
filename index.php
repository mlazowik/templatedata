<?php
require '../head.php';
$page = 'templatedata';
?>
		<link rel="stylesheet" href="style/table.css" />
		<link rel="stylesheet" href="style/main.css" />
		<link rel="stylesheet" href="style/backgrid.min.css" />
		<link rel="stylesheet" href="style/backgrid-text-cell.min.css" />

		<title>TemplateData</title>
	</head>

	<body>
		<?php
		require '../nav.php';
		?>
		<div class="container">
			<div class="row">
				<div class="span12">
					<div class="page-header">
						<h1 data-i18n="headers.page">Edytor TemplateData</h1>
					</div>
					<div class="row">
						<div class="span10 offset1">
							<div class="pull-right">
								<select id="lang-select">
									<option value="en">English</option>
									<option value="nl">Nederlands</option>
									<option value="pl">Polski</option>
								</select>
								<p class="translate-help"><small><a href="#translate-info">Want to help with translating?</a></small></p>
							</div>
							<h2 data-i18n="headers.desc">Opis</h2>
							<textarea class="input-block-level" rows="2" placeholder="opis szablonu" id="desc"></textarea>
							<h2 data-i18n="headers.params">Parametry</h2>
							<div id="params" class="backgid-container"></div>
							<h2 data-i18n="headers.result">Wynik</h2>
							<pre id="templatedata"></pre>
						</div>
					</div>
				</div>
			</div>
		</div>

		<footer class="footer">
			<div class="container">
				<div class="row">
					<div class="span12">
						<div class="row">
							<div class="span10 offset1">
								<p id="translate-info">You can send me translations in the <a target="_blank" href="locales/en/translation.json">following</a> format. Just write on my <a target="_blank" href="https://pl.wikipedia.org/wiki/Dyskusja_wikipedysty:Lazowik">talk page</a> and include a link to <a target="_blank" href="http://pastebin.com/">pastebin</a> or anything similar. Or send me an email to &ltmy github username&gt at tools.wikimedia.pl. <strong>Let's make this tool avaible to everyone!</strong></p>
								<hr>
								<p>Stworzone (<a target="_blank" href="https://github.com/mlazowik/templatedata">github</a>) przez <a target="_blank" href="https://pl.wikipedia.org/wiki/Wikipedysta:Lazowik">mlazowik</a> za pomocą:</p>
								<a target="_blank" href="http://backgridjs.com/">Backgrid.js</a>
								· <a target="_blank" href="http://twitter.github.io/bootstrap/">Bootstrap</a>
								· <a target="_blank" href="http://jquery.com/">jQuery</a>
								· <a target="_blank" href="http://i18next.com">i18next</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>

		<?php
		require '../js.php';
		?>
		<script type="text/javascript" src="js/i18next.min.js"></script>
		<script type="text/javascript" src="js/locale.js"></script>
		<script type="text/javascript" src="js/underscore.js"></script>
		<script type="text/javascript" src="js/backbone.js"></script>
		<script type="text/javascript" src="js/backgrid.min.js"></script>
		<script type="text/javascript" src="js/backgrid-text-cell.min.js"></script>
		<script type="text/javascript" src="js/params.js"></script>
	</body>
</html>
