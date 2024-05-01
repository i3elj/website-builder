<?php require_once 'elements-list.php'; ?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/public/css/style.css" type="text/css" media="screen" />
        <script src="https://unpkg.com/htmx.org@1.9.11"></script>
        <script src="https://unpkg.com/prettier@3.2.5/standalone.js"></script>
        <script src="https://unpkg.com/prettier@3.2.5/plugins/html.js"></script>
        <script src="https://unpkg.com/prettier@3.2.5/plugins/postcss.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.8/ace.min.js"></script>
        <!-- fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    </head>

    <body>
        <h1>Draggable elements</h1>

        <div id="__main">
            <aside>
                <details open>
                    <summary><h2>Elements</h2></summary>

                    <div class="__sidebar-items">
                        <?php foreach ($tags as $tag) : ?>
                            <div class="__elems-container">
                                <div class="__og-drag"
                                     draggable="true"
                                     data-id="<?= $tag['tag-name'] ?>__og-drag">
                                </div>
                                <span><?= $tag['display-name'] ?></span>
                            </div>
                        <?php endforeach ?>
                    </div>
                </details>

                <details>
                    <summary><h2>Classes</h2></summary>
                    <div id="__class-list" class="__sidebar-items"></div>
                </details>
            </aside>

            <main id="__tg-body"></main>
        </div>

        <?php require_once 'context-menu.php' ?>
        <?php require_once 'editors.php' ?>

        <div id="__add-class-wrapper" class="__invisible-bg">
            <form>
                <input type="text" placeholder="type your class name" />
                <button type="submit">Add</button>
            </form>
        </div>
    </body>

    <script type="module" src="/public/js/script.js"></script>
</html>
