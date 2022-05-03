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
