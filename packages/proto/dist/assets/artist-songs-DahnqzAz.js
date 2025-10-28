import{i as c,x as h,n as o}from"./property-B3JFcmA-.js";var f=Object.defineProperty,d=(t,s,n,p)=>{for(var e=void 0,r=t.length-1,i;r>=0;r--)(i=t[r])&&(e=i(s,n,e)||e);return e&&f(s,n,e),e};class a extends c{constructor(){super(...arguments),this.name="",this.genres="",this.country=""}createRenderRoot(){return this}render(){return h`
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
    `}}d([o()],a.prototype,"name");d([o()],a.prototype,"genres");d([o()],a.prototype,"country");var v=Object.defineProperty,u=(t,s,n,p)=>{for(var e=void 0,r=t.length-1,i;r>=0;r--)(i=t[r])&&(e=i(s,n,e)||e);return e&&v(s,n,e),e};class l extends c{constructor(){super(...arguments),this.title="",this.href="#"}createRenderRoot(){return this}render(){return h`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
      </li>
    `}}u([o()],l.prototype,"title");u([o()],l.prototype,"href");export{a as A,l as a};
