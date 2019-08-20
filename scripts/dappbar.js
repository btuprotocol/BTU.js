/******************************************************************************/
/*                                                                            */
/*                            BTU DAPPBAR JS 2019                             */
/*                        Antoine Casse - BTU protocol                        */
/*                                                                            */
/******************************************************************************/

/*
 *	Meta data
 */

const meta = {
	"en": {
		      "connected": "Connected",
		      "notConnected": "Not connected",
		      "connectionRequired": "Connection required",
		      "usingBTU": {
			      "using": "To use this service, please provide us with your Ethereum address",
			      "choiceConnected": "Login or create one in a few clicks.",
			      "usingConnected": "In order to use this service, please connect to your wallet, MetaMask or TrustWallet for example",
			      "createWallet": "Create a wallet",
			      "hasWallet": "I already have a wallet",
			      "changeWallet": "Change wallet",
			      "connection": "Connection"
		      },
		      "isConnected": {
			      "nowCo": "You are connected with the following ETH address",
			      "switchWallet": "Change wallet"
		      },
		      "inputWallet": {
			      "howTo": "Please enter your ETH address below",
			      "inputCo": "Connection",
			      "addrBTU": "ETH address",
			      "placeholder": "0x...",
			      "requiredETH": "Required",
			      "invalidETH": "Invalid ETH address"
		      },
		      "isCreated": {
			      "afterCreate": "After creating your wallet, you will have access to all our services.",
			      "hasCreated": "I have created my wallet",
			      "hasWallet": "I already have a wallet"
		      },
		      "invalidAddress": "Invalid address",
	  "nonEtherumBrowser": "Non-Ethereum browser detected. You should consider trying MetaMask!",
	  "placeholderMissing": "Please integrate a <div id='btu-placeholder'> tag in order to use the BTU Dappbar"
	},
	"fr": {
		      "connected": "Connecté",
		      "notConnected": "Non connecté",
		      "connectionRequired": "Connexion requise",
		      "usingBTU": {
			      "using": "Pour utiliser ce service, vous devez nous fournir une adresse Ethereum",
			      "choiceConnected": "Connectez-vous ou crééez un wallet en quelques clics.",
			      "usingConnected": "Pour utiliser ce service, veuillez vous connecter à un portefeuille, MetaMask ou TrustWallet par exemple",
			      "createWallet": "Je crée un portefeuille",
			      "hasWallet": "J'ai un portefeuille",
			      "changeWallet": "Changer de portefeuille",
			      "connection": "Connexion"
		      },
		      "isConnected": {
			      "nowCo": "Vous êtes connecté à votre portefeuille",
			      "switchWallet": "Changer de portefeuille"
		      },
		      "inputWallet": {
			      "howTo": "Veuillez renseigner votre adresse ETH dans le champ ci-dessous",
			      "inputCo": "Connexion",
			      "addrBTU": "Adresse ETH",
			      "placeholder": "0x...",
			      "requiredETH": "Adresse ETH requise",
			      "invalidETH": "Adresse ETH invalide"
		      },
		      "isCreated": {
			      "afterCreate": "Après création de votre portefeuille, vous aurez accès à l'intégralité de nos services et vous pourrez gagner des BTU à chaque réservation.",
			      "hasCreated": "J'ai créé mon portefeuille",
			      "hasWallet": "J'ai déjà un portefeuille"
		      },
		      "invalidAddress": "Adresse invalide",
	  "nonEtherumBrowser": "Votre navigateur n'utilise pas Etherum. Vous devriez essayer MetaMask!",
	  "placeholderMissing": "Veuillez intégrer une balise <div id='btu-placeholder'> pour utiliser la Dappbar BTU"
	      }
      }
      
      /*
       *	Constants
       */

      const placeholderTag = "btu-placeholder"
      const defaultAddr = "0xd00551b9d6CB3C4dDfc36df874c642b19D2b9e22"
      const supportedLanguages = ['en', 'fr']
      const defaultLanguage = supportedLanguages[0]
      let BTUlanguage = navigator !== undefined ? navigator.language || navigator.userLanguage : 'en'
      BTUlanguage = BTUlanguage.substr(0, 2)
      // Images
      const icons = {
	withoutWallet: 'data:image/png;base64,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',
	electronicWallet: 'data:image/png;base64,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',
	walletProviders: {
	  metamask: ' data:image/png;base64,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',
	  alpha: ' data:image/png;base64,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',
	  coinbase: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcJCTUVUxFNxAAAAPNJREFUKM9jFAv6wEAKYGIgEZCsgQVT6O8/hu8////7z8DGwsjBRoQNfZmcbzfwf98ucHwKj4Um8///uDX8+ctwdgZvnBvb//8Mt5781ZJnrovj+PUHt5Oy/dlkRJk2HP0d0/qVkYlBT4n5xqN/7Kw4NPz6zeBqwsrAwJA76Rs3JyMDA8Odp/9YmKkYrGysDLvP/GZgYJicx/X1+/9vP/+rSDP9+YuugRE5pv/8Zbg4m1dGlOn7z/+PX/9Tk2E+e+uPc8lXZG+gOImFmcE44/OiXb8YGRnUZJivPfzbuOgHGwtuG4iJOCwxzczEwMPJOHCJDwCmyVi8+Q+LkAAAAABJRU5ErkJggg==',
	  go: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcJCTkmQHRj3gAAApFJREFUOMtFk0lsTVEYx3/fHd5tX3mkJKSmGooQkejGGCs0Nlja2RhWEiERiSkSBMGCEiwMG4mFjWAjpGqImEU0QoPW9JQ2aW/bd+9753wW9/DO5ozf8D/f7xN7YXI3fs0EjXu2tXX0tS6dwbSglk1iaNEBpgOKxweEm2nI+fZOvq5opQIIgOjVxUpYB6JWu+6cEI8dhGSjBJoAnnseApaDAzHHR+2jDxCxrfUHxDd7NE1ek5bmSw7wAQUqoBbEd2cWtATAtf4SW0bvpc9f2zx8f3xNUhBTWUsZREArmTGVbE9QdYABfOZGEemyJtolOcjcMOCteKApSM5F8oAUxLrUc06GdfdAUqYRc9Q/ba+vU+3vVh0sqg73qHZcVntqpOq3B6rWqJpEtVJSfXpY9WyDavGV2hvr1Rz1DwQSRKuleSvERXhxCsTAUBcydiY0LIG2nfDjASw7BPM2w/srkB+D5OrA6moPq42EtVB8Br9eQjQCCrPRaBKUB9HPbfDxEfS+A2syLdaALYOnMzzUaROFQGHyclh5DilMAWsQsZn+fw/jAfj9Dvq/IJESgHRhSlNoWAg9z8EkGQOSQlSA+ethYhM0LALPA4Yg/g45DwLp9NQkt3l+EsI8NG+H+jnw5Qb8eQIdF6FxDSzYD5KHx7shtFBXD9SiqXdb0kPMCyPeZFEdgb6jr+zqjiMyzMqsMUgEiTLNa/9FhypnsA4e4+SWnaOoOksAOpz9o4YcfviTbgGIdzIuX8clhBbCLFuNq9lI6Gi0/3vjelxhY2EXvR4gI45QHCqzgRytEjqjfBVdTd1aQOFYbNhU2EUvjvR/yvXuZoKlTcwKatki0KKDTKWC4tGpcMvUcPbeKz6tulRt578VryYpd+FKrQAAAABJRU5ErkJggg==',
	  opera: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHeSURBVDiNhZM/aFNRFMZ/575QWzrYQVzEwSWCij4IeSmIKE1BUBDt0KHg4OzgPxQHRQRRB8GhWBBBcBBRBFFcRLo4aYjte5jFgoNKHSwUaX0kxPfucUjyclNS8k333Hu+73znco6oKi7WJ0t5EWZEKQAFwIAsqPI5Z5JHw++rP9x8yQREJJ4onUP0NjACYFW/xI109W9TtyWpjg3l5Fdq9eka3lyhWv0HkMvIk8FbVI91lFNldnml8VKNaViRk6heSZq6AyhuITkMTGUO4vL4eUTvZ75UL4/OV+65Vmu+PwU87xQVkbN7FxfnZK0c5A2EHdtAOHqoUuCGWjag5vuPgTPtsGFVfSPCjENGRW71IwOkcNcJh40xJ0z7tzN4xlb6kQEOhOES8NtptWSgR+DPyLvKz80E2lhyzuNmQPJAGGDBicfqR4OdAzh55/zRKOIKkFoTbMaMfD8PbM8uRD6ZVJMnQD27U73GTenbmgdXnbBhrX1jts5Xv4Fedx78+EPx4kZye5BOd4vLpf1R9LW1C9PTXrz6/TVwPGtFmV1eqfeMcssEAK/2hWF3lDuScTm4ANwBhqD/Mlm1z5q7kgd7XtSavQJtrE8UdxtPTqFyROCgQowQoUSJpg9bLXfxHzln1t9Wx+3hAAAAAElFTkSuQmCC',
	  enjin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABv0lEQVQ4jZWTz0tUURTHP+fN1ZR6Azriop07ocKSwF3NayOCQns3JcREq1m2i/6DcdcQ1PwJQUK0mfcWhihlaoHLWUxEWb6kl+N7/ninxXtvcGxC/W7uvYfz/Z7vuYcjnMDcdH1MoSQiDuhIEpWGqroC1RcLd9aP50t2uVd0+8SmIsgDUOukcJoeK/pcA8o1zwnbAin5jUCxO7ETCp4GTNU8J7QAkspnI6dVi2JTAZC56foYYq1mti/ahmvjgxSG+8jlpIO4H8WsLG7h/4gAidF43CiUJCUPFHp5Mn+T/n5Ds/GHKDpKLCvt82tzNxVQS6Fkkt9OcH1iCDvfS+XpBp8++Ke3IuKYZFSJVTvfA8DtyctM3BruSnpX/87m+q/0pSOmW9KOH9HaPewqsNfqjBuQBjAKEPw+AODzR5+15e1TWwBpGFV1RWQUYG1lm7uzBzx6fJVvX1qEe4ftD8zw9lWT1aWfSQOq7j9jvJTv4cqNAQYLF8gZC7EABVUlDGPeL26x4++TjVEA7s+4zwRKZ/DchkL15WvnoQWgAWUF7xxkTwPKABZAzXNCDZhSqILE/6dKrFDN9gCObWOG867zX3+ivrZ/cA+XAAAAAElFTkSuQmCC',
	  parity: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAFL+AABS/gGUsKC+AAAAB3RJTUUH4wcJCTMb4vPHRQAAAhlJREFUOMulk81KI0EUhb/bnR86kkhE4koijMZpcEBcCBE3voeP4dvMMj6H4saVLuIMJJHGPwKCi6hNQ9tV3X1nMemhx9HVXCiKqrrncopzDsxLVYt9U1W/q2qgqul8BfO7zXIvH4AH+kFdXFyUj4MypqKqiAiq+gPYKg8ejUaEYUie58RxjOd5AIequi0i31QVZw4elMFxHHNycoIxhjRNqdfrTCYToigqWrZUdSAiyPxf4+Ll/Pwcz/OIoojFxUVeXl5otVoYY2g2m/i+Xyb51QGOAB4fHzk7O6PZbDIcDqnVatzc3PD09IQxhqurK6IowlpbHnBUAQ5GoxHWWkSENE0Jw5DLy0tUFVVlOp0CICIEQcDGxgaVSgXgwAHWer0exhgA8jyn1+vheR77+/u4rsvu7i4rKyvUajVmsxkPDw8FgzUHwHVdlpaWcF2XarWKMYa9vT2m0yn9fh9rLe12mzzPybKM2WxGlmW/ZQTugC/dbpckSXh7eyMIAm5vb1FV7u/v/zQvLy8DUK1Wub6+xvf9Owc4LVisr6+TJAmNRoNOp0O328Vai+/7ZFlGvV5HVel0OoUap//IOB6PeX19pdFo8Pz8TLvdJgxDFhYWiOOYfr//l4wVEZmo6jFwCLC6ukqSJFhrcRyHPM9JkoSdnZ3CiUUdi8hEPrJyHMcMh0NEhFar9d48AD8LK38apncB+jRM/G+cfwFpdphMcZnr1QAAAABJRU5ErkJggg==',
	  status: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAALRQTFRFAAAAQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQ2DfQl/fQF7fQV7fT2rhiZvrqLbwhJfqSWXgvMf0/f3/////+fr+hpnqjZ/s/v7/kaLsi53rucPzv8n0w8z1m6ruUGvhRGHffZHpvMb0wsv1u8XznKzuRmPgWHHj4+j6pLLwQmDfTmnh+/z+9/j+vcj0VG/iUm3id4zocIbnS2fgdjJD1AAAABF0Uk5TAAATVpe5Aki/9r5k7Enr9bhTm+fYAAAAAWJLR0QcnARBBwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKpJREFUGNNlT8cWwjAMy2pp0+mkzIZN2XuP//8v4sAJdLL0ZFsihFDKuPA8wRmlxIL6tSAEi1DWfIo8iuGLOLIKTVKclS40QJpQwqTj9Uaz1QaQjPDM8U5puj0NGScCDUW/NGYwtEuC5E4YjSfVdKYAcifMF8vVerO13Ap2Re32xpjDEb0Cj6pTdb5cb2iwR/Gtuj+eL+T41gVTWjuOwf6iYzn5KRe4cr/132PyEEADk4sWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTEzVDA5OjQzOjUzKzAwOjAwfFkyhwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xM1QwOTo0Mzo1MyswMDowMA0EijsAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNC0wNS0xMiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfchu0AAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAAxOTIPAHKFAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE5MtOsIQgAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTU1MjQ3MDIzM3zsFPoAAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAABWdEVYdFRodW1iOjpVUkkAZmlsZTovLy9tbnRsb2cvZmF2aWNvbnMvMjAxOS0wMy0xMy80NWE1M2VmYjIxYTM3YmEyYzE4NGUxOWQxOGEwZTJmZi5pY28ucG5nbX/VOgAAAABJRU5ErkJggg==',
		trust: ' data:image/png;base64,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',
		btu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARgSURBVHgBjVRrbFRFFD5n7tx7W7rFBUtpYRdaHiL+EEkMgho1QZIqLVgUYoIhmAJtSSG12GAICTU0Wq0GaAJ9hBDFBGM01oYF/xjAEBJNq8ZUjbTQWnb7YNPHbumyvY+Z49xKEyCVcpK5uXPOmW9mvm/OQZjCypu7/S5pbwoTCyXhKkDwe34kIEbYMn9YHhqJDl//pHJF4v61eL9jd0t4p9DgY/UbTbPgLw4QGuPw4wxLiASnBaTzM2k2hDJG5Q9ou3+/t2vRH4Bqq6kAi89FDqtImSlkbfag/p2GzmPJnmCoqgrdyZw9zTe22wY7knETn/QJe7GUAlMT5k8VFcHkPYDFod4aJFmUGRdVqRb0gSRD3S/JGHUbwui98agrLY2vIYbrAKhILRUSYJQT6EAUNoSbd7QwN8Y9sJJzke2SqNjnypdnJqweC40A17Wc2AzMEYxeGNdhnc35ciYhrsYFiXheHeUNw6Uy1NFwAPfazDiloDbhrsY2HQNZHQzoRP36YK23Qc3nPc+P+LRXYilwwJtrAj7lki7MG6QxjTFuozMcnqO3ukTrThYEL5WGehYJ1H4B4a7lFMjaimq7ua2dRyavH01nmxMG7EAJUSXslyc2BN+djFXXh+dzExcyQe060rPKdak+f2HX7pZI9dKBtH7GJbyuOPHHVuT4Jq7/fe+h2waW6AT7GgoCcxsLguV3C3ewNNg7yxlsZYitjLGVjY2ke/7cvvEv3NRECpaEIn0SIVWJcIxxRkzI8tlxOlC9dUE9PMB2Kt4Vh/uXRMUmLel0jc80A8ik9ETJ0ohKJMMGEERpY3Jj+riWgGlMI9zvcsiKpxHN0M2AK/VRwxhVD8MrAIIO9TQTSn6lohtzXXc6PCCkFLXQnzS1TO9kPsOwXD7HUVRAv9LkuEK+SBr+fivdOEUmy5oOUL3B9xlAe2Zc6wZIiYJhmwmReFyVJlxV8ScIRbllOYWCYaJvNtaWNHfnPAjQEJQLBOGrTv9A5basRDe4uSNp9A4nCS2E6G9av7DLS6w737m6g1K+EYZxsSTU+5smqe34hsAHk0BVVcR82X2zO1GuVrH2puKnHc/vGpDnMLaM2Y7zmZrn7DgbfskL7H11qTXvpr3PdOGK4qnQ1aCy7NuezUSENY3XH5mZO5RtW7cVU7BGIFye2OT0tUxbx7cR5bGJWi49GzmsVH4Lh5LPNGxbEq2tv5YpjJTscAasRQYrBFCe6ihJpewVkOIrwdg8JWVNfX7QX1fXaf65OPWgRrAls+3k8ruaQ+SymqxWnA6oepVzk7DRvCVGTc6sIe7weLr+nOL3NZW6Ur3bJd4aL08yYExSjFx3ZUNh7j98EjC7bf6L1vJInkr2Oxp2jTtilNvjVkXRst47KT1qnNnTHF7l6PCzbuNTDjpxLk3yiWTsoy2L417SPf3Q4+nDrwcyzKSYZYnkSHqqqTv9ODLZ6+7Q86vi7nRTfuDoVOoj/I954BMJ/30JHtL+BTSLDgY3o5/AAAAAAElFTkSuQmCC'
	}
      }
      /*
       *	Utilities functions
       */
      
      const getLanguage = () => {
	const languageParam = findGetParameter("hl")
	if (languageParam && BTUlanguage.length) {
	  const lowerCaseLanguage = languageParam.toLowerCase()
	  if (supportedLanguages.includes(lowerCaseLanguage)) {
	    return lowerCaseLanguage
	  }
	}
	if (BTUlanguage !== undefined && BTUlanguage.length) {
	  const lowerCaseLanguage = BTUlanguage.toLowerCase()
	  if (supportedLanguages.includes(lowerCaseLanguage)) {
	    return lowerCaseLanguage
	  }
	}
	return defaultLanguage
      }
      
      const findGetParameter = (parameterName) => {
	var result = null, tmp = []
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
	    tmp = items[index].split("=");
	    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
	}
	return result;
      }
      
      const inputWallet = (addr) => {
	if (addr && /^0[xX][0-9A-Fa-f]{40}$/.test(addr)) {
	  sessionStorage.setItem('BTU-walletAddr', addr)
	  sessionStorage.setItem("BTU-walletConnected", true)
	  $("#btu-conStatus").html(getWalletProvider() + " " + t("connected"))
	  $("#btu-walletSpan").html(addr.substring(0, 5) + '...' + addr.substring(38, 42))
	  $("#btu-statusLed > circle").css("color", "#0ca768")
	  $("#btu-statusLed > circle").css("fill", "#0ca768")
	  $("#btu-modalOut").hide()
	}
      }
		
      const t = (path) => {
	const l = getLanguage()
	const pathArr = path.split(".")
	let tmp = meta[l]
	pathArr.forEach(next => {
	  if (tmp[next] !== undefined)
	    tmp = tmp[next]
	})
	if (typeof tmp !== "string")
	  return ""
	return tmp
	  }
	
	//var pars = new UAParser();
	//var uastring = window.navigator.userAgent;
	//pars.setUA(uastring);
	//var result = pars.getResult();

      const getWalletProvider = () => {
	if (window.web3) {
		/*if (result.browser.name === "Opera") {
			const provider_opera = [{name: "Opera", icon: 'opera'}]
			let final = ""
			provider_opera.forEach(elem => {
					final = elem.name
				if (elem.icon)
				  final = `<img id='btu-provider-img' alt="" src=${icons.walletProviders[elem.icon]}></img>` + final
				  }
				)
			if (final.length)
			  return final
			if (typeof window.__CIPHER__ !== 'undefined')
				return 'Cipher';
			if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
				return 'Infura';
			if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
				return 'Localhost';
			return '';
			}*/
		const providers = [
		  {tag: "isMetaMask", compare: true, name: "Metamask", icon: 'metamask'},
		  {tag: "isTrust", compare: true, name: "Trust", icon: 'trust'},
		  {tag: "isGoWallet", compare: true, name: "GoWallet", icon: 'go'},
		  {tag: "isAlphaWallet", compare: true, name: "BTU Direct", icon: 'btu'},
		  {tag: "isStatus", compare: true, name: "Status", icon: 'status'},
		  {tag: "isEnjin", compare: true, name: "Enjin", icon: 'enjin'},
		  {tag: "isToshi", compare: true, name: "Coinbase", icon: 'coinbase'},
		  {tag: "constructor.name", compare: "EthereumProvider", name: "Mist", icon: null},
		  {tag: "constructor.name", compare: "Web3FrameProvider", name: "Parity", icon: 'parity'}
		]
		let final = ""
		providers.forEach(elem => {
		  let tmp
		  if (elem.tag.indexOf(".") !== -1)
			tmp = window.web3.currentProvider[elem.tag.split(".")[0]][elem.tag.split(".")[1]]
		  else
			tmp = window.web3.currentProvider[elem.tag]
		  if (tmp === elem.compare) {
			final = elem.name
			if (elem.icon)
			  final = `<img id='btu-provider-img' alt="" src=${icons.walletProviders[elem.icon]}></img>` + final
		  }
		})
		if (final.length)
		  return final
		if (typeof window.__CIPHER__ !== 'undefined')
			return 'Cipher';
		if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
			return 'Infura';
		if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
			return 'Localhost';
		return '';
	} else {
		return '';
	}
}
      
      /*
       *	Dom elements
       */
      
      const dappBarHtml = `
      <div id='btu-conStatus'>${t("connectionRequired")}</div>
      <div id='btu-openModal'>
	<span id='btu-walletSpan'>${t("notConnected")}</span>
	<svg id='btu-statusLed' focusable='false' viewBox='0 0 24 24' aria-hidden='true' role='presentation'>
	  <circle id='btu-statusLedIn' cx='12' cy='12' r='10'></circle>
	  <path fill='none' d='M0 0h24v24H0z'></path>
	</svg>
	<svg id='btu-modalBtn' focusable='false' viewBox='0 0 24 24' aria-hidden='true' role='presentation'>
	  <path fill='none' d='M0 0h24v24H0z'></path>
	  <path d='M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z'></path>
	</svg>
      <div>`
      
      const modalHtml = `
      <div id='btu-modalOut'>
	<div id='btu-modalIn'>
	  <div id='btu-modal-text'>
	  </div>
	  <div id='btu-modal-action'>
	  </div>
	  <div id='btu-powered'>
	    Powered by BTU Protocol
	  </div>
	</div>
      </div>
      `
      
      const modalCreateContent = {
	top: `
	  <img id='btu-modal-img' alt="" src=${icons.withoutWallet}></img>
	  <p>${t("usingBTU.using")}</p>
	  <p>${t("usingBTU.choiceConnected")}</p>
	`,
	bottom: `
	  <div id='btu-btn-create' class='btu-btn btu-btn-blue'>
	    ${t("usingBTU.createWallet").toUpperCase()}
	  </div>
	  <div id='btu-btn-has' class='btu-btn btu-btn-white'>
	    ${t("usingBTU.hasWallet").toUpperCase()}
	  </div>
	`
      }
      
      const modalConnectContent = {
	top: `
	  <img id='btu-modal-img' alt="" src=${icons.electronicWallet}></img>
	  <p>${t("isCreated.afterCreate")}</p>
	`,
	bottom: `
	  <div id='btu-btn-hasCreated' class='btu-btn btu-btn-blue'>
	    ${t("isCreated.hasCreated").toUpperCase()}
	  </div>
	  <div id='btu-btn-has' class='btu-btn btu-btn-white'>
	    ${t("isCreated.hasWallet").toUpperCase()}
	  </div>
	`
      }
      
      const modalTypeContent = {
	top: `
	  <img id='btu-modal-img' alt="" src=${icons.electronicWallet}></img>
	  <p>${t("inputWallet.howTo")}</p>
	`,
	bottom: `
	  <div id='btu-input-title'>${t("inputWallet.addrBTU")}</div>
	  <input id='btu-wallet-input' data-btu-type='btu-input' placeholder="${t("inputWallet.placeholder")}"></input>
	  <p id='btu-error'></p>
	  <div id='btu-wallet-type' class='btu-btn btu-btn-blue'>
	    ${t("inputWallet.inputCo").toUpperCase()}
	  </div>
	`
      }
      
      const modalDoneContent = () => {return {
	top: `
	  <img id='btu-modal-img' alt="" src=${icons.electronicWallet}></img>
	  <p><b>${t("isConnected.nowCo")}</b></p>
	  <p>${sessionStorage.getItem("BTU-walletAddr")}</p>
	`,
	bottom: `
	<div id='btu-change-wallet' class='btu-btn btu-btn-blue'>
	  ${t("isConnected.switchWallet").toUpperCase()}
	</div>
	`
      }}
      
      const BTUstyles = `
      #btu-placeholder {max-width: calc(100%); width: 100%; display: flex; background-color: #303030; justify-content: space-between; color: white; padding-left: 15px; padding-right: 15px}
      #btu-conStatus {display: block; font-family: Lato; font-size: 13px; font-weight: 500; line-height: 20px; margin-top: 1px}
      #btu-walletSpan {display: inline-block; font-family: Lato; font-size: 13px; font-weight: 400; line-height: 20px; margin-top: -20px}
      #btu-statusLed {color: rgb(227, 70, 82); font-size: 24px; height: 12px; margin-bottom: -1px;} #btu-statusLedIn {fill: rgb(227, 70, 82); color: rgb(227, 70, 82); font-size: 24px;}
      #btu-modalBtn {color: white; cursor: pointer; font-size: 25px; height: 16px; width: 18px; box-sizing: border-box; text-align: center; fill: white; margin-bottom: -3px}
      #btu-modalOut {max-width: 100%; cursor: default; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1300; background-color: rgba(0, 0, 0, 0.5); opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}
      #btu-modalIn {padding: 25px; position: fixed; top: 50%; left: 50%; height: auto; width: 70%; background-color: white; max-width: 500px; max-height: calc(100% - 96px); flex: 0 1 auto; box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12); border-radius: 4px; display: flex; position: relative; overflow-y: auto; flex-direction: column; flex: 0 1 auto; transform: translate(-50%, -50%)}
      #btu-modal-text, #btu-modal-text > p {width: 100%; text-align: center; margin-top: 10px; margin-bottom: 10px; color: rgba(0, 0, 0, 0.54); font-family: Poppins;}
      #btu-modal-action {width: 100%; text-align: center; margin-bottom: 10px; color: rgba(0, 0, 0, 0.54); font-family: Poppins;}
      #btu-input-title {text-align: left; font-weight: bold; margin-bottom: 10px;}
      #btu-wallet-input {margin-bottom: 5px; width: 100%; border: 0.5px solid #797979; height: 45px; margin-top: 5px !important; padding-left: 20px; border-radius: 25px; padding-right: 20px; color: rgba(0, 0, 0, 0.87); cursor: text; display: inline-flex; font-size: 1rem; font-family: 'Lato', sans-serif; line-height: 1.1875em; align-items: center;}
      #btu-error {color: #e34652; font-size: 0.9em; margin-top: 6px; font-weight: bold; font-family: "Poppins";}
      #btu-powered {display: block; width: 100%; color: #797979; font-size: 10px; font-family: Poppins; text-align: right;}
      #btu-openModal {cursor: pointer;}
      #btu-provider-img {margin-bottom: -1.5px; margin-right: 5px; height: 16px;}
      .btu-btn {cursor: pointer; line-height: 60px; height: 60px; text-align: center; margin-bottom: 10px; font-size: 16px; vertical-align: middle; box-sizing: border-box; font-family: 'Poppins', sans-serif; font-weight: bold; padding-left: 20px; border-radius: 30px; padding-right: 20px;}
      .btu-btn-blue {background: #5bace2 !important; color: white !important;}
      .btu-btn-white {background: white !important; color: #5bace2; !important; border: 1px solid #5bace2;} .btu-btn-white:hover {text-decoration: none; background-color: rgba(0, 0, 0, 0.08);}
      `
      
      /*
       *	Initilization
       */
      
      $(() => {
	if ($(`#${placeholderTag}`).length === 0) {
	  console.log(t("placeholderMissing"))
	  return
	}
	const debug = findGetParameter("debug") ? true : false

	/* Already on html
	const jquery = document.createElement("script")
	const web3js = document.createElement("script")
	jquery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
	jquery.async = true
      
	web3js.src = "https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js"
	web3js.async = true
	document.body.appendChild(jquery)
	document.body.appendChild(web3js)
	*/

	let style = document.createElement('style')
	style.type='text/css'
	if (style.styleSheet) {
	   style.styleSheet.cssText = BTUstyle
	} else {
	   style.appendChild(document.createTextNode(BTUstyles))
	}
      
	document.getElementsByTagName('head')[0].appendChild(style)
	let link = document.createElement('link')
	link.rel = "stylesheet"
	link.href = "https://fonts.googleapis.com/css?family=Poppins&display=swap"
	document.getElementsByTagName('head')[0].appendChild(link)
	link = document.createElement('link')
	link.rel = "stylesheet"
	link.href = "https://fonts.googleapis.com/css?family=Lato&display=swap"
	document.getElementsByTagName('head')[0].appendChild(link)
      
	sessionStorage.setItem('BTU-walletAddr', defaultAddr)
	sessionStorage.setItem("BTU-walletConnected", false)
      
	let restrictDomain = $(`#${placeholderTag}`).data("restrict-domain")

	if (restrictDomain) {
	  restrictDomain = restrictDomain.split(",")
	  if (restrictDomain.length === 1)
	    restrictDomain = restrictDomain[0]
	}
      
	const onAccountGet = (err, res) => {
	  if (err) {
	    console.log("BTU Dappbar Error getting ETH account:\n", err)
	  } else {
	    inputWallet(res[0])
	  }
	}
      
	if (restrictDomain === undefined
	  || (typeof restrictDomain == "string" && restrictDomain === window.location.hostname)
	  || (Array.isArray(restrictDomain) && restrictDomain.includes(window.location.hostname))) {
	  $(document).ready(async () => {
	    if (debug) {
				alert("document ready/" + window.location.hostname)
				//alert()
	      alert((window.ethereum ? " detected wallet true" : "detected wallet false"))
	      //alert(window.ethereum)
	    }
	    if (window.ethereum) {
	      if (debug)
		alert("detected etherum wallet at " + result.browser.name + " browser")
	      window.web3 = new Web3(ethereum)
	      try {
		if (debug)
		  alert("Classic web3 wallet")
		await ethereum.enable()
		if (debug)
		  alert("Connected")
		console.log(givenProvider.web3)
		window.web3.eth.getAccounts(onAccountGet)
	      } catch (error) {
		console.log("BTU Dappbar Error enabling ETH account:\n", error)
		  }
		} else if (window.web3) {
	      if (debug)
		alert("Simple web3")
	      window.web3 = new Web3(web3.currentProvider)
	      window.web3.eth.getAccounts(onAccountGet)
	    } else {
	      if (debug)
		alert("non etherum browser")
	      console.log(t("nonEtherumBrowser"));
	    }
	  })
	} else {
	  if (debug) {
	    alert("Not connecting")
	  }
	}
      
	if (restrictDomain !== undefined
	  && (typeof restrictDomain == "string" && restrictDomain !== window.location.hostname
	  || (Array.isArray(restrictDomain) && !restrictDomain.includes(window.location.hostname)))) {
	    const walletAddr = findGetParameter("w")
	    const addresseBTU = sessionStorage.getItem("BTU-walletAddr")
	    const pattern = new RegExp('^0[xX][0-9A-Fa-f]{40}$')
	    if (walletAddr !== null && pattern.test(walletAddr) && addresseBTU !== walletAddr)
	      inputWallet(walletAddr)
	    else if (walletAddr === null || !pattern.test(walletAddr))
	      sessionStorage.setItem('BTU-walletAddr', defaultAddr)
	    return null
	} else {
	  // Insert in dom
	  if (debug) {
	  alert("inserting")
	  }
	  $(`#${placeholderTag}`).html(dappBarHtml + modalHtml)
	  changeModal("create")
	}
      });
      
      /*
       *	Dom functions
       */
      
      const changeModal = (type) => {
	let next
	if (type === "create") {
	  next = modalCreateContent
	} else if (type == "connect") {
	  next = modalConnectContent
	} else if (type == "type") {
	  next = modalTypeContent
	} else if (type == "done") {
	  next = modalDoneContent()
	} else
	  return
	$(`#btu-modal-text`).html(next.top)
	$(`#btu-modal-action`).html(next.bottom)
      }
      
      /*
       *	Click functions
       */
      
      $(() => {
	$(document).on("click", "#btu-openModal", () => {
	  const connected = sessionStorage.getItem("BTU-walletConnected")
	  if (connected === "true")
	    changeModal("done")
	  else
	    changeModal("create")
	  //change content of div to create or logged depending on connected or not
	  $("#btu-modalOut").show()
	})
      
	$(document).on("click", "#btu-modalIn", (e) => {
	  e.stopPropagation()
	})
      
	$(document).on("click", "#btu-modalOut", (e) => {
	  $("#btu-modalOut").hide()
	  e.stopPropagation()
	})
      
	$(document).on("click", "#btu-btn-create", () => {
	  if (/Mobi|Android/i.test(navigator.userAgent))
	    window.open('https://btu-direct.com/', '_blank')
	  else if (getLanguage() === 'fr')
	    window.open('https://btu-direct.com/', '_blank')
	  else
	    window.open('https://btu-direct.com/', '_blank')
	  changeModal("connect")
	})
      
	$(document).on("click", "#btu-btn-hasCreated", () => {
	  window.reload()
	})
      
	$(document).on("click", "#btu-btn-has", () => {
	  changeModal("type")
	})
      
	$(document).on("click", "#btu-wallet-type", () => {
	  const enteredWallet = $("input[data-btu-type='btu-input']").val() //Could not get input value
	  if (enteredWallet && /^0[xX][0-9A-Fa-f]{40}$/.test(enteredWallet))
	    inputWallet(enteredWallet)
	  else {
	    $("#btu-wallet-input").css("border", "1.5px solid #e34652")
	    if (enteredWallet && enteredWallet.length) {
	      $("#btu-error").text(t("inputWallet.invalidETH"))
	    } else {
	      $("#btu-error").text(t("inputWallet.requiredETH"))
	    }
	  }
	})
      
	$(document).on("click", "#btu-change-wallet", () => {
	  changeModal("type")
	})
      })