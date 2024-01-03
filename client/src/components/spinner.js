/**
 * Represents a spinner element.
 */
class Spinner {
  /**
   * Constructs a Spinner object.
   */
  constructor() {
    /**
     * The spinner element.
     * @type {HTMLElement}
     */
    this.spinner = document.querySelector('.spinner');
  }

  /**
   * Displays the spinner.
   */
  showSpinner() {
    this.spinner.classList.add('show');
  }

  /**
   * Hides the spinner.
   */
  hideSpinner() {
    this.spinner.classList.remove('show');
  }
}

export default Spinner;
