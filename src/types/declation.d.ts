// 이미지 파일 모듈 선언
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

////

// svg 파일 모듈 선언
declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.svg?url" {
  const content: any;
  export default content;
}

////

// 폰트 파일 모듈 선언
declare module "*.woff" {
  const content: any;
  export default content;
}

declare module "*.ttf" {
  const content: any;
  export default content;
}
declare module "*.otf" {
  const content: any;
  export default content;
}

////
