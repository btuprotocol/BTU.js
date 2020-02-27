# BTU dappbar

The BTU dappbar makes it simpler for business providers to cashback BTU tokens.

  - [Overview](#overview)
  - [Installation](#installation)
    - [**Script**](#script)
    - [**Dappbar container**](#dappbar-container)
    - [**Domain restriction**](#domain-restriction)
  - [Use](#use)
    - [**Dappbar enabled**](#dappbar-enabled)
    - [**Wallet connection**](#wallet-connection)
    - [**Wallet address**](#wallet-address)
    - [**Reloading the dapp bar**](#reloading-the-dapp-bar)
    - [**Changing language**](#changing-language)

## Overview

The BTU dappbar makes it simpler for business providers to cashback BTU tokens. In its current version (v2.1), the tool allows the wallet address of a user to be available on their browser in a uniform way.

The dappbar requires only HTML5, CSS3 and Javascript. (It is thus possible to be included in any Javascript framework: React, Angular etc.) It is able to detect wallets integrated with a Web3-compatible browser. (Opera, plugins like Metamask, Dapp browsers like BTU-Direct, Trust, Coinbase, etc.)

## Installation

### Script

In order to initialize the dappbar, the dappbar.js script must first be integrated.

In an HTML file, the script may ben called by the following tag, in the `<head></head>` section:

```
<script type="text/javascript"src="https://btu-cdn.s3.eu-west-3.amazonaws.com/public/dappbar.min.js"></script>
```

Otherwise, the script can be injected by the following Javascript functions:

```javascript
const script = document.createElement('script')
script.src = 'https://btu-cdn.s3.eu-west-3.amazonaws.com/public/dappbar.min.js'
script.async = true
document.head.appendChild(script)
```

If needed, the dappbar.js script injects by itself two other scripts:
* JQuery (https://code.jquery.com/jquery-3.4.1.min.js)
* Web3 (https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js)

Unless the server prevents those scripts to be injected, they need not be manually initialized prior to the dappbar.js script.

### Dappbar container

The dappbar needs a `<div>` tag with the specific "btu-placeholder" id in order to be deployed:
```javascript
<div id="btu-placeholder"></div>
```

This tag should be placed as early as possible in the page, so that it may take up all the top space.

### Domain restriction

If your website is available with several domain names, and you need the wallet connection to be possible with only one of them, (e.g. if you want the users sharing the link to your website to earns the cashback instead of the final user,) you may explicit the domain names where the dappbar has to be displayed, by listing them in the "data-restrict-domain" attribute, separated by commas:
```
<div id="btu-placeholder" data-restrict-domain="<list of domain to restrict the dappbar to>"></div>
```

For example, if the dappbar should only be displayed on the domains test.com and test.fr:
```javascript
<div id="btu-placeholder" data-restrict-domain="test.com,test.fr"></div>
```

If the attribute is omitted, the dappbar will be displayed without any restriction.

## Use

### Overview
Once the dappbar is installed, a user's wallet will be connected automatically to the dappbar. (Or a validation request will be displayed if the user hasn't yet authorized the dappbar to connect to their wallet.) The relevant informations are saved in the sessionStorage object.

### Dappbar enabled

The status of the dappbar is given by the following command:
```javascript
sessionStorage.getItem('BTU-dappbarEnabled');
```

This command returns a string:
* "true" if the dappbar is enabled for the current website
* "false" otherwise.

### Wallet connection

The status of the wallet is given by the following command:
```javascript
sessionStorage.getItem("BTU-walletConnected");
```

This command returns a string:
* "true" if a wallet is connected
* "false" otherwise.

### Wallet address
The current wallet address is given by the following command:
```javascript
sessionStorage.getItem("BTU-walletAddr");
```

This command returns a string with the current address. (42 characters : "0x" followed by 40 hexadecimal characters.)

### Reloading the dapp bar
The dappbar may be reloaded with the following command:

```javascript
_btu_loadDappbar();
```

The current state is preserved: current wallet, current popup, etc.

### Changing language

When first loaded, the dappbar is in French is the default language of the browser is French, and in English otherwise. 
The language of the dappbar may be changed from French to English (or English to French). The dappbar needs reloading after the language is modified.

To change the language to English:
```javascript
_btu_setLanguage('en');
_btu_loadDappbar();
```

To change the language to French:
```javascript
_btu_setLanguage('fr');
_btu_loadDappbar();
```
