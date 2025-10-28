import{i as n,x as h,n as r}from"./property-B3JFcmA-.js";var l=Object.defineProperty,d=(i,a,o,u)=>{for(var t=void 0,s=i.length-1,p;s>=0;s--)(p=i[s])&&(t=p(a,o,t)||t);return t&&l(a,o,t),t};class e extends n{constructor(){super(...arguments),this.title="",this.artistName="",this.artistHref="",this.album="",this.duration="",this.bpm=""}createRenderRoot(){return this}render(){return h`
      <dl class="two">
        <dt>Title</dt><dd>${this.title}</dd>
        <dt>Artist</dt>
        <dd>
          ${this.artistHref?h`<a href="${this.artistHref}">${this.artistName}</a>`:this.artistName}
        </dd>
        <dt>Album</dt><dd>${this.album}</dd>
        <dt>Duration</dt><dd>${this.duration}</dd>
        <dt>BPM</dt><dd>${this.bpm}</dd>
      </dl>
    `}}d([r()],e.prototype,"title");d([r()],e.prototype,"artistName");d([r()],e.prototype,"artistHref");d([r()],e.prototype,"album");d([r()],e.prototype,"duration");d([r()],e.prototype,"bpm");export{e as S};
