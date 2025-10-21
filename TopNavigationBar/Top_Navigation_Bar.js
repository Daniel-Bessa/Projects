(function()  {
  let _shadowRoot;

  let _toggleAdmin_value = "";
  let _toggleConfig_value = "";
  let _toggleClipBoard_value = "";
  let _toggleDownload_value = "";
  let _toggleInfo_value = "";
  let _toggleMenu_value = "";
  let _toggleUser_value = "";

  let toggleConfigIcon = "";
  let toggleClipboardIcon = "";
  let toggleDownloadIcon = "";
  let toggleInfoIcon = "";
  let toggleMenuIcon = "";
  let toggleUserIcon = "";
  let _setUserTeamInfo = "";
  let _setUserName = "";

  let _clipboard_value = "";
  let setClipboardString = "";
  
  let _AccessParameter_value = "";
  let _isChecked_value = "";
  let _isAdmin_value = false;
  let adminHeight = true;

// ===================================================================
// CONFIGURATION SECTION - Customize icons and colors here
// ===================================================================

const CONFIG = {
  // Icon Configuration
  // Note: This file uses inline SVG icons in the HTML template
  // These values can be used if converting to Material Symbols
  ICONS: {
    ADMIN: 'admin_panel_settings',
    CONFIG: 'settings',
    CLIPBOARD: 'share',
    DOWNLOAD: 'download',
    INFO: 'info',
    USER: 'person',
    MENU: 'menu',
  },

  // Color Configuration (CSS Custom Properties will be created from these)
  COLORS: {
    // Border Colors
    BORDER_PRIMARY: '#9E9E9E',
    BORDER_SECONDARY: '#ccc',
    BORDER_TERTIARY: '#CBCBCB',

    // Background Colors
    BG_PRIMARY: '#fff',
    BG_ACCENT: 'rgb(4, 96, 169)',
    BG_ACCENT_HEX: '#0460A9',
    BG_LIGHT_BLUE: '#9CBFDD',

    // Text/Font Colors
    TEXT_PRIMARY: '#212121',
    TEXT_SECONDARY: '#666',
    TEXT_BLACK: '#000',
    TEXT_INVERSE: 'rgb(255, 255, 255)',

    // Accent Colors
    SUCCESS_GREEN: '#388E3C',
    ACCENT_ORANGE: '#E74A21',
    ACCENT_YELLOW: '#EC9A1E',
    ACCENT_RED: '#FF585D',
    ACCENT_GOLD: '#FFC100',
    ACCENT_DARK_BLUE: '#002068',
  }
};




  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
      <script><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /></script>
      <style>
          /* CSS Custom Properties - Generated from CONFIG.COLORS */
          :host {
            --border-primary: #9E9E9E;
            --border-secondary: #ccc;
            --border-tertiary: #CBCBCB;
            --bg-primary: #fff;
            --bg-accent: rgb(4, 96, 169);
            --bg-accent-hex: #0460A9;
            --bg-light-blue: #9CBFDD;
            --text-primary: #212121;
            --text-secondary: #666;
            --text-black: #000;
            --text-inverse: rgb(255, 255, 255);
            --success-green: #388E3C;
            --accent-orange: #E74A21;
            --accent-yellow: #EC9A1E;
            --accent-red: #FF585D;
            --accent-gold: #FFC100;
            --accent-dark-blue: #002068;
          }

          .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
          }
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #9E9E9E;
            border-bottom: 1px solid #9E9E9E;
            background-color: #fff;
            z-index: 99;
          }
          .blankSpace {
            display: flex;
            width: 100%;
            height: 48px;
          }
          .img-menu {
            padding-left: 15px;
          }
          .button-menu {
            display: flex;
          }
          .button-menu span {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 47px;
            height: 48px;
            border-left: 1px solid #9E9E9E;
          }
          .button-menu a {
          }
          .sofiaElement {
            display: flex;
            justify-content: space-evenly !important;
            cursor: none;
            // text-align: center;
            width: 128px !important;
            font-size: 24px;
            font-family: "arial";
            font-weight: bold;
            margin-right: 10px;
          }
          .nineDotMenu {
            display: none;
            align-content: space-around;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            float: right;
            width: 356px;
            height: 234px;
            border: 1px solid #9E9E9E;
            margin-right: 138px;
          }
          .nineDotMenu span {
            width: 88px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nineDotMenu svg {
            cursor: pointer;
          }
          .nineDotMenu a {
            display: block;
            width: 100%;
            height: 78px;
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }

          .clipBoardMenu {
            position: absolute;
            display: none;
            align-items: center;
            flex-wrap: wrap;
            top: 48px;
            right: 140px;
            width: 288px;
            height: 240px;
            border: 1px solid #9E9E9E;
            background-color: #fff;
            background-size: 0px;
            background-image: none;
            // padding: 0 16px;
            justify-content: center;
            flex-direction: column;
          }
          .titleDiv {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
          }
          clipBoardMenu h2{
            font-family: "arial";
            font-size: 20px;
            color: #212121;
            font-weight: bold;
            text-align: center;
          }
          .copyLinkDiv {
            display: flex;
            justify-content: flex-end;
            width: 100%;
          }
          .copyLink {
            font-family: Arial;
            font-size: 14px;
            font-weight: bold;
            height: 40px;
            width: 178px;
            background-color: rgb(4, 96, 169);
            border-color: rgb(4, 96, 169);
            color: rgb(255, 255, 255);
          }

          .clipBoardSuccess{
            position: absolute;
            display: none;
            align-items: center;
            flex-wrap: wrap;
            top: 48px;
            right: 284px;
            width: 288px;
            height: 240px;
            border: 1px solid #9E9E9E;
            background-color: #fff;
            background-size: 0px;
            background-image: none;
            // padding: 0 16px;
            justify-content: center;
          }
          .clipBoardSuccess .titleDiv {
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            padding: 20px 0;
          }
          .clipBoardSuccess p {
            max-width: 240px;
            margin: 0;
            text-align: center;
          }
          .clipBoardSuccess h2 {
            max-width: 240px;
            margin: 0;
            text-align: center;
            font-size: 18px;
          }

          .userElement svg {
            border-radius: 50%;
            width: 30%;
            height: 30%;
          }
          .userElement rect {
          }
          .userElement img {
          }
          .avatarUser {
            color: rgb(255, 255, 255);
            background-color: rgb(4, 96, 169);
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            width: 25px;
            height: 25px;
            font-weight: 600;
            font-size: 15px;
          }
          .hiddenDefault{
            display: none !important;
          }
      </style>
      <nav id="nav">
          <div class="img-menu">
          <!--
            <svg width="112" height="19" viewBox="0 0 112 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.33332 1.88523C2.09115 2.68937 2.34376 3.47091 2.34376 4.29838C2.34376 7.07897 -0.00012207 9.05579 -0.00012207 12.2497C-0.00012207 15.1922 2.05727 18.1874 8.00695 18.1874C13.3102 18.1874 16.1074 15.5913 16.1074 12.825C16.1074 10.4581 14.4061 8.45156 11.1233 8.13609L11.0778 8.25128C11.833 8.58295 13.5229 9.89795 13.5229 12.543C13.5229 15.0333 11.4215 17.5466 8.12139 17.5466C4.01301 17.5466 2.59674 15.1463 2.59674 12.9398C2.59674 10.1133 4.57357 8.2287 4.57357 5.65404C4.57357 3.86131 3.21754 2.09191 1.40184 1.77004L1.33332 1.88523Z" fill="#E74A21"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07614 14.2265L9.56996 0.000244141H6.44453L7.93835 14.2265H8.07614ZM88.4089 7.43276V16.8169L86.914 17.1614V17.5469H91.6089V17.1614L90.114 16.8169V7.43276H92.6461L93.4788 9.21458H93.8007L93.5601 6.86995H84.9628L84.7218 9.21458H85.0441L85.8738 7.43276H88.4089ZM79.1571 12.3268C79.5249 12.2323 81.6451 11.6932 81.6451 9.67456C81.6451 8.06667 80.4134 6.82094 77.3805 6.82094C75.5065 6.82094 73.6099 6.86386 73.3795 6.8695V7.25425L74.6177 7.60135V16.8158L73.3795 17.161V17.5465H77.7615V17.1613L76.3227 16.8161V12.6505H77.5609L80.7285 17.5465H83.5316V17.1768L82.1124 16.8161L79.1571 12.3268ZM63.7176 13.0768H67.2689L65.5055 8.31718H65.4897L63.7176 13.0768ZM60.412 17.1611L61.6216 16.817L65.352 6.86814L66.5996 6.54815L70.452 16.8163L71.6609 17.1611V17.547H67.0883V17.1611L68.6344 16.8163L67.5427 13.8648H63.4403L62.3546 16.817L63.9026 17.1611V17.547H60.412V17.1611ZM103.933 14.6076H104.229L105.227 16.9041C105.526 17.0532 106.272 17.3784 107.137 17.3784C108.43 17.3784 109.614 16.6071 109.614 15.277C109.614 14.2534 108.953 13.6416 107.877 13.083C107.534 12.9041 107.176 12.7182 106.817 12.5314C105.546 11.8707 104.279 10.9382 104.279 9.43612C104.279 7.80376 105.427 6.54034 107.828 6.54034C109.063 6.54034 110.119 6.88292 110.327 6.95219L110.579 9.42257H110.257L109.334 7.44198C109.162 7.35426 108.607 7.0384 107.788 7.0384C106.566 7.0384 105.731 7.79247 105.731 8.8349C105.731 9.78134 106.36 10.3754 107.435 10.9322C107.834 11.1381 108.276 11.3697 108.694 11.5861C110.411 12.475 111.225 13.2975 111.225 14.8241C111.225 16.7079 109.46 17.8769 107.266 17.8769C105.587 17.8769 104.56 17.5298 104.219 17.4229L103.933 14.6076ZM96.363 17.1614L97.8584 16.8169V7.60067L96.363 7.25582V6.86995H101.059V7.25545L99.5626 7.60067V16.8169L101.059 17.1614V17.5469H96.363V17.1614ZM77.0085 12.0953H76.3229V7.43201C78.5994 7.43201 79.925 7.94965 79.925 9.79585C79.925 11.1669 78.7402 12.0953 77.0085 12.0953ZM51.4494 7.60104L50.3261 7.25545V6.86995H54.6517V7.25545L53.2975 7.60067L56.2844 15.7403H56.3006L59.2875 7.60104L57.9329 7.25582V6.86995H61.1337V7.25582L60.0201 7.60104L56.2339 17.74H55.2758L51.4494 7.60104ZM47.3363 12.4903C47.3363 9.72437 45.6802 7.03865 43.4289 7.03865C41.0331 7.03865 39.956 9.35468 39.956 11.8311C39.956 14.2909 41.3226 17.3783 43.8954 17.3783C46.307 17.3783 47.3363 14.9343 47.3363 12.4903ZM49.1696 11.9276C49.1696 15.7065 46.5483 17.8769 43.654 17.8769C40.7274 17.8769 38.1384 15.658 38.1384 12.2167C38.1384 8.74342 40.7597 6.54034 43.6378 6.54034C47.1759 6.54034 49.1696 9.29043 49.1696 11.9276ZM34.4265 17.7159L27.3753 8.62277V16.8169L28.8141 17.1614V17.5469H25.534V17.1614L26.7078 16.8169V7.89055C26.5918 7.78175 26.1506 7.4162 25.694 7.31756C25.552 7.28669 25.357 7.25507 25.357 7.25507V6.86995H28.1387L34.1773 14.7008V7.60142L32.7395 7.25582V6.86995H36.0182V7.25582L34.8444 7.60142V15.7297C34.8444 16.4721 34.8971 17.577 34.9076 17.7159H34.4265Z" fill="#0460A9"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.96943 18.0743C13.2727 18.0743 16.0699 15.4782 16.0699 12.7119C16.0699 10.3451 14.3686 8.3385 11.0858 8.02303L11.0403 8.13822C11.7955 8.46989 13.4854 9.78489 13.4854 12.4299C13.4854 14.9203 11.384 17.4336 8.08387 17.4336C7.83802 17.4336 7.8953 18.0743 7.96943 18.0743Z" fill="#EC9A1E"/>
            </svg>
            -->
          </div>
          <div class="blankSpace" id="blankSpace">
          </div>
          <div id="buttonMenu" class="button-menu">
            <span id="adminElement" class="adminElement navButton hiddenDefault">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="black"  fill-opacity="0.6"/>
                </svg>
              </a>
            </span>

            <span id="configElement" class="configElement navButton hiddenDefault">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1528 6.56652C14.7431 6.72409 14.2797 6.55901 14.0619 6.17789L12.8175 4.00012H11.1825L9.93807 6.17789C9.72029 6.55901 9.25691 6.72409 8.84721 6.56652L6.87748 5.80893L5.80881 6.87761L6.67591 9.13207C6.84581 9.57381 6.63978 10.0712 6.20728 10.2634L4 11.2445V12.7558L5.9285 13.6129C6.32962 13.7912 6.54055 14.2356 6.42505 14.6591L5.76509 17.0789L6.9212 18.235L9.34106 17.5751C9.76455 17.4596 10.2089 17.6705 10.3872 18.0716L11.2443 20.0001H12.7557L13.6128 18.0716C13.7911 17.6705 14.2354 17.4596 14.6589 17.5751L17.0788 18.235L18.2349 17.0789L17.6485 14.9289C17.5419 14.5379 17.7132 14.1243 18.0651 13.9233L20 12.8176V11.1826L17.8222 9.93819C17.4411 9.72041 17.276 9.25703 17.4336 8.84733L18.1912 6.87761L17.1225 5.80893L15.1528 6.56652ZM15.3002 4.46586L17.1377 3.75915C17.473 3.63018 17.8528 3.71078 18.1068 3.96482L20.0353 5.89329C20.2893 6.14733 20.3699 6.52714 20.241 6.86246L19.5343 8.69992L21.5419 9.84717C21.8252 10.009 22 10.3103 22 10.6365V13.3638C22 13.69 21.8252 13.9912 21.5419 14.1531L19.7163 15.1963L20.2695 17.2249C20.3554 17.5397 20.266 17.8763 20.0353 18.107L18.1068 20.0354C17.8761 20.2661 17.5395 20.3555 17.2248 20.2697L14.9939 19.6612L14.1944 21.4602C14.0485 21.7885 13.7229 22.0001 13.3636 22.0001H10.6364C10.2771 22.0001 9.95154 21.7885 9.80563 21.4602L9.00607 19.6612L6.77519 20.2697C6.46045 20.3555 6.12385 20.2661 5.89317 20.0354L3.9647 18.107C3.73401 17.8763 3.64462 17.5397 3.73046 17.2249L4.33888 14.9941L2.53987 14.1945C2.21158 14.0486 2 13.723 2 13.3638V10.6365C2 10.2772 2.21158 9.95166 2.53987 9.80575L4.54782 8.91333L3.75902 6.86246C3.63006 6.52714 3.71066 6.14733 3.9647 5.89329L5.89317 3.96482C6.14721 3.71078 6.52702 3.63018 6.86234 3.75915L8.6998 4.46586L9.84705 2.45818C10.0089 2.17493 10.3101 2.00012 10.6364 2.00012H13.3636C13.6899 2.00012 13.9911 2.17493 14.1529 2.45818L15.3002 4.46586ZM12 16.0001C9.79086 16.0001 8 14.2093 8 12.0001C8 9.79098 9.79086 8.00012 12 8.00012C14.2091 8.00012 16 9.79098 16 12.0001C16 14.2093 14.2091 16.0001 12 16.0001ZM12 14.0001C13.1046 14.0001 14 13.1047 14 12.0001C14 10.8956 13.1046 10.0001 12 10.0001C10.8954 10.0001 10 10.8956 10 12.0001C10 13.1047 10.8954 14.0001 12 14.0001Z" fill="black" fill-opacity="0.6"/>
                </svg>
              </a>
            </span>
            <span id="clipBoardElement" class="clipBoardElement hiddenDefault">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8889 6.55568C12.8889 4.592 14.4808 3.00012 16.4444 3.00012C18.4081 3.00012 20 4.592 20 6.55568C20 8.51936 18.4081 10.1112 16.4444 10.1112C15.5386 10.1112 14.7119 9.77251 14.0841 9.21482L10.9098 11.5956C11.0402 11.9655 11.1111 12.3634 11.1111 12.7779C11.1111 13.1751 11.046 13.557 10.9258 13.9137L14.055 15.4782C14.6863 14.905 15.5246 14.5557 16.4444 14.5557C18.4081 14.5557 20 16.1476 20 18.1112C20 20.0749 18.4081 21.6668 16.4444 21.6668C14.4808 21.6668 12.8889 20.0749 12.8889 18.1112C12.8889 17.7141 12.954 17.3321 13.0742 16.9755L9.94502 15.4109C9.31374 15.9841 8.47544 16.3335 7.55556 16.3335C5.59188 16.3335 4 14.7416 4 12.7779C4 10.8142 5.59188 9.22234 7.55556 9.22234C8.46137 9.22234 9.28806 9.56107 9.9159 10.1188L13.0902 7.73802C12.9598 7.36813 12.8889 6.97019 12.8889 6.55568ZM18.2222 6.55568C18.2222 5.57384 17.4263 4.7779 16.4444 4.7779C15.4626 4.7779 14.6667 5.57384 14.6667 6.55568C14.6667 7.53752 15.4626 8.33346 16.4444 8.33346C17.4263 8.33346 18.2222 7.53752 18.2222 6.55568ZM9.33333 12.7779C9.33333 11.7961 8.5374 11.0001 7.55556 11.0001C6.57372 11.0001 5.77778 11.7961 5.77778 12.7779C5.77778 13.7597 6.57372 14.5557 7.55556 14.5557C8.5374 14.5557 9.33333 13.7597 9.33333 12.7779ZM16.4444 16.3335C17.4263 16.3335 18.2222 17.1294 18.2222 18.1112C18.2222 19.0931 17.4263 19.889 16.4444 19.889C15.4626 19.889 14.6667 19.0931 14.6667 18.1112C14.6667 17.1294 15.4626 16.3335 16.4444 16.3335Z" fill="black" fill-opacity="0.6"/>
                </svg>
              </a>
            </span>
            <span id="downloadElement" class="downloadElement navButton hiddenDefault">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7089 12.0001H17.5373L12 17.5374L6.46268 12.0001H9.29111L11 13.709V4.00012H13V13.709L14.7089 12.0001ZM2 17.0001H4V19.0001H20L20 17.0001H22V21.0001H2V17.0001Z" fill="black" fill-opacity="0.6"/>
                </svg>
              </a>
            </span>

            <span id="infoElement" class="infoElement navButton hiddenDefault">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.0001C2 6.47727 6.47715 2.00012 12 2.00012C14.6522 2.00012 17.1957 3.05369 19.0711 4.92905C20.9464 6.80442 22 9.34796 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.523 2 12.0001ZM4 12.0001C4 16.4184 7.58172 20.0001 12 20.0001C14.1217 20.0001 16.1566 19.1573 17.6569 17.657C19.1571 16.1567 20 14.1219 20 12.0001C20 7.58184 16.4183 4.00012 12 4.00012C7.58172 4.00012 4 7.58184 4 12.0001ZM13 6.00012V8.00012H11V6.00012H13ZM9 12.0001V10.0001H11H13V18.0001H11V12.0001H9Z" fill="black" fill-opacity="0.6"/>
                </svg>
              </a>
            </span>

            <span id="userElement" class="userElement">
              <a id="avatarUser" class="avatarUser">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="35" height="35" fill="white"/>
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_11279_104378" transform="scale(0.00208333)"/>
                    </pattern>
                    <image id="image0_11279_104378" width="480" height="480" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </a>
            </span>
            <span id="menuElement" class="menuElement">
              <a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4 4.00012H7V7.00012H4V4.00012ZM10 4.00012H13V7.00012H10V4.00012ZM16 4.00012H19V7.00012H16V4.00012ZM4 10.0001H7V13.0001H4V10.0001ZM10 10.0001H13V13.0001H10V10.0001ZM16 10.0001H19V13.0001H16V10.0001ZM4 16.0001H7V19.0001H4V16.0001ZM10 16.0001H13V19.0001H10V16.0001ZM16 16.0001H19V19.0001H16V16.0001Z" fill="black" fill-opacity="0.6"/>
                </svg>
              </a>
            </span>

            <span id="sofiaElement" class="sofiaElement">
              <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29 5.63861V5.64211C29 8.2229 26.9031 10.3198 24.3223 10.3198H19.6376V5.63861C19.6376 3.05783 21.7345 0.960938 24.3153 0.960938H24.3223C26.9031 0.960938 29 3.05783 29 5.63861Z" fill="url(#paint0_linear_4897_74035)"/>
                <path d="M14.9628 10.3203H19.644V14.998C19.644 17.5823 17.5471 19.6757 14.9663 19.6757H10.2852V14.998C10.2852 12.4137 12.382 10.3203 14.9628 10.3203Z" fill="#FF585D"/>
                <path d="M0.921875 24.3614V24.3579C0.921875 21.7771 3.01876 19.6802 5.59954 19.6802H10.2842V24.3614C10.2842 26.9422 8.18734 29.0391 5.60656 29.0391H5.59954C3.01876 29.0391 0.921875 26.9422 0.921875 24.3614Z" fill="#002068"/>
                <defs>
                <linearGradient id="paint0_linear_4897_74035" x1="21.1244" y1="11.1754" x2="26.6612" y2="1.5886" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF585D"/>
                <stop offset="1" stop-color="#FFC100"/>
                </linearGradient>
                </defs>
              </svg>
              <a class="sofia-link">Sofia</a>
            </span>
          </div>
      </nav>
      <div id="nineDotMenu" class="nineDotMenu" style="display: none;">
        <span class="dotNav-genieHome">
          <a href="https://go/genieplus" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M30.4986 0C27.0921 0 24.3281 2.7594 24.3281 6.1659V30.8341C24.3281 34.2406 27.0921 37 30.4986 37C33.9051 37 36.6692 34.2406 36.6692 30.8341V6.1659C36.6692 2.7594 33.9051 0 30.4986 0Z" fill="url(#paint0_linear_4897_76210)"/>
            <path d="M36.6719 24.6677V12.3359H24.3355V24.6677H36.6719Z" fill="#FF585D"/>
            <path d="M18.1581 12.3359H24.3286V24.6677H18.1581C14.7562 24.6677 11.9922 21.9037 11.9922 18.5018C11.9922 15.1 14.7562 12.3359 18.1581 12.3359Z" fill="#002068"/>
            <path d="M42.838 24.6641H36.6675V12.3323L42.838 12.3323C46.2399 12.3323 49.0039 15.0963 49.0039 18.4982C49.0039 21.9 46.2399 24.6641 42.838 24.6641Z" fill="#002068"/>
            <path d="M13.4854 53.0693V51.8936L17.7305 51.8867V55.6055C17.0788 56.125 16.4066 56.5169 15.7139 56.7812C15.0212 57.041 14.3102 57.1709 13.5811 57.1709C12.5967 57.1709 11.7012 56.9613 10.8945 56.542C10.0924 56.1182 9.48633 55.5075 9.07617 54.71C8.66602 53.9124 8.46094 53.0215 8.46094 52.0371C8.46094 51.0618 8.66374 50.1527 9.06934 49.3096C9.47949 48.4619 10.0674 47.833 10.833 47.4229C11.5986 47.0127 12.4805 46.8076 13.4785 46.8076C14.2031 46.8076 14.8571 46.9261 15.4404 47.1631C16.0283 47.3955 16.4886 47.7214 16.8213 48.1406C17.154 48.5599 17.4069 49.1068 17.5801 49.7812L16.3838 50.1094C16.2334 49.599 16.0465 49.1979 15.8232 48.9062C15.5999 48.6146 15.2809 48.3822 14.8662 48.209C14.4515 48.0312 13.9912 47.9424 13.4854 47.9424C12.8792 47.9424 12.3551 48.0358 11.9131 48.2227C11.471 48.4049 11.1133 48.6465 10.8398 48.9473C10.571 49.248 10.3613 49.5785 10.2109 49.9385C9.95573 50.5583 9.82812 51.2305 9.82812 51.9551C9.82812 52.8483 9.98079 53.5957 10.2861 54.1973C10.596 54.7988 11.0449 55.2454 11.6328 55.5371C12.2207 55.8288 12.8451 55.9746 13.5059 55.9746C14.0801 55.9746 14.6406 55.8652 15.1875 55.6465C15.7344 55.4232 16.1491 55.1862 16.4316 54.9355V53.0693H13.4854ZM24.5049 54.6621L25.7764 54.8193C25.5758 55.5622 25.2044 56.1387 24.6621 56.5488C24.1198 56.959 23.4271 57.1641 22.584 57.1641C21.5221 57.1641 20.679 56.8382 20.0547 56.1865C19.4349 55.5303 19.125 54.612 19.125 53.4316C19.125 52.2103 19.4395 51.2624 20.0684 50.5879C20.6973 49.9134 21.513 49.5762 22.5156 49.5762C23.4863 49.5762 24.2793 49.9066 24.8945 50.5674C25.5098 51.2282 25.8174 52.1579 25.8174 53.3564C25.8174 53.4294 25.8151 53.5387 25.8105 53.6846H20.3965C20.4421 54.4821 20.6676 55.0928 21.0732 55.5166C21.4788 55.9404 21.9847 56.1523 22.5908 56.1523C23.042 56.1523 23.4271 56.0339 23.7461 55.7969C24.0651 55.5599 24.318 55.1816 24.5049 54.6621ZM20.4648 52.6729H24.5186C24.4639 52.0622 24.3089 51.6042 24.0537 51.2988C23.6618 50.8249 23.1536 50.5879 22.5293 50.5879C21.9642 50.5879 21.488 50.777 21.1006 51.1553C20.7178 51.5335 20.5059 52.0394 20.4648 52.6729ZM27.3281 57V49.7402H28.4355V50.7725C28.9688 49.9749 29.7389 49.5762 30.7461 49.5762C31.1836 49.5762 31.5846 49.6559 31.9492 49.8154C32.3184 49.9704 32.5941 50.1755 32.7764 50.4307C32.9587 50.6859 33.0863 50.9889 33.1592 51.3398C33.2048 51.5677 33.2275 51.9665 33.2275 52.5361V57H31.9971V52.584C31.9971 52.0827 31.9492 51.709 31.8535 51.4629C31.7578 51.2122 31.5869 51.014 31.3408 50.8682C31.0993 50.7178 30.8145 50.6426 30.4863 50.6426C29.9622 50.6426 29.5088 50.8089 29.126 51.1416C28.7477 51.4743 28.5586 52.1055 28.5586 53.0352V57H27.3281ZM35.1279 48.3936V46.9785H36.3584V48.3936H35.1279ZM35.1279 57V49.7402H36.3584V57H35.1279ZM43.208 54.6621L44.4795 54.8193C44.279 55.5622 43.9076 56.1387 43.3652 56.5488C42.8229 56.959 42.1302 57.1641 41.2871 57.1641C40.2253 57.1641 39.3822 56.8382 38.7578 56.1865C38.138 55.5303 37.8281 54.612 37.8281 53.4316C37.8281 52.2103 38.1426 51.2624 38.7715 50.5879C39.4004 49.9134 40.2161 49.5762 41.2188 49.5762C42.1895 49.5762 42.9824 49.9066 43.5977 50.5674C44.2129 51.2282 44.5205 52.1579 44.5205 53.3564C44.5205 53.4294 44.5182 53.5387 44.5137 53.6846H39.0996C39.1452 54.4821 39.3708 55.0928 39.7764 55.5166C40.182 55.9404 40.6878 56.1523 41.2939 56.1523C41.7451 56.1523 42.1302 56.0339 42.4492 55.7969C42.7682 55.5599 43.0212 55.1816 43.208 54.6621ZM39.168 52.6729H43.2217C43.167 52.0622 43.012 51.6042 42.7568 51.2988C42.3649 50.8249 41.8568 50.5879 41.2324 50.5879C40.6673 50.5879 40.1911 50.777 39.8037 51.1553C39.4209 51.5335 39.209 52.0394 39.168 52.6729ZM48.6152 55.3799V52.6318H45.8877V51.4834H48.6152V48.7559H49.7773V51.4834H52.5049V52.6318H49.7773V55.3799H48.6152ZM12.9385 75V64.9785H14.2646V69.0938H19.4736V64.9785H20.7998V75H19.4736V70.2764H14.2646V75H12.9385ZM22.3994 71.3701C22.3994 70.0257 22.7731 69.0299 23.5205 68.3828C24.1449 67.8451 24.9059 67.5762 25.8037 67.5762C26.8018 67.5762 27.6175 67.9043 28.251 68.5605C28.8844 69.2122 29.2012 70.1146 29.2012 71.2676C29.2012 72.2018 29.0599 72.9378 28.7773 73.4756C28.4993 74.0088 28.0915 74.4235 27.5537 74.7197C27.0205 75.016 26.4372 75.1641 25.8037 75.1641C24.7874 75.1641 23.9648 74.8382 23.3359 74.1865C22.7116 73.5348 22.3994 72.596 22.3994 71.3701ZM23.6641 71.3701C23.6641 72.2998 23.8669 72.9971 24.2725 73.4619C24.6781 73.9222 25.1885 74.1523 25.8037 74.1523C26.4144 74.1523 26.9225 73.9199 27.3281 73.4551C27.7337 72.9902 27.9365 72.2816 27.9365 71.3291C27.9365 70.4313 27.7314 69.7523 27.3213 69.292C26.9157 68.8271 26.4098 68.5947 25.8037 68.5947C25.1885 68.5947 24.6781 68.8249 24.2725 69.2852C23.8669 69.7454 23.6641 70.4404 23.6641 71.3701ZM30.6504 75V67.7402H31.751V68.7588C31.9788 68.4033 32.2819 68.1185 32.6602 67.9043C33.0384 67.6855 33.4691 67.5762 33.9521 67.5762C34.4899 67.5762 34.9297 67.6878 35.2715 67.9111C35.6178 68.1344 35.8617 68.4466 36.0029 68.8477C36.5771 68 37.3245 67.5762 38.2451 67.5762C38.9652 67.5762 39.5189 67.7767 39.9062 68.1777C40.2936 68.5742 40.4873 69.1872 40.4873 70.0166V75H39.2637V70.4268C39.2637 69.9346 39.2227 69.5814 39.1406 69.3672C39.0632 69.1484 38.9196 68.973 38.71 68.8408C38.5003 68.7087 38.2542 68.6426 37.9717 68.6426C37.4613 68.6426 37.0374 68.8135 36.7002 69.1553C36.363 69.4925 36.1943 70.0348 36.1943 70.7822V75H34.9639V70.2832C34.9639 69.7363 34.8636 69.3262 34.6631 69.0527C34.4626 68.7793 34.1344 68.6426 33.6787 68.6426C33.3324 68.6426 33.0111 68.7337 32.7148 68.916C32.4232 69.0983 32.2113 69.3649 32.0791 69.7158C31.9469 70.0667 31.8809 70.5726 31.8809 71.2334V75H30.6504ZM47.2822 72.6621L48.5537 72.8193C48.3532 73.5622 47.9818 74.1387 47.4395 74.5488C46.8971 74.959 46.2044 75.1641 45.3613 75.1641C44.2995 75.1641 43.4564 74.8382 42.832 74.1865C42.2122 73.5303 41.9023 72.612 41.9023 71.4316C41.9023 70.2103 42.2168 69.2624 42.8457 68.5879C43.4746 67.9134 44.2904 67.5762 45.293 67.5762C46.2637 67.5762 47.0566 67.9066 47.6719 68.5674C48.2871 69.2282 48.5947 70.1579 48.5947 71.3564C48.5947 71.4294 48.5924 71.5387 48.5879 71.6846H43.1738C43.2194 72.4821 43.445 73.0928 43.8506 73.5166C44.2562 73.9404 44.762 74.1523 45.3682 74.1523C45.8193 74.1523 46.2044 74.0339 46.5234 73.7969C46.8424 73.5599 47.0954 73.1816 47.2822 72.6621ZM43.2422 70.6729H47.2959C47.2412 70.0622 47.0863 69.6042 46.8311 69.2988C46.4391 68.8249 45.931 68.5879 45.3066 68.5879C44.7415 68.5879 44.2653 68.777 43.8779 69.1553C43.4951 69.5335 43.2832 70.0394 43.2422 70.6729Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76210" x1="22.0725" y1="33.0943" x2="38.9248" y2="3.91031" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>


          </a>
        </span>
        <span class="dotNav-genie">
          <a href="https://go/genie" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M36.6712 18.5008V24.6704H24.3408V18.5008C24.3408 15.0995 27.1035 12.3359 30.5037 12.3359H30.5129C33.9131 12.3359 36.6758 15.0995 36.6758 18.5008H36.6712Z" fill="#FF585D"/>
            <path d="M24.3359 30.8322V37.0017H18.1638C14.7636 37.0017 12.0009 34.2381 12.0009 30.8368C12.0009 27.4355 14.7636 24.6719 18.1638 24.6719H18.1731C21.5733 24.6719 24.3359 27.4355 24.3359 30.8368V30.8322Z" fill="#002068"/>
            <path d="M36.668 36.9939V24.6641H24.3376V36.9939H36.668Z" fill="#FF585D"/>
            <path d="M38.3581 1.62463C37.2863 2.42875 36.6719 3.70425 36.6719 5.04444V12.337V24.6668V36.9966H42.7978C46.2257 36.9966 49.0022 34.2192 49.0022 30.7947V6.16744C49.0022 1.32886 43.4353 -2.20649 38.3581 1.62001V1.62463Z" fill="url(#paint0_linear_4897_76215)"/>
            <path d="M17.5732 53.0693V51.8936L21.8184 51.8867V55.6055C21.1667 56.125 20.4945 56.5169 19.8018 56.7812C19.109 57.041 18.3981 57.1709 17.6689 57.1709C16.6846 57.1709 15.7891 56.9613 14.9824 56.542C14.1803 56.1182 13.5742 55.5075 13.1641 54.71C12.7539 53.9124 12.5488 53.0215 12.5488 52.0371C12.5488 51.0618 12.7516 50.1527 13.1572 49.3096C13.5674 48.4619 14.1553 47.833 14.9209 47.4229C15.6865 47.0127 16.5684 46.8076 17.5664 46.8076C18.291 46.8076 18.945 46.9261 19.5283 47.1631C20.1162 47.3955 20.5765 47.7214 20.9092 48.1406C21.2419 48.5599 21.4948 49.1068 21.668 49.7812L20.4717 50.1094C20.3213 49.599 20.1344 49.1979 19.9111 48.9062C19.6878 48.6146 19.3688 48.3822 18.9541 48.209C18.5394 48.0312 18.0791 47.9424 17.5732 47.9424C16.9671 47.9424 16.443 48.0358 16.001 48.2227C15.5589 48.4049 15.2012 48.6465 14.9277 48.9473C14.6589 49.248 14.4492 49.5785 14.2988 49.9385C14.0436 50.5583 13.916 51.2305 13.916 51.9551C13.916 52.8483 14.0687 53.5957 14.374 54.1973C14.6839 54.7988 15.1328 55.2454 15.7207 55.5371C16.3086 55.8288 16.9329 55.9746 17.5938 55.9746C18.168 55.9746 18.7285 55.8652 19.2754 55.6465C19.8223 55.4232 20.237 55.1862 20.5195 54.9355V53.0693H17.5732ZM28.5928 54.6621L29.8643 54.8193C29.6637 55.5622 29.2923 56.1387 28.75 56.5488C28.2077 56.959 27.515 57.1641 26.6719 57.1641C25.61 57.1641 24.7669 56.8382 24.1426 56.1865C23.5228 55.5303 23.2129 54.612 23.2129 53.4316C23.2129 52.2103 23.5273 51.2624 24.1562 50.5879C24.7852 49.9134 25.6009 49.5762 26.6035 49.5762C27.5742 49.5762 28.3672 49.9066 28.9824 50.5674C29.5977 51.2282 29.9053 52.1579 29.9053 53.3564C29.9053 53.4294 29.903 53.5387 29.8984 53.6846H24.4844C24.5299 54.4821 24.7555 55.0928 25.1611 55.5166C25.5667 55.9404 26.0726 56.1523 26.6787 56.1523C27.1299 56.1523 27.515 56.0339 27.834 55.7969C28.153 55.5599 28.4059 55.1816 28.5928 54.6621ZM24.5527 52.6729H28.6064C28.5518 52.0622 28.3968 51.6042 28.1416 51.2988C27.7497 50.8249 27.2415 50.5879 26.6172 50.5879C26.0521 50.5879 25.5758 50.777 25.1885 51.1553C24.8057 51.5335 24.5938 52.0394 24.5527 52.6729ZM31.416 57V49.7402H32.5234V50.7725C33.0566 49.9749 33.8268 49.5762 34.834 49.5762C35.2715 49.5762 35.6725 49.6559 36.0371 49.8154C36.4062 49.9704 36.682 50.1755 36.8643 50.4307C37.0465 50.6859 37.1742 50.9889 37.2471 51.3398C37.2926 51.5677 37.3154 51.9665 37.3154 52.5361V57H36.085V52.584C36.085 52.0827 36.0371 51.709 35.9414 51.4629C35.8457 51.2122 35.6748 51.014 35.4287 50.8682C35.1872 50.7178 34.9023 50.6426 34.5742 50.6426C34.0501 50.6426 33.5967 50.8089 33.2139 51.1416C32.8356 51.4743 32.6465 52.1055 32.6465 53.0352V57H31.416ZM39.2158 48.3936V46.9785H40.4463V48.3936H39.2158ZM39.2158 57V49.7402H40.4463V57H39.2158ZM47.2959 54.6621L48.5674 54.8193C48.3669 55.5622 47.9954 56.1387 47.4531 56.5488C46.9108 56.959 46.2181 57.1641 45.375 57.1641C44.3132 57.1641 43.4701 56.8382 42.8457 56.1865C42.2259 55.5303 41.916 54.612 41.916 53.4316C41.916 52.2103 42.2305 51.2624 42.8594 50.5879C43.4883 49.9134 44.304 49.5762 45.3066 49.5762C46.2773 49.5762 47.0703 49.9066 47.6855 50.5674C48.3008 51.2282 48.6084 52.1579 48.6084 53.3564C48.6084 53.4294 48.6061 53.5387 48.6016 53.6846H43.1875C43.2331 54.4821 43.4587 55.0928 43.8643 55.5166C44.2699 55.9404 44.7757 56.1523 45.3818 56.1523C45.833 56.1523 46.2181 56.0339 46.5371 55.7969C46.8561 55.5599 47.109 55.1816 47.2959 54.6621ZM43.2559 52.6729H47.3096C47.2549 52.0622 47.0999 51.6042 46.8447 51.2988C46.4528 50.8249 45.9447 50.5879 45.3203 50.5879C44.7552 50.5879 44.279 50.777 43.8916 51.1553C43.5088 51.5335 43.2969 52.0394 43.2559 52.6729Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76215" x1="33.1423" y1="34.9632" x2="51.1224" y2="3.83416" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span> 
        <span class="dotNav-sofia">
          <a href="https://go/sofia" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M49 6.16494V6.16955C49 9.5709 46.2369 12.3345 42.8363 12.3345L36.6633 12.3345V6.16494C36.6633 2.76359 39.4263 0 42.827 0L42.8363 0C46.2369 0 49 2.76359 49 6.16494Z" fill="url(#paint0_linear_4897_76219)"/>
            <path d="M30.4997 12.3359H36.668V18.5009C36.668 21.9068 33.905 24.6658 30.5043 24.6658H24.3359V18.5009C24.3359 15.0949 27.099 12.3359 30.4997 12.3359Z" fill="#FF585D"/>
            <path d="M12 30.8351V30.8304C12 27.4291 14.7631 24.6655 18.1637 24.6655H24.3367V30.8351C24.3367 34.2364 21.5737 37 18.173 37H18.1637C14.7631 37 12 34.2364 12 30.8351Z" fill="#002068"/>
            <path d="M15.1602 53.7803L16.4111 53.6709C16.4704 54.1722 16.6071 54.5846 16.8213 54.9082C17.04 55.2272 17.3773 55.487 17.833 55.6875C18.2887 55.8835 18.8014 55.9814 19.3711 55.9814C19.877 55.9814 20.3236 55.9062 20.7109 55.7559C21.0983 55.6055 21.3854 55.4004 21.5723 55.1406C21.7637 54.8763 21.8594 54.5892 21.8594 54.2793C21.8594 53.9648 21.7682 53.6914 21.5859 53.459C21.4036 53.222 21.1029 53.0238 20.6836 52.8643C20.4147 52.7594 19.82 52.5977 18.8994 52.3789C17.9788 52.1556 17.334 51.946 16.9648 51.75C16.4863 51.4993 16.1286 51.1895 15.8916 50.8203C15.6592 50.4466 15.543 50.0296 15.543 49.5693C15.543 49.0635 15.6865 48.5918 15.9736 48.1543C16.2607 47.7122 16.68 47.3773 17.2314 47.1494C17.7829 46.9215 18.3958 46.8076 19.0703 46.8076C19.8132 46.8076 20.4671 46.9284 21.0322 47.1699C21.6019 47.4069 22.0394 47.7578 22.3447 48.2227C22.6501 48.6875 22.8141 49.2139 22.8369 49.8018L21.5654 49.8975C21.4971 49.264 21.2646 48.7855 20.8682 48.4619C20.4762 48.1383 19.8952 47.9766 19.125 47.9766C18.3229 47.9766 17.7373 48.1247 17.3682 48.4209C17.0036 48.7126 16.8213 49.0658 16.8213 49.4805C16.8213 49.8405 16.9512 50.1367 17.2109 50.3691C17.4661 50.6016 18.1315 50.8408 19.207 51.0869C20.2871 51.3285 21.0277 51.5404 21.4287 51.7227C22.012 51.9915 22.4427 52.3333 22.7207 52.748C22.9987 53.1582 23.1377 53.6322 23.1377 54.1699C23.1377 54.7031 22.985 55.2067 22.6797 55.6807C22.3743 56.1501 21.9346 56.5169 21.3604 56.7812C20.7907 57.041 20.1481 57.1709 19.4326 57.1709C18.5257 57.1709 17.7646 57.0387 17.1494 56.7744C16.5387 56.5101 16.0579 56.1136 15.707 55.585C15.3607 55.0518 15.1784 54.4502 15.1602 53.7803ZM24.334 53.3701C24.334 52.0257 24.7077 51.0299 25.4551 50.3828C26.0794 49.8451 26.8405 49.5762 27.7383 49.5762C28.7363 49.5762 29.5521 49.9043 30.1855 50.5605C30.819 51.2122 31.1357 52.1146 31.1357 53.2676C31.1357 54.2018 30.9945 54.9378 30.7119 55.4756C30.4339 56.0088 30.026 56.4235 29.4883 56.7197C28.9551 57.016 28.3717 57.1641 27.7383 57.1641C26.722 57.1641 25.8994 56.8382 25.2705 56.1865C24.6462 55.5348 24.334 54.596 24.334 53.3701ZM25.5986 53.3701C25.5986 54.2998 25.8014 54.9971 26.207 55.4619C26.6126 55.9222 27.123 56.1523 27.7383 56.1523C28.349 56.1523 28.8571 55.9199 29.2627 55.4551C29.6683 54.9902 29.8711 54.2816 29.8711 53.3291C29.8711 52.4313 29.666 51.7523 29.2559 51.292C28.8503 50.8271 28.3444 50.5947 27.7383 50.5947C27.123 50.5947 26.6126 50.8249 26.207 51.2852C25.8014 51.7454 25.5986 52.4404 25.5986 53.3701ZM32.8789 57V50.6973H31.792V49.7402H32.8789V48.9678C32.8789 48.4801 32.9222 48.1178 33.0088 47.8809C33.1273 47.5618 33.3346 47.3044 33.6309 47.1084C33.9316 46.9079 34.3509 46.8076 34.8887 46.8076C35.235 46.8076 35.6178 46.8486 36.0371 46.9307L35.8525 48.0039C35.5973 47.9583 35.3558 47.9355 35.1279 47.9355C34.7542 47.9355 34.4899 48.0153 34.335 48.1748C34.18 48.3343 34.1025 48.6328 34.1025 49.0703V49.7402H35.5176V50.6973H34.1025V57H32.8789ZM36.4883 48.3936V46.9785H37.7188V48.3936H36.4883ZM36.4883 57V49.7402H37.7188V57H36.4883ZM44.3359 56.1045C43.8802 56.4919 43.4404 56.7653 43.0166 56.9248C42.5973 57.0843 42.1462 57.1641 41.6631 57.1641C40.8656 57.1641 40.2526 56.9704 39.8242 56.583C39.3958 56.1911 39.1816 55.6921 39.1816 55.0859C39.1816 54.7305 39.2614 54.4069 39.4209 54.1152C39.585 53.819 39.7969 53.582 40.0566 53.4043C40.321 53.2266 40.6172 53.0921 40.9453 53.001C41.1868 52.9372 41.5514 52.8757 42.0391 52.8164C43.0326 52.6979 43.764 52.5566 44.2334 52.3926C44.238 52.224 44.2402 52.1169 44.2402 52.0713C44.2402 51.57 44.124 51.2168 43.8916 51.0117C43.5771 50.7337 43.11 50.5947 42.4902 50.5947C41.9115 50.5947 41.4831 50.6973 41.2051 50.9023C40.9316 51.1029 40.7288 51.4606 40.5967 51.9756L39.3936 51.8115C39.5029 51.2965 39.6829 50.8818 39.9336 50.5674C40.1842 50.2484 40.5465 50.0046 41.0205 49.8359C41.4945 49.6628 42.0436 49.5762 42.668 49.5762C43.2878 49.5762 43.7913 49.6491 44.1787 49.7949C44.5661 49.9408 44.8509 50.1253 45.0332 50.3486C45.2155 50.5674 45.3431 50.8454 45.416 51.1826C45.457 51.3923 45.4775 51.7705 45.4775 52.3174V53.958C45.4775 55.1019 45.5026 55.8265 45.5527 56.1318C45.6074 56.4326 45.7122 56.722 45.8672 57H44.582C44.4544 56.7448 44.3724 56.4463 44.3359 56.1045ZM44.2334 53.3564C43.7868 53.5387 43.1169 53.6937 42.2236 53.8213C41.7178 53.8942 41.36 53.9762 41.1504 54.0674C40.9408 54.1585 40.779 54.293 40.665 54.4707C40.5511 54.6439 40.4941 54.8376 40.4941 55.0518C40.4941 55.3799 40.6172 55.6533 40.8633 55.8721C41.1139 56.0908 41.4785 56.2002 41.957 56.2002C42.431 56.2002 42.8525 56.0977 43.2217 55.8926C43.5908 55.6829 43.862 55.3981 44.0352 55.0381C44.1673 54.7601 44.2334 54.3499 44.2334 53.8076V53.3564Z" fill="#0460A9"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76219" x1="38.6224" y1="13.4621" x2="45.9203" y2="0.828461" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>  
        <span class="dotNav-radar">
          <a href="https://radarscreen.novartis.net/" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M24.3349 12.3359H18.1674C14.7626 12.3359 12 15.0954 12 18.502V30.8342C12 34.2408 14.7626 37.0003 18.1674 37.0003H30.4977C33.9025 37.0003 36.6652 34.2408 36.6652 30.8342V24.6681C36.6652 17.8549 31.1445 12.3359 24.3349 12.3359Z" fill="url(#paint0_linear_4897_76222)"/>
            <path d="M42.8372 12.3322C46.2408 12.3322 49 9.57153 49 6.16609C49 2.76065 46.2408 0 42.8372 0L42.8326 0C39.4289 0 36.6697 2.76065 36.6697 6.16609C36.6697 9.57153 39.4289 12.3322 42.8326 12.3322H42.8372Z" fill="#002068"/>
            <path d="M12.0039 30.8385V24.6724H12.0131C18.8135 24.6724 24.3342 30.196 24.3342 37H18.1667C14.7619 37 12.0039 34.2359 12.0039 30.8339V30.8385Z" fill="#FF585D"/>
            <path d="M12.5215 57V46.9785H16.9648C17.8581 46.9785 18.5371 47.0697 19.002 47.252C19.4668 47.4297 19.8382 47.7464 20.1162 48.2021C20.3942 48.6579 20.5332 49.1615 20.5332 49.7129C20.5332 50.4238 20.3031 51.0231 19.8428 51.5107C19.3825 51.9984 18.6715 52.3083 17.71 52.4404C18.0609 52.609 18.3275 52.7754 18.5098 52.9395C18.8971 53.2949 19.264 53.7393 19.6104 54.2725L21.3535 57H19.6855L18.3594 54.915C17.972 54.3135 17.653 53.8532 17.4023 53.5342C17.1517 53.2152 16.9261 52.9919 16.7256 52.8643C16.5296 52.7367 16.3291 52.6478 16.124 52.5977C15.9736 52.5658 15.7275 52.5498 15.3857 52.5498H13.8477V57H12.5215ZM13.8477 51.4014H16.6982C17.3044 51.4014 17.7783 51.3398 18.1201 51.2168C18.4619 51.0892 18.7217 50.8887 18.8994 50.6152C19.0771 50.3372 19.166 50.0365 19.166 49.7129C19.166 49.2389 18.9928 48.8493 18.6465 48.5439C18.3047 48.2386 17.7624 48.0859 17.0195 48.0859H13.8477V51.4014ZM27.1982 56.1045C26.7425 56.4919 26.3027 56.7653 25.8789 56.9248C25.4596 57.0843 25.0085 57.1641 24.5254 57.1641C23.7279 57.1641 23.1149 56.9704 22.6865 56.583C22.2581 56.1911 22.0439 55.6921 22.0439 55.0859C22.0439 54.7305 22.1237 54.4069 22.2832 54.1152C22.4473 53.819 22.6592 53.582 22.9189 53.4043C23.1833 53.2266 23.4795 53.0921 23.8076 53.001C24.0492 52.9372 24.4137 52.8757 24.9014 52.8164C25.8949 52.6979 26.6263 52.5566 27.0957 52.3926C27.1003 52.224 27.1025 52.1169 27.1025 52.0713C27.1025 51.57 26.9863 51.2168 26.7539 51.0117C26.4395 50.7337 25.9723 50.5947 25.3525 50.5947C24.7738 50.5947 24.3454 50.6973 24.0674 50.9023C23.7939 51.1029 23.5911 51.4606 23.459 51.9756L22.2559 51.8115C22.3652 51.2965 22.5452 50.8818 22.7959 50.5674C23.0465 50.2484 23.4089 50.0046 23.8828 49.8359C24.3568 49.6628 24.9059 49.5762 25.5303 49.5762C26.1501 49.5762 26.6536 49.6491 27.041 49.7949C27.4284 49.9408 27.7132 50.1253 27.8955 50.3486C28.0778 50.5674 28.2054 50.8454 28.2783 51.1826C28.3193 51.3923 28.3398 51.7705 28.3398 52.3174V53.958C28.3398 55.1019 28.3649 55.8265 28.415 56.1318C28.4697 56.4326 28.5745 56.722 28.7295 57H27.4443C27.3167 56.7448 27.2347 56.4463 27.1982 56.1045ZM27.0957 53.3564C26.6491 53.5387 25.9792 53.6937 25.0859 53.8213C24.5801 53.8942 24.2223 53.9762 24.0127 54.0674C23.8031 54.1585 23.6413 54.293 23.5273 54.4707C23.4134 54.6439 23.3564 54.8376 23.3564 55.0518C23.3564 55.3799 23.4795 55.6533 23.7256 55.8721C23.9762 56.0908 24.3408 56.2002 24.8193 56.2002C25.2933 56.2002 25.7148 56.0977 26.084 55.8926C26.4531 55.6829 26.7243 55.3981 26.8975 55.0381C27.0296 54.7601 27.0957 54.3499 27.0957 53.8076V53.3564ZM34.9639 57V56.084C34.5036 56.804 33.8268 57.1641 32.9336 57.1641C32.3548 57.1641 31.8216 57.0046 31.334 56.6855C30.8509 56.3665 30.4749 55.9222 30.2061 55.3525C29.9417 54.7783 29.8096 54.1198 29.8096 53.377C29.8096 52.6523 29.9303 51.9961 30.1719 51.4082C30.4134 50.8158 30.7757 50.3623 31.2588 50.0479C31.7419 49.7334 32.2819 49.5762 32.8789 49.5762C33.3164 49.5762 33.7061 49.6696 34.0479 49.8564C34.3896 50.0387 34.6676 50.278 34.8818 50.5742V46.9785H36.1055V57H34.9639ZM31.0742 53.377C31.0742 54.3066 31.2702 55.0016 31.6621 55.4619C32.054 55.9222 32.5166 56.1523 33.0498 56.1523C33.5876 56.1523 34.0433 55.9336 34.417 55.4961C34.7952 55.054 34.9844 54.3818 34.9844 53.4795C34.9844 52.486 34.793 51.7568 34.4102 51.292C34.0273 50.8271 33.5557 50.5947 32.9951 50.5947C32.4482 50.5947 31.9902 50.818 31.6211 51.2646C31.2565 51.7113 31.0742 52.4154 31.0742 53.377ZM42.7842 56.1045C42.3285 56.4919 41.8887 56.7653 41.4648 56.9248C41.0456 57.0843 40.5944 57.1641 40.1113 57.1641C39.3138 57.1641 38.7008 56.9704 38.2725 56.583C37.8441 56.1911 37.6299 55.6921 37.6299 55.0859C37.6299 54.7305 37.7096 54.4069 37.8691 54.1152C38.0332 53.819 38.2451 53.582 38.5049 53.4043C38.7692 53.2266 39.0654 53.0921 39.3936 53.001C39.6351 52.9372 39.9997 52.8757 40.4873 52.8164C41.4808 52.6979 42.2122 52.5566 42.6816 52.3926C42.6862 52.224 42.6885 52.1169 42.6885 52.0713C42.6885 51.57 42.5723 51.2168 42.3398 51.0117C42.0254 50.7337 41.5583 50.5947 40.9385 50.5947C40.3597 50.5947 39.9313 50.6973 39.6533 50.9023C39.3799 51.1029 39.1771 51.4606 39.0449 51.9756L37.8418 51.8115C37.9512 51.2965 38.1312 50.8818 38.3818 50.5674C38.6325 50.2484 38.9948 50.0046 39.4688 49.8359C39.9427 49.6628 40.4919 49.5762 41.1162 49.5762C41.736 49.5762 42.2396 49.6491 42.627 49.7949C43.0143 49.9408 43.2992 50.1253 43.4814 50.3486C43.6637 50.5674 43.7913 50.8454 43.8643 51.1826C43.9053 51.3923 43.9258 51.7705 43.9258 52.3174V53.958C43.9258 55.1019 43.9508 55.8265 44.001 56.1318C44.0557 56.4326 44.1605 56.722 44.3154 57H43.0303C42.9027 56.7448 42.8206 56.4463 42.7842 56.1045ZM42.6816 53.3564C42.235 53.5387 41.5651 53.6937 40.6719 53.8213C40.166 53.8942 39.8083 53.9762 39.5986 54.0674C39.389 54.1585 39.2272 54.293 39.1133 54.4707C38.9993 54.6439 38.9424 54.8376 38.9424 55.0518C38.9424 55.3799 39.0654 55.6533 39.3115 55.8721C39.5622 56.0908 39.9268 56.2002 40.4053 56.2002C40.8792 56.2002 41.3008 56.0977 41.6699 55.8926C42.0391 55.6829 42.3102 55.3981 42.4834 55.0381C42.6156 54.7601 42.6816 54.3499 42.6816 53.8076V53.3564ZM45.8262 57V49.7402H46.9336V50.8408C47.2161 50.3258 47.4759 49.9863 47.7129 49.8223C47.9544 49.6582 48.2188 49.5762 48.5059 49.5762C48.9206 49.5762 49.3421 49.7083 49.7705 49.9727L49.3467 51.1143C49.0459 50.9365 48.7451 50.8477 48.4443 50.8477C48.1755 50.8477 47.9339 50.9297 47.7197 51.0938C47.5055 51.2533 47.3529 51.4766 47.2617 51.7637C47.125 52.2012 47.0566 52.6797 47.0566 53.1992V57H45.8262Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76222" x1="17.0448" y1="37.31" x2="30.513" y2="13.9923" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>
        <span class="dotNav-costInsight">
          <a href="https://testnovartis.eu10.sapanalytics.cloud/sap/fpa/ui/app.html#/analyticapp&/aa/9E48A6079A04B51F119A9098225AE966/?mode=present" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M24.3359 24.6586V12.3281H12.004V24.6586H24.3359Z" fill="#002068"/>
            <path d="M24.332 0H30.5003C33.901 0 36.664 2.76372 36.664 6.16522C36.664 9.56672 33.901 12.3304 30.5003 12.3304H24.332V0Z" fill="#002068"/>
            <path d="M36.664 24.6641H24.332V36.9945H36.664V24.6641Z" fill="#002068"/>
            <path d="M36.6648 18.5012V24.6664H48.9967V18.5012C48.9967 15.095 46.2337 12.3359 42.8284 12.3359C39.4232 12.3359 36.6602 15.095 36.6602 18.5012H36.6648Z" fill="url(#paint0_linear_4897_76230)"/>
            <path d="M36.6641 24.6641H48.996V30.8293C48.996 34.2354 46.233 36.9945 42.8324 36.9945H36.6641V24.6641Z" fill="#FF585D"/>
            <path d="M12 24.6641H24.332V36.9945H18.1637C14.7584 36.9945 12 34.2308 12 30.8293V24.6641Z" fill="#002068"/>
            <path d="M18.1637 0H24.332V12.3304H12V6.16522C12 2.76372 14.763 0 18.1637 0Z" fill="#002068"/>
            <path d="M24.332 18.5V24.6652H30.5003C27.0951 24.6652 24.332 21.9061 24.332 18.5Z" fill="#002068"/>
            <path d="M30.5003 12.3359H24.332V18.5012C24.332 15.095 27.0951 12.3359 30.5003 12.3359Z" fill="#002068"/>
            <path d="M30.5 37.0012H36.6683V30.8359C36.6683 34.2421 33.9053 37.0012 30.5 37.0012Z" fill="#002068"/>
            <path d="M49.0006 6.16522C49.0006 2.7591 46.2376 0 42.8324 0C39.4271 0 36.6641 2.7591 36.6641 6.16522C36.6641 9.57134 39.4271 12.3304 42.8324 12.3304C46.2376 12.3304 49.0006 9.57134 49.0006 6.16522Z" fill="#FF585D"/>
            <path d="M22.3789 53.4863L23.7051 53.8213C23.4271 54.9105 22.9258 55.7422 22.2012 56.3164C21.4811 56.8861 20.5993 57.1709 19.5557 57.1709C18.4756 57.1709 17.596 56.9521 16.917 56.5146C16.2425 56.0726 15.7275 55.4346 15.3721 54.6006C15.0212 53.7666 14.8457 52.8711 14.8457 51.9141C14.8457 50.8704 15.0439 49.9613 15.4404 49.1865C15.8415 48.4072 16.4089 47.8171 17.1426 47.416C17.8809 47.0104 18.6921 46.8076 19.5762 46.8076C20.5788 46.8076 21.4219 47.0628 22.1055 47.5732C22.7891 48.0837 23.2653 48.8014 23.5342 49.7266L22.2285 50.0342C21.9961 49.305 21.6589 48.7741 21.2168 48.4414C20.7747 48.1087 20.2188 47.9424 19.5488 47.9424C18.7786 47.9424 18.1338 48.127 17.6143 48.4961C17.0993 48.8652 16.737 49.362 16.5273 49.9863C16.3177 50.6061 16.2129 51.2464 16.2129 51.9072C16.2129 52.7594 16.3359 53.5046 16.582 54.1426C16.8327 54.776 17.2201 55.25 17.7441 55.5645C18.2682 55.8789 18.8356 56.0361 19.4463 56.0361C20.1891 56.0361 20.818 55.8219 21.333 55.3936C21.848 54.9652 22.1966 54.3294 22.3789 53.4863ZM24.7305 53.3701C24.7305 52.0257 25.1042 51.0299 25.8516 50.3828C26.4759 49.8451 27.237 49.5762 28.1348 49.5762C29.1328 49.5762 29.9486 49.9043 30.582 50.5605C31.2155 51.2122 31.5322 52.1146 31.5322 53.2676C31.5322 54.2018 31.391 54.9378 31.1084 55.4756C30.8304 56.0088 30.4225 56.4235 29.8848 56.7197C29.3516 57.016 28.7682 57.1641 28.1348 57.1641C27.1185 57.1641 26.2959 56.8382 25.667 56.1865C25.0426 55.5348 24.7305 54.596 24.7305 53.3701ZM25.9951 53.3701C25.9951 54.2998 26.1979 54.9971 26.6035 55.4619C27.0091 55.9222 27.5195 56.1523 28.1348 56.1523C28.7454 56.1523 29.2536 55.9199 29.6592 55.4551C30.0648 54.9902 30.2676 54.2816 30.2676 53.3291C30.2676 52.4313 30.0625 51.7523 29.6523 51.292C29.2467 50.8271 28.7409 50.5947 28.1348 50.5947C27.5195 50.5947 27.0091 50.8249 26.6035 51.2852C26.1979 51.7454 25.9951 52.4404 25.9951 53.3701ZM32.4893 54.833L33.7061 54.6416C33.7744 55.1292 33.9635 55.5029 34.2734 55.7627C34.5879 56.0225 35.0254 56.1523 35.5859 56.1523C36.151 56.1523 36.5703 56.0384 36.8438 55.8105C37.1172 55.5781 37.2539 55.307 37.2539 54.9971C37.2539 54.7191 37.1331 54.5003 36.8916 54.3408C36.723 54.2314 36.3037 54.0924 35.6338 53.9238C34.7314 53.696 34.1048 53.5 33.7539 53.3359C33.4076 53.1673 33.1432 52.9372 32.9609 52.6455C32.7832 52.3493 32.6943 52.0234 32.6943 51.668C32.6943 51.3444 32.7673 51.0459 32.9131 50.7725C33.0635 50.4945 33.2663 50.2643 33.5215 50.082C33.7129 49.9408 33.9727 49.8223 34.3008 49.7266C34.6335 49.6263 34.9889 49.5762 35.3672 49.5762C35.9368 49.5762 36.4359 49.6582 36.8643 49.8223C37.2972 49.9863 37.6162 50.2096 37.8213 50.4922C38.0264 50.7702 38.1676 51.1439 38.2451 51.6133L37.042 51.7773C36.9873 51.4036 36.8278 51.112 36.5635 50.9023C36.3037 50.6927 35.9346 50.5879 35.4561 50.5879C34.891 50.5879 34.4876 50.6813 34.2461 50.8682C34.0046 51.055 33.8838 51.2738 33.8838 51.5244C33.8838 51.6839 33.9339 51.8275 34.0342 51.9551C34.1344 52.0872 34.2917 52.1966 34.5059 52.2832C34.6289 52.3288 34.9912 52.4336 35.5928 52.5977C36.4632 52.8301 37.0693 53.0215 37.4111 53.1719C37.7575 53.3177 38.0286 53.5319 38.2246 53.8145C38.4206 54.097 38.5186 54.4479 38.5186 54.8672C38.5186 55.2773 38.3978 55.6647 38.1562 56.0293C37.9193 56.3893 37.5752 56.6696 37.124 56.8701C36.6729 57.0661 36.1624 57.1641 35.5928 57.1641C34.6494 57.1641 33.9294 56.9681 33.4326 56.5762C32.9404 56.1842 32.626 55.6032 32.4893 54.833ZM42.668 55.8994L42.8457 56.9863C42.4993 57.0592 42.1895 57.0957 41.916 57.0957C41.4694 57.0957 41.123 57.0251 40.877 56.8838C40.6309 56.7425 40.4577 56.5579 40.3574 56.3301C40.2572 56.0977 40.207 55.6123 40.207 54.874V50.6973H39.3047V49.7402H40.207V47.9424L41.4307 47.2041V49.7402H42.668V50.6973H41.4307V54.9424C41.4307 55.2933 41.4512 55.5189 41.4922 55.6191C41.5378 55.7194 41.6084 55.7992 41.7041 55.8584C41.8044 55.9176 41.9456 55.9473 42.1279 55.9473C42.2646 55.9473 42.4447 55.9313 42.668 55.8994ZM7.66113 75V64.9785H8.9873V75H7.66113ZM11.1748 75V67.7402H12.2822V68.7725C12.8154 67.9749 13.5856 67.5762 14.5928 67.5762C15.0303 67.5762 15.4313 67.6559 15.7959 67.8154C16.165 67.9704 16.4408 68.1755 16.623 68.4307C16.8053 68.6859 16.9329 68.9889 17.0059 69.3398C17.0514 69.5677 17.0742 69.9665 17.0742 70.5361V75H15.8438V70.584C15.8438 70.0827 15.7959 69.709 15.7002 69.4629C15.6045 69.2122 15.4336 69.014 15.1875 68.8682C14.946 68.7178 14.6611 68.6426 14.333 68.6426C13.8089 68.6426 13.3555 68.8089 12.9727 69.1416C12.5944 69.4743 12.4053 70.1055 12.4053 71.0352V75H11.1748ZM18.4756 72.833L19.6924 72.6416C19.7607 73.1292 19.9499 73.5029 20.2598 73.7627C20.5742 74.0225 21.0117 74.1523 21.5723 74.1523C22.1374 74.1523 22.5566 74.0384 22.8301 73.8105C23.1035 73.5781 23.2402 73.307 23.2402 72.9971C23.2402 72.7191 23.1195 72.5003 22.8779 72.3408C22.7093 72.2314 22.29 72.0924 21.6201 71.9238C20.7178 71.696 20.0911 71.5 19.7402 71.3359C19.3939 71.1673 19.1296 70.9372 18.9473 70.6455C18.7695 70.3493 18.6807 70.0234 18.6807 69.668C18.6807 69.3444 18.7536 69.0459 18.8994 68.7725C19.0498 68.4945 19.2526 68.2643 19.5078 68.082C19.6992 67.9408 19.959 67.8223 20.2871 67.7266C20.6198 67.6263 20.9753 67.5762 21.3535 67.5762C21.9232 67.5762 22.4222 67.6582 22.8506 67.8223C23.2835 67.9863 23.6025 68.2096 23.8076 68.4922C24.0127 68.7702 24.154 69.1439 24.2314 69.6133L23.0283 69.7773C22.9736 69.4036 22.8141 69.112 22.5498 68.9023C22.29 68.6927 21.9209 68.5879 21.4424 68.5879C20.8773 68.5879 20.474 68.6813 20.2324 68.8682C19.9909 69.055 19.8701 69.2738 19.8701 69.5244C19.8701 69.6839 19.9202 69.8275 20.0205 69.9551C20.1208 70.0872 20.278 70.1966 20.4922 70.2832C20.6152 70.3288 20.9775 70.4336 21.5791 70.5977C22.4495 70.8301 23.0557 71.0215 23.3975 71.1719C23.7438 71.3177 24.015 71.5319 24.2109 71.8145C24.4069 72.097 24.5049 72.4479 24.5049 72.8672C24.5049 73.2773 24.3841 73.6647 24.1426 74.0293C23.9056 74.3893 23.5615 74.6696 23.1104 74.8701C22.6592 75.0661 22.1488 75.1641 21.5791 75.1641C20.6357 75.1641 19.9157 74.9681 19.4189 74.5762C18.9268 74.1842 18.6123 73.6032 18.4756 72.833ZM25.9746 66.3936V64.9785H27.2051V66.3936H25.9746ZM25.9746 75V67.7402H27.2051V75H25.9746ZM28.8594 75.6016L30.0557 75.7793C30.1058 76.1484 30.2448 76.4173 30.4727 76.5859C30.778 76.8138 31.195 76.9277 31.7236 76.9277C32.2933 76.9277 32.7331 76.8138 33.043 76.5859C33.3529 76.3581 33.5625 76.0391 33.6719 75.6289C33.7357 75.3783 33.7653 74.8519 33.7607 74.0498C33.223 74.6833 32.5531 75 31.751 75C30.7529 75 29.9805 74.64 29.4336 73.9199C28.8867 73.1999 28.6133 72.3363 28.6133 71.3291C28.6133 70.6364 28.7386 69.9984 28.9893 69.415C29.2399 68.8271 29.6022 68.3737 30.0762 68.0547C30.5547 67.7357 31.1152 67.5762 31.7578 67.5762C32.6146 67.5762 33.321 67.9225 33.877 68.6152V67.7402H35.0117V74.0156C35.0117 75.1458 34.8955 75.9456 34.6631 76.415C34.4352 76.889 34.0706 77.2627 33.5693 77.5361C33.0726 77.8096 32.4596 77.9463 31.7305 77.9463C30.8646 77.9463 30.165 77.7503 29.6318 77.3584C29.0986 76.971 28.8411 76.3854 28.8594 75.6016ZM29.8779 71.2402C29.8779 72.1927 30.0671 72.8877 30.4453 73.3252C30.8236 73.7627 31.2975 73.9814 31.8672 73.9814C32.4323 73.9814 32.9062 73.765 33.2891 73.332C33.6719 72.8945 33.8633 72.2109 33.8633 71.2812C33.8633 70.3926 33.665 69.7227 33.2686 69.2715C32.8766 68.8203 32.4027 68.5947 31.8467 68.5947C31.2998 68.5947 30.835 68.818 30.4521 69.2646C30.0693 69.7067 29.8779 70.3652 29.8779 71.2402ZM36.8779 75V64.9785H38.1084V68.5742C38.6826 67.9089 39.4072 67.5762 40.2822 67.5762C40.82 67.5762 41.2871 67.6833 41.6836 67.8975C42.0801 68.1071 42.3626 68.3988 42.5312 68.7725C42.7044 69.1462 42.791 69.6885 42.791 70.3994V75H41.5605V70.3994C41.5605 69.7842 41.4261 69.3376 41.1572 69.0596C40.8929 68.777 40.5169 68.6357 40.0293 68.6357C39.6647 68.6357 39.3206 68.7314 38.9971 68.9229C38.6781 69.1097 38.4502 69.3649 38.3135 69.6885C38.1768 70.012 38.1084 70.4587 38.1084 71.0283V75H36.8779ZM47.3574 73.8994L47.5352 74.9863C47.1888 75.0592 46.8789 75.0957 46.6055 75.0957C46.1589 75.0957 45.8125 75.0251 45.5664 74.8838C45.3203 74.7425 45.1471 74.5579 45.0469 74.3301C44.9466 74.0977 44.8965 73.6123 44.8965 72.874V68.6973H43.9941V67.7402H44.8965V65.9424L46.1201 65.2041V67.7402H47.3574V68.6973H46.1201V72.9424C46.1201 73.2933 46.1406 73.5189 46.1816 73.6191C46.2272 73.7194 46.2979 73.7992 46.3936 73.8584C46.4938 73.9176 46.6351 73.9473 46.8174 73.9473C46.9541 73.9473 47.1341 73.9313 47.3574 73.8994ZM48.0752 72.833L49.292 72.6416C49.3604 73.1292 49.5495 73.5029 49.8594 73.7627C50.1738 74.0225 50.6113 74.1523 51.1719 74.1523C51.737 74.1523 52.1562 74.0384 52.4297 73.8105C52.7031 73.5781 52.8398 73.307 52.8398 72.9971C52.8398 72.7191 52.7191 72.5003 52.4775 72.3408C52.3089 72.2314 51.8896 72.0924 51.2197 71.9238C50.3174 71.696 49.6908 71.5 49.3398 71.3359C48.9935 71.1673 48.7292 70.9372 48.5469 70.6455C48.3691 70.3493 48.2803 70.0234 48.2803 69.668C48.2803 69.3444 48.3532 69.0459 48.499 68.7725C48.6494 68.4945 48.8522 68.2643 49.1074 68.082C49.2988 67.9408 49.5586 67.8223 49.8867 67.7266C50.2194 67.6263 50.5749 67.5762 50.9531 67.5762C51.5228 67.5762 52.0218 67.6582 52.4502 67.8223C52.8831 67.9863 53.2021 68.2096 53.4072 68.4922C53.6123 68.7702 53.7536 69.1439 53.8311 69.6133L52.6279 69.7773C52.5732 69.4036 52.4137 69.112 52.1494 68.9023C51.8896 68.6927 51.5205 68.5879 51.042 68.5879C50.4769 68.5879 50.0736 68.6813 49.832 68.8682C49.5905 69.055 49.4697 69.2738 49.4697 69.5244C49.4697 69.6839 49.5199 69.8275 49.6201 69.9551C49.7204 70.0872 49.8776 70.1966 50.0918 70.2832C50.2148 70.3288 50.5771 70.4336 51.1787 70.5977C52.0492 70.8301 52.6553 71.0215 52.9971 71.1719C53.3434 71.3177 53.6146 71.5319 53.8105 71.8145C54.0065 72.097 54.1045 72.4479 54.1045 72.8672C54.1045 73.2773 53.9837 73.6647 53.7422 74.0293C53.5052 74.3893 53.1611 74.6696 52.71 74.8701C52.2588 75.0661 51.7484 75.1641 51.1787 75.1641C50.2354 75.1641 49.5153 74.9681 49.0186 74.5762C48.5264 74.1842 48.2119 73.6032 48.0752 72.833Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76230" x1="39.5988" y1="26.3625" x2="46.8972" y2="13.724" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>
        <span class="dotNav-dost">
          <a href="https://share.novartis.net/sites/BPABI" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M42.8317 24.6641H30.5001C27.095 24.6641 24.332 27.4236 24.332 30.8302C24.332 34.2368 27.095 36.9963 30.5001 36.9963H42.8317C46.2369 36.9963 48.9998 34.2368 48.9998 30.8302C48.9998 27.4236 46.2369 24.6641 42.8317 24.6641Z" fill="#002068"/>
            <path d="M30.4997 0H18.1681C14.7629 0 12 2.7595 12 6.16611C12 9.57273 14.7629 12.3322 18.1681 12.3322H30.4997C33.9048 12.3322 36.6678 9.57273 36.6678 6.16611C36.6678 2.7595 33.9048 0 30.4997 0Z" fill="url(#paint0_linear_4897_76231)"/>
            <path d="M17.1768 57V46.9785H20.6289C21.4082 46.9785 22.0029 47.0264 22.4131 47.1221C22.9873 47.2542 23.4772 47.4935 23.8828 47.8398C24.4115 48.2865 24.8057 48.8584 25.0654 49.5557C25.3298 50.2484 25.4619 51.0413 25.4619 51.9346C25.4619 52.6956 25.373 53.3701 25.1953 53.958C25.0176 54.5459 24.7897 55.0335 24.5117 55.4209C24.2337 55.8037 23.9284 56.1068 23.5957 56.3301C23.2676 56.5488 22.8688 56.7152 22.3994 56.8291C21.9346 56.943 21.3991 57 20.793 57H17.1768ZM18.5029 55.8174H20.6426C21.3034 55.8174 21.8206 55.7559 22.1943 55.6328C22.5726 55.5098 22.8734 55.3366 23.0967 55.1133C23.4111 54.7988 23.6549 54.3773 23.8281 53.8486C24.0059 53.3154 24.0947 52.6706 24.0947 51.9141C24.0947 50.8659 23.9215 50.0615 23.5752 49.501C23.2334 48.9359 22.8164 48.5576 22.3242 48.3662C21.9688 48.2295 21.3968 48.1611 20.6084 48.1611H18.5029V55.8174ZM26.6787 53.3701C26.6787 52.0257 27.0524 51.0299 27.7998 50.3828C28.4242 49.8451 29.1852 49.5762 30.083 49.5762C31.0811 49.5762 31.8968 49.9043 32.5303 50.5605C33.1637 51.2122 33.4805 52.1146 33.4805 53.2676C33.4805 54.2018 33.3392 54.9378 33.0566 55.4756C32.7786 56.0088 32.3708 56.4235 31.833 56.7197C31.2998 57.016 30.7165 57.1641 30.083 57.1641C29.0667 57.1641 28.2441 56.8382 27.6152 56.1865C26.9909 55.5348 26.6787 54.596 26.6787 53.3701ZM27.9434 53.3701C27.9434 54.2998 28.1462 54.9971 28.5518 55.4619C28.9574 55.9222 29.4678 56.1523 30.083 56.1523C30.6937 56.1523 31.2018 55.9199 31.6074 55.4551C32.013 54.9902 32.2158 54.2816 32.2158 53.3291C32.2158 52.4313 32.0107 51.7523 31.6006 51.292C31.195 50.8271 30.6891 50.5947 30.083 50.5947C29.4678 50.5947 28.9574 50.8249 28.5518 51.2852C28.1462 51.7454 27.9434 52.4404 27.9434 53.3701ZM34.4375 54.833L35.6543 54.6416C35.7227 55.1292 35.9118 55.5029 36.2217 55.7627C36.5361 56.0225 36.9736 56.1523 37.5342 56.1523C38.0993 56.1523 38.5186 56.0384 38.792 55.8105C39.0654 55.5781 39.2021 55.307 39.2021 54.9971C39.2021 54.7191 39.0814 54.5003 38.8398 54.3408C38.6712 54.2314 38.252 54.0924 37.582 53.9238C36.6797 53.696 36.0531 53.5 35.7021 53.3359C35.3558 53.1673 35.0915 52.9372 34.9092 52.6455C34.7314 52.3493 34.6426 52.0234 34.6426 51.668C34.6426 51.3444 34.7155 51.0459 34.8613 50.7725C35.0117 50.4945 35.2145 50.2643 35.4697 50.082C35.6611 49.9408 35.9209 49.8223 36.249 49.7266C36.5817 49.6263 36.9372 49.5762 37.3154 49.5762C37.8851 49.5762 38.3841 49.6582 38.8125 49.8223C39.2454 49.9863 39.5645 50.2096 39.7695 50.4922C39.9746 50.7702 40.1159 51.1439 40.1934 51.6133L38.9902 51.7773C38.9355 51.4036 38.776 51.112 38.5117 50.9023C38.252 50.6927 37.8828 50.5879 37.4043 50.5879C36.8392 50.5879 36.4359 50.6813 36.1943 50.8682C35.9528 51.055 35.832 51.2738 35.832 51.5244C35.832 51.6839 35.8822 51.8275 35.9824 51.9551C36.0827 52.0872 36.2399 52.1966 36.4541 52.2832C36.5771 52.3288 36.9395 52.4336 37.541 52.5977C38.4115 52.8301 39.0176 53.0215 39.3594 53.1719C39.7057 53.3177 39.9769 53.5319 40.1729 53.8145C40.3688 54.097 40.4668 54.4479 40.4668 54.8672C40.4668 55.2773 40.346 55.6647 40.1045 56.0293C39.8675 56.3893 39.5234 56.6696 39.0723 56.8701C38.6211 57.0661 38.1107 57.1641 37.541 57.1641C36.5977 57.1641 35.8776 56.9681 35.3809 56.5762C34.8887 56.1842 34.5742 55.6032 34.4375 54.833ZM44.6162 55.8994L44.7939 56.9863C44.4476 57.0592 44.1377 57.0957 43.8643 57.0957C43.4176 57.0957 43.0713 57.0251 42.8252 56.8838C42.5791 56.7425 42.4059 56.5579 42.3057 56.3301C42.2054 56.0977 42.1553 55.6123 42.1553 54.874V50.6973H41.2529V49.7402H42.1553V47.9424L43.3789 47.2041V49.7402H44.6162V50.6973H43.3789V54.9424C43.3789 55.2933 43.3994 55.5189 43.4404 55.6191C43.486 55.7194 43.5566 55.7992 43.6523 55.8584C43.7526 55.9176 43.8939 55.9473 44.0762 55.9473C44.2129 55.9473 44.3929 55.9313 44.6162 55.8994Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76231" x1="19.7067" y1="14.1811" x2="28.9624" y2="-1.84086" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>
        <span class="dotNav-digFin">
          <a href="https://go/digfin" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M42.8326 0H18.1674C14.7626 0 12 2.7595 12 6.16611V18.4983C12 21.905 14.7626 24.6645 18.1674 24.6645H42.8326C46.2374 24.6645 49 21.905 49 18.4983V6.16611C49 2.7595 46.2374 0 42.8326 0Z" fill="url(#paint0_linear_4897_76232)"/>
            <path d="M42.8326 12.3359H18.1674C14.7626 12.3359 12 15.0954 12 18.5021V30.8343C12 34.2409 14.7626 37.0004 18.1674 37.0004H42.8326C46.2374 37.0004 49 34.2409 49 30.8343V18.5021C49 15.0954 46.2374 12.3359 42.8326 12.3359Z" fill="#FF585D"/>
            <path d="M42.8326 24.6641H18.1674C14.7626 24.6641 12 27.4236 12 30.8302V36.9963H48.9954V30.8302C48.9954 27.4236 46.2327 24.6641 42.8279 24.6641H42.8326Z" fill="#002068"/>
            <path d="M9.00098 57V46.9785H12.4531C13.2324 46.9785 13.8271 47.0264 14.2373 47.1221C14.8115 47.2542 15.3014 47.4935 15.707 47.8398C16.2357 48.2865 16.6299 48.8584 16.8896 49.5557C17.154 50.2484 17.2861 51.0413 17.2861 51.9346C17.2861 52.6956 17.1973 53.3701 17.0195 53.958C16.8418 54.5459 16.6139 55.0335 16.3359 55.4209C16.0579 55.8037 15.7526 56.1068 15.4199 56.3301C15.0918 56.5488 14.693 56.7152 14.2236 56.8291C13.7588 56.943 13.2233 57 12.6172 57H9.00098ZM10.3271 55.8174H12.4668C13.1276 55.8174 13.6449 55.7559 14.0186 55.6328C14.3968 55.5098 14.6976 55.3366 14.9209 55.1133C15.2354 54.7988 15.4792 54.3773 15.6523 53.8486C15.8301 53.3154 15.9189 52.6706 15.9189 51.9141C15.9189 50.8659 15.7458 50.0615 15.3994 49.501C15.0576 48.9359 14.6406 48.5576 14.1484 48.3662C13.793 48.2295 13.221 48.1611 12.4326 48.1611H10.3271V55.8174ZM18.9678 48.3936V46.9785H20.1982V48.3936H18.9678ZM18.9678 57V49.7402H20.1982V57H18.9678ZM21.8525 57.6016L23.0488 57.7793C23.099 58.1484 23.238 58.4173 23.4658 58.5859C23.7712 58.8138 24.1882 58.9277 24.7168 58.9277C25.2865 58.9277 25.7262 58.8138 26.0361 58.5859C26.346 58.3581 26.5557 58.0391 26.665 57.6289C26.7288 57.3783 26.7585 56.8519 26.7539 56.0498C26.2161 56.6833 25.5462 57 24.7441 57C23.7461 57 22.9736 56.64 22.4268 55.9199C21.8799 55.1999 21.6064 54.3363 21.6064 53.3291C21.6064 52.6364 21.7318 51.9984 21.9824 51.415C22.2331 50.8271 22.5954 50.3737 23.0693 50.0547C23.5479 49.7357 24.1084 49.5762 24.751 49.5762C25.6077 49.5762 26.3141 49.9225 26.8701 50.6152V49.7402H28.0049V56.0156C28.0049 57.1458 27.8887 57.9456 27.6562 58.415C27.4284 58.889 27.0638 59.2627 26.5625 59.5361C26.0658 59.8096 25.4528 59.9463 24.7236 59.9463C23.8577 59.9463 23.1582 59.7503 22.625 59.3584C22.0918 58.971 21.8343 58.3854 21.8525 57.6016ZM22.8711 53.2402C22.8711 54.1927 23.0602 54.8877 23.4385 55.3252C23.8167 55.7627 24.2907 55.9814 24.8604 55.9814C25.4255 55.9814 25.8994 55.765 26.2822 55.332C26.665 54.8945 26.8564 54.2109 26.8564 53.2812C26.8564 52.3926 26.6582 51.7227 26.2617 51.2715C25.8698 50.8203 25.3958 50.5947 24.8398 50.5947C24.293 50.5947 23.8281 50.818 23.4453 51.2646C23.0625 51.7067 22.8711 52.3652 22.8711 53.2402ZM29.3926 53.9922V52.7549H33.1729V53.9922H29.3926ZM34.7588 57V46.9785H41.5195V48.1611H36.085V51.2646H40.7881V52.4473H36.085V57H34.7588ZM43.0986 48.3936V46.9785H44.3291V48.3936H43.0986ZM43.0986 57V49.7402H44.3291V57H43.0986ZM46.209 57V49.7402H47.3164V50.7725C47.8496 49.9749 48.6198 49.5762 49.627 49.5762C50.0645 49.5762 50.4655 49.6559 50.8301 49.8154C51.1992 49.9704 51.4749 50.1755 51.6572 50.4307C51.8395 50.6859 51.9671 50.9889 52.04 51.3398C52.0856 51.5677 52.1084 51.9665 52.1084 52.5361V57H50.8779V52.584C50.8779 52.0827 50.8301 51.709 50.7344 51.4629C50.6387 51.2122 50.4678 51.014 50.2217 50.8682C49.9801 50.7178 49.6953 50.6426 49.3672 50.6426C48.8431 50.6426 48.3896 50.8089 48.0068 51.1416C47.6286 51.4743 47.4395 52.1055 47.4395 53.0352V57H46.209Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76232" x1="21.6692" y1="27.6458" x2="39.3495" y2="-2.96856" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>
        <span class="dotNav-ideas">
          <a href="https://novartis.imaginatik.com/novartisidc9.nsf/idcintroVisual?openform" target="_Blank">
            <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="80" transform="translate(0.5)" fill="white"/>
            <path d="M30.5012 37.3322C33.9049 37.3322 36.6641 34.5715 36.6641 31.1661C36.6641 27.7607 33.9049 25 30.5012 25H30.4966C27.093 25 24.3338 27.7607 24.3338 31.1661C24.3338 34.5715 27.093 37.3322 30.4966 37.3322H30.5012Z" fill="#002068"/>
            <path d="M36.6641 6.16438L36.6641 18.496C36.6641 21.9011 33.9046 24.6641 30.4979 24.6641C27.0913 24.6641 24.3318 21.9011 24.3318 18.496L24.3318 6.16438C24.3318 2.75922 27.0913 -0.00371349 30.4979 -0.00371353C33.9046 -0.00371357 36.6641 2.75922 36.6641 6.16438Z" fill="url(#paint0_linear_4897_76245)"/>
            <path d="M14.668 57.3359V47.3145H15.9941V57.3359H14.668ZM22.8916 57.3359V56.4199C22.4313 57.14 21.7546 57.5 20.8613 57.5C20.2826 57.5 19.7493 57.3405 19.2617 57.0215C18.7786 56.7025 18.4027 56.2581 18.1338 55.6885C17.8695 55.1143 17.7373 54.4557 17.7373 53.7129C17.7373 52.9883 17.8581 52.332 18.0996 51.7441C18.3411 51.1517 18.7035 50.6982 19.1865 50.3838C19.6696 50.0693 20.2096 49.9121 20.8066 49.9121C21.2441 49.9121 21.6338 50.0055 21.9756 50.1924C22.3174 50.3747 22.5954 50.6139 22.8096 50.9102V47.3145H24.0332V57.3359H22.8916ZM19.002 53.7129C19.002 54.6426 19.1979 55.3376 19.5898 55.7979C19.9818 56.2581 20.4443 56.4883 20.9775 56.4883C21.5153 56.4883 21.971 56.2695 22.3447 55.832C22.723 55.39 22.9121 54.7178 22.9121 53.8154C22.9121 52.8219 22.7207 52.0928 22.3379 51.6279C21.9551 51.1631 21.4834 50.9307 20.9229 50.9307C20.376 50.9307 19.918 51.154 19.5488 51.6006C19.1842 52.0472 19.002 52.7513 19.002 53.7129ZM30.9443 54.998L32.2158 55.1553C32.0153 55.8981 31.6439 56.4746 31.1016 56.8848C30.5592 57.2949 29.8665 57.5 29.0234 57.5C27.9616 57.5 27.1185 57.1742 26.4941 56.5225C25.8743 55.8662 25.5645 54.9479 25.5645 53.7676C25.5645 52.5462 25.8789 51.5983 26.5078 50.9238C27.1367 50.2493 27.9525 49.9121 28.9551 49.9121C29.9258 49.9121 30.7188 50.2425 31.334 50.9033C31.9492 51.5641 32.2568 52.4938 32.2568 53.6924C32.2568 53.7653 32.2546 53.8747 32.25 54.0205H26.8359C26.8815 54.818 27.1071 55.4287 27.5127 55.8525C27.9183 56.2764 28.4242 56.4883 29.0303 56.4883C29.4814 56.4883 29.8665 56.3698 30.1855 56.1328C30.5046 55.8958 30.7575 55.5176 30.9443 54.998ZM26.9043 53.0088H30.958C30.9033 52.3981 30.7484 51.9401 30.4932 51.6348C30.1012 51.1608 29.5931 50.9238 28.9688 50.9238C28.4036 50.9238 27.9274 51.113 27.54 51.4912C27.1572 51.8695 26.9453 52.3753 26.9043 53.0088ZM38.5049 56.4404C38.0492 56.8278 37.6094 57.1012 37.1855 57.2607C36.7663 57.4202 36.3151 57.5 35.832 57.5C35.0345 57.5 34.4215 57.3063 33.9932 56.9189C33.5648 56.527 33.3506 56.028 33.3506 55.4219C33.3506 55.0664 33.4303 54.7428 33.5898 54.4512C33.7539 54.1549 33.9658 53.918 34.2256 53.7402C34.4899 53.5625 34.7861 53.4281 35.1143 53.3369C35.3558 53.2731 35.7204 53.2116 36.208 53.1523C37.2015 53.0339 37.9329 52.8926 38.4023 52.7285C38.4069 52.5599 38.4092 52.4528 38.4092 52.4072C38.4092 51.9059 38.293 51.5527 38.0605 51.3477C37.7461 51.0697 37.279 50.9307 36.6592 50.9307C36.0804 50.9307 35.652 51.0332 35.374 51.2383C35.1006 51.4388 34.8978 51.7965 34.7656 52.3115L33.5625 52.1475C33.6719 51.6325 33.8519 51.2178 34.1025 50.9033C34.3532 50.5843 34.7155 50.3405 35.1895 50.1719C35.6634 49.9987 36.2126 49.9121 36.8369 49.9121C37.4567 49.9121 37.9603 49.985 38.3477 50.1309C38.735 50.2767 39.0199 50.4613 39.2021 50.6846C39.3844 50.9033 39.512 51.1813 39.585 51.5186C39.626 51.7282 39.6465 52.1064 39.6465 52.6533V54.2939C39.6465 55.4378 39.6715 56.1624 39.7217 56.4678C39.7764 56.7686 39.8812 57.0579 40.0361 57.3359H38.751C38.6234 57.0807 38.5413 56.7822 38.5049 56.4404ZM38.4023 53.6924C37.9557 53.8747 37.2858 54.0296 36.3926 54.1572C35.8867 54.2301 35.529 54.3122 35.3193 54.4033C35.1097 54.4945 34.9479 54.6289 34.834 54.8066C34.7201 54.9798 34.6631 55.1735 34.6631 55.3877C34.6631 55.7158 34.7861 55.9893 35.0322 56.208C35.2829 56.4268 35.6475 56.5361 36.126 56.5361C36.5999 56.5361 37.0215 56.4336 37.3906 56.2285C37.7598 56.0189 38.0309 55.734 38.2041 55.374C38.3363 55.096 38.4023 54.6859 38.4023 54.1436V53.6924ZM41.0684 55.1689L42.2852 54.9775C42.3535 55.4652 42.5426 55.8389 42.8525 56.0986C43.167 56.3584 43.6045 56.4883 44.165 56.4883C44.7301 56.4883 45.1494 56.3743 45.4229 56.1465C45.6963 55.9141 45.833 55.6429 45.833 55.333C45.833 55.055 45.7122 54.8363 45.4707 54.6768C45.3021 54.5674 44.8828 54.4284 44.2129 54.2598C43.3105 54.0319 42.6839 53.8359 42.333 53.6719C41.9867 53.5033 41.7223 53.2731 41.54 52.9814C41.3623 52.6852 41.2734 52.3594 41.2734 52.0039C41.2734 51.6803 41.3464 51.3818 41.4922 51.1084C41.6426 50.8304 41.8454 50.6003 42.1006 50.418C42.292 50.2767 42.5518 50.1582 42.8799 50.0625C43.2126 49.9622 43.568 49.9121 43.9463 49.9121C44.516 49.9121 45.015 49.9941 45.4434 50.1582C45.8763 50.3223 46.1953 50.5456 46.4004 50.8281C46.6055 51.1061 46.7467 51.4798 46.8242 51.9492L45.6211 52.1133C45.5664 51.7396 45.4069 51.4479 45.1426 51.2383C44.8828 51.0286 44.5137 50.9238 44.0352 50.9238C43.4701 50.9238 43.0667 51.0173 42.8252 51.2041C42.5837 51.391 42.4629 51.6097 42.4629 51.8604C42.4629 52.0199 42.513 52.1634 42.6133 52.291C42.7135 52.4232 42.8708 52.5326 43.085 52.6191C43.208 52.6647 43.5703 52.7695 44.1719 52.9336C45.0423 53.166 45.6484 53.3574 45.9902 53.5078C46.3366 53.6536 46.6077 53.8678 46.8037 54.1504C46.9997 54.4329 47.0977 54.7839 47.0977 55.2031C47.0977 55.6133 46.9769 56.0007 46.7354 56.3652C46.4984 56.7253 46.1543 57.0055 45.7031 57.2061C45.252 57.402 44.7415 57.5 44.1719 57.5C43.2285 57.5 42.5085 57.304 42.0117 56.9121C41.5195 56.5202 41.2051 55.9391 41.0684 55.1689Z" fill="#212121"/>
            <defs>
            <linearGradient id="paint0_linear_4897_76245" x1="22.4829" y1="16.9574" x2="38.5049" y2="7.70164" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF585D"/>
            <stop offset="1" stop-color="#FFC100"/>
            </linearGradient>
            </defs>
            </svg>

          
          </a>
        </span>
      </div>
      <div id="clipBoardMenu" class="clipBoardMenu" style="display: none;">
        <div class="titleDiv">
          <span class="shareIcon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4688 18.75V11.25H13.125V45H20.625V48.75H46.875V18.75H39.4688ZM16.875 41.25V15H35.625V18.75H20.625V41.25H16.875ZM43.125 45H24.375V22.5H43.125V45Z" fill="#9CBFDD"/>
            </svg>
          </span>
          <h2>Share your current selection</h2>
        </div>
        <div class="copyLinkDiv">
          <button id="copyLink" class="copyLink">Generate & Copy Link</button>
        </div>
      </div>
      <div id="clipBoardSuccess" class="clipBoardSuccess" style="display: none">
        <div class="titleDiv">
          <span class="SuccessIcon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30 7.5C17.5736 7.5 7.5 17.5736 7.5 30C7.5 42.4264 17.5736 52.5 30 52.5C42.4264 52.5 52.5 42.4264 52.5 30C52.5 17.5736 42.4264 7.5 30 7.5ZM21.75 28.225L27.375 33.875L40.725 20.725L44.225 24.3L27.35 40.925L18.225 31.775L21.75 28.225Z" fill="#388E3C"/>
            </svg>
          </span>
          <h2>The link is successfully Copied</h2>
          <p>Press Ctrl+V to use it</p>
        </div>
      </div>

      <div id="userMenuPanel" class="userMenuPanel" style="display: none;">
        <div id="userInfoPanel">
          <p id="userInfoName">Doe, John</p>
          <span id="userInfoID">DOEJOH2</span>
          <div class="teamInfoPanel">
            <!--<input type="radio" id="team_info" class="team_info" name="team_info" value="teamInfo1" checked>-->
            <label id="teamInfoLabel" class="teamInfoLabel">Team Info</label>
          </div>
        </div>
        <div id="container-admin" class="container-admin">
          <hr class="dividerRounded">
          <div class="adminDivider">
            <p>Show admin Menu</p>
            <label class="switch">
              <input id="adminSwitch" type="checkbox" checked>
              <div class="slider round"></div>
            </label>
          </div>
        </div>
      </div>


  `;

  customElements.define('com-sap-top-navigation-bar', class TopNavigationBar extends HTMLElement {

    constructor() {
      super(); 
      this._shadowRoot = this.attachShadow({mode: "open"});
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._export_settings = {};

      //#region // addEventListener for everything
      let navElement = this._shadowRoot.getElementById("blankSpace");
      navElement.addEventListener("click", event => {
        var eventClick = new Event("onClick");
        this.dispatchEvent(eventClick);
      });
      let adminElement = this._shadowRoot.getElementById("adminElement");
      adminElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickAdmin");
        this.dispatchEvent(eventToggle);
      });
      let configElement = this._shadowRoot.getElementById("configElement");
      configElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickConfig");
        this.dispatchEvent(eventToggle);
      });
      let clipBoardElement = this._shadowRoot.getElementById("clipBoardElement");
      clipBoardElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickClipBoard");
        this.dispatchEvent(eventToggle);
      });
      let copyLinkButton = this._shadowRoot.getElementById("copyLink");
      copyLinkButton.addEventListener("click", evt => {
        var eventToggle = new Event("onClickCopyLink");
        this.dispatchEvent(eventToggle);
      });
      let downloadElement = this._shadowRoot.getElementById("downloadElement");
      downloadElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickDownload");
        this.dispatchEvent(eventToggle);
      });
      let infoElement = this._shadowRoot.getElementById("infoElement");
      infoElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickInfo");
        this.dispatchEvent(eventToggle);
      });
      let userElement = this._shadowRoot.getElementById("userElement");
      userElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickUser");
        this.dispatchEvent(eventToggle);
      });
      let toggleElement = this._shadowRoot.getElementById("adminSwitch");
      toggleElement.addEventListener("click", evt => {
        var eventToggle = new Event("onToggleAdmin");
        this.dispatchEvent(eventToggle);
      });
      let menuElement = this._shadowRoot.getElementById("menuElement");
      menuElement.addEventListener("click", evt => {
        var eventToggle = new Event("onClickMenu");
        this.dispatchEvent(eventToggle);
      });
      //#endregion

      this._props = {};
      this._firstConnection = false;
    }

    //Fired when the widget is added to the html DOM of the page
    connectedCallback(){
        this.firstConnection = true;
        var that = this;
        loadthis(that)
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

    //#region // sets and gets
    get userName() {
      return _setUserName
    }
    set userName(value){
      _setUserName = value;
    }
    get userTeamInfo() {
      return _setUserTeamInfo
    }
    set userTeamInfo(value){
      _setUserTeamInfo = value;
    }
    get toggleAdmin() {
      return _toggleAdmin_value;
    }
    set toggleAdmin(value) {
      _toggleAdmin_value = value;
    }
    get toggleConfig() {
      return _toggleConfig_value;
    }
    set toggleConfig(value) {
      _toggleConfig_value = value;
    }
    get toggleClipBoard() {
      return _toggleClipBoard_value;
    }
    set toggleClipBoard(value) {
      _toggleClipBoard_value = value;
    }
    get toggleDownload() {
      return _toggleDownload_value;
    }
    set toggleDownload(value) {
      _toggleDownload_value = value;
    }
    get toggleInfo() {
      return _toggleInfo_value;
    }
    set toggleInfo(value) {
      _toggleInfo_value = value;
    }
    get toggleMenu() {
      return _toggleMenu_value;
    }
    set toggleMenu(value) {
      _toggleMenu_value = value;
    }
    get toggleUser() {
      return _toggleUser_value;
    }
    set toggleUser(value) {
      _toggleUser_value = value;
    }
    get toggleConfigIcon() {
      return toggleConfigIcon
    }
    set toggleConfigIcon(value){
      toggleConfigIcon = value;
    }
    get toggleClipboardIcon() {
      return toggleClipboardIcon
    }
    set toggleClipboardIcon(value){
      toggleClipboardIcon = value;
    }
    get toggleDownloadIcon() {
      return toggleDownloadIcon
    }
    set toggleDownloadIcon(value){
      toggleDownloadIcon = value;
    }
    get toggleInfoIcon() {
      return toggleInfoIcon
    }
    set toggleInfoIcon(value){
      toggleInfoIcon = value;
    }
    get toggleMenuIcon() {
      return toggleMenuIcon
    }
    set toggleMenuIcon(value){
      toggleMenuIcon = value;
    }
    get toggleUserIcon() {
      return toggleUserIcon
    }
    set toggleUserIcon(value){
      toggleUserIcon = value;
    }

    getClipboard() {
      return _clipboard_value;
    }

    get ClipboardString() {
      return _clipboard_value;
    }

    set ClipboardString(value) {
      _clipboard_value = value;
    }

    get setClipboardString() {
      return setClipboardString
    }

    set setClipboardString(value){
      setClipboardString = value;
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

    isChecked() {
      return _isChecked_value
    }    
    isAdmin() {
      return _isAdmin_value
    }
    //#endregion

    static get observedAttributes() {
      return [
        "setAdmin",
        "toggleConfigIcon",
        "toggleClipboardIcon",
        "toggleDownloadIcon",
        "toggleInfoIcon",
        "toggleMenuIcon",
        "toggleUserIcon",
        "setUserTeamInfo",
        "setUserName",
        "setClipboard",
        "setAccess"
      ];
    }

  });

  let thatParent;
  let navBarMenu;
  let adminElement;
  let configElement;
  let clipBoardElement;
  let clipBoardSuccess;
  let downloadElement;
  let infoElement;
  let userElement;
  let menuElement;
  let nineDotMenu;
  let clipBoardMenu;
  let userMenuPanel;
  let copyLinkButton;
  let avatarUser;
  let buttonMenu;
  let userInfoName;
  let userInfoID;
  let userTeamInfo;
  let containerAdmin;
  let adminSwitchElement;
  let navButtons;

  function loadthis(that){
    thatParent = that.parentNode;
    navBarMenu = that._shadowRoot.getElementById("nav");
    adminElement = that._shadowRoot.getElementById("adminElement");
    configElement = that._shadowRoot.getElementById("configElement");
    clipBoardElement = that._shadowRoot.getElementById("clipBoardElement");
    clipBoardSuccess = that._shadowRoot.getElementById("clipBoardSuccess");
    downloadElement = that._shadowRoot.getElementById("downloadElement");
    infoElement = that._shadowRoot.getElementById("infoElement");
    userElement = that._shadowRoot.getElementById("userElement");
    menuElement = that._shadowRoot.getElementById("menuElement");
    nineDotMenu = that._shadowRoot.getElementById("nineDotMenu");
    clipBoardMenu = that._shadowRoot.getElementById("clipBoardMenu");
    userMenuPanel = that._shadowRoot.getElementById("userMenuPanel");
    copyLinkButton = that._shadowRoot.getElementById("copyLink");
    avatarUser = that._shadowRoot.getElementById("avatarUser");
    buttonMenu = that._shadowRoot.getElementById("buttonMenu");
    containerAdmin = that._shadowRoot.getElementById("container-admin");

    let clipBoardMenuLocal = document.getElementById("clipBoardMenu");
    let userMenuPanelLocal = document.getElementById("userMenuPanel");
    let nineDotMenuLocal = document.getElementById("nineDotMenu");
    let clipBoardSuccessLocal = document.getElementById("clipBoardSuccess");

    navButtons = that._shadowRoot.querySelectorAll('.navButton');
    
    if (!userInfoName){userInfoName = that._shadowRoot.getElementById("userInfoName");}
    if (!userInfoID){userInfoID = that._shadowRoot.getElementById("userInfoID");}
    if (!userTeamInfo){userTeamInfo = that._shadowRoot.getElementById("teamInfoLabel");}
    if(userInfoName){userInfoName.innerHTML = _setUserName.displayName;}
    if(userInfoID){userInfoID.innerHTML = _setUserName.id;}
    let userTeamInfoTestArrayDesc = [];
    for(let i=0; i < _setUserTeamInfo.length; i++){
      userTeamInfoTestArrayDesc.push(_setUserTeamInfo[i].name);
      for(let c=0; c < userTeamInfoTestArrayDesc.length; c++){
        if(userTeamInfoTestArrayDesc[c] !== "TM_CLD_SAC_DEV" && userTeamInfoTestArrayDesc[c] !== "TM_CLD_SAC_SUPP_NCON" && userTeamInfoTestArrayDesc[c] !== "TM_CLD_SAC_SUPP_CONF" && userTeamInfoTestArrayDesc[c] !== "TM_AIDA_PWR_W"){
          
        }else {
          _isAdmin_value = true;
          break;
        }
      }
    }
    
    if(userTeamInfo){
      if(userTeamInfoTestArrayDesc){
        for(let i=0; i < userTeamInfoTestArrayDesc.length; i++){
          let userTeamInfoTestArrayDescString = userTeamInfoTestArrayDesc[i];
  
          if(userTeamInfoTestArrayDescString === "TM_CLD_SAC_DEV" || userTeamInfoTestArrayDescString === "TM_CLD_SAC_SUPP_CONF" || userTeamInfoTestArrayDescString === "TM_CLD_SAC_SUPP_NCON"){
            userTeamInfo.innerHTML = "IT Team";
          }else if(userTeamInfoTestArrayDescString === "TM_AIDA_PWR_W"){
            userTeamInfo.innerHTML = "Admin";
          }else if(userTeamInfoTestArrayDescString === "TM_AIDA_PWR_W_CTRY"){
            userTeamInfo.innerHTML = "End User Write";
          }else if(userTeamInfoTestArrayDescString === "TM_AIDA_END_R"){
            userTeamInfo.innerHTML = "End User Read";
          }
        }
      }
    }
    if (!containerAdmin){
      // containerAdmin = that._shadowRoot.getElementById("container-admin");
      containerAdmin = document.getElementById("container-admin");
    } 
    if (!adminSwitchElement){
      adminSwitchElement = that._shadowRoot.getElementById("adminSwitch");
      adminElement.style.display = "flex";
    }
    if(containerAdmin){
      // containerAdmin.add();
      for(let i=0; i < _setUserTeamInfo.length; i++){
        let AccessParameterArray = _setUserTeamInfo[i].name;
        if (typeof _setUserTeamInfo === 'undefined' || _setUserTeamInfo === null || !_setUserTeamInfo){
          // do nothing
        }else {
          // TM_CLD_SAC_DEV || TM_CLD_SAC_SUPP_NCON || TM_CLD_SAC_SUPP_CONF || TM_AIDA_PWR_W
          if (AccessParameterArray !== "TM_CLD_SAC_DEV" && AccessParameterArray !== "TM_CLD_SAC_SUPP_NCON" && AccessParameterArray !== "TM_CLD_SAC_SUPP_CONF" && AccessParameterArray !== "TM_AIDA_PWR_W"){
          // if (AccessParameterArray !== "Test"){
            
            // containerAdmin.remove();
            // adminElement.classList.remove("hiddenDefault");
            containerAdmin.style.display = "none";
            containerAdmin.style.visibility = "visible";
            containerAdmin.style.opacity = "1";
            adminElement.style.display = "none";
            adminHeight = false;
          }else {
            containerAdmin.style.display = "block";
            containerAdmin.style.visibility = "visible";
            containerAdmin.style.opacity = "1";
            adminElement.style.display = "flex";
            adminHeight = true;
            break;
          }
        }
      }
    }

    toggleButtonsFn();
    initialsNameIconFn();
    nineDotMenuFn();
    clipBoardMenuFn();
    userMenuFn();

    adminSwitchElement.addEventListener("click", function (event){
      if(adminElement.style.display === "flex"){
        adminElement.style.display = "none";
      }else {
        adminElement.style.display = "flex";
      }
    });

    adminSwitchElement.addEventListener("change", () => {
      if (adminSwitchElement.checked){
        _isChecked_value = true;
      }else {
        _isChecked_value = false;
      }
    })

    document.addEventListener('click', event => {
      if(clipBoardMenuLocal){clipBoardMenuLocal.style.display = "none";}
      if(userMenuPanelLocal){userMenuPanelLocal.style.display = "none";}
      if(nineDotMenuLocal){nineDotMenuLocal.style.display = "none";}
      if(clipBoardSuccessLocal) {clipBoardSuccessLocal.style.display = "none";}

      if(adminElement){ adminElement.style.background = "#FFF"; }
      if(configElement){ configElement.style.background = "#FFF"; }
      if(clipBoardElement){ clipBoardElement.style.background = "#FFF"; }
      if(downloadElement){ downloadElement.style.background = "#FFF"; }
      if(infoElement){ infoElement.style.background = "#FFF"; }
      if(userElement){ userElement.style.background = "#FFF"; }
      if(menuElement){ menuElement.style.background = "#FFF"; }
      if(nineDotMenu){ nineDotMenu.style.background = "#FFF"; }

    });
    // Chnage Background color or selected Icon
    if(adminElement){adminElement.addEventListener('click', event => {adminElement.style.background = "#blue";})}
    if(configElement){configElement.addEventListener('click', event => {configElement.style.background = "#blue";})}
    if(clipBoardElement){clipBoardElement.addEventListener('click', event => {clipBoardElement.style.background = "#blue";})}
    if(downloadElement){downloadElement.addEventListener('click', event => {downloadElement.style.background = "#blue";})}
    if(infoElement){infoElement.addEventListener('click', event => {infoElement.style.background = "#blue";})}
    if(userElement){userElement.addEventListener('click', event => {userElement.style.background = "#blue";})}
    if(menuElement){menuElement.addEventListener('click', event => {menuElement.style.background = "#blue";})}
    // if(nineDotMenu){nineDotMenu.addEventListener('click', event => {nineDotMenu.style.background = "#blue";})}

    if(clipBoardMenuLocal){clipBoardMenuLocal.addEventListener('click', event => {event.stopPropagation();})}
    if(userMenuPanelLocal){userMenuPanelLocal.addEventListener('click', event => {event.stopPropagation();})}
    if(nineDotMenuLocal){nineDotMenuLocal.addEventListener('click', event => {event.stopPropagation();})}
    if(clipBoardSuccessLocal){clipBoardSuccessLocal.addEventListener('click', event => {event.stopPropagation();})}

  }

  function toggleButtonsFn(that){
    let adminElementLocal = adminElement;
    let configElementLocal = configElement;
    let clipBoardElementLocal = clipBoardElement;
    let clipBoardSuccessLocal = clipBoardSuccess;
    let downloadElementLocal = downloadElement;
    let infoElementLocal = infoElement;
    let menuElementLocal = menuElement;
    let userElementLocal = userElement;

    let clipBoardMenuLocal = clipBoardMenu;
    let userMenuPanelLocal = userMenuPanel;
    let nineDotMenuLocal = nineDotMenu;

    if( _toggleAdmin_value === "true" || _toggleAdmin_value === true ){ // || _toggleAdmin_value === ""){
      _toggleAdmin_value = true;
      adminElementLocal.style.display = "flex !important";
      adminElementLocal.classList.remove("hiddenDefault");
    }else {
      _toggleAdmin_value = false;
      adminElementLocal.style.display = "none !important";
      adminElementLocal.classList.add("hiddenDefault");
    }

    if( _toggleConfig_value === "true" || _toggleConfig_value === true ){ // || _toggleConfig_value === ""){
      _toggleConfig_value = true;
      configElementLocal.style.display = "flex !important";
      configElementLocal.classList.remove("hiddenDefault");
    }else {
      _toggleConfig_value = false;
      configElementLocal.style.display = "none !important";
      configElementLocal.classList.add("hiddenDefault");
    }

    if( _toggleClipBoard_value === "true" || _toggleClipBoard_value === true ){ // || _toggleClipBoard_value === ""){
      _toggleClipBoard_value = true;
      clipBoardElementLocal.style.display = "flex !important";
      clipBoardElementLocal.classList.remove("hiddenDefault");
    }else {
      _toggleClipBoard_value = false;
      clipBoardElementLocal.style.display = "none !important";
      clipBoardElementLocal.classList.add("hiddenDefault");
    }

    if( _toggleDownload_value === "true" || _toggleDownload_value === true ){ // || _toggleDownload_value === ""){
      _toggleDownload_value = true;
      downloadElementLocal.style.display = "flex !important";
      downloadElementLocal.classList.remove("hiddenDefault");
    }else {
      downloadElementLocal.style.display = "none !important";
      downloadElementLocal.classList.add("hiddenDefault");
      _toggleDownload_value = false;
    }

    if( _toggleInfo_value === "true" || _toggleInfo_value === true ){ // || _toggleInfo_value === ""){
      _toggleInfo_value = true;
      infoElementLocal.style.display = "flex !important";
      infoElementLocal.classList.remove("hiddenDefault");
    }else {
      _toggleInfo_value = false;
      infoElementLocal.style.display = "none !important";
      infoElementLocal.classList.add("hiddenDefault");
    }

    if( _toggleMenu_value === "true" || _toggleMenu_value === true || _toggleMenu_value === ""){
      _toggleMenu_value = true;
      menuElementLocal.style.display = "flex !important";
      menuElementLocal.classList.remove("hiddenDefault");
    }  else {
      _toggleMenu_value = false;
      menuElementLocal.style.display = "none !important";
      menuElementLocal.classList.add("hiddenDefault");
    }

    if( _toggleUser_value === "true" || _toggleUser_value === true || _toggleUser_value === ""){
      _toggleUser_value = true;
      userElementLocal.style.display = "flex !important";
      userElementLocal.classList.remove("hiddenDefault");
    }else {
      _toggleUser_value = false;
      userElementLocal.style.display = "none !important";
      userElementLocal.classList.add("hiddenDefault");
    }

    let navButtonsLocal = navButtons;
    navButtonsLocal.forEach(item => {
      item.addEventListener('click', event => {
        if(clipBoardSuccessLocal && clipBoardSuccessLocal.style.display === "flex" || clipBoardMenuLocal && clipBoardMenuLocal.style.display === "flex" || nineDotMenuLocal && nineDotMenuLocal.style.display === "flex" || userMenuPanelLocal && userMenuPanelLocal.style.display === "flex"){
          clipBoardSuccessLocal.style.display = "none";
          clipBoardMenuLocal.style.display = "none";
          nineDotMenuLocal.style.display = "none";
          userMenuPanelLocal.style.display = "none";
        }
        
      })
    });
  }

  function initialsNameIconFn(that){
    let adminElementLocal = adminElement;
    let configElementLocal = configElement;
    let clipBoardElementLocal = clipBoardElement;
    let downloadElementLocal = downloadElement;
    let infoElementLocal = infoElement;
    let menuElementLocal = menuElement;
    let userElementLocal = userElement;

    let clipBoardMenuLocal = clipBoardMenu;
    let userMenuPanelLocal = userMenuPanel;
    let nineDotMenuLocal = nineDotMenu;

    if(_setUserName.displayName){
      let setUserDisplayName = _setUserName.displayName;
      // let initialsName = _setUserName.split(" ").map((n)=>n[0]).reverse().join("").replace("(", "").substring(0, 2);
      let initialsName = setUserDisplayName.split(" ").map((n)=>n[0]).join("").replace("(", "").substring(0, 2);
      if (initialsName){
        let avatarUserLocal = avatarUser
        avatarUserLocal.innerHTML = initialsName;
        const buttonMenuLocal = buttonMenu
        const countSpanButtonMenu = buttonMenuLocal.getElementsByTagName('span').length;
        let leftAlignClipBoard = countSpanButtonMenu / 143;
      }
    }

  }

  function nineDotMenuFn(that){

    let nineDotStyle = `<style>
      .nineDotMenu {
        position: absolute;
        top: 48px;
        right: 138px;
        align-content: space-around;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        float: right;
        width: 356px;
        height: 234px;
        border: 1px solid #CBCBCB;
        border-top: 0;
        background-color: #fff;
        z-index: 99;
      }
      .nineDotMenu span {
        width: 78px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .nineDotMenu svg {
        cursor: pointer;
      }
      .nineDotMenu a {
        display: block;
        width: 100%;
        height: 78px;
        cursor: default;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
    </style>`;
    
    let thatParentLocal = thatParent;
    let menuElementLocal = menuElement;
    let nineDotMenuLocal = nineDotMenu;
    let clipBoardMenuLocal = clipBoardMenu;
    let clipBoardSuccessLocal = clipBoardSuccess;
    let userMenuPanelLocal = userMenuPanel;
    let nineDotStyleLocal = nineDotStyle;
    if(thatParentLocal){
      let thatGrandParent = thatParentLocal.parentNode
      let that2ndGrandParent = thatGrandParent.parentNode
      let that3rdGrandParent = that2ndGrandParent.parentNode
      $(that3rdGrandParent).append(nineDotMenuLocal, nineDotStyleLocal);

      menuElementLocal.addEventListener("click", evt => {
        if(nineDotMenuLocal){
          if(nineDotMenuLocal.style.display === "flex"){
            nineDotMenuLocal.style.display = "none";
          }else {
            nineDotMenuLocal.style.display = "flex";
            clipBoardMenuLocal.style.display = "none"
            clipBoardSuccessLocal.style.display = "none";
            userMenuPanelLocal.style.display = "none";
          }
          evt.stopPropagation();
        }
      });
    }


  }

  function clipBoardMenuFn(that){
    // 92, 140, 188, 236, 284
    //          234, 282, 330  -> + 46
    let clipBoardElementLocal = clipBoardElement;
    let clipBoardSuccessLocal = clipBoardSuccess;
    let recClipBoardElement = clipBoardElementLocal.getBoundingClientRect();
    // let rightClipboardSize = recClipBoardElement.left + recClipBoardElement.width - 405;
    let rightClipboardSize = "";

    if(_toggleInfo_value === "false" && _toggleDownload_value === "false" || _toggleInfo_value === false && _toggleDownload_value === false){
      rightClipboardSize = 234;
    }
    
    if( _toggleInfo_value === "false" && _toggleDownload_value === "true"  || _toggleInfo_value === false && _toggleDownload_value === true) {
      rightClipboardSize = 282;
    }

    if( _toggleInfo_value === "true" && _toggleDownload_value === "false"  || _toggleInfo_value === true && _toggleDownload_value === false) {
      rightClipboardSize = 282;
    }
    
    if(_toggleInfo_value === "true" && _toggleDownload_value === "true" || _toggleInfo_value === true &&  _toggleDownload_value === true) {
      rightClipboardSize = 330;  
    }

    //#region // This is the Style for clipBoard
    let clipBoardStyle = `<style>
      .clipBoardMenu {
        position: absolute;
        align-items: center;
        flex-wrap: wrap;
        top: 48px;
        right:  ` + rightClipboardSize + `px;
        width: 288px;
        height: 240px;
        border: 1px solid #CBCBCB;
        border-top: 0;
        background-color: #fff;
        background-size: 0px;
        background-image: none;
        z-index: 99;
        justify-content: space-evenly;
        flex-direction: column;
      }
      .clipBoardMenu div{
        // margin: 0 16px;
      }
      .titleDiv {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        heigth: 80%;
        flex-direction: column;
      }
      .clipBoardMenu h2{
        max-width: 240px;
        font-family: "arial";
        font-size: 18px;
        color: #212121;
        font-weight: bold;
        margin: 0;
        text-align: center;
      }
      .copyLinkDiv {
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .copyLink {
        font-family: Arial;
        font-size: 14px;
        font-weight: bold;
        height: 40px;
        width: 178px;
        background-color: rgb(4, 96, 169);
        border-color: rgb(4, 96, 169);
        color: rgb(255, 255, 255);
        cursor: pointer;
        border: none;
        margin-top: 10px;
        border-radius: 4px;
      }
      .clipBoardSuccess{
        position: absolute;
        align-items: center;
        flex-wrap: wrap;
        top: 48px;
        right:  ` + rightClipboardSize + `px;
        width: 288px;
        height: 240px;
        border: 1px solid #CBCBCB;
        border-top: 0;
        background-color: #fff;
        background-size: 0px;
        background-image: none;
        // padding: 0 16px;
        justify-content: center;
      }
      .clipBoardSuccess .titleDiv {
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        padding: 20px 0;
      }
      .clipBoardSuccess p {
        max-width: 240px;
        margin: 0;
        text-align: center;
      }
      .clipBoardSuccess h2 {
        max-width: 240px;
        margin: 0;
        text-align: center;
        font-size: 18px;
      }
    </style>`;
    //#endregion

    let thatParentLocal = thatParent
    let nineDotMenuLocal = nineDotMenu;
    let clipBoardMenuLocal = clipBoardMenu;
    let userMenuPanelLocal = userMenuPanel;
    let clipBoardStyleLocal = clipBoardStyle;
    if(thatParentLocal){
      let thatGrandParent = thatParentLocal.parentNode
      let that2ndGrandParent = thatGrandParent.parentNode
      let that3rdGrandParent = that2ndGrandParent.parentNode
      $(that3rdGrandParent).append(clipBoardMenuLocal, clipBoardSuccessLocal,  clipBoardStyleLocal);

      clipBoardElementLocal.addEventListener("click", evnt => {
        if(clipBoardMenuLocal){
          if(clipBoardMenuLocal.style.display === "flex" || clipBoardSuccessLocal.style.display === "flex"){
            clipBoardMenuLocal.style.display = "none";
            clipBoardSuccessLocal.style.display = "none";
          }else {
            clipBoardMenuLocal.style.display = "flex";
            nineDotMenuLocal.style.display = "none";
            userMenuPanelLocal.style.display = "none";
            clipBoardSuccessLocal.style.display = "none";
          }
          evnt.stopPropagation();
        }
        
      });
      if (copyLinkButton){
        copyLinkButton.addEventListener("click", evt => {
          // clipBoardMenuLocal.style.display = "none";
          // navigator.clipboard.writeText(_clipboard_value);
          doStuff();
          // clipBoardSuccessLocal.style.display = "flex";
        });
      }
    }
  }

  function userMenuFn(that){
    let adminHeightPixel = "";
    if (adminHeight === true){
      adminHeightPixel = 170;
    }else {
      adminHeightPixel = 120;
    }
    let userElementLocal = userElement;
    let userMenuPanelStyle = `<style>
      .userMenuPanel {
        position: absolute;
        display: none;
        align-items: center;
        flex-wrap: wrap;
        top: 48px;
        right: 186px;
        width: 260px;
        max-height: ` + adminHeightPixel + `px;
        height: ` + adminHeightPixel + `px;;
        flex-direction: column;
        justify-content: space-evenly;
        border: 1px solid #CBCBCB;
        border-top: 0;
        background-color: #fff;
        background-size: 0px;
        background-image: none;
        padding: 0 16px;
        z-index: 99;
      }
      .userMenuPanel div {
        width: 100%;
      }
      .userMenuPanel p {
        font-family: Arial;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        margin: 0;
        // margin-top: 16px;
        
      }
      .teamInfoPanel {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
      .team_info{
        cursor: pointer;
        height: 20px;
        width: 20px;
        margin: 0;
      }
      .team_info:checked {
        accent-color: rgb(4, 96, 169);
      }
      .teamInfoPanel label {
        font-size: 14px;
        margin-left: 0px;
      }
      .userMenuPanel .container-admin{
        // display: none;
        // visibility: hidden;
        // opacity: 0;
      }

      .userMenuPanel hr {
        width: 100%;
      }
      .userMenuPanel span {
        font-family: Arial;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: left;
        color: #666;
      }
      .userMenuPanel label {
        color: #000;
      }
      .userMenuPanel .switch {
        position: relative;
        display: inline-bock;
        width: 60px;
        height: 34px;
      }
      .userMenuPanel .switch input {
        display: none;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .userMenuPanel .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      .userMenuPanel .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: #fff;
        -webkit-transition: .4s;
        transition: .4s;
      }
      .userMenuPanel input:checked + .slider {
        background-color: rgb(4, 96, 169);;
      }
      // .userMenuPanel input:focus + .slider {
      //   box-shadow: 0 0 1px rgb(4, 96, 169);;
      // }
      .userMenuPanel input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      .userMenuPanel .slider.round {
        border-radius: 34px;
      }
      .userMenuPanel .slider.round:before {
        border-radius: 50%;
      }

      .adminDivider {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    </style>`;

    let thatParentLocal = thatParent
    let nineDotMenuLocal = nineDotMenu;
    let clipBoardMenuLocal = clipBoardMenu;
    let clipBoardSuccessLocal = clipBoardSuccess;
    let userMenuPanelLocal = userMenuPanel;
    let userMenuPanelStyleLocal = userMenuPanelStyle;
    if(thatParentLocal){
      let thatGrandParent = thatParentLocal.parentNode
      let that2ndGrandParent = thatGrandParent.parentNode
      let that3rdGrandParent = that2ndGrandParent.parentNode
      $(that3rdGrandParent).append(userMenuPanelLocal, userMenuPanelStyleLocal);

      userElementLocal.addEventListener("click", evnt => {
        if(userMenuPanelLocal){
          if(userMenuPanelLocal.style.display === "flex"){
            userMenuPanelLocal.style.display = "none";
          }else {
            userMenuPanelLocal.style.display = "flex";
            clipBoardMenuLocal.style.display = "none";
            nineDotMenuLocal.style.display = "none";
            clipBoardSuccessLocal.style.display = "none";
          }
          evnt.stopPropagation();
        }
      });
    }
  }

  var something_cachedValue = _clipboard_value;
  let timer = 0;
  function doStuff() {
    let clipBoardSuccessLocal = document.getElementById("clipBoardSuccess");
    let clipBoardMenuLocal = document.getElementById("clipBoardMenu");
    if(_clipboard_value === something_cachedValue) {
      timer += 1;
      timeOutLoop = setTimeout(doStuff, 150);
      if (timer === 200){
        something_cachedValue=_clipboard_value;
        clipBoardMenuLocal.style.display = "none";
        navigator.clipboard.writeText(_clipboard_value);
        clipBoardSuccessLocal.style.display = "flex";
        timer = 0;
        clearTimeout(timeOutLoop);
        return;
      }
      return;
    }
    something_cachedValue=_clipboard_value;
    clipBoardMenuLocal.style.display = "none";
    navigator.clipboard.writeText(_clipboard_value);
    clipBoardSuccessLocal.style.display = "flex";
    timer = 0;
  }
})();