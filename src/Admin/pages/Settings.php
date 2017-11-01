<?php defined('ABSPATH') or exit; ?>
<div class="wrap formable-settings">
    <h1 class="page-title">Formable</h1>

    <p>
        You are succesfully connected to Formable.
    </p>

    <div class="postbox stuffbox">
        <div class="inside">
            <h2>Shortcodes</h2>
            <p>
                Insert your forms into posts and pages by using the following shortcodes:
            </p>

            <ul class="formable-shortcodes">
                <?php foreach ($page->forms as $form) : ?>
                <li>
                    <h3>
                        <?php echo $form['title']; ?>
                        <a href="<?php echo FORMABLE_STATIC_URL; ?>/forms/edit/<?php echo esc_attr($form['id']); ?>" target="_blank">Edit form</a>
                    </h3>
                    <input 
                        type="text"
                        value="<?php echo esc_attr('[formable id="' . $form['id'] . '"]'); ?>"
                        readonly="readonly"
                    />
                </li>
                <?php endforeach ?>
            </ul>

            <p>
                <a href="<?php echo FORMABLE_STATIC_URL; ?>/forms/create" target="_blank">Create new form</a>
            </p>
        </div>
    </div> 

    <h2>Sync status</h2>
    <p>
        Currently synced forms: <?php echo sizeof($page->forms); ?><br />
        Last updated: <?php echo $page->lastUpdated; ?>
    </p>
    
    <div class="formable-actions">
        <form action="?page=formable" method="POST">
            <input type="hidden" name="refreshForms" value="true" />
            <button class="button" type="submit">Refresh forms now</button>
        </form>

        <form action="?page=formable" method="POST">
            <input type="hidden" name="unlink" value="true" />
            <button class="button" id="unlink-formable" type="submit">Unlink from Formable</button>
        </form>
    </div>
</div>