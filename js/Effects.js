export default class Effects {
    constructor(DOMPointer) {
        this.DOMElement = null;

        this.__proto__.initializeDOMElement = () => {
            let $el = null;
            $el = document.querySelector(DOMPointer);
            if ($el instanceof HTMLElement) {
                this.DOMElement = $el;
            }
        };

        this.__proto__.initialConfiguration = () => {
            this.initializeDOMElement();
        };

        // eslint-disable-next-line no-unused-vars
        this.__proto__.slideConfig = (el, duration) => {
            if (!el.classList.contains('effects-slide-setup')) {
                el.classList.add('effects-slide-setup');
                el.style.overflow = 'hidden';
                //el.style.transition = `height ${duration}ms ease-in-out`;
            }
        };
        this.initialConfiguration();
    }

    // animation methods
    slideUp(durationMilis = 500, callback = null) {
        let { DOMElement: el } = this;
        this.slideConfig(el, durationMilis);

        if (el.classList.contains('effects-slide')) {
            el.classList.remove('effects-slide');
        }

        //get css propertyValue
        let elStyle = window.getComputedStyle(el);

        //properties that i will change
        let properties = [
            'height',
            'padding-top',
            'padding-bottom',
            'margin-top',
            'margin-bottom',
        ];

        // parsing properties to numeric value - p = property
        let elProperties = properties.map((p) => elStyle.getPropertyValue(p));
        elProperties = elProperties.map((el) => parseFloat(el));

        // gettimg the ration of duration of animation
        let rationProperties = elProperties.map((el) => el / durationMilis);

        let start;

        let step = (timestamp) => {
            if (!start) start = timestamp;

            let frameCount = timestamp - start;
            el.style.height =
                elProperties[0] - rationProperties[0] * frameCount + 'px';
            el.style.paddingTop =
                elProperties[1] - rationProperties[1] * frameCount + 'px';
            el.style.paddingBottom =
                elProperties[2] - rationProperties[2] * frameCount + 'px';
            el.style.marginTop =
                elProperties[3] - rationProperties[3] * frameCount + 'px';
            el.style.marginBottom =
                elProperties[4] - rationProperties[4] * frameCount + 'px';

            if (frameCount >= durationMilis) {
                el.style.height = '';
                el.style.paddingTop = '';
                el.style.paddingBottom = '';
                el.style.marginTop = '';
                el.style.marginBottom = '';
                el.style.display = 'none';
                if (callback && callback instanceof Function) callback();
            } else {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    slideDown(durationMilis = 500, callback = null) {
        let { DOMElement: el } = this;
        this.slideConfig(el, durationMilis);

        if (!el.classList.contains('effects-slide')) {
            el.classList.add('effects-slide');
            el.style.display = 'block';
        }

        //get css propertyValue
        let elStyle = window.getComputedStyle(el);

        //properties that i will change
        let properties = [
            'height',
            'padding-top',
            'padding-bottom',
            'margin-top',
            'margin-bottom',
        ];

        // parsing properties to numeric value - p = property
        let elProperties = properties.map((p) => elStyle.getPropertyValue(p));
        elProperties = elProperties.map((el) => parseFloat(el));

        // gettimg the ration of duration of animation
        let rationProperties = elProperties.map((el) => el / durationMilis);

        let start;

        let step = (timestamp) => {
            if (!start) start = timestamp;

            let frameCount = timestamp - start;
            el.style.height = rationProperties[0] * frameCount + 'px';
            el.style.paddingTop = rationProperties[1] * frameCount + 'px';
            el.style.paddingBottom = rationProperties[2] * frameCount + 'px';
            el.style.marginTop = rationProperties[3] * frameCount + 'px';
            el.style.marginBottom = rationProperties[4] * frameCount + 'px';

            if (frameCount >= durationMilis) {
                el.style.height = '';
                el.style.paddingTop = '';
                el.style.paddingBottom = '';
                el.style.marginTop = '';
                el.style.marginBottom = '';
                if (callback && callback instanceof Function) callback();
            } else {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    slideToggle(durationMilis = 500, callback = 500) {
        let { DOMElement: el } = this;
        if (!el.classList.contains('effects-slide')) {
            this.slideDown(durationMilis, callback);
        } else {
            this.slideUp(durationMilis, callback);
        }
    }

    // event methods
    click(handle, cursorPointer = false) {
        if (handle instanceof Function) {
            this.DOMElement.style.cursor = cursorPointer
                ? 'pointer'
                : 'initial';
            this.DOMElement.addEventListener('click', handle);
        } else {
            return `it's not a function to handle`;
        }
    }

    mouseMove(handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener('mousemove', handle);
        }
    }

    load(handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener('load', handle);
        }
    }

    keyDown(handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener('keydown', handle);
        }
    }

    keyUp(handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener('keyup', handle);
        }
    }

    keyPress(handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener('keypress', handle);
        }
    }

    event(eventType, handle) {
        if (handle instanceof Function) {
            this.DOMElement.addEventListener(eventType, handle);
        } else {
            return `it's not a function to handle`;
        }
    }

    //statics methods
    static $(DOMPointer) {
        return new Effects(DOMPointer);
    }
}
