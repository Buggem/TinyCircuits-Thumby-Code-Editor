// sysstorapi-hack
// v0.01 beta
/*
    * For more information and code, visit
    * https://github.com/Buggem/sysstorapi-hack
    */

window.showOpenFilePicker = function(fileoptions) {
    console.log("here")
    window.openfileopt = fileoptions;
    return new Promise((resolve) => {
        
        alert("inside promise openfilepicker")
        resolve([{
            
            getFile: function() {
                alert("got to getfile")
                
                return new Promise((resolve) => {
                    let input = document.createElement('input');
                    input.type = 'file';
                    input.style = "display: none";
                    input.onchange = e => {
                        resolve(e.target.files[0]);
                    }
                    input.click();
                    window.myFileInput = input; // for debugging
                }); // our part is done, we can let the file class do the rest... woo-hoo
            }
        }])
    });
    
};
window.showSaveFilePicker=function(fileoptions) {
    window.savefileopt = fileoptions;
    return new Promise((resolve) => {
    resolve({
            
            kind: "file",
            createWritable: function() {
                
                return new Promise((resolve) => {
                    resolve({
                        write: function(blob){
                            var saveData = function (blob, fileName) {
                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.style = "display: none";
                                    
                                            var url = window.URL.createObjectURL(blob);
                                            a.href = url;
                                            a.download = prompt("Choose a name for the download", fileName);
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                    
                            };
                            if(Object.prototype.toString.call(blob) == "[object Blob]")
                                saveData(blob, savefileopt.suggestedName)
                            else
                                saveData(new Blob(Array.isArray(blob) ? blob : [blob]), savefileopt.suggestedName)
                            resolve();
                        },
                        close:function(){},
                        
                    })
                    //fake the fake file handles fake writable
                });
            },
            getFile: function() {
                
                return new File(["foo"], "foo.txt", {
                  type: "text/plain",
                }); // lol
            }
        }) //fake the file handle
  });
};
