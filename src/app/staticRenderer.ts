import { MarkedRenderer } from 'ngx-markdown';

export class FramesystemRenderer extends MarkedRenderer {
  heading(text: string, level, raw, slugger) {
    if (text.endsWith('!')) {
      return `<h${level} class="hero" value="${slugger.slug(
        text
      )}">${text.substr(0, text.length - 1)}</h${level}>`;
    } else {
      return `<h${level} value="${slugger.slug(text)}">${text}</h${level}>`;
    }
  }
}
