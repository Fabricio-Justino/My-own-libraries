export default class Effects {


    constructor(DOMElement) {
        this.DOMElement = DOMElement;
    }


    //statics methods
    static $(DOMPointer) {
        const DOMElement = document.querySelector(DOMPointer);
        return new Effects(DOMElement);
    }
}