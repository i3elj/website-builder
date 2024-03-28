<?php require_once './elemslist.php'; ?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="/public/css/style.css" type="text/css" media="screen" />
		<script src="https://unpkg.com/htmx.org@1.9.11"></script>
		<script src="https://unpkg.com/prettier@3.2.5/standalone.js"></script>
		<script src="https://unpkg.com/prettier@3.2.5/plugins/html.js"></script>
		<script src="https://unpkg.com/prettier@3.2.5/plugins/postcss.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.8/ace.min.js"></script>
	</head>

	<body>
		<!-- this should be used for every class-based css.
			 Every id-based css should be a separate <style/> for
			 that element/component all of them being added
			 after the beginning of the <body/> tag -->
		<style id="__user-global-css"></style>

		<h1>Draggable elements</h1>

		<div class="__main">
			<aside>
				<h2>Elements</h2>

				<div id="__elems-list">

					<?php foreach ($tags as $tag) : ?>
						<div class="__elems-container">
							<div
								class="__og-drag"
								draggable="true"
								data-id="<?= $tag['tag-name'] ?>__og-drag"
							></div>
							<span><?= $tag['display-name'] ?></span>
						</div>
					<?php endforeach ?>

				</div>
			</aside>

			<main id="__tg-body"></main>
		</div>

		<div id="__ctx-menu-wrapper" class="__invisible-bg">
			<div id="__ctx-menu">
				<p id="__ctx-menu_tag">None</p>
				<button><i>󰆴</i>Delete</button>
				<hr/>
				<button><i></i>Edit HTML</button>
				<button><i>󰃣</i>Edit Style</button>
				<button><i></i>Add ID</button>
				<button><i>󰌖</i>Add Class</button>
			</div>
		</div>

		<div id="__editors-wrapper" class="__invisible-bg">
			<div id="__html-wrapper" class="__editor-wrapper">
				<div id="__html-titlebar" class="__editor-titlebar">
					<p>None</p>

					<div class="__titlebar-btns">
						<button id="__html-save-btn" class="__editor-btn __editor-save-btn">
							Save
						</button>
						<button id="__html-close-btn" class="__editor-btn __editor-close-btn">
							Close
						</button>
					</div>
				</div>

				<div id="__html" class="__editor"></div>
			</div>

			<div id="__css-wrapper" class="__editor-wrapper">
				<div id="__css-titlebar" class="__editor-titlebar">
					<p>None</p>

					<div class="__titlebar-btns">
						<button id="__css-save-btn" class="__editor-btn __editor-save-btn">
							Save
						</button>
						<button id="__css-close-btn" class="__editor-btn __editor-close-btn">
							Close
						</button>
					</div>
				</div>

				<div id="__css" class="__editor"></div>
			</div>
		</div>

		<div id="__add-class-wrapper" class="__invisible-bg">
			<form>
				<input type="text" placeholder="type your class name" />
				<button type="submit">Add</button>
			</form>
		</div>

		<div id="__add-id-wrapper" class="__invisible-bg">
			<form>
				<input type="text" placeholder="type some id" />
				<button type="submit">Add</button>
			</form>
		</div>
	</body>

	<script type="module" src="/public/js/script.js"></script>
</html>
