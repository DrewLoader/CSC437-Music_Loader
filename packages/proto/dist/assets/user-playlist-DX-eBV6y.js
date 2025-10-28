import{i as u,x as p,n as i}from"./property-B3JFcmA-.js";var m=Object.defineProperty,o=(r,t,n,f)=>{for(var e=void 0,s=r.length-1,a;s>=0;s--)(a=r[s])&&(e=a(t,n,e)||e);return e&&m(t,n,e),e};class l extends u{constructor(){super(...arguments),this.userId="",this.region="",this.since="",this.email=""}createRenderRoot(){return this}render(){return p`
      <section id="profile">
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-headphone"></use></svg>
          Profile
        </h2>
        <ul class="list">
          <li>ID: ${this.userId}</li>
          <li>Region: ${this.region}</li>
          <li>Member since: ${this.since}</li>
          <li>Email: ${this.email}</li>
        </ul>
      </section>
    `}}o([i({attribute:"user-id"})],l.prototype,"userId");o([i()],l.prototype,"region");o([i()],l.prototype,"since");o([i()],l.prototype,"email");var y=Object.defineProperty,d=(r,t,n,f)=>{for(var e=void 0,s=r.length-1,a;s>=0;s--)(a=r[s])&&(e=a(t,n,e)||e);return e&&y(t,n,e),e};class v extends u{constructor(){super(...arguments),this.name="",this.href="#"}createRenderRoot(){return this}render(){return p`<li><a href="${this.href}">${this.name}</a></li>`}}d([i()],v.prototype,"name");d([i()],v.prototype,"href");var $=Object.defineProperty,h=(r,t,n,f)=>{for(var e=void 0,s=r.length-1,a;s>=0;s--)(a=r[s])&&(e=a(t,n,e)||e);return e&&$(t,n,e),e};class c extends u{constructor(){super(...arguments),this.name="",this.href="#",this.visibility="",this.tracks=0}createRenderRoot(){return this}render(){const t=this.tracks===1?"1 track":`${this.tracks} tracks`;return p`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-playlist"></use>
        </svg>
        <a href="${this.href}">${this.name}</a>
        <small>${this.visibility}: ${t}</small>
      </li>
    `}}h([i()],c.prototype,"name");h([i()],c.prototype,"href");h([i()],c.prototype,"visibility");h([i({type:Number})],c.prototype,"tracks");export{l as U,v as a,c as b};
