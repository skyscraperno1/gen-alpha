export const initAntiDebug = () => {
  // 调试器检测
  const checkDebugger = () => {
    setInterval(() => {
      debugger
    }, 1000);
  };

  const checkConsole = () => {
    let consoleOpened = false;
    console.log = function() {
      consoleOpened = true;
      window.location.href = ''; 
    };
    setInterval(() => {
      if (consoleOpened) return;
      console.clear();
    }, 1000);
  };

  checkDebugger();
  checkConsole();
};