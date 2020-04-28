new ClipboardJS("#copyBtn");

document.querySelector("#copyBtn").addEventListener("click", () => alert("Code has been copied. Enjoy!"));
document.querySelector("#themeBtn").addEventListener("click", GenerateTheme);


function GenerateRandomColor() {
  const chars = "0123456789ABCDEF";
  
  let color = "#";
  
  for (let i = 0; i < 6; ++i) {
    let charIndex = Math.floor(Math.random() * 16);
    color += chars[charIndex];
  }
  
  return color;
}


function GenerateTheme() {
  let theme = {
        content: {
        teal: GenerateRandomColor(),
        lgreen: GenerateRandomColor(),
        orange: GenerateRandomColor(),
        yellow: GenerateRandomColor(),
        lavender: GenerateRandomColor(),
        pink: GenerateRandomColor(),
        vlgrey: GenerateRandomColor(),
        lgrey: GenerateRandomColor(),
        guiwhite: GenerateRandomColor(),
        black: GenerateRandomColor(),
        blue: GenerateRandomColor(),
        green: GenerateRandomColor(),
        red: GenerateRandomColor(),
        gold: GenerateRandomColor(),
        purple: GenerateRandomColor(),
        magenta: GenerateRandomColor(),
        grey: GenerateRandomColor(),
        dgrey: GenerateRandomColor(),
        white: GenerateRandomColor(),
        guiblack: GenerateRandomColor(),
        paletteSize: 10,
        border: Math.random(),
    }};
  
    document.querySelector("#result").innerText = JSON.stringify(theme, 10, 10);
  
    MakePreview(theme);   
}



function MakePreview(theme) {
  document.querySelector("#preview").style.backgroundColor = theme.content.white;
  document.querySelector("#preview").style.visibility = "visible";
  
  document.querySelector("p").style.visibility = "visible";
  
  let colorHash = {
    "#blueTeam": "blue",
    "#greenTeam": "green",
    "#redTeam": "red",
    "#magentaTeam": "magenta",
    "#triangle": "orange",
    "#square": "gold",
    "#pentagon": "purple",
    "#crasher": "pink",
    "#gameText": "guiwhite",
  }
  
  
  for (let selector in colorHash) {
    const currentSVG = document.querySelector(selector);
    currentSVG.style.fill = theme.content[ colorHash[selector] ];
    
    // Make it so that an object in the preview,
    // and the corresponding part of theme itself,
    // recieves a new random color when clicked
    currentSVG.addEventListener("click", () => {
      
      const newColor = GenerateRandomColor();
      currentSVG.style.fill = newColor;
      theme.content[ colorHash[selector] ] = newColor;
      
      document.querySelector("#result").innerText = JSON.stringify(theme, 10, 10);
    });
  }
 
  
  document.querySelectorAll(".barrelsAndRocks").forEach((item) => {
    item.style.fill = theme.content.grey;
    
    // when a barrel or rock is clicked, generate a new random color for it, and adjust the theme's grey color
    item.addEventListener("click", () => {
      const newColor = GenerateRandomColor();
      theme.content.grey = newColor;
      
      document.querySelectorAll(".barrelsAndRocks").forEach((item) => {
        item.style.fill = newColor;
      });
      
      document.querySelector("#result").innerText = JSON.stringify(theme, 10, 10);
    });
  });
  
  
  const borders = document.querySelectorAll("svg *");
  for (let i = 0; i < borders.length; ++i) {
    borders[i].style.stroke = theme.content.black;
  }
  
 
  // adding a button to change background color because clicking the bg directly prevents the svg shape event listeners from triggering
  document.querySelector("#changeBackgroundBtn").style.visibility = "visible";
  
  document.querySelector("#changeBackgroundBtn").addEventListener("click", () => {
    const newColor = GenerateRandomColor();
    document.querySelector("#preview").style.backgroundColor = newColor;
    theme.content.white = newColor;
    
    document.querySelector("#result").innerText = JSON.stringify(theme, 10, 10);
  });
  
  
  document.querySelector("#changeBorderBtn").style.visibility = "visible";
  
  // borders are too small to click, so adding button to make it easier to change their color
  document.querySelector("#changeBorderBtn").addEventListener("click", () => {
    const newColor = GenerateRandomColor();
    theme.content.black = newColor;
    document.querySelector("#result").innerText = JSON.stringify(theme, 10, 10);
    
    const borders = document.querySelectorAll("svg *");
    borders.forEach((item) => {
      item.style.stroke = newColor;
    });
  });
}
