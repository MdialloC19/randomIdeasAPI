import IdeasApi from "../services/IdeasApi";
import Modal from "./Modal";
import IdeaForm from "./IdeaForm";
import Spinner from "./spinner";

/**
 * Represents a list of ideas.
 */
class IdeaList {
  /**
   * Constructs an IdeaList object.
   */
  constructor() {
    /**
     * The idea list element in the DOM.
     * @type {HTMLElement}
     */
    this._ideaListEl = document.querySelector('#idea-list');

    /**
     * The list of ideas.
     * @type {Array}
     */
    this._ideas = [];

    /**
     * The list of update buttons.
     * @type {NodeList}
     */
    this.updateBtn = [];

    /**
     * The Modal instance.
     * @type {Modal}
     */
    this.modal = new Modal();

    /**
     * The IdeaForm instance.
     * @type {IdeaForm}
     */
    this.ideaform = new IdeaForm();

    /**
     * The Spinner instance.
     * @type {Spinner}
     */
    this.spinner = new Spinner();

    /**
     * Set of valid tags.
     * @type {Set}
     */
    this._validTags = new Set([
      'technology',
      'software',
      'business',
      'education',
      'health',
      'inventions'
    ]);
  }

  /**
   * Adds event listeners to the idea list.
   */
  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.closest('.card').dataset.id;
        console.log(ideaId);
        this.deleteIdea(ideaId);
      }
    });

    this.updateBtn.forEach((update) => {
      update.addEventListener('click', (e) => {
        const ideaId = e.target.closest('.card').dataset.id;
        this.ideaform.update({
          type: true,
          id: ideaId
        });
        this.modal.open();
      });
    });
  }

  /**
   * Fetches the list of ideas from the server.
   */
  async getIdeas() {
    try {
      this.spinner.showSpinner();
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
      this.spinner.hideSpinner();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the tag class based on the tag name.
   * @param {string} tag - The tag name.
   * @returns {string} - The tag class.
   */
  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    }
    return tagClass;
  }

  /**
   * Deletes an idea from the server.
   * @param {string} id - The ID of the idea to be deleted.
   */
  async deleteIdea(id) {
    try {
      this.spinner.showSpinner();
      const res = await IdeasApi.deleteIdea(id);
      this.getIdeas();
      this.spinner.hideSpinner();
    } catch (error) {
      alert('You can delete this resource');
    }
  }

  /**
   * Renders the list of ideas on the UI.
   */
  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn = idea.username === localStorage.getItem('username')
          ? `<button class="delete"><i class="fas fa-times"></i></button>`
          : '';
        return `
          <div class=card data-id="${idea._id}">
            ${deleteBtn}
            <h3>${idea.text}</h3>
            <p class="tag ${tagClass}">${idea.tag}</p>
            <p>Posted on <span class="date">${idea.date}</span> by <span class="author">${idea.username}</span></p>
            <button class="btn-update">Update</button>
          </div>`;
      })
      .join('');

    this.updateBtn = document.querySelectorAll('.btn-update');
    this.addEventListeners();
  }
}

export default IdeaList;
