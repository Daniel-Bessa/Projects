(function() {
  'use strict';

  // ===========================
  // MENU CONFIGURATION DATA
  // ===========================
  const MENU_CONFIG = [
    {
      "text": "Sales Analytics",
      "svg": "<svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.15 25.2227L12.1125 20.5853C14.075 19.883 15.9125 18.9386 17.6125 17.8367L14.15 25.2227ZM4.7875 13.4899L0 11.5163L7.625 8.16232C6.4875 9.80902 5.5125 11.5889 4.7875 13.4899ZM24.75 1.24857C24.75 1.24857 18.5625 -1.31957 11.4875 5.53485C8.75 8.18653 7.1125 11.1046 6.05 13.6594C5.7 14.5675 5.9375 15.5604 6.625 16.2384L9.2875 18.8054C9.975 19.4834 11 19.7014 11.9375 19.3624C14.6125 18.3695 17.5875 16.747 20.325 14.0953C27.4 7.2421 24.75 1.24857 24.75 1.24857ZM15.9125 9.80902C14.9375 8.86459 14.9375 7.32685 15.9125 6.38242C16.8875 5.43798 18.475 5.43798 19.45 6.38242C20.4125 7.32685 20.425 8.86459 19.45 9.80902C18.475 10.7535 16.8875 10.7535 15.9125 9.80902ZM8.8375 18.3695L7.075 16.6622L8.8375 18.3695ZM5.5375 24.9926L10.0875 20.5853C9.6625 20.4763 9.25 20.2947 8.875 20.0404L3.775 24.9926H5.5375ZM0.2375 24.9926H2L7.9625 19.2292L6.1875 17.5219L0.2375 23.2854V24.9926ZM0.2375 21.566L5.35 16.6259C5.0875 16.2627 4.9 15.8752 4.7875 15.4514L0.2375 19.8588V21.566Z\" fill=\"white\"/> </svg>",
      "roles": "",
      "children": [
        { "name": "Proxy Sales", "uid": "FC5030841BFB6B4DFB4C85F6C7F43068" },
        { "name": "AI Performance", "uid": "BB9010841BFB53F0E8F6EAEFE0CA932E" }
      ]
    },
    {
      "text": "AI Sales Forecasting",
      "svg": "<svg width=\"29\" height=\"30\" viewBox=\"0 0 29 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M28.05 10.607L25.6417 12.0237L19.975 2.2487L22.3833 0.832031L28.05 10.607ZM10.9083 9.19036L15.1583 16.557L23.8 11.5987L19.55 4.23203L10.9083 9.19036ZM13.175 15.9904L10.3417 11.032L4.25 14.5737L7.08333 19.532L13.175 15.9904ZM0 18.682L1.41667 21.0904L5.1 18.9654L3.68333 16.557L0 18.682ZM14.1667 17.832L13.7417 17.2654L7.65 20.807L8.075 21.3737C8.35833 21.7987 8.78333 22.2237 9.20833 22.507L6.94167 29.1654H9.775L11.7583 23.0737H11.9L14.025 29.1654H16.8583L14.1667 21.232C14.875 20.2404 14.875 18.9654 14.1667 17.832Z\" fill=\"white\"/></svg>",
      "roles": "",
      "children": [
        { "name": "Sales Forecasting", "uid": "61309201F013FA429549454EF50F3B06" },
        { "name": "Lifecycle", "uid": "AA783780A70F76CA7E8B80A9E6C757C7" },
        { "name": "Competitors", "uid": "6BA87A01F01381CD8BBACF2D8E99BDD6" },
        { "name": "Generics", "uid": "89809201F013A17E9A0A70468F5FCD75" },
        { "name": "AI Scope", "uid": "5696F07AACC081BDC89EF07A4040F0E" },
        { "name": "Sales Outliers", "uid": "90702D80F8E9136C5AE597B454F48CE2" }
      ]
    },
    {
      "text": "AI Cash Forecasting",
      "svg": "<svg width=\"25\" height=\"20\" viewBox=\"0 0 25 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2.5 0H22.5C23.163 0 23.7989 0.263392 24.2678 0.732233C24.7366 1.20107 25 1.83696 25 2.5V17.5C25 18.163 24.7366 18.7989 24.2678 19.2678C23.7989 19.7366 23.163 20 22.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0M2.5 2.5V17.5H11.25V2.5H2.5ZM22.5 17.5V2.5H20.95C21.25 3.175 21.1875 3.8375 21.1875 3.9125C21.1 4.75 20.5125 5.625 20.3 5.9375L17.3875 9.125L21.5375 9.1L21.55 10.625L15.05 10.5875L15 9.3375C15 9.3375 18.8125 5.3 19 4.9375C19.175 4.5875 19.8875 2.5 18.125 2.5C16.5875 2.5625 16.7625 4.125 16.7625 4.125L14.8375 4.1375C14.8375 4.1375 14.85 3.3125 15.3125 2.5H13.75V17.5H16.975L16.9625 16.425L18.175 16.4125C18.175 16.4125 19.3125 16.2125 19.325 15.1C19.375 13.85 18.3125 13.85 18.125 13.85C17.9625 13.85 16.7875 13.9125 16.7875 14.9375H14.8875C14.8875 14.9375 14.9375 12.3625 18.125 12.3625C21.375 12.3625 21.2 14.8875 21.2 14.8875C21.2 14.8875 21.25 16.45 19.8125 17.0375L20.4625 17.5H22.5ZM8.65 15H6.775V7.75L4.525 8.45V6.9125L8.45 5.5125H8.65V15Z\" fill=\"white\"/></svg>",
      "roles": "",
      "children": [
        { "name": "Cash Forecasting", "uid": "317816820C92BD2FD1E046A87F393039" },
        { "name": "Cash Outliers", "uid": "7FC0FD822A6429EA4A0922852D2CB93F" }
      ]
    },
    {
      "text": "Business Input",
      "svg": "<svg width=\"26\" height=\"28\" viewBox=\"0 0 26 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23.6114 14.84C23.7946 14.84 23.9648 14.92 24.1087 15.0667L25.784 16.7733C26.072 17.0533 26.072 17.52 25.784 17.8L24.4752 19.1333L21.7921 16.4L23.1009 15.0667C23.2449 14.92 23.4281 14.84 23.6114 14.84ZM21.033 17.1733L23.7161 19.9067L15.7845 28H13.0883V25.2533L21.033 17.1733ZM10.4707 24L7.85301 26.6667H2.61767C1.17795 26.6667 0 25.4667 0 24V5.33333C0 3.86667 1.17795 2.66667 2.61767 2.66667H8.0886C8.63831 1.12 10.078 0 11.7795 0C13.481 0 14.9207 1.12 15.4704 2.66667H20.9414C22.3811 2.66667 23.559 3.86667 23.559 5.33333V10.6667L20.9414 13.3333V5.33333H18.3237V8H5.23534V5.33333H2.61767V24H10.4707ZM11.7795 2.66667C11.0597 2.66667 10.4707 3.26667 10.4707 4C10.4707 4.73333 11.0597 5.33333 11.7795 5.33333C12.4994 5.33333 13.0883 4.73333 13.0883 4C13.0883 3.26667 12.4994 2.66667 11.7795 2.66667Z\" fill=\"white\"/></svg>",
      "roles": "",
      "children": [
        { "name": "Price Analytics", "uid": "3B582A82D6B79ADF020C593651ADD9AF" },
        { "name": "SKU Assumptions", "uid": "FB080F822E4AAA87F2BFDFBED09CF170" },
        { "name": "Brand Events", "uid": "F4286D822A63B89DD8807713F6A192A0" },
        { "name": "Run over Run Analytics", "uid": "66005804C15A3DBD5137A05F1AD177A9" },
        { "name": "Workday Calendar", "uid": "ECF02E06DA31176301716B83B39E0563" }
      ]
    },
    {
      "text": "Admin",
      "svg": "<svg width=\"34\" height=\"20\" viewBox=\"0 0 34 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2.56664 19.9667H18.9333V18.1669C18.9333 17.3668 19.3 16.6334 19.8999 16.1003C20.4333 15.6668 20.9667 15.2669 21.4666 14.9335L5.0332 14.9332V2.46654H24.5999V5.23321C25.1333 4.93327 25.7332 4.76656 26.3998 4.76656H26.9999H27.0666V2.43328C27.0666 1.10006 25.9666 0 24.6334 0H5.03332C3.70011 0 2.60004 1.1 2.60004 2.43328V12.4333L2.59981 12.9999V14.7998C2.59981 15.0998 2.49983 15.4332 2.29986 15.6664L1.03314 17.1999C0.933153 17.2999 0.899902 17.4666 0.899902 17.5998V18.3334C0.899902 19.2334 1.63331 19.9667 2.56664 19.9667ZM12.2 17.4H17.4667V17.5667C17.4667 18.0334 17.1 18.4001 16.6333 18.4001H13.0333C12.5667 18.4001 12.2 18.0334 12.2 17.5667V17.4ZM32.6334 17.2001C32.9333 17.4335 33.1 17.7999 33.1 18.2001V20H20.3V18.2001C20.3 17.8334 20.4667 17.4668 20.7667 17.2001C22.4001 15.8668 24.1667 14.9667 24.4999 14.8C24.5332 14.7668 24.5667 14.7333 24.5667 14.7001V12.1668C24.2332 11.9668 24.0333 11.6001 24.0333 11.1667V8.53351C24.0333 7.2335 25.1001 6.16672 26.4001 6.16672H27C28.3 6.16672 29.3668 7.2335 29.3668 8.53351V11.1667C29.3668 11.5667 29.1668 11.9333 28.8334 12.1668V14.7001C28.8334 14.7333 28.8666 14.8 28.9001 14.8C29.2665 14.9668 30.9999 15.8666 32.6334 17.2001ZM18.0667 5.5667L17.9 5.53345C17.7 5.5002 17.5 5.5002 17.3001 5.43347C16.6335 5.26675 15.9669 4.96681 15.2335 4.46691C15.1335 4.40018 15 4.3002 14.8001 4.3002C14.6001 4.3002 14.5001 4.40018 14.3667 4.46691C13.4001 5.13352 12.5 5.50019 11.6 5.5337C11.3665 5.5337 10.9666 5.63369 10.9666 6.20031V7.10037V8.93377C10.9666 9.16722 10.9998 9.43367 11.0666 9.73383C11.1998 10.3337 11.5332 10.9006 12.0666 11.4338C12.7 12.1004 13.5334 12.6006 14.5999 13.0004C14.6666 13.0337 14.7331 13.0337 14.8334 13.0337C14.9333 13.0337 15.0333 13.0004 15.1001 12.967L15.3668 12.867C15.6002 12.767 15.8002 12.667 16.0334 12.567C16.8667 12.1336 17.5001 11.6005 17.9667 10.9671C18.4001 10.4005 18.6001 9.83381 18.6333 9.20042C18.6666 8.83327 18.6666 8.40012 18.6666 7.99994V6.16654C18.6666 5.83335 18.4331 5.59994 18.0667 5.5667ZM17.7332 9.19998C17.7 9.63338 17.5665 10.0333 17.2333 10.4333C16.8334 10.9666 16.3 11.3998 15.5999 11.7665C15.4 11.8665 15.2 11.9664 15.0001 12.0332C14.9333 12.0664 14.9001 12.0664 14.8333 12.0999V8.7668H11.9334V7.1334V6.43328C12.9 6.3333 13.8335 5.96663 14.8333 5.30001V8.7668L17.7333 8.76656L17.7332 9.19998Z\" fill=\"white\"/></svg>",
      "roles": "admin",
      "children": [
        { "name": "User Statistics", "uid": "44885E06DA30BA403C1A62486262E984" },
        { "name": "AI Flex Launch pad", "uid": "E5E804069B094A7D0A00F91DFAFB725C" },
        { "name": "Flatfile Uploads", "uid": "820056878CEAA9B770B7BDA7310D9253" },
        { "name": "Single GX Scenario", "uid": "4F488C069B0AD4E924A034C96E2553AF" },
        { "name": "Multi GX Scenario", "uid": "20C993035FB23F1CC46E42D5B3A44E8F" }
      ]
    }
  ];

  // Access control - allowed roles for admin menu
  const ADMIN_ROLES = ["TM_CLD_SAC_DEV", "TM_CLD_SAC_SUPP_NCON", "TM_CLD_SAC_SUPP_CONF", "TM_AIDA_PWR_W"];

  // ===========================
  // STATE VARIABLES
  // ===========================
  let _accessParameter = "";
  let _urlParameter = "";
  let _selectedItemID = "";
  let _URLParameter_value = "";
  let urlDefinedParameters = "/?url_api=true&view_id=appBuilding";

  // ===========================
  // HTML TEMPLATE WITH CSS
  // ===========================
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
      <style>
          nav {
              width: 71px;
              height: 100%;
              overflow: hidden;
              white-space: nowrap;
              display: block;
              cursor: pointer;
              background-color: #002068;
              border-right: 1px solid #9E9E9E;
          }
          .container-item{
            margin-bottom: 20px;
            width: 72px;
            overflow: hidden;
            color: #fff;
            pointer-events: none;
          }
          .container-item:first-of-type{
            margin-bottom: 68px;
          }
          .container-menu {
            display: flex;
            cursor: pointer;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 59px;
            height: 48px;
            margin: 0 auto;
            pointer-events: auto;
          }
          .container-menu:hover {
            background-color: #3A5BA7;
            border-radius: 4px;
          }
          span {
            cursor: pointer;
            background-size: 30px;
            background-repeat: no-repeat;
            background-position: left 0px center;
            margin: 0 auto;
            fill: #fff;
          }
          /* When expanded, move icons to the left */
          nav[style*="width: 269px"] .container-menu {
            justify-content: flex-start;
            width: 258px;
          }
          nav[style*="width: 269px"] span {
            margin-left: 13px;
            margin-right: 5px;
            width: 34px;
            // height: 20px;
          }
          svg {
             display: block;
             margin: 0 auto;
          }
          button {
              border: 0px;
              cursor: pointer;
              background-color: transparent;
              color: inherit;
              text-align: left;
              padding: 0;
              width: 158px;
              height: 24px;
              font-family: 'Arial';
              font-style: normal;
              font-size: 16px;
              line-height: 24px;
              display: none;
              flex-shrink: 0;
          }
          small {
            height: 14px;
            width: 14px;
            margin-left: 15px;
            margin-right: 15px;
            display: none;
            flex-shrink: 0;
          }
          .rotate-small {
            transform: rotate(180deg);
          }
          ul {
              margin: 0;
              list-style: none;
              padding: 0;
              margin-top: 16px;
              display: none;
              pointer-events: auto;
          }
          li {
            width: 0;
          }
          a {
            font-family: 'Arial' !important;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 18px;
            display: flex;
            align-items: center;
            text-decoration: none;
            gap: 10px;
            padding: 0 0 0 20px;
            margin: 0 48px;
            width: 184px;
            height: 38px;
            cursor: pointer;
            color: #fff;
          }
          a:visited {
            text-decoration: none;
            color: #fff;
          }
          a:hover {
            text-decoration: none;
            background: #3A5BA7;
            border-radius: 4px;
          }
          .path {
            fill: #002068;
          }
          .setSelectedParent {
            background: #fff;
            color: #002068;
            font-weight: 700;
            border-radius: 4px;
          }
          .setSelectedParent button{
            font-weight: 700;
          }
          .setSelectedParent:hover {
            background: #fff;
          }
          .setSelectedItem {
            text-decoration: none;
            background: #fff;
            color: #002068 !important;
            font-weight: 700;
            border-radius: 4px;
            cursor: default;
          }
          .setSelectedItem:hover {
            background: #fff;
          }
          .setSelectedParent span svg path {
            fill: #002068 !important;
          }
          .setSelectedParent small svg path {
            stroke: #002068 !important;
          }
          .close{
            position: absolute;
            display: none;
            left: 236px;
            top: 14px;
            background-size: 15px;
            background-repeat: no-repeat;
            background-position: center;
            margin-left: 0;
          }
          .close svg{
            width: 40px;
            height: 40px;
          }
          .container-admin{
            width: 59px;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.7s ease-in-out;
            flex-direction: column;
            margin: 0 auto;
          }
          #MenuAdmin {
            border-top: 1px solid #002068;
            padding-top: 20px;
          }
      </style>
      <nav id="nav"></nav>
  `;

  // ===========================
  // CUSTOM ELEMENT DEFINITION
  // ===========================
  customElements.define('com-sap-side-navigation-menu-test', class SideNavigationMenuTest extends HTMLElement {

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: "open"});
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this._export_settings = {};

      // Dispatch onClick event
      this.addEventListener("click", event => {
        this.dispatchEvent(new Event("onClick"));
      });
    }

    connectedCallback(){
      this.render();
      this.initializeMenu();
    }

    disconnectedCallback(){}

    onCustomWidgetBeforeUpdate(oChangedProperties) {}

    onCustomWidgetAfterUpdate(oChangedProperties) {
      this.render();  // Re-render the menu to ensure all elements exist
      this.initializeMenu();  // Re-attach event listeners after re-rendering
      this.handleAccessControl();
      this.highlightActiveMenuItem();
    }

    // ===========================
    // GETTERS AND SETTERS
    // ===========================
    set AccessParameter(value) {
      _accessParameter = value;
    }
    get AccessParameter() {
      return _accessParameter;
    }

    set URLParameter(value) {
      _urlParameter = value;
    }
    get URLParameter() {
      return _urlParameter;
    }

    getID() {
      return _selectedItemID;
    }

    // ===========================
    // RENDER MENU HTML
    // ===========================
    render() {
      const nav = this._shadowRoot.getElementById("nav");
      let html = '';

      // Close button
      html += `
        <div class="container-item">
          <span id="close" class="close">
            <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_10541_104078)">
                <ellipse cx="10.5883" cy="12.5" rx="10.2347" ry="10.5" transform="rotate(180 10.5883 12.5)" fill="#002068"/>
                <path d="M0.830957 12.5C0.830956 6.95301 5.21093 2.47727 10.5883 2.47727C15.9658 2.47727 20.3457 6.95301 20.3457 12.5C20.3457 18.047 15.9658 22.5227 10.5883 22.5227C5.21093 22.5227 0.830957 18.047 0.830957 12.5Z" stroke="#002068" stroke-width="0.954545"/>
              </g>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 15.8538V17.2168L6.34253 12.9032L11 8.77344V10.1099L8.30645 12.4983H16.002V13.4983H8.45677L11 15.8538Z" fill="white"/>
              <defs>
                <filter id="filter0_d_10541_104078" x="0.35376" y="0.95" width="22.5692" height="23.1" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="1.05"/>
                  <feGaussianBlur stdDeviation="0.525"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10541_104078"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10541_104078" result="shape"/>
                </filter>
              </defs>
            </svg>
          </span>
        </div>
      `;

      // Menu items
      MENU_CONFIG.forEach((menu, index) => {
        const menuNum = index + 1;
        const isAdmin = menu.roles === "admin";
        const containerClass = isAdmin ? "container-item container-admin" : "container-item";
        const containerId = isAdmin ? 'id="container-admin"' : '';

        html += `
          <div class="${containerClass}" ${containerId}>
            <div class="container-menu" id="Menu${menuNum}">
              <span id="icon${menuNum}">${menu.svg}</span>
              <button id="Menu${menuNum}.Button" class="menu">${menu.text}</button>
              <small class="arrow rotate-small">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
                </svg>
              </small>
            </div>
            <ul id="Menu${menuNum}UL">
        `;

        menu.children.forEach((child, childIndex) => {
          const currentURL = window.location.href;
          const baseURL = currentURL.split('/aa/')[0];
          const appURL = `${baseURL}/aa/${child.uid}${urlDefinedParameters}${_URLParameter_value}`;
          html += `<li id="Menu${menuNum}.Opt${childIndex + 1}"><a id="Menu${menuNum}.link${childIndex + 1}" href="${appURL}" data-uid="${child.uid}" target="_blank">${child.name}</a></li>`;
        });

        html += `
            </ul>
          </div>
        `;
      });

      nav.innerHTML = html;
    }

    // ===========================
    // INITIALIZE MENU INTERACTIONS
    // ===========================
    initializeMenu() {
      const nav = this._shadowRoot.getElementById("nav");
      const closeIcon = this._shadowRoot.getElementById("close");

      // CRITICAL: Ensure collapsed state on init
      this.setCollapsedState();

      // Click handlers for menu items
      MENU_CONFIG.forEach((_, index) => {
        const menuNum = index + 1;
        const menuBtn = this._shadowRoot.getElementById(`Menu${menuNum}`);
        const menuUl = this._shadowRoot.getElementById(`Menu${menuNum}UL`);

        menuBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = menuUl.style.display === "block";

          if (isOpen) {
            this.closeMenu(menuNum);
          } else {
            this.openMenu(menuNum);
          }
        });
      });

      // Nav bar click to expand/collapse
      nav.addEventListener("click", (e) => {
        if (e.target === nav) {
          const isExpanded = nav.style.width === "269px";
          if (isExpanded) {
            this.setCollapsedState();
          } else {
            this.setExpandedState();
          }
        }
      });

      // Close icon click
      closeIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        this.setCollapsedState();
      });

      // Link clicks - capture ID and close menu
      this._shadowRoot.querySelectorAll("a").forEach(link => {
        link.addEventListener('click', () => {
          _selectedItemID = link.getAttribute('data-uid');
          this.setCollapsedState();
        });
      });
    }

    // ===========================
    // MENU STATE CONTROL
    // ===========================
    setCollapsedState() {
      const nav = this._shadowRoot.getElementById("nav");
      const closeIcon = this._shadowRoot.getElementById("close");
      const containerItems = this._shadowRoot.querySelectorAll(".container-item");

      // Get parent containers
      const parent = this.parentNode;
      if (parent) {
        const secondParent = parent.parentNode;
        if (secondParent) {
          const thirdParent = secondParent.parentNode;
          if (thirdParent) {
            thirdParent.style.width = "72px";
            const fourthParent = thirdParent.parentNode;
            if (fourthParent) {
              fourthParent.style.width = "72px";
            }
          }
        }
      }

      // Set navbar and items to collapsed width
      nav.style.width = "71px";
      closeIcon.style.display = "none";

      containerItems.forEach((item) => {
        // Admin container (last item) should be 59px, others 71px
        if (item.classList.contains('container-admin')) {
          item.style.width = "59px";
        } else {
          item.style.width = "71px";
        }
      });

      // Hide all buttons and arrows
      this._shadowRoot.querySelectorAll("button").forEach(btn => btn.style.display = "none");
      this._shadowRoot.querySelectorAll("small").forEach(small => small.style.display = "none");

      // Hide all submenus
      MENU_CONFIG.forEach((_, index) => {
        const menuNum = index + 1;
        const menuUl = this._shadowRoot.getElementById(`Menu${menuNum}UL`);
        if (menuUl) menuUl.style.display = "none";
      });
    }

    setExpandedState() {
      const nav = this._shadowRoot.getElementById("nav");
      const closeIcon = this._shadowRoot.getElementById("close");
      const containerItems = this._shadowRoot.querySelectorAll(".container-item");
      const parent = this.parentNode;

      if (parent) {
        parent.style.overflow = "visible";
        const secondParent = parent.parentNode;
        if (secondParent) {
          const thirdParent = secondParent.parentNode;
          if (thirdParent) {
            thirdParent.style.width = "270px";
            const fourthParent = thirdParent.parentNode;
            if (fourthParent) {
              fourthParent.style.width = "270px";
            }
          }
        }
      }

      nav.style.width = "269px";
      closeIcon.style.display = "block";

      containerItems.forEach(item => {
        if (item.classList.contains('container-admin')) {
          item.style.width = "257px";
        } else {
          item.style.width = "269px";
        }
      });

      // Show all buttons and arrows
      this._shadowRoot.querySelectorAll("button").forEach(btn => btn.style.display = "block");
      this._shadowRoot.querySelectorAll("small").forEach(small => small.style.display = "block");
    }

    openMenu(menuNum) {
      // First expand the nav if collapsed
      const nav = this._shadowRoot.getElementById("nav");
      if (nav.style.width !== "269px") {
        this.setExpandedState();
      }

      // Close all other menus
      MENU_CONFIG.forEach((_, index) => {
        const num = index + 1;
        if (num !== menuNum) {
          const ul = this._shadowRoot.getElementById(`Menu${num}UL`);
          const arrow = this._shadowRoot.querySelector(`#Menu${num} .arrow`);
          if (ul) ul.style.display = "none";
          if (arrow) arrow.classList.add("rotate-small");
        }
      });

      // Open target menu
      const menuUl = this._shadowRoot.getElementById(`Menu${menuNum}UL`);
      const arrow = this._shadowRoot.querySelector(`#Menu${menuNum} .arrow`);
      if (menuUl) menuUl.style.display = "block";
      if (arrow) arrow.classList.remove("rotate-small");
    }

    closeMenu(menuNum) {
      const menuUl = this._shadowRoot.getElementById(`Menu${menuNum}UL`);
      const arrow = this._shadowRoot.querySelector(`#Menu${menuNum} .arrow`);
      if (menuUl) menuUl.style.display = "none";
      if (arrow) arrow.classList.add("rotate-small");
    }

    // ===========================
    // ACCESS CONTROL
    // ===========================
    handleAccessControl() {
      const adminContainer = this._shadowRoot.getElementById("container-admin");
      if (!adminContainer) return;

      let hasAccess = false;

      if (Array.isArray(_accessParameter) && _accessParameter.length > 0) {
        hasAccess = _accessParameter.some(access =>
          ADMIN_ROLES.includes(access.name)
        );
      }

      if (hasAccess) {
        adminContainer.style.visibility = "visible";
        adminContainer.style.opacity = "1";
      } else {
        adminContainer.style.visibility = "hidden";
        adminContainer.style.opacity = "0";
      }
    }

    // ===========================
    // HIGHLIGHT ACTIVE MENU ITEM
    // ===========================
    highlightActiveMenuItem() {
      // Get current URL ID
      const windowURL = window.location.href;
      const urlParts = windowURL.split('/');
      let currentUID = "";

      // Find the UID in the URL (it's typically after /aa/)
      const aaIndex = urlParts.findIndex(part => part === 'aa');
      if (aaIndex !== -1 && aaIndex + 1 < urlParts.length) {
        // Extract UID and remove any query parameters or hash fragments
        currentUID = urlParts[aaIndex + 1].split('?')[0].split('#')[0].trim();
      }

      if (!currentUID) return;

      // Clear all highlights
      this._shadowRoot.querySelectorAll(".setSelectedParent").forEach(el => {
        el.classList.remove("setSelectedParent");
      });
      this._shadowRoot.querySelectorAll(".setSelectedItem").forEach(el => {
        el.classList.remove("setSelectedItem");
      });
      this._shadowRoot.querySelectorAll("span svg path").forEach(path => {
        path.classList.remove("path");
      });

      // Find and highlight matching item
      MENU_CONFIG.forEach((menu, menuIndex) => {
        const menuNum = menuIndex + 1;
        menu.children.forEach((child, childIndex) => {
          // Compare UIDs (case-sensitive exact match)
          if (child.uid && child.uid.trim() === currentUID) {
            // Highlight parent menu
            const menuContainer = this._shadowRoot.getElementById(`Menu${menuNum}`);
            const icon = this._shadowRoot.getElementById(`icon${menuNum}`);
            const arrow = this._shadowRoot.querySelector(`#Menu${menuNum} .arrow path`);

            if (menuContainer) {
              menuContainer.classList.add("setSelectedParent");
            }
            if (icon) {
              const paths = icon.querySelectorAll("svg path");
              paths.forEach(p => p.classList.add("path"));
            }
            if (arrow) arrow.style.stroke = "#fff";

            // Highlight child link
            const link = this._shadowRoot.getElementById(`Menu${menuNum}.link${childIndex + 1}`);
            if (link) {
              link.classList.add("setSelectedItem");
              // Prevent navigation for active link
              link.addEventListener('click', function(e) {
                e.preventDefault();
              });
            }
          }
        });
      });
    }

    onCustomWidgetDestroy(){}
  });
})();
