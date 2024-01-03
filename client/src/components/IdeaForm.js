import Modal from "./Modal";
import IdeaList from "./IdeaList";
import IdeasApi from "../services/IdeasApi";
import Spinner from "./spinner";

/**
 * Class representing an Idea Form.
 */
class IdeaForm {
  /**
   * Creates an IdeaForm instance.
   */
  constructor() {
    /**
     * Update object with type and ID properties.
     * @type {Object}
     * @property {boolean} type - Indicates if it's an update.
     * @property {string} id - The ID of the idea.
     */
    this._update = {
      type: false,
      id: '',
    };

    /**
     * The form modal element.
     * @type {HTMLElement}
     */
    this._formModal = document.querySelector('#form-modal');

    /**
     * The Modal instance.
     * @type {Modal}
     */
    this.modal = new Modal();
  }

  /**
   * Adds event listeners to the form.
   */
  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  /**
   * Updates the update object.
   * @param {Object} update - The update object with type and ID properties.
   */
  update(update) {
    this._update = update;
    this.render();
  }

  /**
   * Handles form submission.
   * @param {Event} e - The submit event.
   */
  handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
      alert('Please enter all fields');
      return;
    }

    // Add username of actual user to localStorage
    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    if (this._update.type) {
      this.updateIdea(this._update.id, idea);
    } else {
      this.postIdeas(idea);
    }

    // Display ideas after adding them on the server side
    new IdeaList().getIdeas();

    // Clear form fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    // Dispatch a 'closemodal' event
    document.dispatchEvent(new Event('closemodal'));
  }

  /**
   * Sends a POST request to add an idea.
   * @param {Object} idea - The idea object to be added.
   */
  async postIdeas(idea) {
    try {
      const res = await IdeasApi.postIdeas(idea);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sends a PATCH request to update an idea.
   * @param {string} id - The ID of the idea to update.
   * @param {Object} idea - The updated idea object.
   */
  async updateIdea(id, idea) {
    try {
      const res = await IdeasApi.updateIdea(id, idea);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Renders the form.
   */
  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit" data-id='${this._update.type ? this._update.id : ''}'>Submit</button>
      </form>`;

    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
