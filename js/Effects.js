export default class Effects {
    constructor(DOMElement) {
        let $el = null;
        if (DOMElement instanceof HTMLElement) {
            $el = DOMElement;
        } else {
            $el = Effects.$(DOMElement).DOMElement;
        }
        this.DOMElement = $el;

        this.__proto__.slideConfig = (el, duration) => {
            el.style.overflow = 'hidden';
            el.style.transition = `height ${duration}ms ease-in-out`;
        };
    }

    /*slideUp(durationMilis = 500) {
        let { DOMElement: el } = this;
        el.style.height = 0;
        this.slideConfig(el, durationMilis);

        el.addEventListener('transitionend', function end (e){
            el.classList.toggle('active');
            el.style.height = 'auto'
            el.removeEventListener('transitionend', end);
        });
    }

    slideDown(durationMilis = 500) {
        let { DOMElement: el } = this;
        el.style.display = 'block';
        this.slideConfig(el, durationMilis);

        const height = el.clientHeight + 'px';
        el.style.height = 0;

        setInterval(() => {
            el.style.height = height;
        }, 0);
    }*/

    slideDown(element = this.DOMElement) {
        this.DOMElement.classList.toggle('active');
        const height = element.clientHeight + 'px';

        element.style.height = 0;

        window.setTimeout(() => {
            element.style.height = height;
        }, 0);
    }

    slideUp(element = this.DOMElement) {
        element.style.height = 0;

        element.addEventListener('transitionend', function end() {
            element.classList.toggle('active');
            element.style.height = 'auto';
            element.removeEventListener('transitionend', end);
        });
    }

    //statics methods
    static $(DOMPointer) {
        const DOMElement = document.querySelector(DOMPointer);
        return new Effects(DOMElement);
    }
}
