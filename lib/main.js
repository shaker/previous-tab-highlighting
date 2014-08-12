var tabs = require("sdk/tabs");
var window_utils = require("sdk/window/utils");
var tabs_utils = require("sdk/tabs/utils");

require("sdk/simple-prefs").on("", onPrefChange);

var style_name;
var style_value;

setPref();

var prev_tab = mGetActiveTab();
var last_tab = mGetActiveTab();

function highlightPrevTab(tab) {
  prev_tab.style.setProperty(style_name, '', 'important');
  prev_tab = last_tab;
  prev_tab.style.setProperty(style_name, style_value, 'important');
  last_tab = mGetActiveTab();
}

function mGetActiveTab() {
  var window = window_utils.getMostRecentBrowserWindow();
  var tab = tabs_utils.getActiveTab(window);
  return tab;
}
  
function onPrefChange() {
  prev_tab.style.setProperty(style_name, '', 'important');
  setPref();
}

function setPref() {
  var style_radio = require("sdk/simple-prefs").prefs.style_radio;
  
  if (style_radio == "bold")
  {
    style_name = "font-weight";
    style_value = "bold";
  }
    
  if (style_radio == "opacity")
  {
    style_name = "opacity";
    style_value = "0.5";
  }
  
  if (style_radio == "custom")
  {
    style_name = require("sdk/simple-prefs").prefs.css_name;
    style_value = require("sdk/simple-prefs").prefs.css_value;
  }
}
  
tabs.on('activate', highlightPrevTab);