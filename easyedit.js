// MIT license
// author: David Figatner (YOPEY YOPEY LLC)

const clicked = require('clicked');

class EasyEdit
{
    /**
     *
     * @param {HTMLElement} object
     * @param {object} options
     * @param {object} options.styles - additinoal styles to apply to the inputElement
     * @param {function} options.onedit - editing starts: callback(element, inputElement)
     * @param {function} options.onsuccess - value changed and user pressed enter: callback(value, element, originalValue)
     * @param {function} options.oncancel - editing canceled with escape: callback(element)
     * @param {function} options.onchange - value was changed (but editing is not done): callback(value, element, originalValue)
     */
    constructor(object, options)
    {
        this.object = object;
        this.options = options || {};
        clicked(object, this.edit.bind(this));
        if (this.options.underline)
        {
            this.object.style.borderBottom = '1px dashed ' + window.getComputedStyle(this.object, null).getPropertyValue('color');
        }
    }

    edit()
    {
        this.display = this.object.style.display;
        this.replace = document.createElement('input');
        this.replace.style.display = 'none';
        const styles = this.options.styles || {};
        for (let key in styles)
        {
            this.replace.style[key] = styles[key];
        }
        this.replace.addEventListener('change', this.change.bind(this));
        this.replace.addEventListener('input', this.input.bind(this));
        this.replace.addEventListener('keydown', this.key.bind(this));
        this.replace.addEventListener('blur', this.change.bind(this));
        this.object.insertAdjacentElement('afterend', this.replace);
        this.maxWidth = parseInt(window.getComputedStyle(this.object.parentElement).width);
        this.replace.style.width = this.object.offsetWidth + 'px';
        this.replace.style.height = this.object.offsetHeight + 'px';
        this.replace.style.font = window.getComputedStyle(this.object, null).getPropertyValue('font');
        this.replace.style.margin = window.getComputedStyle(this.object, null).getPropertyValue('margin');
        this.replace.style.padding = window.getComputedStyle(this.object, null).getPropertyValue('padding');
        this.original = this.replace.value = this.object.innerText;
        this.object.style.display = 'none';
        this.replace.style.display = this.display;
        this.replace.select();
        if (this.options.onedit)
        {
            this.options.onedit(this.object, this.replace);
        }
    }

    key(e)
    {
        const code = (typeof e.which === 'number') ? e.which : e.keyCode;
        if (code === 27)
        {
            this.object.style.display = this.display;
            this.replace.style.display = 'none';
            this.replace.value = this.object.innerHTML;
            if (this.options.oncancel)
            {
                this.options.oncancel(this.object, this.replace);
            }
        }
        else if (code === 13)
        {
            this.change();
        }
    }

    input()
    {
        const test = document.createElement('span');
        test.style.opacity = 0;
        document.body.appendChild(test);
        test.style.font = this.replace.style.font;
        test.innerHTML = this.replace.value;
        if (this.replace.offsetWidth < test.offsetWidth && test.offsetWidth < this.maxWidth)
        {
            this.replace.style.width = test.offsetWidth + 'px';
        }
        document.body.removeChild(test);
        if (this.options.onchange)
        {
            this.options.onchange(this.replace.value, this.object, this.original);
        }
    }

    change()
    {
        if (this.removing)
        {
            return;
        }
        this.removing = true;
        const changed = this.object.innerHTML !== this.replace.value;
        this.object.innerHTML = this.replace.value;
        this.replace.parentNode.removeChild(this.replace);
        this.object.style.display = this.display;
        if (changed && this.options.onsuccess)
        {
            this.options.onsuccess(this.object.innerHTML, this.object, this.original);
        }
        this.removing = false;
    }
}

module.exports = EasyEdit;