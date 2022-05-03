const CONFIG = {
    preventScroll: '0',
    shortcut: ['ctrl', '', 'q']
};

export const claz = (val) => `${val}__tampermonkey`;

export const addStyle = (aCss) => {
    const head = document.getElementsByTagName('head')[0];
    if (head) {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
        return style;
    }
    return null;
};

export const store = {
    set(name, value) {
        GM.setValue(name, value);
    },
    get(name) {
        return GM.getValue(name);
    }
};

export const config = {
    set(conf) {
        for (const [k, v] of Object.entries(conf)) {
            CONFIG[k] = v;
            store.set(k, v);
        }
    },
    get() {
        return CONFIG;
    }
};

export const initConfig = () => {
    const configPromise = Object.keys(CONFIG).map(v => store.get(v));
    return Promise.all(configPromise).then(r => {
        if (!r[0]) {
            for (const [k, v] of Object.entries(CONFIG)) {
                store.set(k, v);
            }
        } else {
            Object.keys(CONFIG).forEach((v, i) => {
                CONFIG[v] = r[i];
            });
        }
    });
};
