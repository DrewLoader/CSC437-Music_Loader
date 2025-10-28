import"./modulepreload-polyfill-B5Qt9EMX.js";import"./user-playlist-DX-eBV6y.js";import"./artist-songs-DahnqzAz.js";import{n as d,i as p,x as o}from"./property-B3JFcmA-.js";import"./song-details-C15G0nss.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(i){return d({...i,state:!0,attribute:!1})}var v=Object.defineProperty,l=(i,e,r,a)=>{for(var t=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(t=n(e,r,t)||t);return t&&v(e,r,t),t};class c extends p{constructor(){super(...arguments),this.name="",this.ownerName="",this.ownerHref="",this.visibility="",this.created="",this.description=""}createRenderRoot(){return this}render(){return o`
      <dl class="two">
        <dt>Name</dt><dd>${this.name}</dd>

        <dt>Owner</dt>
        <dd>
          ${this.ownerHref?o`<a href="${this.ownerHref}">${this.ownerName}</a>`:this.ownerName}
        </dd>

        <dt>Visibility</dt><dd>${this.visibility}</dd>
        <dt>Created</dt><dd>${this.created}</dd>
        <dt>Description</dt><dd>${this.description}</dd>
      </dl>
    `}}l([d()],c.prototype,"name");l([d()],c.prototype,"ownerName");l([d()],c.prototype,"ownerHref");l([d()],c.prototype,"visibility");l([d()],c.prototype,"created");l([d()],c.prototype,"description");var $=Object.defineProperty,f=(i,e,r,a)=>{for(var t=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(t=n(e,r,t)||t);return t&&$(e,r,t),t};class u extends p{constructor(){super(...arguments),this.title="",this.href="#",this.added=""}createRenderRoot(){return this}render(){return o`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
        ${this.added?o`<small>added ${this.added}</small>`:""}
      </li>
    `}}f([d()],u.prototype,"title");f([d()],u.prototype,"href");f([d()],u.prototype,"added");var g=Object.defineProperty,y=(i,e,r,a)=>{for(var t=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(t=n(e,r,t)||t);return t&&g(e,r,t),t};class h extends p{constructor(){super(...arguments),this.tracks=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(r=>{if(!r.ok)throw new Error(`${r.status} ${r.statusText}`);return r.json()}).then(r=>{const a=w(r);a&&(this.details=a.details,this.tracks=a.tracks)}).catch(r=>console.error("playlist-view hydrate failed:",r))}render(){return o`
      ${this.details?o`
        <section id="details">
          <h2>
            <svg class="icon"><use href="/icons/music.svg#icon-playlist"></use></svg>
            Details
          </h2>
          <playlist-details
            name=${this.details.name}
            ownerName=${this.details.ownerName}
            ownerHref=${this.details.ownerHref??""}
            visibility=${this.details.visibility}
            created=${this.details.created}
            description=${this.details.description}
          ></playlist-details>
        </section>`:""}

      <section id="tracks">
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-record"></use></svg>
          Tracks
        </h2>
        <ul class="list">
          ${this.tracks.map(e=>o`
            <playlist-songs title=${e.title} href=${e.href} added=${e.added??""}></playlist-songs>
          `)}
        </ul>
      </section>
    `}}y([d()],h.prototype,"src");y([m()],h.prototype,"details");y([m()],h.prototype,"tracks");customElements.define("playlist-view",h);function w(i){if(!i||typeof i!="object")return null;const e=i.details??i,r=i.tracks??[];if(!(e!=null&&e.name)||!Array.isArray(r))return null;const a=r.filter(t=>t&&typeof t.title=="string"&&typeof t.href=="string");return{details:{name:String(e.name),ownerName:String(e.ownerName??""),ownerHref:e.ownerHref?String(e.ownerHref):void 0,visibility:String(e.visibility??""),created:String(e.created??""),description:String(e.description??"")},tracks:a.map(t=>({title:String(t.title),href:String(t.href),added:t.added?String(t.added):void 0}))}}
