var NS4 = (document.layers);    // Which browser?
var IE4 = (document.all);
var win = window;    // window to search.
var n   = 0;
function findInPage(str) {
  var txt, i, found;
  if (str == "")
    return false;
  // Find next occurance of the given string on the page, wrap around to the
  // start of the page if necessary.
  if (NS4) {
    // Look for match starting at the current point. If not found, rewind
    // back to the first match.
    if (!win.find(str))
      while(win.find(str, false, true))
        n++;
    else
      n++;
    // If not found in either direction, give message.
    if (n == 0)
      alert("Not found.");
  }
  if (IE4) {
    txt = win.document.body.createTextRange();
    // Find the nth match from the top of the page.
    for (i = 0; i <= n && (found = txt.findText(str)) != false; i++) {
      txt.moveStart("character", 1);
      txt.moveEnd("textedit");
    }
    // If found, mark it and scroll it into view.
    if (found) {
      txt.moveStart("character", -1);
      txt.findText(str);
      txt.select();
      txt.scrollIntoView();
      n++;
    }
    // Otherwise, start over at the top of the page and find first match.
    else {
      if (n > 0) {
        n = 0;
        findInPage(str);
      }
      // Not found anywhere, give message.
      else
        alert("Not found.");
    }
  }
  return false;
}

document.onmouseover = mOver ;
document.onmouseout = mOut ;

function mOver() {
	var eSrc = window.event.srcElement ;
	if (eSrc.className == "item") {
		window.event.srcElement.className = "highlight";
	}
}

function mOut() {
	var eSrc = window.event.srcElement ;
	if (eSrc.className == "highlight") {
		window.event.srcElement.className = "item";
	}
}


var bV=parseInt(navigator.appVersion);
NS4=(document.layers) ? true : false;
IE4=((document.all)&&(bV>=4))?true:false;
ver4 = (NS4 || IE4) ? true : false;

isExpanded = false;

function getIndex($1) {
	ind = null;
	for (i=0; i<document.layers.length; i++) {
		whichEl = document.layers[i];
		if (whichEl.id == $1) {
			ind = i;
			break;
		}
	}
	return ind;
}

function arrange() {
	nextY = document.layers[firstInd].pageY + document.layers[firstInd].document.height;
	for (i=firstInd+1; i<document.layers.length; i++) {
		whichEl = document.layers[i];
		if (whichEl.visibility != "hide") {
			whichEl.pageY = nextY;
			nextY += whichEl.document.height;
		}
	}
}

function FolderInit(){
	if (NS4) {
	firstEl = "mParent";
	firstInd = getIndex(firstEl);
	showAll();
		for (i=0; i<document.layers.length; i++) {
			whichEl = document.layers[i];
			if (whichEl.id.indexOf("Child") != -1) whichEl.visibility = "hide";
		}
		arrange();
	}
	else {
		tempColl = document.all.tags("DIV");
		for (i=0; i<tempColl.length; i++) {
			if (tempColl(i).className == "child") tempColl(i).style.display = "block";
		}
	}
}

function FolderExpand($1,$2) {
	if (!ver4) return;
	if (IE4) { ExpandIE($1,$2) } 
	else { ExpandNS($1,$2) }
}

function ExpandIE($1,$2) {
	Expanda = eval($1 + "a");
	Expanda.blur()
	ExpandChild = eval($1 + "Child");
        if ($2 != "top") { 
		ExpandTree = eval($1 + "Tree");
		ExpandFolder = eval($1 + "Folder");
	}
	if (ExpandChild.style.display == "none") {
		ExpandChild.style.display = "block";
                if ($2 != "top") { 
                	if ($2 == "last") { ExpandTree.src = "/images/minus.gif"; }
			else { ExpandTree.src = "/images/minus.gif"; }
			ExpandFolder.src = "/images/spacerdropmenu.gif";	
		}
		else { mTree.src = "/images/topopen.gif"; }
	}
	else {
		ExpandChild.style.display = "none";
                if ($2 != "top") { 
	                if ($2 == "last") { ExpandTree.src = "/images/plus.gif"; }
			else { ExpandTree.src = "/images/plus.gif"; }
			ExpandFolder.src = "/images/spacerdropmenu.gif";
		}
		else { mTree.src = "/images/topopen.gif"; }
	}
}
function ExpandNS($1,$2) {
	ExpandChild = eval("document." + $1 + "Child")
        if ($2 != "top") { 
		ExpandTree = eval("document." + $1 + "Parent.document." + $1 + "Tree")
		ExpandFolder = eval("document." + $1 + "Parent.document." + $1 + "Folder")
	}	
	if (ExpandChild.visibility == "hide") {
		ExpandChild.visibility = "show";
                if ($2 != "top") { 
               		if ($2 == "last") { ExpandTree.src = "/images/minus.gif"; }
			else { ExpandTree.src = "/images/minus.gif"; }
			ExpandFolder.src = "/images/spacerdropmenu.gif";	
		}
		else { mTree.src = "images/topopen.gif"; }
	}
	else {
		ExpandChild.visibility = "hide";
                if ($2 != "top") { 
               		if ($2 == "last") { ExpandTree.src = "/images/plus.gif"; }
			else { ExpandTree.src = "/images/plus.gif"; }
			ExpandFolder.src = "/images/spacerdropmenu.gif";	
		}
		else { mTree.src = "/images/top.gif"; }
	}
	arrange();
}

function showAll() {
	for (i=firstInd; i<document.layers.length; i++) {
		whichEl = document.layers[i];
		whichEl.visibility = "show";
	}
}


with (document) {
	write("<STYLE TYPE='text/css'>");
	 {
		write(".parent { font:10px; Verdana, Arial, Helvetica, sans-serif; text-decoration:none; color: red }");
		write(".child { color: black; font: 10px; Arial, Helvetica, sans-serif; display:none }");
	        write(".item { color: black; text-decoration:none; cursor: hand }");
	        write(".highlight { color: blue; text-decoration:none }");
	        write(".icon { margin-right: 2 }")
	}
	write("</STYLE>");
}

onload = FolderInit;