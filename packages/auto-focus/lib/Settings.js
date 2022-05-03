import Dialog from './Dialog';
import { claz, config } from './util';

const getTitle = (text) => {
    const p = document.createElement('p');
    p.classList.add(claz('vv-setting-title'));
    p.textContent = text;
    return p;
};

export default class Settings extends Dialog {
    constructor(opt = {}) {
        opt.header = '设置';
        opt.onCancel = () => {
            this.form = null;
        };
        opt.onOk = () => {
            const data = new FormData(this.form);
            const shortcut = [];
            for (const entry of data) {
                if (entry[0] === 'preventScroll') {
                    config.set({ 'preventScroll': entry[1] });
                } else {
                    shortcut.push(entry[1]);
                }
            }
            if (shortcut[0] === shortcut[1]) {
                this.showTip('不能有重复键位');
                return;
            }
            config.set({ 'shortcut': shortcut });
            this.hideTip();
            this.close();
        };
        super(opt);
        this.initValue();
        this.initBody();
    }

    initValue() {
        const configTemp = config.get();
        this.preventScroll = configTemp.preventScroll;
        this.shortcut = configTemp.shortcut;
    }

    initBody() {
        this.form = document.createElement('form');
        this.form.appendChild(getTitle('是否自动滚动到聚焦处'));

        const value = document.createElement('div');
        value.classList.add(claz('vv-setting-value'));
        this.form.appendChild(value);

        Object.values(['是', '否']).forEach((v, i) => {
            const id = String(i);
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = id;
            input.name = 'preventScroll';
            input.value = id;
            if (this.preventScroll === id) {
                input.setAttribute('checked', 'checked');
            }
            const label = document.createElement('label');
            label.for = input.id;
            label.textContent = v;
            value.appendChild(input);
            value.appendChild(label);
        });

        this.form.appendChild(getTitle('手动聚焦快捷键'));
        for (let index = 0; index < 2; index++) {
            const selectShortcut = document.createElement('select');
            selectShortcut.name = `shortcut${index + 1}`;
            let data = ['ctrl', 'alt', 'shift'];
            data = index === 1 ? ['', ...data] : data;
            for (const val of data) {
                const option = document.createElement('option');
                option.value = val;
                option.textContent = val || '无';
                selectShortcut.appendChild(option);
            }
            this.form.appendChild(selectShortcut);
        }
        const inputShortcut = document.createElement('input');
        inputShortcut.name = 'shortcut3';
        inputShortcut.setAttribute('readonly', 'readonly');
        inputShortcut.value = this.shortcut[2];
        this.form.appendChild(inputShortcut);

        inputShortcut.addEventListener('keydown', (e) => {
            if ((/^[a-zA-Z]+$/).test(e.key)) {
                inputShortcut.value = e.key.toLowerCase();
            }
        });

        this.body.appendChild(this.form);
    }
}
