import Dialog from './lib/Dialog';
import initStyle from './lib/styles';

/**
 * focus
 * @returns {undefined}
 */
function doFocus() {
    const firstInput = document.querySelector('input:not([type=hidden])');

    if (firstInput) {
        const val = firstInput.value;
        firstInput.value = '';
        firstInput.focus();
        firstInput.value = val;
    }
}

/**
 * init events
 * @returns {undefined}
 */
function initEvents() {
    GM.registerMenuCommand('设置', () => {
        const dialog = new Dialog({ content: '是否自动滚动到聚焦处，默认:true' });
        dialog.open();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'q' && e.ctrlKey) {
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
