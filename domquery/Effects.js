/**
 * this class will help you in your animation and DOM manipulation
 * @class
 */
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
    /**
     * this function slide up elements inside of effects node list
     * @param {Number} duration in millisecond
     * @param {Function} callback that will be call when the animation end
     */
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

    /**
     * this function slide down elements inside of effects node list
     * @param {Number} duration in millisecond
     * @param {Function} callback that will be call when the animation end
     */
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

    /**
     * this function slides down the elements inside the effect node list if
     * they are slid up, otherwise, it slides up
     * @param {Number} duration in millisecond
     * @param {Function} callback that will be call when the animation end
     */
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

    /**
     * this function show an element with fade-in effect
     * @param {Number} duration in milisecond
     * @param {Function} callback that will be call when the animation end
     */
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

    /**
     * this function hide an element with fade-out effect
     * @param {Number} duration in milisecond
     * @param {Function} callback that will be call when the animation end
     */
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

    /**
     * this function switches between with fade-in and fade-out effect
     * @param {Number} duration in milisecond
     * @param {Function} callback that will be call when the animation end
     */
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
    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @param {Boolean} cursorPointer [optional] if the cursor of element will change to pointer
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    click(handle, cursorPointer = false) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.style.cursor = cursorPointer ? 'pointer' : 'initial';
                DOMElement.addEventListener('click', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    mouseMove(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('mousemove', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    load(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('load', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    keyDown(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keydown', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    keyUp(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keyup', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Fucntion} handle an fucntion to handle with event
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     */
    keyPress(handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener('keypress', handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    /**
     * @param {Function} handle an fucntion to handle with event
     * @param {String} eventType type of event sample "click"
     * @return {Effects} if handle is a fuction return Effects class again to chainig
     * @throws {TypeError} TypeErro with error message
     * @example Effects.$('body').on('click', () => alert('hello world'))
     */
    on(eventType, handle) {
        if (handle instanceof Function) {
            this.DOMElements.forEach((DOMElement) => {
                DOMElement.addEventListener(eventType, handle);
                return this;
            });
        } else {
            throw new TypeError(
                `handle type of ${typeof handle} is not a function`
            );
        }
    }

    // getters
    /**
     *
     * @param {Number} index Ellement into of index of Effects Node List
     * @returns {HTMLElement} ellement into Effects node list
     */
    getNode(index = 0) {
        if (!(index >= this.DOMElements.length)) {
            return this.DOMElements[index];
        } else {
            throw new RangeError(
                `index: ${index} is off of range of Effects node list`
            );
        }
    }

    /**
     *
     * @param {Number} index Ellement into of index of Effects Node List
     * @returns {Effects} ellement into Effects node list tranform turned into Effects class
     */
    get(index = 0) {
        return new Effects(this.getNode(index));
    }

    /**
     *
     * @returns {Effects} children of ellement of Effects node list turned in Effects class
     */
    getChildren() {
        return new Effects(this.stringSearch + ' > *');
    }

    /**
     *
     * @returns {HTMLElement} children of ellement of Effects node list
     */
    getNodeChildren() {
        return this.getChildren().getNodeList();
    }

    /**
     *
     * @param {Number} index index of effets node list
     * @returns {Effects} parent node turned into effects
     * @throws {RangeError} error when index is off bounds node list
     */
    getFather(index = 0) {
        if (typeof index === 'number' && index < this.DOMElements.length) {
            return new Effects(this.DOMElements[index].parentNode);
        } else {
            throw new RangeError(
                `index: ${index} is off of range of Effects node list`
            );
        }
    }

    /**
     *
     * @param {Number} index index of effets node list
     * @returns {HTMLElement} parent node
     * @throws {RangeError} error when index is off bounds node list
     */
    getFatherNode(index = 0) {
        if (typeof index === 'number' && index < this.DOMElements.length) {
            return this.DOMElements[index].parentNode;
        } else {
            throw new RangeError(
                `index: ${index} is off of range of Effects node list`
            );
        }
    }

    /**
     *
     * @returns {Array<HTMLElement>} all node list of Effects
     */
    getNodeList() {
        return this.DOMElements;
    }

    /**
     *
     * @returns {Array<Effects>} all node list of Effects turned into Effects class
     */
    getList() {
        return [...this.DOMElements].map((el) => new Effects(el));
    }

    //styles CSS

    /**
     *
     * @param {any} cssObject Object with css style without '-' and in camelcase style
     * @example Effects.$('*').css({
     * 'marginLeft': 0,
     * 'marginTop': 0,
     * 'marginRight': 0,
     * 'marginBottom': 0
     * });
     */
    css(cssObject) {
        let { DOMElements: els } = this;

        els.forEach((el) => {
            for (let key in cssObject) {
                el.style[key] = cssObject[key];
            }
        });
    }

    /**
     * 
     * @param {String} cssPropertyName css property sample 'color'
     * @param {String} value css value sample 'red'
     * @example Effects.$('*').addStyle('color', 'red');
     */
    addStyle(cssPropertyName, value) {
        let { DOMElements: els } = this;

        els.forEach((el) => {
            el.styele[cssPropertyName] = value;
        });
    }

    /**
     *  
     * @param {String} cssPropertyName name of css property sample 'color'
     */
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
