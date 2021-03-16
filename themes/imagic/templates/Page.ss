<!DOCTYPE html>
<!--[if !IE]><!-->
<html lang="$ContentLocale">
<!--<![endif]-->
<!--[if IE 6 ]><html lang="$ContentLocale" class="ie ie6"><![endif]-->
<!--[if IE 7 ]><html lang="$ContentLocale" class="ie ie7"><![endif]-->
<!--[if IE 8 ]><html lang="$ContentLocale" class="ie ie8"><![endif]-->
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <link href="_resources/themes/imagic/css/master.css" rel="stylesheet">
	<link rel="shortcut icon" href="themes/simple/images/favicon.ico" />
    <%-- Animate CSS --%>
    <% require css('//cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css') %>
</head>

<body>
<div class="main" role="main">
	$Layout
</div>
<% require javascript('//code.jquery.com/jquery-3.5.1.min.js') %>
<% require javascript('//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js') %>
<% require javascript('_resources/themes/imagic/js/bundle.js') %>
</body>
</html>
