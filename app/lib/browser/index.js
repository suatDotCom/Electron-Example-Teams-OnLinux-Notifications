"use strict";

(function() {
  const path = require("path");
  const { ipcRenderer } = require("electron");
  const trayNotifications = require("./tray-notifications");
  const nativeNotifications = require("./native-notifications");
  var pageTitle = null;
  var pageTitleChanged = null;
  const notifier = require("electron-notifications");
  const iconPath = path.join(__dirname, "../assets/icons/icon-96x96.png");
  trayNotifications({
    ipc: ipcRenderer,
    iconPath
  });

  // document.addEventListener(
  //   "DOMContentLoaded",
  //   nativeNotifications({
  //     ipc: ipcRenderer,
  //     iconPath
  //   })
  // );

  function NotificationTrigger() {
    var notification = notifier.notify("Teams", {
      message: "Yeni Mesaj Var!",
      icon: iconPath,
      buttons: ["Dismiss"],
      vertical: true
    });

    notification.on("clicked", function() {
      notification.close();
    });
  }

  // function titleController() {
  //   setInterval(function() {
  //     pageTitleChanged = document.getElementsByTagName("title")[0].innerText;
  //     if (pageTitle !== pageTitleChanged) {
  //       if (
  //         pageTitleChanged !== titles.Activity ||
  //         pageTitleChanged !== titles.Chats ||
  //         pageTitleChanged !== titles.Meetings ||
  //         pageTitleChanged !== titles.Files
  //       )
  //         NotificationTrigger();
  //     }
  //   }, 5000);
  // }

  // const titles = {
  //   Activity: "General (DeepManage-Developers) | Microsoft Teams",
  //   Chats: "Chat | Microsoft Teams",
  //   Meetings: "Microsoft Teams",
  //   Files: "Files | Microsoft Teams"
  // };
  // setTimeout(function() {
  //   pageTitle = document.getElementsByTagName("title")[0].innerText;
  //   titleController();
  // }, 10000);

  var hasNotification = false;
  document.addEventListener("DOMNodeInserted", function(e) {
    var toast = document.getElementById("toast-container");
    console.log(toast);
    if (toast) {
      if (hasNotification == false) NotificationTrigger();

      hasNotification = true;
    }
  });

  document.addEventListener("DOMNodeRemoved", function() {
    hasNotification = false;
  });
})();
