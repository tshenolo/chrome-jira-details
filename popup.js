let changeColor = document.getElementById("changeColor");

changeColor.addEventListener("click", async () => {
  let inputtag = document.querySelector("#tagcolor");
  chrome.storage.sync.set({ inputtag: inputtag.value });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setBorderColor,
  });
});


function setBorderColor() {
  chrome.storage.sync.get("inputtag", ({ inputtag }) => {
    //console.log(inputtag);

    jSelector = document.querySelector('#summary-val')
    if(typeof(jSelector) == 'undefined' || jSelector == null){
      alert("Navigate to a specific jira");
      return;
    } 

    jUrl = window.location.href;
    urlParts = jUrl.split("/");
    jNumber =  urlParts[urlParts.length - 1];
    jTitle = document.querySelector('#summary-val').innerText;
    jDescription = document.querySelector('.user-content-block').innerText; 

    if(inputtag == 'title'){
      content = jNumber + ": " + jTitle;
      //console.log(content);
      navigator.clipboard.writeText(content);
      alert("Copied to Clipboard");
    }
    
    if(inputtag == 'copydetails'){
      content = "Jira: "+jNumber + "\n";
      content = content + "Title: "+jTitle + "\n";
      content = content + "Description: "+"\n\n"+jDescription + "\n\n";
      content = content + "------------------------------------------------------------------";
      content = content + "\n\n";
      //console.log(content);
      navigator.clipboard.writeText(content);
      alert("Copied to Clipboard");
    }

    if(inputtag == 'savedetails'){
      content = "Jira: "+jNumber + "\n";
      content = content + "Title: "+jTitle + "\n";
      content = content + "Description: "+"\n\n"+jDescription + "\n\n";
      content = content + "------------------------------------------------------------------";
      content = content + "\n\n";
      //console.log(content); 

      filename = "Analysis_"+jNumber+".txt";
      fileContent = content;
      bb = new Blob([fileContent ], { type: 'text/plain' });
      a = document.createElement('a');
      a.download = filename;
      a.href = window.URL.createObjectURL(bb);
      a.click();
    }

  });
}


