<?php
require_once './elemslist.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/public/css/style.css" type="text/css" media="screen" />
        <script src="https://unpkg.com/htmx.org@1.9.11"></script>
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    </head>

    <body>
        <h1>Draggable elements</h1>

        <div class="__editor">
            <aside>
                <h2>Elements</h2>

                <div id="__elems-list">
                    <?php foreach ($tags as $tag) : ?>
                        <div class="__elems-container">
                            <div class="<?= $tag['tag-name'] ?>__og-drag __og-drag"
                                 draggable="true"></div>
                            <span><?= $tag['display-name'] ?></span>
                        </div>
                    <?php endforeach ?>
                </div>
            </aside>

            <main id="__tg-body"></main>
        </div>

        <div id="__ctx-menu-wrapper">
            <div id="__ctx-menu">
                <p id="__ctx-menu_tag">None</p>
                <p><i>󰆴</i>Delete</p>
                <hr/>
                <p><i></i>Edit HTML</p>
                <p><i>󰃣</i>Edit Style</p>
            </div>
        </div>
    </body>

    <script type="module" src="/public/js/script.js"></script>
</html>
