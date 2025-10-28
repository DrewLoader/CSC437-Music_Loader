import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as c,x as l,n as t}from"./property-B3JFcmA-.js";var m=Object.defineProperty,d=(r,o,n,f)=>{for(var e=void 0,i=r.length-1,a;i>=0;i--)(a=r[i])&&(e=a(o,n,e)||e);return e&&m(o,n,e),e};class s extends c{constructor(){super(...arguments),this.name="",this.ownerName="",this.ownerHref="",this.visibility="",this.created="",this.description=""}createRenderRoot(){return this}render(){return l`
      <dl class="two">
        <dt>Name</dt><dd>${this.name}</dd>

        <dt>Owner</dt>
        <dd>
          ${this.ownerHref?l`<a href="${this.ownerHref}">${this.ownerName}</a>`:this.ownerName}
        </dd>

        <dt>Visibility</dt><dd>${this.visibility}</dd>
        <dt>Created</dt><dd>${this.created}</dd>
        <dt>Description</dt><dd>${this.description}</dd>
      </dl>
    `}}d([t()],s.prototype,"name");d([t()],s.prototype,"ownerName");d([t()],s.prototype,"ownerHref");d([t()],s.prototype,"visibility");d([t()],s.prototype,"created");d([t()],s.prototype,"description");customElements.define("playlist-details",s);var u=Object.defineProperty,p=(r,o,n,f)=>{for(var e=void 0,i=r.length-1,a;i>=0;i--)(a=r[i])&&(e=a(o,n,e)||e);return e&&u(o,n,e),e};class h extends c{constructor(){super(...arguments),this.title="",this.href="#",this.added=""}createRenderRoot(){return this}render(){return l`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
        ${this.added?l`<small>added ${this.added}</small>`:""}
      </li>
    `}}p([t()],h.prototype,"title");p([t()],h.prototype,"href");p([t()],h.prototype,"added");customElements.define("playlist-songs",h);
