<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6624e64b43d8b10f84ff63c345cfa51d
{
    public static $classMap = array (
        'Formable\\Admin' => __DIR__ . '/../..' . '/src/Admin/Admin.php',
        'Formable\\Client' => __DIR__ . '/../..' . '/src/Client.php',
        'Formable\\FormableAPI' => __DIR__ . '/../..' . '/src/Admin/FormableAPI.php',
        'Formable\\Forms' => __DIR__ . '/../..' . '/src/Admin/Forms.php',
        'Formable\\Settings' => __DIR__ . '/../..' . '/src/Admin/Settings.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit6624e64b43d8b10f84ff63c345cfa51d::$classMap;

        }, null, ClassLoader::class);
    }
}
