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
            letter-spacing: -2px;
            font-size: 3em;
        }
        #nav-bg {
            position: fixed;
            background: white;
            border-bottom: 1px solid #999;
            display: flex;
            top: 0;
            left: 0;
            width: 90vw;
            padding: 2vh 5vw;
        }
        
        #nav {
          display: block;
          position: fixed;
          top: 50px;
          right: 50px;
          z-index: 1;
          -webkit-user-select: none;
          user-select: none;
        }
        
        #nav a {
          text-decoration: none;
          color: #232323;
          transition: color 0.3s ease;
        }
        
        #nav a:hover {
          color: #454545;
        }
        
        #nav input {
          display: block;
          width: 40px;
          height: 32px;
          position: absolute;
          top: -7px;
          left: -5px;
          cursor: pointer;
          opacity: 0;
          z-index: 2;
          -webkit-touch-callout: none;
        }

        #nav span {
          background: #cdcdcd;
          border-radius: 3px;
          display: block;
          width: 33px;
          height: 4px;
          margin-bottom: 5px;
          position: relative;
          z-index: 1;
          transform-origin: 4px 0;
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      opacity 0.55s ease;
        }
        
        #nav span:first-child { transform-origin: 0 0 }
        
        #nav span:nth-last-child(2) { transform-origin: 0 100% }

        #nav input:checked ~ span {
          opacity: 1;
          transform: rotate(45deg) translate(-2px, -1px);
          background: #232323;
        }

        #nav input:checked ~ span:nth-last-child(3) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        #nav input:checked ~ span:nth-last-child(2) {
          transform: rotate(-45deg) translate(0, -1px);
        }

        #menu {
          position: fixed;
          left: 0;
          width: 100vw;
          height: 100vh;
          margin: -100px 0 0 -50px;
          padding: 50px;
          padding-top: 125px;
          background: #ededed;
          list-style-type: none;
          -webkit-font-smoothing: antialiased;
          transform-origin: 0 0;
          transform: translate(0, -100%);
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        }
        
        #menu li {
          padding: 10vh 0;
          font-size: 4em;
          text-align: center;
        }
        
        #nav input:checked ~ ul
        {
          transform: none;
        }
    </style>`

    template = `<template>
        <div id="nav-bg">
            <nav id="nav">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                  <a href="#"><li>About</li></a>
                  <a href="#"><li>Directory</li></a>
                  <a href="#"><li>Map</li></a>
                </ul>
            </nav>
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
        // this.nav = shadowRoot.getElementById('nav')
        // if(this.open) this.nav.classList.add('open')
        // this.button = shadowRoot.getElementById('button')
        //this.button.onclick = this.toggle.bind(this)
    }
    toggle() {
        this.open = !this.open
        return this.open ? this.nav.classList.add('open') : this.nav.classList.remove('open')
    }
}
customElements.define("uccb-nav", UccbNav);
document.body.appendChild(new UccbNav(true))