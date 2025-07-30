# msc-lightbox

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-lightbox) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/30072/branches/963537/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=30072&bid=963537)

&lt;msc-lightbox /> is a lightbox effect component. Developers could set trigger &amp; content through it. Once user press trigger, content will display as lightbox effect.

![<msc-lightbox />](https://blog.lalacube.com/mei/img/preview/msc-lightbox.png)

## Basic Usage

&lt;msc-lightbox /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-lightbox />'s html structure and everything will be all set.

- Required Script

```html
<script 
  type="module"
  src="https://unpkg.com/msc-lightbox/mjs/wc-msc-lightbox.js">
</script>
```

- Structure

Put &lt;msc-lightbox /> into HTML document.

```html
<msc-lightbox>
  <button
    type="button"
    slot="trigger"
  >
    SHOW IMAGE
  </button>

  <img
    src="your-image-path.png"
    loading="lazy"
    slot="content"
  />
</msc-lightbox>
```

Remember set `[slot=trigger]` and `[slot=content]` inside &lt;msc-lightbox /> as its children. Content element will popup when user press trigger element.

## JavaScript Instantiation

&lt;msc-lightbox /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscLightbox } from 'https://unpkg.com/msc-lightbox/mjs/wc-msc-lightbox.js';

const templateTrigger = document.querySelector('template[data-type=trigger]');
const templateContent = document.querySelector('template[data-type=content]');

//use DOM api
const nodeA = document.createElement('msc-lightbox');
document.body.appendChild(nodeA);
nodeA.appendChild(templateTrigger.content.cloneNode(true));
nodeA.appendChild(templateContent.content.cloneNode(true));

// new instance with Class
const nodeB = new MscLightbox();
document.body.appendChild(nodeB);
nodeB.appendChild(templateTrigger.content.cloneNode(true));
nodeB.appendChild(templateContent.content.cloneNode(true));
</script>
```

## Style Customization

&lt;msc-lightbox /> uses CSS custom properties to hook control panel's theme. That means developer could easy change it into the looks you like.

```html
<style>
msc-lightbox {
  --msc-lightbox-backdrop-background: rgba(0 0 0/.8);
  --msc-lightbox-border-radius: 12px;
  --msc-lightbox-background: rgba(255 255 255);
  --msc-lightbox-margin: 12px;
  --msc-lightbox-padding: 12px;
  --msc-lightbox-box-shadow: 0 0 2px rgba(0 0 0/.05);

  --msc-lightbox-button-size: 40;
  --msc-lightbox-button-inset: 8px 8px auto auto;
  --msc-lightbox-button-icon-color: rgba(255 255 255);
  --msc-lightbox-button-background-normal: rgba(0 0 0/.5);
  --msc-lightbox-button-background-active: rgba(0 0 0/.8);
  --msc-lightbox-button-active-scale: .8;
}
</style>
```

## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| open | Boolean | Getter &lt;msc-lightbox />'s open state. |

## Events
| Event Signature | Description |
| ----------- | ----------- |
| msc-lightbox-beforetoggle | Fired before &lt;msc-lightbox /> is shown or hidden. Developers could gather state information through `event.detail`. |
| msc-lightbox-toggle | Fired when &lt;msc-lightbox /> is shown or hidden. Developers could gather state information through `event.detail`. |

## Mathods
| Mathod Signature | Description |
| ----------- | ----------- |
| showPopover() | Show &lt;msc-lightbox />. |
| hidePopover() | Hide &lt;msc-lightbox />. |
| togglePopover(force) | Toggle &lt;msc-lightbox /> show or hide. (force is optional, developers could set boolean to force show or hide.) |

## Reference
- [&lt;msc-lightbox /> demo](https://blog.lalacube.com/mei/webComponent_msc-lightbox.html)
- [YouTube tutorial](https://www.youtube.com/shorts/Vz1IryMIgic)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-lightbox)
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [&lt;video>: The Video Embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)

