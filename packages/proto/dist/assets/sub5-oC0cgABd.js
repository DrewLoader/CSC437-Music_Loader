import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as l,x as p,n as d}from"./property-B3JFcmA-.js";var h=Object.defineProperty,e=(i,a,o,m)=>{for(var r=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=n(a,o,r)||r);return r&&h(a,o,r),r};class t extends l{constructor(){super(...arguments),this.title="",this.artistName="",this.artistHref="",this.album="",this.duration="",this.bpm=""}createRenderRoot(){return this}render(){return p`
      <dl class="two">
        <dt>Title</dt><dd>${this.title}</dd>
        <dt>Artist</dt>
        <dd>
          ${this.artistHref?p`<a href="${this.artistHref}">${this.artistName}</a>`:this.artistName}
        </dd>
        <dt>Album</dt><dd>${this.album}</dd>
        <dt>Duration</dt><dd>${this.duration}</dd>
        <dt>BPM</dt><dd>${this.bpm}</dd>
      </dl>
    `}}e([d()],t.prototype,"title");e([d()],t.prototype,"artistName");e([d()],t.prototype,"artistHref");e([d()],t.prototype,"album");e([d()],t.prototype,"duration");e([d()],t.prototype,"bpm");customElements.define("song-details",t);
