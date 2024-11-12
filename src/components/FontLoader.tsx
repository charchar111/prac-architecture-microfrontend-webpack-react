import { NanumBrushScript, MonsieurLaDoulaise } from "asset/fonts/fontModule";
import React from "react";

export default function FontLoader() {
  console.log("NanumBrushScript", NanumBrushScript);

  return <div style={{ fontFamily: NanumBrushScript.name }}>FontLoader</div>;
}
