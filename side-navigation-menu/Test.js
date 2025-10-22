(function()  {
  let _shadowRoot;
  let ID = ""; //ID of option selected
  let toggleAdminVar = "";
  let _URLParameter_value = "";
  let previousURL = "";
  let setParameter = "";
  let toggleAdminMenu = "";
  let toggleSideNav = "";
  let _toggleAdminParameter = "";
  let _toggleSideParameter = "";
  let _toggleMenu1Parameter = "";
  let _toggleMenu2Parameter = "";
  let _toggleMenu3Parameter = "";
  let _toggleMenu4Parameter = "";
  let navBar;
  let openFunction;
  let closeFunction;
  let firstMenuOpen
  let firstMenuClose;
  let secondMenuOpen;
  let secondMenuClose;
  let thirdMenuOpen;
  let thirdMenuClose;
  let fourthMenuOpen;
  let fourthMenuClose;
  let adminAccess;
  let _AccessParameter_value = "";
  let _toggleAdminParameterBefore = "";

  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
      <script><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /></script>
      <style>
          .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
          }
          nav {
              width: 71px;
              height: 100%;
              overflow: hidden;
              white-space: nowrap;
              display: block;
              cursor: pointer;
              background-color: #0460A9;
              border-right: 1px solid #9E9E9E;
          }
          .container-item{
            // margin-bottom: 16px;
            margin-bottom: 20px;
            width: 72px;
            overflow: hidden;
          }
          .container-item:first-of-type{
            // height: 48px;
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
          }
          span {
            cursor: pointer;
            background-size: 30px;
            background-repeat: no-repeat;
            background-position: left 0px center;
            margin: 0 auto;
            margin-left: 16px;
            fill: #fff;
          }
          svg {
             display: block;
             margin: 0 auto;
          }
          button {
              border: 0px;
              cursor: pointer;
              background-color: transparent;
              color: #fff;
              text-align: left;
              padding: 0;
              width: 158px;
              height: 24px;
              font-family: 'Arial';
              font-style: normal;
              font-size: 16px;
              line-height: 24px;
              display: none;
          }
          small {
            height: 14px;
            width: 14px;
            margin: 0 15px;
            display: none;
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
            // background: #EBF2F8;
            color: #fff;
            font-weight: 700;
          }
          .path {
            fill: #0460A9;
          }
          .setSelectedParent{
            background: #2877B6;
            color: #fff;
            font-weight: 700;
            border-radius: 4px;
          }
          .setSelectedParent button{
            font-weight: 700;
          }
          .setSelectedItem {
            text-decoration: none;
            background: #2877B6;
            color: #fff !important;
            font-weight: 700;
            border-radius: 4px;
            cursor: default;
          }
          .close{
            position: absolute;
            display: none;
            left: 246px;
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
          .container-demo {
            position: fixed;
            height: 48px;
            bottom: 38px;
            margin: 0 auto;
          }
          .DemoContainer {
            // width: 194px;
            gap: 10px;
          }
          .DemoContainer span {
            background-position: 0;
            margin: 0;
          }
          .DemoContainer button {
            width: auto;
          }
          .container-demo small {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            color: white;
            margin: 0;
            font-size: 16px;
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
            border-top: 1px solid #8CBEE7;
            padding-top: 20px;
          }
          #AdminToggleOff {
            display: none;
          }
          
      </style>
      <nav id="nav">
        <div class="container-item">
          <span id="close" class="close">

            <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_10541_104078)">
                <ellipse cx="10.5883" cy="12.5" rx="10.2347" ry="10.5" transform="rotate(180 10.5883 12.5)" fill="#0460A9"/>
                <path d="M0.830957 12.5C0.830956 6.95301 5.21093 2.47727 10.5883 2.47727C15.9658 2.47727 20.3457 6.95301 20.3457 12.5C20.3457 18.047 15.9658 22.5227 10.5883 22.5227C5.21093 22.5227 0.830957 18.047 0.830957 12.5Z" stroke="#0460A9" stroke-width="0.954545"/>
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

        <div class="container-item">
          <div class="container-menu" id="Menu1">
            <span id="icon1">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M14.15 25.2227L12.1125 20.5853C14.075 19.883 15.9125 18.9386 17.6125 17.8367L14.15 25.2227ZM4.7875 13.4899L0 11.5163L7.625 8.16232C6.4875 9.80902 5.5125 11.5889 4.7875 13.4899ZM24.75 1.24857C24.75 1.24857 18.5625 -1.31957 11.4875 5.53485C8.75 8.18653 7.1125 11.1046 6.05 13.6594C5.7 14.5675 5.9375 15.5604 6.625 16.2384L9.2875 18.8054C9.975 19.4834 11 19.7014 11.9375 19.3624C14.6125 18.3695 17.5875 16.747 20.325 14.0953C27.4 7.2421 24.75 1.24857 24.75 1.24857ZM15.9125 9.80902C14.9375 8.86459 14.9375 7.32685 15.9125 6.38242C16.8875 5.43798 18.475 5.43798 19.45 6.38242C20.4125 7.32685 20.425 8.86459 19.45 9.80902C18.475 10.7535 16.8875 10.7535 15.9125 9.80902ZM8.8375 18.3695L7.075 16.6622L8.8375 18.3695ZM5.5375 24.9926L10.0875 20.5853C9.6625 20.4763 9.25 20.2947 8.875 20.0404L3.775 24.9926H5.5375ZM0.2375 24.9926H2L7.9625 19.2292L6.1875 17.5219L0.2375 23.2854V24.9926ZM0.2375 21.566L5.35 16.6259C5.0875 16.2627 4.9 15.8752 4.7875 15.4514L0.2375 19.8588V21.566Z" fill="white"/> 
              </svg>
            </span>
            <button id="Menu1.Button" class="menu">Sales Analytics</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu1UL">
            <li id="Menu1.Opt1"><a id="Menu1.link1" href="" target="ProxySales">Proxy Sales</a></li>
            <li id="Menu1.Opt2"><a id="Menu1.link2" href="" target="AIPerformance">AI Performance</a></li>
            <!-- <li id="Menu1.Opt2"><a id="Menu1.link2" href="" target="ForecastAccuracy">Forecast Accuracy</a></li> -->
            <!-- <li id="Menu1.Opt3"><a id="Menu1.link3" href="" target="PVM">PVM</a></li> -->
            <!-- <li id="Menu1.Opt4"><a id="Menu1.link4" href="" target="ROPs">ROPs</a></li> -->
          </ul>
        </div>

        <div class="container-item">
          <div class="container-menu" id="Menu2">
            <span id="icon2">
            <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.05 10.607L25.6417 12.0237L19.975 2.2487L22.3833 0.832031L28.05 10.607ZM10.9083 9.19036L15.1583 16.557L23.8 11.5987L19.55 4.23203L10.9083 9.19036ZM13.175 15.9904L10.3417 11.032L4.25 14.5737L7.08333 19.532L13.175 15.9904ZM0 18.682L1.41667 21.0904L5.1 18.9654L3.68333 16.557L0 18.682ZM14.1667 17.832L13.7417 17.2654L7.65 20.807L8.075 21.3737C8.35833 21.7987 8.78333 22.2237 9.20833 22.507L6.94167 29.1654H9.775L11.7583 23.0737H11.9L14.025 29.1654H16.8583L14.1667 21.232C14.875 20.2404 14.875 18.9654 14.1667 17.832Z" fill="white"/>
            </svg>
            </span>
            <button id="Menu2.Button" class="menu">AI Sales Forecasting</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu2UL">
            <li id="Menu2.Opt1"><a id="Menu2.link1" href="" target="SalesForecasting">Sales Forecasting</a></li>
            <!-- <li id="Menu2.Opt2"><a id="Menu2.link2" href="" target="Launches">Launches</a></li> -->
            <li id="Menu2.Opt3"><a id="Menu2.link3" href="" target="Lifecycle">Lifecycle</a></li>
            <li id="Menu2.Opt4"><a id="Menu2.link4" href="" target="Competitors">Competitors</a></li>
            <li id="Menu2.Opt5"><a id="Menu2.link5" href="" target="Generics">Generics</a></li>
            <li id="Menu2.Opt6"><a id="Menu2.link6" href="" target="AIScope">AI Scope</a></li>
            <li id="Menu2.Opt7"><a id="Menu2.link7" href="" target="SalesOutliers">Sales Outliers</a></li>
          </ul>
        </div>

        <div class="container-item">
          <div class="container-menu" id="Menu3">
            <span id="icon3">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0H22.5C23.163 0 23.7989 0.263392 24.2678 0.732233C24.7366 1.20107 25 1.83696 25 2.5V17.5C25 18.163 24.7366 18.7989 24.2678 19.2678C23.7989 19.7366 23.163 20 22.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0M2.5 2.5V17.5H11.25V2.5H2.5ZM22.5 17.5V2.5H20.95C21.25 3.175 21.1875 3.8375 21.1875 3.9125C21.1 4.75 20.5125 5.625 20.3 5.9375L17.3875 9.125L21.5375 9.1L21.55 10.625L15.05 10.5875L15 9.3375C15 9.3375 18.8125 5.3 19 4.9375C19.175 4.5875 19.8875 2.5 18.125 2.5C16.5875 2.5625 16.7625 4.125 16.7625 4.125L14.8375 4.1375C14.8375 4.1375 14.85 3.3125 15.3125 2.5H13.75V17.5H16.975L16.9625 16.425L18.175 16.4125C18.175 16.4125 19.3125 16.2125 19.325 15.1C19.375 13.85 18.3125 13.85 18.125 13.85C17.9625 13.85 16.7875 13.9125 16.7875 14.9375H14.8875C14.8875 14.9375 14.9375 12.3625 18.125 12.3625C21.375 12.3625 21.2 14.8875 21.2 14.8875C21.2 14.8875 21.25 16.45 19.8125 17.0375L20.4625 17.5H22.5ZM8.65 15H6.775V7.75L4.525 8.45V6.9125L8.45 5.5125H8.65V15Z" fill="white"/>
              </svg>
            </span>
            <button id="Menu3.Button" class="menu">AI Cash Forecasting</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu3UL">
            <li id="Menu3.Opt1"><a id="Menu3.link1" href="" target="CashForecasting">Cash Forecasting</a></li>
            <li id="Menu3.Opt2"><a id="Menu3.link2" href="" target="CashOutliers">Cash Outliers</a></li>
          </ul>
        </div>
        
        <div class="container-item">
          <div class="container-menu" id="Menu4">
            <span id="icon4">
              <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6114 14.84C23.7946 14.84 23.9648 14.92 24.1087 15.0667L25.784 16.7733C26.072 17.0533 26.072 17.52 25.784 17.8L24.4752 19.1333L21.7921 16.4L23.1009 15.0667C23.2449 14.92 23.4281 14.84 23.6114 14.84ZM21.033 17.1733L23.7161 19.9067L15.7845 28H13.0883V25.2533L21.033 17.1733ZM10.4707 24L7.85301 26.6667H2.61767C1.17795 26.6667 0 25.4667 0 24V5.33333C0 3.86667 1.17795 2.66667 2.61767 2.66667H8.0886C8.63831 1.12 10.078 0 11.7795 0C13.481 0 14.9207 1.12 15.4704 2.66667H20.9414C22.3811 2.66667 23.559 3.86667 23.559 5.33333V10.6667L20.9414 13.3333V5.33333H18.3237V8H5.23534V5.33333H2.61767V24H10.4707ZM11.7795 2.66667C11.0597 2.66667 10.4707 3.26667 10.4707 4C10.4707 4.73333 11.0597 5.33333 11.7795 5.33333C12.4994 5.33333 13.0883 4.73333 13.0883 4C13.0883 3.26667 12.4994 2.66667 11.7795 2.66667Z" fill="white"/>
              </svg>
            </span>
            <button id="Menu4.Button" class="menu">Business Input</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu4UL">
            <!-- <li id="Menu4.Opt1"><a id="Menu4.link1" href="" target="InputCheckpoint">Input Checkpoint</a></li> -->
            <li id="Menu4.Opt2"><a id="Menu4.link2" href="" target="PriceAssumptions">Price Analytics</a></li>
            <li id="Menu4.Opt7"><a id="Menu4.link7" href="" target="SKUAssumptions">SKU Assumptions</a></li>
            <li id="Menu4.Opt3"><a id="Menu4.link3" href="" target="BrandEvents">Brand Events</a></li>
            <li id="Menu4.Opt4"><a id="Menu4.link4" href="" target="RunAnalytics">Run over Run Analytics</a></li>
            <!-- <li id="Menu4.Opt4"><a id="Menu4.link4" href="" target="Competitors">Competitors</a></li> -->
            <!-- <li id="Menu4.Opt5"><a id="Menu4.link5" href="" target="KeyDrivers">Key Drivers</a></li> -->
            <li id="Menu4.Opt6"><a id="Menu4.link6" href="" target="WorkdayCalendar">Workday Calendar</a></li>
          </ul>
        </div>


        <div class="container-item container-admin" id="container-admin">
          <div class="container-menu" id="MenuAdmin">
            <span id="iconAdmin">
              <!-- <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6114 14.84C23.7946 14.84 23.9648 14.92 24.1087 15.0667L25.784 16.7733C26.072 17.0533 26.072 17.52 25.784 17.8L24.4752 19.1333L21.7921 16.4L23.1009 15.0667C23.2449 14.92 23.4281 14.84 23.6114 14.84ZM21.033 17.1733L23.7161 19.9067L15.7845 28H13.0883V25.2533L21.033 17.1733ZM10.4707 24L7.85301 26.6667H2.61767C1.17795 26.6667 0 25.4667 0 24V5.33333C0 3.86667 1.17795 2.66667 2.61767 2.66667H8.0886C8.63831 1.12 10.078 0 11.7795 0C13.481 0 14.9207 1.12 15.4704 2.66667H20.9414C22.3811 2.66667 23.559 3.86667 23.559 5.33333V10.6667L20.9414 13.3333V5.33333H18.3237V8H5.23534V5.33333H2.61767V24H10.4707ZM11.7795 2.66667C11.0597 2.66667 10.4707 3.26667 10.4707 4C10.4707 4.73333 11.0597 5.33333 11.7795 5.33333C12.4994 5.33333 13.0883 4.73333 13.0883 4C13.0883 3.26667 12.4994 2.66667 11.7795 2.66667Z" fill="white"/>
              </svg> -->

              <svg width="34" height="20" viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.56664 19.9667H18.9333V18.1669C18.9333 17.3668 19.3 16.6334 19.8999 16.1003C20.4333 15.6668 20.9667 15.2669 21.4666 14.9335L5.0332 14.9332V2.46654H24.5999V5.23321C25.1333 4.93327 25.7332 4.76656 26.3998 4.76656H26.9999H27.0666V2.43328C27.0666 1.10006 25.9666 0 24.6334 0H5.03332C3.70011 0 2.60004 1.1 2.60004 2.43328V12.4333L2.59981 12.9999V14.7998C2.59981 15.0998 2.49983 15.4332 2.29986 15.6664L1.03314 17.1999C0.933153 17.2999 0.899902 17.4666 0.899902 17.5998V18.3334C0.899902 19.2334 1.63331 19.9667 2.56664 19.9667ZM12.2 17.4H17.4667V17.5667C17.4667 18.0334 17.1 18.4001 16.6333 18.4001H13.0333C12.5667 18.4001 12.2 18.0334 12.2 17.5667V17.4ZM32.6334 17.2001C32.9333 17.4335 33.1 17.7999 33.1 18.2001V20H20.3V18.2001C20.3 17.8334 20.4667 17.4668 20.7667 17.2001C22.4001 15.8668 24.1667 14.9667 24.4999 14.8C24.5332 14.7668 24.5667 14.7333 24.5667 14.7001V12.1668C24.2332 11.9668 24.0333 11.6001 24.0333 11.1667V8.53351C24.0333 7.2335 25.1001 6.16672 26.4001 6.16672H27C28.3 6.16672 29.3668 7.2335 29.3668 8.53351V11.1667C29.3668 11.5667 29.1668 11.9333 28.8334 12.1668V14.7001C28.8334 14.7333 28.8666 14.8 28.9001 14.8C29.2665 14.9668 30.9999 15.8666 32.6334 17.2001ZM18.0667 5.5667L17.9 5.53345C17.7 5.5002 17.5 5.5002 17.3001 5.43347C16.6335 5.26675 15.9669 4.96681 15.2335 4.46691C15.1335 4.40018 15 4.3002 14.8001 4.3002C14.6001 4.3002 14.5001 4.40018 14.3667 4.46691C13.4001 5.13352 12.5 5.50019 11.6 5.5337C11.3665 5.5337 10.9666 5.63369 10.9666 6.20031V7.10037V8.93377C10.9666 9.16722 10.9998 9.43367 11.0666 9.73383C11.1998 10.3337 11.5332 10.9006 12.0666 11.4338C12.7 12.1004 13.5334 12.6006 14.5999 13.0004C14.6666 13.0337 14.7331 13.0337 14.8334 13.0337C14.9333 13.0337 15.0333 13.0004 15.1001 12.967L15.3668 12.867C15.6002 12.767 15.8002 12.667 16.0334 12.567C16.8667 12.1336 17.5001 11.6005 17.9667 10.9671C18.4001 10.4005 18.6001 9.83381 18.6333 9.20042C18.6666 8.83327 18.6666 8.40012 18.6666 7.99994V6.16654C18.6666 5.83335 18.4331 5.59994 18.0667 5.5667ZM17.7332 9.19998C17.7 9.63338 17.5665 10.0333 17.2333 10.4333C16.8334 10.9666 16.3 11.3998 15.5999 11.7665C15.4 11.8665 15.2 11.9664 15.0001 12.0332C14.9333 12.0664 14.9001 12.0664 14.8333 12.0999V8.7668H11.9334V7.1334V6.43328C12.9 6.3333 13.8335 5.96663 14.8333 5.30001V8.7668L17.7333 8.76656L17.7332 9.19998Z" fill="white"/>
              </svg>

            </span>
            <button id="MenuAdmin.Button" class="menu">Admin</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="MenuAdminUL">
            <li id="MenuAdmin.Opt1"><a id="MenuAdmin.link1" href="" target="UserStatistics">User Statistics</a></li>
            <li id="MenuAdmin.Opt5"><a id="MenuAdmin.link2" href="" target="FlexiLaunchpad">AI Flex Launch pad</a></li>
            <!-- <li id="MenuAdmin.Opt2"><a id="MenuAdmin.link2" href="" target="Cluster">Cluster</a></li> -->
            <li id="MenuAdmin.Opt3"><a id="MenuAdmin.link3" href="" target="Flatfile">Flatfile Uploads</a></li>
            <!--<li id="MenuAdmin.Opt4"><a id="MenuAdmin.link4" href="" target="RunAnalytics">Run over Run Analytics</a></li>-->

            <li id="MenuAdmin.Opt5"><a id="MenuAdmin.link5" href="" target="SingleGX">Single GX Scenario</a></li>
            <li id="MenuAdmin.Opt6"><a id="MenuAdmin.link6" href="" target="MultiGX">Multi GX Scenario</a></li>
          </ul>
        </div>
      </nav>
  `;

  customElements.define('com-sap-side-navigation-menu', class SideNavigationMenu extends HTMLElement {

    constructor() {
      super(); 
      this._shadowRoot = this.attachShadow({mode: "open"});
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._export_settings = {};

      this.addEventListener("click", event => {
        var eventClick = new Event("onClick");
        this.dispatchEvent(eventClick);
      });

      this._props = {};
      this._firstConnection = false;
    }

    //Fired when the widget is added to the html DOM of the page
    connectedCallback(){
        this.firstConnection = true;
        var that = this;
        interactiveMenu(that);
    }

    //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
    disconnectedCallback(){
      
    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate(oChangedProperties) {
      
    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate(oChangedProperties) {
      var that = this;
      loadthis(that);
      setSelectedFirstMenuItem(that);
    }

    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy(){

    }
    
    //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
    // Commented out by default
    /*
    onCustomWidgetResize(width, height){
    }
    */

    getID() {
      //console.log("ID:"+ID);
      return ID;
    }

    toggleAdmin() {
      return toggleAdminVar;
    }

    getParameter() {
      return _URLParameter_value;
    }

    get URLParameter() {
      return _URLParameter_value;
    }

    set toggleAdminParameter(value) {
      _toggleAdminParameter = value;
    }
    
    get toggleAdminParameter() {
      return _toggleAdminParameter;
    }

    set toggleSideParameter(value) {
      _toggleSideParameter = value;
    }
    
    get toggleSideParameter() {
      return _toggleSideParameter;
    }

    set toggleMenu1Parameter(value) {
      _toggleMenu1Parameter = value;
    }
    
    get toggleMenu1Parameter() {
      return _toggleMenu1Parameter;
    }

    set toggleMenu2Parameter(value) {
      _toggleMenu2Parameter = value;
    }
    
    get toggleMenu2Parameter() {
      return _toggleMenu2Parameter;
    }
    
    set toggleMenu3Parameter(value) {
      _toggleMenu3Parameter = value;
    }
    
    get toggleMenu3Parameter() {
      return _toggleMenu3Parameter;
    }

    set toggleMenu4Parameter(value) {
      _toggleMenu4Parameter = value;
    }
    
    get toggleMenu4Parameter() {
      return _toggleMenu4Parameter;
    }

    set URLParameter(value) {
      _URLParameter_value = value;
    }

    get setParameter() {
      return setParameter
    }

    set setParameter(value){
      setParameter = value;
    }

    get toggleAdminMenu() {
      return toggleAdminMenu
    }

    set toggleAdminMenu(value){
      toggleAdminMenu = value;
    }

    get toggleSideNav() {
      return toggleSideNav
    }

    set toggleSideNav(value){
      toggleSideNav = value;
    }

    get AccessParameter() {
      return _AccessParameter_value;
    }

    set AccessParameter(value) {
      _AccessParameter_value = value;
    }

    get setAccess() {
      return setAccess
    }

    set setAccess(value){
      setAccess = value;
    }

    static get observedAttributes() {
      return [
        "setParameter",
        "setAccess",
        "toggleAdminMenu",
        "toggleSideNav"
      ];
    }

  });

  function loadthis(that){

    if (_toggleSideParameter === true){
      openFunction();
    }else if(_toggleSideParameter === false) {
      closeFunction();
    }
    if (_toggleMenu1Parameter === true){
      firstMenuOpen();
    }else if(_toggleMenu1Parameter === false) {
      firstMenuClose();
    }
    if (_toggleMenu2Parameter === true){
      secondMenuOpen();
    }else if(_toggleMenu2Parameter === false) {
      secondMenuClose();
    }
    if (_toggleMenu3Parameter === true){
      thirdMenuOpen();
    }else if(_toggleMenu3Parameter === false) {
      thirdMenuClose();
    }
    if (_toggleMenu4Parameter === true){
      fourthMenuOpen();
    }else if(_toggleMenu4Parameter === false) {
      fourthMenuClose();
    }


    if (_toggleAdminParameter !== _toggleAdminParameterBefore){
      let containerAdmin = that._shadowRoot.getElementById("container-admin");
      if(_toggleAdminParameter === false || _toggleAdminParameter === "false" || !_toggleAdminParameter){
        containerAdmin.style.display = "none";
      }else {
        containerAdmin.style.display = "flex";
      }
      _toggleAdminParameterBefore = _toggleAdminParameter;
    }
    if(that._shadowRoot.getElementById("container-admin")){
      let containerAdmin = that._shadowRoot.getElementById("container-admin");
      // containerAdmin.add();
      for(let i=0; i < _AccessParameter_value.length; i++){
        let AccessParameterArray = _AccessParameter_value[i].name;

        if (typeof _AccessParameter_value === 'undefined' || _AccessParameter_value === null || !_AccessParameter_value){
          // do nothing
        }else {
          // TM_CLD_SAC_DEV || TM_CLD_SAC_SUPP_NCON || TM_CLD_SAC_SUPP_CONF || TM_AIDA_PWR_W
          if (AccessParameterArray !== "TM_CLD_SAC_DEV" && AccessParameterArray !== "TM_CLD_SAC_SUPP_NCON" && AccessParameterArray !== "TM_CLD_SAC_SUPP_CONF" && AccessParameterArray !== "TM_AIDA_PWR_W"){
            // containerAdmin.remove();
          }else {
            containerAdmin.style.visibility = "visible";
            containerAdmin.style.opacity = "1";
          }
        }
      }
    }

    let navBar = that._shadowRoot.getElementById("nav");
    // This gets the IDs from the clickedNodes
    navBar.onclick = e => {
      let target = e.target || e.srcElement;
      let clickedNodeTag = target.tagName;
      let clickedNode = "";
      if( clickedNodeTag === 'A' || clickedNodeTag === 'BUTTON' ){
        clickedNode = target.innerHTML;	
        ID = target.id;
      }
    }
    
    // This changes the URL
    var windowURL = window.location.href;
    let resultUrl = "";
    
    let urlString = windowURL.split('?')[0];
    let paramString1 = resultUrl.split('?')[0];
    let paramString = resultUrl.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let URLParameterPair = [];
    let arrayURLParameter = [];
    for(let pair of queryString.entries()){
      URLParameterPair = pair[0] + "=" + pair[1];
      arrayURLParameter.push(URLParameterPair);
    }
    let uniqueArrayURLParameter = [...new Set(arrayURLParameter)];
    resultUrl = windowURL + uniqueArrayURLParameter.join('&');

    let queryUrlString = new URLSearchParams(urlString);
    let UrlStringPair = [];
    for(let pair of queryUrlString.entries()){
      UrlStringPair = pair[0];
    }

    // _URLParameter_value = paramString;
    UrlSplitString = UrlStringPair.split('/');
    let removeID = urlString.replaceAll(UrlSplitString[2]+"/", "");
  }

  function interactiveMenu(that){

    navBar = that._shadowRoot.getElementById("nav");
    navBar.style.fontFamily = 'Arial';
    navBar.style.weight = '';

    let container_item = that._shadowRoot.querySelectorAll(".container-item");
    let container_menu = that._shadowRoot.querySelectorAll(".container-menu");
    let adminContainer = that._shadowRoot.querySelectorAll(".container-admin");
    let button = that._shadowRoot.querySelectorAll(".menu");
    let small = that._shadowRoot.querySelectorAll(".arrow");
    let closeIcon = that._shadowRoot.getElementById("close");

    let firstBtn = that._shadowRoot.getElementById("Menu1");
    let secondBtn = that._shadowRoot.getElementById("Menu2");
    let thirdBtn = that._shadowRoot.getElementById("Menu3");
    let fourthBtn = that._shadowRoot.getElementById("Menu4");
    let adminBtn;
    if(that._shadowRoot.getElementById("container-admin")){
      adminBtn = that._shadowRoot.getElementById("MenuAdmin");
    }

    let adminToggleOn = that._shadowRoot.getElementById("AdminToggleOn");
    let adminToggleOff = that._shadowRoot.getElementById("AdminToggleOff");

    let firstUl = that._shadowRoot.getElementById("Menu1UL");
    let secondUl = that._shadowRoot.getElementById("Menu2UL");
    let thirdUl = that._shadowRoot.getElementById("Menu3UL");
    let fourthUl = that._shadowRoot.getElementById("Menu4UL");
    let adminUl;
    if(that._shadowRoot.getElementById("container-admin")){
      adminUl = that._shadowRoot.getElementById("MenuAdminUL");
    }

    openFunction = () => {
      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let fourthParent = thirdParent.parentNode

      navBar.style.width = "269px";
      parent.style.overflow = "visible";
      thirdParent.style.width = "270px";
      fourthParent.style.width = "270px";
      closeIcon.style.display = "block";
      for (let i=0; i < container_item.length; i++){
        container_item[i].style.width = "269px";
        if (container_item[5]){
          container_item[5].style.width = "257px";
        }
      }
      for(let i=0; i < container_menu.length; i++){
        container_menu[i].style.width = "257px";
      }
      for(let i=0; i < button.length; i++){
        button[i].style.display = "block";
      }
      for(let i=0; i < small.length; i++){
        small[i].style.display = "block";
      }
    }

    closeFunction = () => {
      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let fourthParent = thirdParent.parentNode

      navBar.style.width = "71px";
      thirdParent.style.width = "72px";
      fourthParent.style.width = "72px";
      closeIcon.style.display = "none";
      firstUl.style.display = "none";
      secondUl.style.display = "none";
      thirdUl.style.display = "none";
      fourthUl.style.display = "none";
      if(that._shadowRoot.getElementById("container-admin")){
        adminUl.style.display = "none";
      }
      for (let i=0; i < container_item.length; i++){
        container_item[i].style.width = "71px";
        if (container_item[5]){
          container_item[5].style.width = "59px";
        }
      }
      for(let i=0; i < container_menu.length; i++){
        container_menu[i].style.width = "59px";
      }
      for(let i=0; i < button.length; i++){
        button[i].style.display = "none";
      }
      for(let i=0; i < small.length; i++){
        small[i].style.display = "none";
      }
      for(let i=0; i < small.length; i++){
        small[i].classList.add("rotate-small");
      }

      _toggleMenu1Parameter = false;
      _toggleMenu2Parameter = false;
      _toggleMenu3Parameter = false;
      _toggleMenu4Parameter = false;
    }

    firstMenuOpen = () => {
      openFunction();
      firstUl.style.display = "block";
      secondUl.style.display = "none";
      thirdUl.style.display = "none";
      fourthUl.style.display = "none";
      if(that._shadowRoot.getElementById("container-admin")){
        adminUl.style.display = "none";
      }
      small[0].classList.remove("rotate-small");
      small[1].classList.add("rotate-small");
      small[2].classList.add("rotate-small");
      small[3].classList.add("rotate-small");
      if(that._shadowRoot.getElementById("container-admin")){
        small[4].classList.add("rotate-small");
      }
    }

    firstMenuClose =  () => {
      firstUl.style.display = "none";
      small[0].classList.add("rotate-small");

    }

    secondMenuOpen = () => {
      openFunction();
      firstUl.style.display = "none";
      secondUl.style.display = "block";
      thirdUl.style.display = "none";
      fourthUl.style.display = "none";
      if(that._shadowRoot.getElementById("container-admin")){
        adminUl.style.display = "none";
      }
      small[0].classList.add("rotate-small");
      small[1].classList.remove("rotate-small");
      small[2].classList.add("rotate-small");
      small[3].classList.add("rotate-small");
      if(that._shadowRoot.getElementById("container-admin")){
        small[4].classList.add("rotate-small");
      }
    }

    secondMenuClose = () => {
      secondUl.style.display = "none";
      small[1].classList.add("rotate-small");
    }

    thirdMenuOpen = () => {
      openFunction();
      firstUl.style.display = "none";
      secondUl.style.display = "none";
      thirdUl.style.display = "block";
      fourthUl.style.display = "none";
      if(that._shadowRoot.getElementById("container-admin")){
        adminUl.style.display = "none";
      }
      small[0].classList.add("rotate-small");
      small[1].classList.add("rotate-small");
      small[2].classList.remove("rotate-small");
      small[3].classList.add("rotate-small");
      if(that._shadowRoot.getElementById("container-admin")){
          small[4].classList.add("rotate-small");
      }
    }

    thirdMenuClose = () => {
      thirdUl.style.display = "none";
      small[2].classList.add("rotate-small");
    }

    fourthMenuOpen = () => {
      openFunction();
      firstUl.style.display = "none";
      secondUl.style.display = "none";
      thirdUl.style.display = "none";
      fourthUl.style.display = "block";
      if(that._shadowRoot.getElementById("container-admin")){
          adminUl.style.display = "none";
      }
      small[0].classList.add("rotate-small");
      small[1].classList.add("rotate-small");
      small[2].classList.add("rotate-small");
      small[3].classList.remove("rotate-small");
      if(that._shadowRoot.getElementById("container-admin")){
        small[4].classList.add("rotate-small");
      }
    }

    fourthMenuClose = () => {
      fourthUl.style.display = "none";
      small[3].classList.add("rotate-small");
    }

    navBar.addEventListener("click", function (event){

      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let fourthParent = thirdParent.parentNode

      if (event.target == this){
        if (navBar.style.width === "269px"){
          let parent = that.parentNode
          let secondParent = parent.parentNode
          let thirdParent = secondParent.parentNode
          let fourthParent = thirdParent.parentNode

          navBar.style.width = "71px";
          thirdParent.style.width = "72px";
          fourthParent.style.width = "72px";
          closeIcon.style.display = "none";
          firstUl.style.display = "none";
          secondUl.style.display = "none";
          thirdUl.style.display = "none";
          fourthUl.style.display = "none";
          if(that._shadowRoot.getElementById("container-admin")){
            adminUl.style.display = "none";
          }
          for (let i=0; i < container_item.length; i++){
            container_item[i].style.width = "71px";
            if (container_item[5]){
              container_item[5].style.width = "59px";
            }
          }
          for(let i=0; i < container_menu.length; i++){
            container_menu[i].style.width = "59px";
          }
          for(let i=0; i < button.length; i++){
            button[i].style.display = "none";
          }
          for(let i=0; i < small.length; i++){
            small[i].style.display = "none";
          }
          for(let i=0; i < small.length; i++){
            small[i].classList.add("rotate-small");
          }
  
        }else {
          openFunction();
        }
      }

    });

    closeIcon.addEventListener("click", function (event){

      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let fourthParent = thirdParent.parentNode

      navBar.style.width = "71px";
      thirdParent.style.width = "72px";
      fourthParent.style.width = "72px";
      closeIcon.style.display = "none";
      firstUl.style.display = "none";
      secondUl.style.display = "none";
      thirdUl.style.display = "none";
      fourthUl.style.display = "none";
      if(that._shadowRoot.getElementById("container-admin")){
        adminUl.style.display = "none";
      }
      for (let i=0; i < container_item.length; i++){
        container_item[i].style.width = "71px";
        if (container_item[5]){
          container_item[5].style.width = "59px";
        }
      }
      for(let i=0; i < container_menu.length; i++){
        container_menu[i].style.width = "59px";
      }
      for(let i=0; i < button.length; i++){
        button[i].style.display = "none";
      }
      for(let i=0; i < small.length; i++){
        small[i].style.display = "none";
      }
      for(let i=0; i < small.length; i++){
        small[i].classList.add("rotate-small");
      }
      event.stopPropagation();
    });

    firstBtn.addEventListener("click", function (event){
      if(firstUl.style.display === "block"){
        firstMenuClose();  
      }else {
        firstMenuOpen();  
      }
    });

    secondBtn.addEventListener("click", function (event){
      if(secondUl.style.display === "block"){
        secondMenuClose();  
      }else {
        secondMenuOpen();  
      }
    });

    thirdBtn.addEventListener("click", function (event){
      if(thirdUl.style.display === "block"){
        thirdMenuClose();  
      }else {
        thirdMenuOpen();  
      }
    });

    fourthBtn.addEventListener("click", function (event){
      if(fourthUl.style.display === "block"){
        fourthMenuClose();  
      }else {
        fourthMenuOpen();  
      }
    });

    if(that._shadowRoot.getElementById("container-admin")){
      adminBtn.addEventListener("click", function (event){
        if(adminUl.style.display === "block"){
          adminUl.style.display = "none";
          small[4].classList.add("rotate-small");
        }else {
          openFunction();
          firstUl.style.display = "none";
          secondUl.style.display = "none";
          thirdUl.style.display = "none";
          fourthUl.style.display = "none";
          adminUl.style.display = "block";
          small[0].classList.add("rotate-small");
          small[1].classList.add("rotate-small");
          small[2].classList.add("rotate-small");
          small[3].classList.add("rotate-small");
          small[4].classList.remove("rotate-small");
        }
      });
    }

    const closeMenuAfterLink = () => {
      // let linkHref = that._shadowRoot.querySelectorAll("a");
      // console.log("This is a test", linkHref);
      that._shadowRoot.querySelectorAll("a").forEach(item => {
        item.addEventListener('click', event => {
          // console.log("This is a test", item);
          closeFunction();

          event.stopPropagation();
        })
      })
    }

    closeMenuAfterLink();

  }

  function setSelectedFirstMenuItem(that){
    
    let menu1 = that._shadowRoot.getElementById("Menu1");
    let menu2 = that._shadowRoot.getElementById("Menu2");
    let menu3 = that._shadowRoot.getElementById("Menu3");
    let menu4 = that._shadowRoot.getElementById("Menu4");
    let menuAdmin = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin = that._shadowRoot.getElementById("MenuAdmin");
    }

    let menu1_button = that._shadowRoot.getElementById("Menu1.Button");
    let menu2_button = that._shadowRoot.getElementById("Menu2.Button");
    let menu3_button = that._shadowRoot.getElementById("Menu3.Button");
    let menu4_button = that._shadowRoot.getElementById("Menu4.Button");
    let menuAdmin_button = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_button = that._shadowRoot.getElementById("MenuAdmin.Button");
    }

    let icon1 = that._shadowRoot.getElementById("icon1");
    let icon2 = that._shadowRoot.getElementById("icon2");
    let icon3 = that._shadowRoot.getElementById("icon3");
    let icon4 = that._shadowRoot.getElementById("icon4");
    let iconAdmin = "";
    if(that._shadowRoot.getElementById("container-admin")){
      iconAdmin = that._shadowRoot.getElementById("iconAdmin");
    }
    
    let arrow = that._shadowRoot.querySelectorAll(".arrow");
    let span_arrow = that._shadowRoot.querySelectorAll(".span-arrow")

    let menu1_link1 = that._shadowRoot.getElementById("Menu1.link1");
    let menu1_link2 = that._shadowRoot.getElementById("Menu1.link2");
    // let menu1_link3 = that._shadowRoot.getElementById("Menu1.link3");
    let menu1_link4 = that._shadowRoot.getElementById("Menu1.link4");
    
    let menu2_link1 = that._shadowRoot.getElementById("Menu2.link1");
    // let menu2_link2 = that._shadowRoot.getElementById("Menu2.link2");
    let menu2_link3 = that._shadowRoot.getElementById("Menu2.link3");
    let menu2_link4 = that._shadowRoot.getElementById("Menu2.link4");
    let menu2_link5 = that._shadowRoot.getElementById("Menu2.link5");
    let menu2_link6 = that._shadowRoot.getElementById("Menu2.link6");
    let menu2_link7 = that._shadowRoot.getElementById("Menu2.link7");

    let menu3_link1 = that._shadowRoot.getElementById("Menu3.link1");
    let menu3_link2 = that._shadowRoot.getElementById("Menu3.link2");

    let menu4_link1 = that._shadowRoot.getElementById("Menu4.link1");
    let menu4_link2 = that._shadowRoot.getElementById("Menu4.link2");
    let menu4_link3 = that._shadowRoot.getElementById("Menu4.link3");
    let menu4_link4 = that._shadowRoot.getElementById("Menu4.link4");
    let menu4_link5 = that._shadowRoot.getElementById("Menu4.link5");
    let menu4_link6 = that._shadowRoot.getElementById("Menu4.link6");
    let menu4_link7 = that._shadowRoot.getElementById("Menu4.link7");
    let menuAdmin_link1 = "";
    let menuAdmin_link2 = "";
    let menuAdmin_link3 = "";
    let menuAdmin_link4 = "";
    let menuAdmin_link5 = "";
    let menuAdmin_link6 = "";

    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_link1 = that._shadowRoot.getElementById("MenuAdmin.link1");
      menuAdmin_link2 = that._shadowRoot.getElementById("MenuAdmin.link2");
      menuAdmin_link3 = that._shadowRoot.getElementById("MenuAdmin.link3");
      menuAdmin_link4 = that._shadowRoot.getElementById("MenuAdmin.link4");
      menuAdmin_link5 = that._shadowRoot.getElementById("MenuAdmin.link5");
      menuAdmin_link6 = that._shadowRoot.getElementById("MenuAdmin.link6");
    }


    // =========================================================================================================================
    // =========================================================================================================================
    // =========================================================================================================================

    // This changes the URL
    var windowURL = window.location.href;
    let resultUrl = "";
    let urlDefinedParameters = "";

    let parameterString = windowURL.split('?')[1];
    let queryString = new URLSearchParams(parameterString);
    let URLParameterPair = [];
    let arrayURLParameter = [];
    for(let pair of queryString.entries()){
      URLParameterPair = pair[0] + "=" + pair[1];
      arrayURLParameter.push(URLParameterPair);
    }
    let uniqueArrayURLParameter = [...new Set(arrayURLParameter)];
    function paramentersSAC(item) {
      return item.toLowerCase().indexOf('p_') === 0;
    }

    let constParameters = uniqueArrayURLParameter.filter(paramentersSAC);

    resultUrl = windowURL + uniqueArrayURLParameter.join('&');

    // ========================================================================================================================
    // ========================================================================================================================
    // ========================================================================================================================


    // ========================================================================================================================
    // ======================================= This gets the start of the URL before ID =======================================
    // ========================================================================================================================

    var windowURL = window.location.href;
    let urlString = windowURL.split('/?')[0];
    let queryUrlString = new URLSearchParams(urlString);
    let UrlStringPair = [];
    for(let pair of queryUrlString.entries()){
      UrlStringPair = pair[0];
    }
    UrlSplitString = UrlStringPair.split('/');
    UrlIDString = UrlSplitString[2];

    let removeID = urlString.replaceAll(UrlSplitString[2]+"/", "");

    let urlWithoutID = removeID.replace(UrlStringPair, '');

    let urlWithoutAppHTML = urlWithoutID.split('app.html')[0];
    let urlAppHTML = urlWithoutID.split('app.html')[1];
    urlWithoutID = urlWithoutAppHTML + 'app.html#/analyticapp?shellMode=embed&';

    urlDefinedParameters = "/?url_api=true&view_id=appBuilding";

    // =========================================================================================================================
    // =========================================================================================================================
    
    // let menu1_href1 = "2CB86107C80A55E359F9D229D4FE4F8C"; //Proxy Sales - Sales Outlook
    // let menu1_href1 = "78D0008242D0C55256839C3C457B854B"; //Proxy Sales - Sales Outlook
    let menu1_href1 = "FC5030841BFB6B4DFB4C85F6C7F43068"; //Proxy Sales - Sales Outlook
    menu1_link1.setAttribute("href",urlWithoutID + '/aa/' + menu1_href1);
    menu1_link1.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu1_href1 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "ProxySales");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // let menu1_href2 = "549876079A03223EB3509FA8F67EFE3B"; // AI Performance
    let menu1_href2 = "BB9010841BFB53F0E8F6EAEFE0CA932E"; // AI Performance
    menu1_link2.setAttribute("href",urlWithoutID + '/aa/' + menu1_href2);
    menu1_link2.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu1_href2 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "AIPerformance");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // let menu1_href2 = "C888107C80F893D5BCBFB9A7D665542"; // Forecast Accuracy
    // menu1_link2.setAttribute("href",urlWithoutID + '/aa/' + menu1_href2);
    // menu1_link2.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu1_href2 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "ForecastAccuracy");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    // let menu1_href3 = "22180E04DC8D1E73331D078436435475"; // PVM
    // menu1_link3.setAttribute("href",urlWithoutID + '/aa/' + menu1_href3);
    // menu1_link3.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu1_href3 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "PVM");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    // let menu1_href4 = ""; // ROPs
    // menu1_link4.setAttribute("href",urlWithoutID + '/aa/' + menu1_href4 );
    // menu1_link4.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu1_href4 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "ROPs");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    // =========================================================================================================================
    // =========================================================================================================================

    let menu2_href1 = "61309201F013FA429549454EF50F3B06"; // Sales Forecasting
    menu2_link1.setAttribute("href",urlWithoutID + '/aa/' + menu2_href1 + urlDefinedParameters + _URLParameter_value);
    menu2_link1.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href1 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "SalesForecasting");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // let menu2_href2 = "13B80E820C93141256512A40A4C03163"; // Launches
    // let menu2_href2 = "D8A016822158614F2370A4C8F4F604B6"; // Launches
    // menu2_link2.setAttribute("href",urlWithoutID + '/aa/' + menu2_href2 + urlDefinedParameters + _URLParameter_value);
    // // menu2_link2.setAttribute("href", "https://plai.gaia.novartis.net/componentsAnalysis?bu=232131032&frequency=1&isBrandGroupLevelForecast=false&activeScopeId=44&brands=60202&ai-version=45&variable-launches=2&activeTabLaunches=feature_plot&version=1%7C36%7C8&currency=2&ranges=2025-01-01T00%3A00%3A00.000Z%7C2025-05-01T00%3A00%3A00.000Z&launches-pt-treshold=1");
    // menu2_link2.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu2_href2 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "Launches");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    let menu2_href3 = "AA783780A70F76CA7E8B80A9E6C757C7"; // Lifecycle
    menu2_link3.setAttribute("href",urlWithoutID + '/aa/' + menu2_href3 + urlDefinedParameters + _URLParameter_value);
    menu2_link3.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href3 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "Lifecycle");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu2_href4 = "6BA87A01F01381CD8BBACF2D8E99BDD6"; // Competitor
    menu2_link4.setAttribute("href",urlWithoutID + '/aa/' + menu2_href4 + urlDefinedParameters + _URLParameter_value);
    menu2_link4.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href4 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "Competitors");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu2_href5 = "89809201F013A17E9A0A70468F5FCD75"; // Generics
    menu2_link5.setAttribute("href",urlWithoutID + '/aa/' + menu2_href5 + urlDefinedParameters + _URLParameter_value);
    menu2_link5.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href5 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "Generics");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu2_href6 = "5696F07AACC081BDC89EF07A4040F0E"; // AI Scope
    menu2_link6.setAttribute("href",urlWithoutID + '/aa/' + menu2_href6 + urlDefinedParameters + _URLParameter_value);
    menu2_link6.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href6 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "AIScope");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu2_href7 = "90702D80F8E9136C5AE597B454F48CE2"; // Sales Outliers
    menu2_link7.setAttribute("href",urlWithoutID + '/aa/' + menu2_href7 + urlDefinedParameters + _URLParameter_value);
    menu2_link7.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu2_href7 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "SalesOutliers");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // =========================================================================================================================
    // =========================================================================================================================
 
    let menu3_href1 = "317816820C92BD2FD1E046A87F393039"; // Cash Forecasting
    menu3_link1.setAttribute("href",urlWithoutID + '/aa/' + menu3_href1 + urlDefinedParameters + _URLParameter_value);
    //menu3_link1.setAttribute("href", "https://plai.gaia.novartis.net/CashSummary?regions=2222111&account=1&period=0&ai-version=45&version=36&currency=2");
    menu3_link1.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu3_href1 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "CashForecasting");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu3_href2 = "7FC0FD822A6429EA4A0922852D2CB93F"; // Cash Outliers
    menu3_link2.setAttribute("href",urlWithoutID + '/aa/' + menu3_href2 + urlDefinedParameters + _URLParameter_value);
    menu3_link2.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu3_href2 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "CashOutliers");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // =========================================================================================================================
    // =========================================================================================================================

    // let menu4_href1 = ""; // Input Checkpoint
    // menu4_link1.setAttribute("href",urlWithoutID + '/aa/' + menu4_href1);
    // menu4_link1.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu4_href1 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "InputCheckpoint");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    // let menu4_href2 = "5D316F07AACD59DCE55CF2C5115CD607"; // Price Assumptions Old Price
    // let menu4_href2 = "4A9833864AA513C570C7A90DA483571E"; // Price Assumptions - Old
    let menu4_href2 = "3B582A82D6B79ADF020C593651ADD9AF"; // Price Assumptions
    menu4_link2.setAttribute("href",urlWithoutID + '/aa/' + menu4_href2 + urlDefinedParameters + _URLParameter_value);
    menu4_link2.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu4_href2 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "PriceAssumptions");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu4_href3 = "F4286D822A63B89DD8807713F6A192A0"; // Brand Events
    menu4_link3.setAttribute("href",urlWithoutID + '/aa/' + menu4_href3 + urlDefinedParameters + _URLParameter_value);
    menu4_link3.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu4_href3 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "BrandEvents");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu4_href4 = "66005804C15A3DBD5137A05F1AD177A9"; // Run over Run Analytics
    menu4_link4.setAttribute("href",urlWithoutID + '/aa/' + menu4_href4 + urlDefinedParameters + _URLParameter_value);
    menu4_link4.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu4_href4 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "RunAnalytics");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // let menu4_href4 = "F08895822A61FBAD211A2C68F4B1A4A2"; // Competitors
    // menu4_link4.setAttribute("href",urlWithoutID + '/aa/' + menu4_href4 + urlDefinedParameters + _URLParameter_value);
    // menu4_link4.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu4_href4 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "Competitors");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    // let menu4_href5 = "488895822A656197B4B73B6551B27E42"; // Key Drivers
    // menu4_link5.setAttribute("href",urlWithoutID + '/aa/' + menu4_href5 + urlDefinedParameters + _URLParameter_value);
    // menu4_link5.onclick = function() {
    //   let currentURL = urlWithoutID + '/aa/' + menu4_href5 + urlDefinedParameters + _URLParameter_value;
    //   if (_URLParameter_value !== previousURL && previousURL !== ""){
    //     var win = window.open(currentURL, "KeyDrivers");
    //     win.location.reload(); 
    //   }
    //   previousURL = _URLParameter_value;
    // };

    let menu4_href6 = "ECF02E06DA31176301716B83B39E0563"; // Workday Calendar
    menu4_link6.setAttribute("href",urlWithoutID + '/aa/' + menu4_href6 + urlDefinedParameters + _URLParameter_value);
    menu4_link6.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu4_href6 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "WorkdayCalendar");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    let menu4_href7 = "FB080F822E4AAA87F2BFDFBED09CF170"; // SKUAssumptions
    menu4_link7.setAttribute("href",urlWithoutID + '/aa/' + menu4_href7 + urlDefinedParameters + _URLParameter_value);
    menu4_link7.onclick = function() {
      let currentURL = urlWithoutID + '/aa/' + menu4_href7 + urlDefinedParameters + _URLParameter_value;
      if (_URLParameter_value !== previousURL && previousURL !== ""){
        var win = window.open(currentURL, "SKUAssumptions");
        win.location.reload(); 
      }
      previousURL = _URLParameter_value;
    };

    // =========================================================================================================================
    // =========================================================================================================================
    let menuAdmin_href1 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href1 = "44885E06DA30BA403C1A62486262E984"; // User Statistics
      menuAdmin_link1.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href1 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link1.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href1 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "UserStatistics");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }

    let menuAdmin_href2 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href2 = "E5E804069B094A7D0A00F91DFAFB725C"; // AI Flex Launch Pad
      menuAdmin_link2.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href2 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link2.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href2 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "FlexiLaunchpad");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }
    /*
    let menuAdmin_href2 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href2 = "26104E878CEE1863F52A3AAB1F82FDD5"; // Cluster & Cut-Off
      menuAdmin_link2.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href2 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link2.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href2 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "Cluster");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }
    */
    let menuAdmin_href3 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href3 = "820056878CEAA9B770B7BDA7310D9253"; // Prices FF Download aka Flatfile Uploads
      menuAdmin_link3.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href3 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link3.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href3 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "Flatfile");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }

    // let menuAdmin_href4 = "";
    // if(that._shadowRoot.getElementById("container-admin")){
    //   menuAdmin_href4 = "E5E804069B094A7D0A00F91DFAFB725C"; // AI Flex Launchpad
    //   menuAdmin_link4.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href4 + urlDefinedParameters + _URLParameter_value);
    //   menuAdmin_link4.onclick = function() {
    //     let currentURL = urlWithoutID + '/aa/' + menuAdmin_href4 + urlDefinedParameters + _URLParameter_value;
    //     if (_URLParameter_value !== previousURL && previousURL !== ""){
    //       var win = window.open(currentURL, "AIFlexLaunchpad");
    //       win.location.reload();
    //     }
    //     previousURL = _URLParameter_value;
    //   };
    // }

    // Old href4
    // let menuAdmin_href4 = "";
    // if(that._shadowRoot.getElementById("container-admin")){
    //   menuAdmin_href4 = "66005804C15A3DBD5137A05F1AD177A9"; // Run over Run Analytics
    //   menuAdmin_link4.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href4 + urlDefinedParameters + _URLParameter_value);
    //   menuAdmin_link4.onclick = function() {
    //     let currentURL = urlWithoutID + '/aa/' + menuAdmin_href4 + urlDefinedParameters + _URLParameter_value;
    //     if (_URLParameter_value !== previousURL && previousURL !== ""){
    //       var win = window.open(currentURL, "RunAnalytics");
    //       win.location.reload();
    //     }
    //     previousURL = _URLParameter_value;
    //   };
    // }

    let menuAdmin_href5 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href5 = "4F488C069B0AD4E924A034C96E2553AF"; // Single GX Scenario
      menuAdmin_link5.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href5 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link5.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href5 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "SingleGX");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }

    let menuAdmin_href6 = "";
    if(that._shadowRoot.getElementById("container-admin")){
      menuAdmin_href6 = "20C993035FB23F1CC46E42D5B3A44E8F"; // Multi GX Scenario
      menuAdmin_link6.setAttribute("href",urlWithoutID + '/aa/' + menuAdmin_href6 + urlDefinedParameters + _URLParameter_value);
      menuAdmin_link6.onclick = function() {
        let currentURL = urlWithoutID + '/aa/' + menuAdmin_href6 + urlDefinedParameters + _URLParameter_value;
        if (_URLParameter_value !== previousURL && previousURL !== ""){
          var win = window.open(currentURL, "MultiGX");
          win.location.reload();
        }
        previousURL = _URLParameter_value;
      };
    }

    // =========================================================================================================================
    // =========================================================================================================================

    if (UrlIDString == menu1_href1){
      menu1.classList.add("setSelectedParent");
      icon1.classList.add("path");
      menu1_link1.classList.add("setSelectedItem");
      menu1_link1.addEventListener('click', function (event) {
        event.preventDefault();
      })
      span_arrow[0].style.stroke="#fff";
    }else {
      menu1_link1.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu1_href2){
      menu1.classList.add("setSelectedParent");
      icon1.classList.add("path");
      menu1_link2.classList.add("setSelectedItem");
      menu1_link2.addEventListener('click', function (event) {
        event.preventDefault();
      })
      span_arrow[0].style.stroke="#fff";
    }else {
      menu1_link2.classList.remove("setSelectedItem");
    }

    // if (UrlIDString == menu1_href3){
    //   menu1.classList.add("setSelectedParent");
    //   icon1.classList.add("path");
    //   menu1_link3.classList.add("setSelectedItem");
    //   menu1_link3.addEventListener('click', function (event) {
    //     event.preventDefault();
    //   })
    //   span_arrow[0].style.stroke="#fff";
    // }else {
    //   menu1_link3.classList.remove("setSelectedItem");
    // }

    // if (UrlIDString == menu1_href4){
    //   menu1.classList.add("setSelectedParent");
    //   icon1.classList.add("path");
    //   menu1_link4.classList.add("setSelectedItem");
    //   menu1_link4.addEventListener('click', function (event) {
    //     event.preventDefault();
    //   })
    //   span_arrow[0].style.stroke="#fff";
    // }else {
    //   menu1_link4.classList.remove("setSelectedItem");
    // }

    if (UrlIDString !== menu1_href1 && UrlIDString !== menu1_href2 ){ // && UrlIDString !== menu1_href3 && UrlIDString !== menu1_href4){
      menu1.classList.remove("setSelectedParent");
      icon1.classList.remove("path")
      span_arrow[0].style.stroke="#fff";
    }
    
    // =========================================================================================================================
    // =========================================================================================================================

    if (UrlIDString == menu2_href1){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link1.classList.add("setSelectedItem");
      menu2_link1.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link1.classList.remove("setSelectedItem");
    }

    // if (UrlIDString == menu2_href2){
    //   menu2.classList.add("setSelectedParent");
    //   icon2.classList.add("path");
    //   menu2_link2.classList.add("setSelectedItem");
    //   menu2_link2.addEventListener('click', function (event) {
    //     event.preventDefault();
    //   });
    //   span_arrow[1].style.stroke="#fff";
    // }else {
    //   menu2_link2.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu2_href3){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link3.classList.add("setSelectedItem");
      menu2_link3.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link3.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href4){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link4.classList.add("setSelectedItem");
      menu2_link4.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link4.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href5){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link5.classList.add("setSelectedItem");
      menu2_link5.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link5.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href6){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link6.classList.add("setSelectedItem");
      menu2_link6.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link6.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href7){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link7.classList.add("setSelectedItem");
      menu2_link7.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link7.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu2_href1 /* && UrlIDString !== menu2_href2 */ && UrlIDString !== menu2_href3 &&  UrlIDString !== menu2_href4 &&  UrlIDString !== menu2_href5 &&  UrlIDString !== menu2_href6 &&  UrlIDString !== menu2_href7){
      menu2.classList.remove("setSelectedParent");
      icon2.classList.remove("path")
      span_arrow[1].style.stroke="#fff";
    }

    // =========================================================================================================================
    // =========================================================================================================================

     if (UrlIDString == menu3_href1){
      menu3.classList.add("setSelectedParent");
      icon3.classList.add("path");
      menu3_link1.classList.add("setSelectedItem");
      menu3_link1.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
     }else {
       menu3_link1.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu3_href2){
      menu3.classList.add("setSelectedParent");
      icon3.classList.add("path");
      menu3_link2.classList.add("setSelectedItem");
      menu3_link2.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu3_link2.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu3_href2 && UrlIDString !== menu3_href1){
      menu3.classList.remove("setSelectedParent");
      icon3.classList.remove("path")
      span_arrow[2].style.stroke="#fff";
    }

    // =========================================================================================================================
    // =========================================================================================================================
    
    // if (UrlIDString == menu4_href1){
    //   menu4.classList.add("setSelectedParent");
    //   icon4.classList.add("path");
    //   menu4_link1.classList.add("setSelectedItem");
    //   menu4_link1.addEventListener('click', function (event) {
    //     event.preventDefault();
    //   });
    //   span_arrow[2].style.stroke="#fff";
    // }else {
    //   menu4_link1.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu4_href2){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link2.classList.add("setSelectedItem");
      menu4_link2.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link2.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href3){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link3.classList.add("setSelectedItem");
      menu4_link3.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link3.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href4){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link4.classList.add("setSelectedItem");
      menu4_link4.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link4.classList.remove("setSelectedItem");
    }

    // if (UrlIDString == menu4_href5){
    //   menu4.classList.add("setSelectedParent");
    //   icon4.classList.add("path");
    //   menu4_link5.classList.add("setSelectedItem");
    //   menu4_link5.addEventListener('click', function (event) {
    //     event.preventDefault();
    //   });
    //   span_arrow[2].style.stroke="#fff";
    // }else {
    //   menu4_link5.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu4_href6){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link6.classList.add("setSelectedItem");
      menu4_link6.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link6.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href7){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link7.classList.add("setSelectedItem");
      menu4_link7.addEventListener('click', function (event) {
        event.preventDefault();
      });
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link7.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu4_href2 && UrlIDString !== menu4_href3 && UrlIDString !== menu4_href4 /* && UrlIDString !== menu4_href5 */ && UrlIDString !== menu4_href6 && UrlIDString !== menu4_href7){
      menu4.classList.remove("setSelectedParent");
      icon4.classList.remove("path")
      span_arrow[2].style.stroke="#fff";
    }

    // =========================================================================================================================
    // =========================================================================================================================
    
    if (that._shadowRoot.getElementById("container-admin")){
      if (UrlIDString == menuAdmin_href1){
        menuAdmin.classList.add("setSelectedParent");
        iconAdmin.classList.add("path");
        menuAdmin_link1.classList.add("setSelectedItem");
        menuAdmin_link1.addEventListener('click', function (event) {
          event.preventDefault();
        });
        span_arrow[2].style.stroke="#fff";
      }else {
        menuAdmin_link1.classList.remove("setSelectedItem");
      }

      if (UrlIDString == menuAdmin_href2){
        menuAdmin.classList.add("setSelectedParent");
        iconAdmin.classList.add("path");
        menuAdmin_link2.classList.add("setSelectedItem");
        menuAdmin_link2.addEventListener('click', function (event) {
          event.preventDefault();
        });
        span_arrow[2].style.stroke="#fff";
      }else {
        menuAdmin_link2.classList.remove("setSelectedItem");
      }

      if (UrlIDString == menuAdmin_href3){
        menuAdmin.classList.add("setSelectedParent");
        iconAdmin.classList.add("path");
        menuAdmin_link3.classList.add("setSelectedItem");
        menuAdmin_link3.addEventListener('click', function (event) {
          event.preventDefault();
        });
        span_arrow[2].style.stroke="#fff";
      }else {
        menuAdmin_link3.classList.remove("setSelectedItem");
      }

      // if (UrlIDString == menuAdmin_href4){
      //   menuAdmin.classList.add("setSelectedParent");
      //   iconAdmin.classList.add("path");
      //   menuAdmin_link4.classList.add("setSelectedItem");
      //   menuAdmin_link4.addEventListener('click', function (event) {
      //     event.preventDefault();
      //   });
      //   span_arrow[2].style.stroke="#fff";
      // }else {
      //   menuAdmin_link4.classList.remove("setSelectedItem");
      // }

      // if (UrlIDString == menuAdmin_href5){
      //   menuAdmin.classList.add("setSelectedParent");
      //   iconAdmin.classList.add("path");
      //   menuAdmin_link5.classList.add("setSelectedItem");
      //   menuAdmin_link5.addEventListener('click', function (event) {
      //     event.preventDefault();
      //   });
      //   span_arrow[2].style.stroke="#fff";
      // }else {
      //   menuAdmin_link5.classList.remove("setSelectedItem");
      // }
  
      if (UrlIDString !== menuAdmin_href1 && UrlIDString !== menuAdmin_href2 && UrlIDString !== menuAdmin_href3 /* && UrlIDString !== menuAdmin_href4 */ && UrlIDString !== menuAdmin_href5 && UrlIDString !== menuAdmin_href6){
        menuAdmin.classList.remove("setSelectedParent");
        iconAdmin.classList.remove("path")
        span_arrow[2].style.stroke="#fff";
      }
    }
  }
})();
