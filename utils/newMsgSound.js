const newMsgSound = senderName => {
  const sound = new Audio("/light.mp3");

  sound && sound.play();

  if (senderName) {
    document.title = `Nuevo mensaje de ${senderName}`;

    let changeBackDocTitle = "";

    switch (location.pathname) {
      case "/":
        {
          changeBackDocTitle = "Bienvenido!";
        }
        break;

      case "/messages":
        {
          changeBackDocTitle = "Mensajes";
        }
        break;

      default:
        {
          changeBackDocTitle = "Bienvenido!";
        }
        break;
    }

    setTimeout(() => {
      document.title = changeBackDocTitle;
    }, 5000);
    // if (document.visibilityState === "visible") {
    //   setTimeout(() => {
    //     document.title = "Messages";
    //   }, 5000);
    // }
  }
};

export default newMsgSound;
