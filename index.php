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
						<h1>Generator TemplateData</h1>
					</div>
					<div class="row">
						<div class="span10 offset1">
							<h2>Opis</h2>
							<textarea class="input-block-level" rows="2" placeholder="opis szablonu" id="desc"></textarea>
							<h2>Parametry</h2>
							<div id="params" class="backgid-container"></div>
							<h2>Wynik</h2>
							<pre id="templatedata"></pre>
						</div>
					</div>
				</div>
			</div>
		</div>

		<footer class="footer">
			<div class="container narrow row-fluid">
				<div class="span12">
					<p>Stworzone przez <a target="_blank" href="https://pl.wikipedia.org/wiki/Wikipedysta:Lazowik">mlazowik</a> za pomocą:</p>
					<a target="_blank" href="http://backgridjs.com/">Backgrid.js</a>
					· <a target="_blank" href="http://twitter.github.io/bootstrap/">Bootstrap</a>
					· <a target="_blank" href="http://jquery.com/">jQuery</a>
				</div>
			</div>
		</footer>

		<?php
		require '../js.php';
		?>
		<script src="js/underscore.js"></script>
		<script src="js/backbone.js"></script>
		<script src="js/backgrid.min.js"></script>
		<script src="js/backgrid-text-cell.min.js"></script>
		<script src="js/params.js"></script>
	</body>
</html>
