module.exports = {
    launch: {
        headless: false,
        slowMo: 150,  // задержка между действиями (без неё проходит 1 сьют из ~10)
        devtools: false,
        defaultViewport: null,
        args: ['--start-maximized'] //— используем максимальный размер окна браузера
      },    
  };
  