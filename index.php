<?php
require_once './elemslist.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css" type="text/css" media="screen" />
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
                            <div id="<?= $tag['tag-name'] ?>__og-drag"
                                 class="__og-drag"
                                 draggable="true"></div>
                            <span><?= $tag['display-name'] ?></span>
                        </div>
                    <?php endforeach ?>
                </div>
            </aside>

            <main id="__tg-body"></main>
        </div>
    </body>

    <script type="text/javascript" src="script.js"></script>
</html>
