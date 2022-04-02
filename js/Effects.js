export default class Effects {
    constructor(DOMPointer) {
        this.DOMElements = null;
        this.stringSearch = null;

        this.__proto__.initializeDOMElements = () => {
            if (DOMPointer instanceof HTMLElement) {
                this.DOMElements = [DOMPointer];
            } else {
                let $els = document.querySelectorAll(DOMPointer);
                let vali = true;
                $els.forEach(
                    ($el) => (vali = vali && $el instanceof HTMLElement)
                );
                if (vali) {
                    this.DOMElements = [...$els];
                }
                this.stringSearch = DOMPointer;
            }
        };

        this.__proto__.initialConfiguration = () => {
            this.initializeDOMElements();
        };

        this.__proto__.slideConfig = (el) => {
            if (!el.classList.contains('effects-slide-setup')) {
                el.classList.add('effects-slide-setup');
                el.style.overflow = 'hidden';
            }
        };

        this.__proto__.fadeConfig = (el) => {
            if (!el.classList.contains('effects-fade-setup')) {
                el.classList.add('effects-fade-setup');
                el.style.overflow = 'hidden';
            }
        };

        this.initialConfiguration();
    }

    // animation methods
    slideUp(durationMilis = 500, callback = null) {
        let { DOMElements: els } = this;
        els.forEach((el) => {
            this.slideConfig(el);

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
            let elProperties = properties.map((p) =>
                elStyle.getPropertyValue(p)
            );
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
        });
    }

    slideDown(durationMilis = 500, callback = null) {
        let { DOMElements: els } = this;
        els.forEach((el) => {
            this.slideConfig(el);

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
            let elProperties = properties.map((p) =>
                elStyle.getPropertyValue(p)
            );
            elProperties = elProperties.map((el) => parseFloat(el));

            // gettimg the ration of duration of animation
            let rationProperties = elProperties.map((el) => el / durationMilis);

            let start;

            let step = (timestamp) => {
                if (!start) start = timestamp;

                let frameCount = timestamp - start;
                el.style.height = rationProperties[0] * frameCount + 'px';
                el.style.paddingTop = rationProperties[1] * frameCount + 'px';
                el.style.paddingBottom =
                    rationProperties[2] * frameCount + 'px';
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
        });
    }

    slideToggle(durationMilis = 500, callback = 500) {
        let { DOMElements: els } = this;
        els.forEach((el) => {
            if (!el.classList.contains('effects-slide')) {
                this.slideDown(durationMilis, callback);
            } else {
                this.slideUp(durationMilis, callback);
            }
        });
    }

    fadeIn(durationMilis = 500, callback = null) {
        const { DOMElements: els } = this;
        els.forEach((el) => {
            this.fadeConfig(el);
            if (!el.classList.contains('effects-fade')) {
                el.classList.add('effects-fade');
            }

            const opacityRation = 1 / durationMilis;
            let start;
            const step = (timestamp) => {
                if (!start) {
                    start = timestamp;
                    el.style.display = 'block';
                    el.style.opacity = 0;
                }

                const frameCount = timestamp - start;
                el.style.opacity = String(opacityRation * frameCount);
                if (frameCount >= durationMilis) {
                    el.style.opacity = '';
                    if (callback && callback instanceof Function) callback();
                } else {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        });
    }

    fadeOut(durationMilis = 500, callback = null) {
        const { DOMElements: els } = this;
        els.forEach((el) => {
            this.fadeConfig(el);
            if (el.classList.contains('effects-fade')) {
                el.classList.remove('effects-fade');
            }

            const opacityRation = 1 / durationMilis;
            let start;
            const step = (timestamp) => {
                if (!start) {
                    start = timestamp;
                    el.style.display = 'block';
                    el.style.opacity = 0;
                }

                const frameCount = timestamp - start;
                el.style.opacity = String(1 - opacityRation * frameCount);
                if (frameCount >= durationMilis) {
                    el.style.opacity = '';
                    el.style.display = 'none';
                    if (callback && callback instanceof Function) callback();
                } else {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        });
    }

    fadeToggle(durationMilis = 500, callback = null) {
        let { DOMElements: els } = this;
        els.forEach((el) => {
            if (!el.classList.contains('effects-fade')) {
                this.fadeIn(durationMilis, callback);
            } else {
                this.fadeOut(durationMilis, callback);
            }
        });
    }

    // event methods
    click(handle, cursorPointer = false) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.style.cursor = cursorPointer ? 'pointer' : 'initial';
                DOMElement.addEventListener('click', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    mouseMove(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('mousemove', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    load(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('load', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    keyDown(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keydown', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    keyUp(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keyup', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    keyPress(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keypress', handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    on(eventType, handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener(eventType, handle);
            });
        } else {
            return 'handle is not a function';
        }
    }

    // getters
    getNode(index = 0) {
        if (!(index >= this.DOMElements.length)) {
            return this.DOMElements[index];
        } else {
            return 'index bounds array';
        }
    }

    get(index = 0) {
        return new Effects(this.getNode(index));
    }

    getChildren() {
        return new Effects(this.stringSearch + ' > *');
    }

    getNodeChildren() {
        return this.getChildren().getNodeList();
    }

    getFather(index = 0) {
        return new Effects(this.DOMElements[index].parentNode);
    }

    getNodeList() {
        return this.DOMElements;
    }

    getList() {
        return [...this.DOMElements].map((el) => new Effects(el));
    }

    //styles CSS
    css(cssObject) {
        let { DOMElements: els } = this;

        els.forEach((el) => {
            for (let key in cssObject) {
                el.style[key] = cssObject[key];
            }
        });
    }

    addStyle(cssPropertyName, value) {
        let { DOMElements: els } = this;

        els.forEach((el) => {
            el.styele[cssPropertyName] = value;
        });
    }

    removeStyle(cssPropertyName) {
        let { DOMElements: els } = this;

        els.forEach((el) => {
            el.style[cssPropertyName] = '';
        });
    }

    // html manipulation
    attrs(attrName) {
        return [...this.getNodeList()].map((el) => el.getAttribute(attrName));
    }

    attr(attrName, index = 0) {
        if (typeof index === 'number' && !(index >= this.DOMElements.length)) {
            return this.getNode(index).getAttribute(attrName);
        } else {
            return 'index bounds array';
        }
    }

    insertAttr(attrName, value, index = null) {
        if (
            index &&
            typeof index === 'number' &&
            index <= this.getNodeList().length
        ) {
            this.getNodeList()[index].setAttribute(attrName, value);
        } else {
            this.getNodeList().forEach((el) => {
                el.setAttribute(attrName, value);
            });
        }
        return attrName;
    }

    removeAttr(attrName, value, index = null) {
        if (
            index &&
            typeof index === 'number' &&
            index <= this.getNodeList().length
        ) {
            this.getNodeList()[index].removeAttribute(attrName, value);
        } else {
            this.getNodeList().forEach((el) => {
                el.removeAttribute(attrName, value);
            });
        }
    }

    appendNode(nodeElement) {
        if (nodeElement instanceof HTMLElement) {
            this.getNodeList().forEach((el) => el.appendChild(nodeElement));
            return nodeElement;
        }
    }

    appendText(text) {
        if (text instanceof String) {
            this.getNodeList().forEach((el) => el.append(text));
        }
    }

    //statics methods
    static $(DOMPointer) {
        return new Effects(DOMPointer);
    }

    static createElement(elementType, parentNode = null) {
        const $el = document.createElement(elementType);
        if (parentNode && parentNode instanceof HTMLElement) {
            parentNode.appendChild($el);
        }
        return new Effects($el);
    }
}
