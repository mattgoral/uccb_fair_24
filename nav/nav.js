class UccbNav extends HTMLElement {
    style = `<style>
        body {
          background: #232323;
          color: #cdcdcd;
          font-family: "Avenir Next", "Avenir", sans-serif;
        }
        
        #yankee-fair {
            font-family: serif;
            flex-grow: 1;
            letter-spacing: -.05em;
            font-size: 3em;
            line-height: 8vh;
            padding-left: 5vw;
        }
        #yankee-fair a {
            text-decoration: none;
            color: #433;
        }
        #menu-button {
            font-size: 2em;
            font-weight: 900;
            line-height: 8vh;
            letter-spacing: -.1em;
            padding-right: 5vw;
            color: #433;
        }
        #nav-bg {
            position: fixed;
            background: white;
            border-bottom: 1px solid #a99;
            display: flex;
            top: 0;
            left: 0;
            width: 100vw;
            z-index: 2;
        }
        
        #menu {
          z-index: 1;
          display: flex;
          flex-direction: column;
          padding-top: 10vh;
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background: #ededed;
          transform-origin: 0 0;
          transform: translate(0, -100%);
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        }
        
        #menu > div {
          padding: 10vh 0;
          font-size: 4em;
          text-align: center;
         
        }
        
        #menu a {
            text-decoration: none;
            color: #433;
        }
        
        #menu.open { transform: none }
    </style>`

    template = `<template>
        <div id="nav-bg">
            <div id="yankee-fair">
                <a href="/">Yankee Fair</a>
            </div>
            <div id="menu-button">MENU</div>
        </div>
        <div id="menu">
            <div><a href="partners.html">Partners</a></div>
            <div><a href="directory.html">Directory</a></div>
            <div><a href="map.pdf" target="_blank">Map</a></div>
        </div>
    </template>`
    constructor(open= false) {
        super();
        this.open = open
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(new DOMParser()
            .parseFromString(this.style, 'text/html')
            .querySelector('style')
            .cloneNode(true)
        )
        shadowRoot.appendChild(new DOMParser()
            .parseFromString(this.template, 'text/html')
            .querySelector('template')
            .content
            .cloneNode(true)
        )
        this.button = shadowRoot.getElementById('menu-button')
        this.menu = shadowRoot.getElementById('menu')
        this.button.onclick = this.toggle.bind(this)
    }
    toggle() {
        this.open = !this.open
        if(this.open) {
            this.menu.classList.add('open')
            this.button.innerText = 'CLOSE'
        } else {
            this.menu.classList.remove('open')
            this.button.innerText = 'MENU'
        }
    }
}
customElements.define("uccb-nav", UccbNav);
document.body.appendChild(new UccbNav())