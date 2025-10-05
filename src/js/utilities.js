const findElement = (id, arr) => {
    try {
        return Array.from(arr).find(el => el.id === id);
    } catch (err) {
        console.error(`findElement error on id: ${id}`, err);
        return null;
    }
};
const toggleDisable = (e) => {
    try {
        const sel = e.querySelector('select');
        if (!sel) throw new Error('Select element not found!');
        const newDisabledState = !sel.disabled;
        sel.disabled = newDisabledState;
        e.classList.toggle('disabled', newDisabledState);
        return newDisabledState;
    } catch (err) {
        console.error('toggleDisable error:', err);
        return false;
    }
};
const createElements = (e, a, op) => {
    try {
        if (!e) throw new Error('Element not found');
        e.innerHTML = "";
        const yHtml = [op, ...a].map(v =>
        $("option")
            .text(isNaN(v) ? capFirst(v) : v)
            .value(op == v ? 0 : v)
            .get()
        );
        yHtml.forEach(element => e.append(element));
    } catch (err) {
        console.error('createElements error:', err);
    }
};
const $ = (t) => {
    try {
        const el = document.createElement(t);
        const chEl = {
        el: el,
        id(id) { el.id = id; return chEl; },
        class(cls) { el.classList.add(cls); return chEl; },
        attr(name, value) { el.setAttribute(name, value); return chEl; },
        html(html) { el.innerHTML = html; return chEl; },
        text(txt) { el.textContent = txt; return chEl; },
        value(val) { el.value = val; return chEl; },
        append(child) { el.appendChild(child); return chEl; },
        get() { return el; }
        };
        return chEl;
    } catch (err) {
        console.error('Element create error:', err);
        return null;
    }
};
const classExists = (e, cl) => {
    try {
        if (!e) throw new Error('Element is undefined');
        return e.classList.contains(cl);
    } catch (err) {
        console.error('classExists error:', err);
        return false;
    }
};
const capFirst = (text) => {
    try {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
    } catch (err) {
        console.error('capFirst error:', err);
        return '';
    }
};
const sortArray = (arr, k) => {
    try {
        if (!Array.isArray(arr)) throw new Error('Array expected');
        return [...new Set(arr.map(v => v[k]))].sort((a, b) => b - a);
    } catch (err) {
        console.error('sortArray error:', err);
        return [];
    }
};
export {
    findElement,
    toggleDisable,
    createElements,
    classExists,
    sortArray,
}