# Orion-X Chrome DevTools Extension
Requires [Chrome v19+] (https://tools.google.com/dlpage/chromesxs/)
### **This extension was developed as research into functionality that has now evolved into & landed as [Chrome DevTools Workspace](https://developers.google.com/chrome-developer-tools/docs/settings#workspace)

##Chrome Web Store Installation
1. Navigate to the [Chrome Web Store](https://chrome.google.com/webstore/detail/orion-x/fjclcbajejgdcahagfjlocnkffnblghc?hl=en-US)
2. Click the blue + FREE button
3. Open DevTools

## Chrome DevTools Installation
1. Clone the repo `git clone https://github.com/XachMoreno/Orion-X.git`
2. Open [chrome://extensions] (chrome://extensions)
3. Select the check box for Developer mode
4. Select Load unpacked extensions...
5. Point the filesystem dialogue to the root of your Orion-X clone
6. Open DevTools
7. Select the DevTools settings gear menu
8. Select Orion-X from the `Open links in` drop down menu

## Sirius Installation
1. Complete the installation process above for Chrome DevTools
2. Uncomment orion.html:lines 23-28 and panel.html:lines 36-41
3. Clone the repo `git clone https://github.com/johnjbarton/sirius.git`
4. Open [chrome://extensions] (chrome://extensions)
5. Select the check box for Developer mode
6. Select Load unpacked extensions...
7. Point the filesystem dialogue to the root of your Sirius clone
8. Select the `Options` link under Sirius
9. Input `Orion` for the extensions name and `chrome-extension://YOUR-ORION-EXTENSION-ID/orion.html` for the URL
10. Select Save
11. Return to [chrome://extensions] (chrome://extensions) and select the `Reload` link under Sirius

---
## Debugging
1. Open Chrome DevTools (Cmd+Opt+i)
2. Select the Orion tab
3. Open Chrome DevTools while the active tab is Orion
