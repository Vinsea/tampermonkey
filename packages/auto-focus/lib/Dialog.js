import { claz } from './util';

const bodyOverflow = document.body.style.overflow;

class Dialog {
    constructor(opt) {
        this.option = Object.assign({
            header: '提示',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOK: () => ({}),
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

        const body = document.createElement('div');
        body.classList.add(claz('vv-dialog-body'));
        container.appendChild(body);

        const text = document.createTextNode(this.option.content);
        body.appendChild(text);

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
        ok.addEventListener('click', this.option.onOK);
        footer.appendChild(ok);
    }

    open() {
        document.body.style.overflow = 'hidden';
        document.body.appendChild(this.wrapper);
    }

    close() {
        document.body.style.overflow = bodyOverflow;
        document.body.removeChild(this.wrapper);
        this.wrapper = null;
    }
}

export default Dialog;
