import React from "react";
import Image, { StaticImageData } from "next/image";

interface Button {
  svg: StaticImageData; // 使用 Next.js 的 Image 静态导入类型
  link: string; // 链接地址
}

interface ButtonGroupProps {
  buttons: Button[]; // 按钮数组
  maxButtonsPerRow?: 1 | 2 | 3; // 每行最大按钮数量（默认为 3）
  buttonSize?: string; // 按钮大小（默认为 "100px"）
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, maxButtonsPerRow = 3, buttonSize = "100px" }) => {
  const clampedMaxButtons = Math.min(3, Math.max(1, maxButtonsPerRow)); // 限制范围在 1~3

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // 居中对齐
    alignItems: "center", // 垂直居中
    gap: "10px", // 按钮间距
  };

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    width: buttonSize,
    height: buttonSize,
    flex: `0 1 calc(100% / ${clampedMaxButtons} - 10px)`, // 动态计算宽度，减去间距
    boxSizing: "border-box", // 包括 padding 和 border
  };

  return (
    <div style={containerStyle}>
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          style={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={button.svg}
            alt={`Button ${index + 1}`}
            layout="intrinsic"
            width={80} // 设置图片宽度
            height={80} // 设置图片高度
          />
        </a>
      ))}
    </div>
  );
};

export default ButtonGroup;
