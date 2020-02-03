const canvas = document.getElementById('imagine');
const context = canvas.getContext('2d');
var existImg = false;
var rect = false;
var btnPressed;
var img = document.createElement("img");
document.addEventListener('DOMContentLoaded', app);
function app() {
    
    context.font = "20px Times New Roman";
    context.fillText("Drag and drop an image here", 200, 50);
    logo = new Image();
    
    logo.src = 'media/drop.png';
    logo.onload = function () {
        context.drawImage(logo, 200, 150);
        existImg = false;
    }
    img.addEventListener("load", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = event.target.height;
        canvas.width = event.target.width;
        context.drawImage(img, 0, 0);
        console.log("initial" + canvas.width + "height=" + canvas.height);
        existImg = true;
        
    });
    document.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    document.addEventListener("drop", function (e) {
        e.preventDefault();
    });
    
    canvas.addEventListener("drop", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var images = event.dataTransfer.files;
        var reader = new FileReader();
            var file = images[0];
                reader.onload = function (evenim) {
                    img.src = evenim.target.result;
                };
                reader.readAsDataURL(file);
            existImg = true;
        event.preventDefault();
    });
    canvas.addEventListener("dragover", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.preventDefault();
    });
    let btnSave = document.getElementById('btnSave');
    btnSave.addEventListener('click', save);
    
    function save(e) {
       
            var audio = new Audio("media/click-sounds.mp3");
            audio.load();
            audio.play();
            if (existImg)
        {
            var toDownl = canvas.toDataURL("image/png");
            var dnl = document.createElement('a');
            dnl.href = toDownl;
            dnl.download = "new_image.png";
            
            dnl.click();
        }
    }
    let btnCrop = document.getElementById('btnCrop');
    btnCrop.addEventListener('click', e=> {
        var audio = new Audio("media/click-sounds.mp3");
        audio.load();
        audio.play();
        btnPressed = 'crop';
        if (existImg) {
            let mousex = 0, mousey = 0;
            let drawing = false;
            let xn = 0, yn = 0;
            function drawRect() {
                    context.beginPath();
                    context.rect(Math.min(xn, mousex), Math.min(yn, mousey), Math.abs(mousex - xn), Math.abs(mousey - yn));
                    context.strokeStyle = 'forestgreen';
                    //context.setLineDash([6]);
                    context.lineWidth = 3;
                    context.stroke();
                    context.beginPath();
                
                       
            }
            canvas.addEventListener('mousedown', e=> {
                drawing = true;
                rect = true;
                xn = mousex;
                yn = mousey;

            });

            canvas.addEventListener('mousemove', e => {
                mousex = e.clientX - canvas.getBoundingClientRect().left;
                mousey = e.clientY - canvas.getBoundingClientRect().top;



            }, false);

            canvas.addEventListener('mouseup', e=> {
                if (drawing && rect && btnPressed=='crop') {
                    drawRect();
                    drawing = false;
                    rect = false;
                }
                       

            });
        }
    });
    let btnScaling = document.getElementById('btnScaling');
    btnScaling.addEventListener('click', scaling);
    function scaling() {
        var audio = new Audio("media/click-sounds.mp3");
        audio.load();
        audio.play();
        btnPressed = 'scaling';
        if (existImg) {
            let mousexn = 0, mouseyn = 0;
            let drawing = false;
            let xn = 0, yn = 0;
            function draw() {
                
                context.beginPath();
                context.moveTo(xn, yn);
                context.lineTo(mousexn, mouseyn);
                context.fillStyle = 'blue';
                context.strokeStyle = 'navy';
                context.lineWidth = 3;

                context.fill();
                context.stroke();
                context.beginPath();
                    
               
            }
           
            
            canvas.addEventListener('mousedown', e=> {
                drawing = true;
                rect = false;
                xn = mousexn;
                yn = mouseyn;

            });

            canvas.addEventListener('mousemove', e => {
                mousexn = e.clientX - canvas.getBoundingClientRect().left;
                mouseyn = e.clientY - canvas.getBoundingClientRect().top;


            });

            canvas.addEventListener('mouseup', e=> {
                if (drawing && !rect&& btnPressed=='scaling')
                {
                    draw();
                    drawing = false;
                    rect = true;
                }
            });
           
            
        }
    }
        
    let btnClear = document.getElementById('btnClear');
    btnClear.addEventListener('click', function (e) {
        var audio = new Audio("media/click-sounds.mp3");
        audio.load();
        audio.play();
        if (existImg)
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
            existImg = false;
        }
    });
    let btnCropWithValues = document.getElementById("btnCropWithValues");
    let tbWidth = document.getElementById("tbwidth");
    let tbHeight = document.getElementById("tbheight");
    tbHeight.addEventListener("focus", function (e) {
    var Width = document.getElementById("tbwidth").value;
    var Height = document.getElementById("tbheight").value;
        if(Width.length>1)
        {
            tbHeight.readOnly = true;
            var buc = (canvas.width - Width) / canvas.width;
            tbHeight.value = Math.round(canvas.height - buc * canvas.height);
          
        }
        else {
            tbHeight.readOnly = false;
        }
    });
    tbWidth.addEventListener("focus", function (e) {
        var Width = document.getElementById("tbwidth").value;
        var Height = document.getElementById("tbheight").value;
        if (Height.length > 1) {
            var buc = (canvas.height - Height) / canvas.height;
            tbWidth.readOnly = true;
            tbWidth.value = Math.round(canvas.width - buc*canvas.width);

        }
        else {
            tbWidth.readOnly = false;
        }
    });
  
    btnCropWithValues.addEventListener('click', function (e) {
        var audio = new Audio("media/click-sounds.mp3");
        audio.load();
        audio.play();
        
        var Width = document.getElementById("tbwidth").value;
        var Height = document.getElementById("tbheight").value;
        if (existImg) {
            if (Width.length > 1) {
                var buc =( canvas.width - Width)/canvas.width;
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = Width;
                canvas.height = canvas.height-buc*canvas.height;
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            }
            else if (Height.length > 1) {
                var buc = (canvas.height - Height)/canvas.height;
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = canvas.width-buc*canvas.width;
                canvas.height = canvas.height;
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                
            }
            
        }
    });
}
