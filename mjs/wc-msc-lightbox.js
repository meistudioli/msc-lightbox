import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const defaults = {};
const booleanAttrs = []; // booleanAttrs default should be false
const objectAttrs = [];
const custumEvents = {
  toggle: 'msc-lightbox-toggle',
  beforetoggle: 'msc-lightbox-beforetoggle'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host {
  position: relative;
  inline-size: fit-content;
  block-size: fit-content;
  display: block;
}

:host([data-hide-close-button]) {
  .main__popover .main__popover__close {
    display: none;
  }
}

.main {
  --backdrop-background: var(--msc-lightbox-backdrop-background, rgba(0 0 0/.8));
  --border-radius: var(--msc-lightbox-border-radius, 12px);
  --background: var(--msc-lightbox-background, rgba(255 255 255));
  --margin: var(--msc-lightbox-margin, 12px);
  --padding: var(--msc-lightbox-padding, 12px);
  --box-shadow: var(--msc-lightbox-box-shadow, 0 0 2px rgba(0 0 0/.05));

  --button-size: var(--msc-lightbox-button-size, 40);
  --button-size-with-unit: calc(var(--button-size) * 1px);
  --button-icon-scale-basis: calc((var(--button-size) * .6) / 24);
  --button-inset: var(--msc-lightbox-button-inset, 8px 8px auto auto);
  --button-icon-color: var(--msc-lightbox-button-icon-color, rgba(255 255 255));
  --button-hover-normal: var(--msc-lightbox-button-background-normal, rgba(0 0 0/.5));
  --button-hover-active: var(--msc-lightbox-button-background-active, rgba(0 0 0/.8));
  --button-hover: var(--button-hover-active);
  --button-active-scale: var(--msc-lightbox-button-active-scale, .8);

  --max-inline-size: calc(100dvi - var(--margin) * 2 - var(--padding) * 2);
  --max-block-size: calc(100dvb - var(--margin) * 2 - var(--padding) * 2);

  inline-size: inherit;
  block-size: inherit;

  slot[name=trigger] {
    inline-size: fit-content;
    block-size: fit-content;
    outline: 0 none;
  }

  slot[name=content] {
    inline-size: fit-content;
    block-size: fit-content;
    max-inline-size: var(--max-inline-size);
    max-block-size: var(--max-block-size);
    border: 0 none;
    outline: 0 none;

    &::slotted(*) {
      max-inline-size: var(--max-inline-size);
      max-block-size: var(--max-block-size);
    }
  }

  .main__popover {
    background: var(--background);
    border: 0 none;
    border-radius: var(--border-radius);
    padding: var(--padding);
    box-shadow: var(--box-shadow);
    outline: 0 none;
    appearance: none;

    &::backdrop {
      background: var(--backdrop-background);
    }

    .main__popover__close {
      font-size: 0;
      appearance: none;
      border: 0 none;
      outline: 0 none;
      padding: 0;
      margin: 0;
      color: transparent;
      display: grid;
      place-content: center;

      position: absolute;
      inset: var(--button-inset);
      inline-size: var(--button-size-with-unit);
      aspect-ratio: 1/1;
      border-radius: var(--button-size-with-unit);
      background: var(--button-hover);
      transition: background-color 200ms ease;
      will-change: background-color;
      overflow: hidden;
      z-index: 1;

      &:active {
        --button-hover: var(--button-hover-active);

        scale: var(--button-active-scale);
      }

      &:focus {
        --button-hover: var(--button-hover-active);
      }

      @media (hover: hover) {
        --button-hover: var(--button-hover-normal);

        &:hover {
          --button-hover: var(--button-hover-active);
        }
      }

      &::before {
        content: '';
        inline-size: 24px;
        aspect-ratio: 1/1;
        display: block;
        background-color: var(--button-icon-color);
        clip-path: path('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z');
        scale: var(--button-icon-scale-basis);
      }
    }

    &:popover-open {
      translate: 0 0;
      opacity: 1;

      @starting-style {
        translate: 0 15%;
        opacity: 0;
      }
    }

    position: fixed;
    inset: 0;
    margin: auto;
    translate: 0 -30%;
    opacity: 0;
    z-index: 2147483647;
    will-change: translate,opacity,overlay,display;

    transition: 
      translate 400ms cubic-bezier(.4,0,.2,1), 
      opacity 400ms cubic-bezier(.4,0,.2,1),
      overlay 250ms cubic-bezier(.4,0,.2,1) allow-discrete,
      display 400ms cubic-bezier(.4,0,.2,1) allow-discrete;
  }
}
</style>

<div class="main" ontouchstart="" tabindex="0">
  <slot name="trigger" tabindex="0"></slot>
  <div id="popover" class="main__popover" popover>
    <slot name="content"></slot>
    <button
      type="button"
      class="main__popover__close"
      popovertarget="popover"
      popovertargetaction="hide"
    >
      close
    </button>
  </div>
</div>
`;

/*
 Houdini Props and Vals
 - https://web.dev/at-property/
 - https://drafts.css-houdini.org/css-properties-values-api/#syntax-strings
 */
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-lightbox-border-radius',
      syntax: '<length>',
      inherits: true,
      initialValue: '12px'
    });

    CSS.registerProperty({
      name: '--msc-lightbox-margin',
      syntax: '<length>',
      inherits: true,
      initialValue: '12px'
    });

    CSS.registerProperty({
      name: '--msc-lightbox-padding',
      syntax: '<length>',
      inherits: true,
      initialValue: '12px'
    });

    CSS.registerProperty({
      name: '--msc-lightbox-button-size',
      syntax: '<number>',
      inherits: true,
      initialValue: '40'
    });

    CSS.registerProperty({
      name: '--msc-lightbox-button-icon-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(255 255 255)'
    });

    CSS.registerProperty({
      name: '--msc-lightbox-button-active-scale',
      syntax: '<number>',
      inherits: true,
      initialValue: '.8'
    });
  } catch(err) {
    console.warn(`msc-lightbox: ${err.message}`);
  }
}

export class MscLightbox extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: ''
    };

    // nodes
    this.#nodes = {
      // styleSheet: this.shadowRoot.querySelector('style'),
      trigger: this.shadowRoot.querySelector('[name=trigger]'),
      popover: this.shadowRoot.querySelector('#popover')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscLightbox(config)
    };

    // evts
    this._onBeforetoggle = this._onBeforetoggle.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);
   const { trigger, popover } = this.#nodes;

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;

    popover.addEventListener('close', this._onClose, { signal });
    popover.addEventListener('beforetoggle', this._onBeforetoggle, { signal });
    popover.addEventListener('toggle', this._onToggle, { signal });
    trigger.addEventListener('click', this._onClick, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscLightbox.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscLightbox.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }

      }

      this[prop] = value;
    }
  }

  get open() {
    return this.#nodes.popover.matches(':popover-open');
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  _onBeforetoggle(event) {
    const { newState, oldState } = event;

    this.#fireEvent(custumEvents.beforetoggle,
      {
        newState,
        oldState,
        preventDefault: () => {
          event.preventDefault();
        }
      }
    );
  }

  _onToggle(event) {
    const { newState, oldState } = event;

    this.classList.toggle('msc-lightbox--open', newState === 'open');
    this.#fireEvent(custumEvents.toggle, { newState, oldState });
  }

  _onClick() {
    if (!this.open) {
      this.#nodes.popover.showPopover();
    }
  }

  hidePopover() {
    if (this.open) {
      this.#nodes.popover.hidePopover();
    }
  }

  showPopover() {
    if (!this.open) {
      this.#nodes.popover.showPopover();
    }
  }

  togglePopover(force = !this.open) {
    force = Boolean(force);

    if (force !== this.open) {
      this.#nodes.popover.togglePopover();
    }
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscLightbox');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscLightbox'), MscLightbox);
}