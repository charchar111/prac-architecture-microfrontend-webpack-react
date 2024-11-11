import React from "react";
import OldMan1 from "@asset/svg/old_man1.svg";
import Group1 from "@asset/svg/group.svg";
import Group1url from "@asset/svg/group.svg?url";

export default function SVGLoader() {
  return (
    <div>
      SVGLoader
      <Group1 />
      {/* svg를 리엑트 컴포넌트로 삽입 */}
      <OldMan1 />
      <img src={Group1url} alt="" />
    </div>
  );
}
