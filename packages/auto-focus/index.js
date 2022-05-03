import Settings from './lib/Settings';
import initStyle from './lib/styles';
import { initConfig, config } from './lib/util';

/**
 * focus
 * @returns {undefined}
 */
function doFocus() {
    const preventScroll = config.get().preventScroll === '0';
    const firstInput = document.querySelector('input:not([type=hidden])');

    if (firstInput) {
        const val = firstInput.value;
        firstInput.value = '';
        firstInput.focus({ preventScroll });
        firstInput.value = val;
    }
}

/**
 * init events
 * @returns {undefined}
 */
function initEvents() {
    GM.registerMenuCommand('设置', () => {
        const settings = new Settings();
        settings.open();
    });

    document.addEventListener('keydown', function (e) {
        const [key1, key2, key3] = config.get().shortcut;
        const hasKey2 = key2 ? e[`${key2}Key`] : true;
        if (e[`${key1}Key`] && hasKey2 && e.key.toLowerCase() === key3) {
            doFocus();
        }
    });
}

/**
 * entry
 * @returns {undefined}
 */
function load() {
    doFocus();
    initConfig();
    initStyle();
    initEvents();
}

if (document.readyState === 'loading') {
    const init = () => {
        load();
        document.removeEventListener('DOMContentLoaded', init);
    };
    document.addEventListener('DOMContentLoaded', init);
} else {
    load();
}
