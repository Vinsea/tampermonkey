import { claz } from './util';

const bodyOverflow = document.body.style.overflow;

class Dialog {
    constructor(opt) {
        this.option = Object.assign({
            header: '提示',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk: () => ({}),
            onCancel: () => ({})
        }, opt);

        this.init();
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(claz('vv-dialog-wrapper'));

        const container = document.createElement('div');
        container.classList.add(claz('vv-dialog'));
        this.wrapper.appendChild(container);

        const header = document.createElement('div');
        header.classList.add(claz('vv-dialog-header'));
        header.textContent = this.option.header;
        container.appendChild(header);

        this.body = document.createElement('div');
        this.body.classList.add(claz('vv-dialog-body'));
        container.appendChild(this.body);

        if (this.option.content) {
            const text = document.createTextNode(this.option.content);
            this.body.appendChild(text);
        }

        this.tip = document.createElement('div');
        this.tip.classList.add(claz('vv-dialog-tip'));
        container.appendChild(this.tip);

        const footer = document.createElement('div');
        footer.classList.add(claz('vv-dialog-footer'));
        container.appendChild(footer);

        const cancel = document.createElement('button');
        cancel.textContent = this.option.cancelText;
        cancel.addEventListener('click', () => {
            this.option.onCancel();
            this.close();
        });
        footer.appendChild(cancel);
        const ok = document.createElement('button');
        ok.textContent = this.option.okText;
        ok.addEventListener('click', this.option.onOk);
        footer.appendChild(ok);
    }

    showTip(text) {
        this.tip.style.display = 'block';
        this.tip.textContent = text;
    }

    hideTip() {
        this.tip.style.display = 'none';
    }

    open() {
        document.body.style.overflow = 'hidden';
        document.body.appendChild(this.wrapper);
    }

    close() {
        document.body.style.overflow = bodyOverflow;
        document.body.removeChild(this.wrapper);
        this.body = null;
        this.wrapper = null;
    }
}

export default Dialog;
