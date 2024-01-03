/**
 * Represents a modal window.
 */
class Modal {
  /**
   * Constructs a Modal object.
   */
  constructor() {
    /**
     * The modal element.
     * @type {HTMLElement}
     * @private
     */
    this._modal = document.querySelector('#modal');

    /**
     * The modal button element.
     * @type {HTMLElement}
     * @private
     */
    this._modalBtn = document.querySelector('#modal-btn');

    this.addEventListeners();
  }

  /**
   * Adds event listeners to the modal.
   */
  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closemodal', () => this.close());
  }

  /**
   * Opens the modal window.
   */
  open() {
    this._modal.style.display = 'block';
  }

  /**
   * Closes the modal window.
   */
  close() {
    this._modal.style.display = 'none';
  }

  /**
   * Closes the modal when clicking outside the modal window.
   * @param {Event} e - The click event.
   */
  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
