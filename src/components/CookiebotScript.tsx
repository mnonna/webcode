"use client";

import { useEffect } from "react";

const COOKIEBOT_ID = "Cookiebot";

export default function CookiebotScript() {
  useEffect(() => {
    if (document.getElementById(COOKIEBOT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = COOKIEBOT_ID;
    script.src = "https://consent.cookiebot.com/uc.js";
    script.dataset.cbid = "be4e92a1-753d-4615-ae2f-8df7a5dfd991";
    script.dataset.blockingmode = "auto";
    script.type = "text/javascript";

    document.head.appendChild(script);
  }, []);

  return null;
}
