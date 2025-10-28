import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as u,x as h,n as o}from"./property-B3JFcmA-.js";var p=Object.defineProperty,c=(t,s,n,f)=>{for(var e=void 0,r=t.length-1,i;r>=0;r--)(i=t[r])&&(e=i(s,n,e)||e);return e&&p(s,n,e),e};class d extends u{constructor(){super(...arguments),this.name="",this.genres="",this.country=""}createRenderRoot(){return this}render(){return h`
      <section>
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-microphone" /></svg>
          Artist
        </h2>
        <dl class="two">
          <dt>Name</dt><dd>${this.name}</dd>
          <dt>Genres</dt><dd>${this.genres}</dd>
          <dt>Country</dt><dd>${this.country}</dd>
        </dl>
      </section>
    `}}c([o()],d.prototype,"name");c([o()],d.prototype,"genres");c([o()],d.prototype,"country");customElements.define("artist-details",d);var m=Object.defineProperty,l=(t,s,n,f)=>{for(var e=void 0,r=t.length-1,i;r>=0;r--)(i=t[r])&&(e=i(s,n,e)||e);return e&&m(s,n,e),e};class a extends u{constructor(){super(...arguments),this.title="",this.href="#"}createRenderRoot(){return this}render(){return h`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
      </li>
    `}}l([o()],a.prototype,"title");l([o()],a.prototype,"href");customElements.define("artist-songs",a);
