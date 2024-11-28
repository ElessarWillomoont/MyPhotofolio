"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 从 next/navigation 导入 useRouter
import Image, { StaticImageData } from "next/image"; // 使用 next/image 提供的组件
import styles from "./ProjectTree.module.css";

// 使用 import 静态导入图片
import projectAImage from "../public/images/project_header/project-a.png";
import projectBImage from "../public/images/project_header/project-b.png";
import projectCImage from "../public/images/project_header/project-c.png";
// 从 D 到 Q 如果没有图片，用 defaultImage 替代
import defaultImage from "../public/images/project_header/working.webp";

// 创建一个映射表，将项目名映射到对应的 StaticImageData，未定义的项目使用默认图片
const projectImages: { [key: string]: StaticImageData } = {
  "project-a": projectAImage,
  "project-b": projectBImage,
  "project-c": projectCImage,
  // 其他项目暂时使用 defaultImage
  "project-d": defaultImage,
  "project-e": defaultImage,
  "project-f": defaultImage,
  "project-g": defaultImage,
  "project-h": defaultImage,
  "project-i": defaultImage,
  "project-j": defaultImage,
  "project-k": defaultImage,
  "project-l": defaultImage,
  "project-m": defaultImage,
  "project-n": defaultImage,
  "project-o": defaultImage,
  "project-p": defaultImage,
  "project-q": defaultImage,
};

// 扩展 projects 列表
const projects = [
  { name: "project-a", displayName: "Project A" },
  { name: "project-b", displayName: "Project B" },
  { name: "project-c", displayName: "Project C" },
  { name: "project-d", displayName: "Project D" },
  { name: "project-e", displayName: "Project E" },
  { name: "project-f", displayName: "Project F" },
  { name: "project-g", displayName: "Project G" },
  { name: "project-h", displayName: "Project H" },
  { name: "project-i", displayName: "Project I" },
  { name: "project-j", displayName: "Project J" },
  { name: "project-k", displayName: "Project K" },
  { name: "project-l", displayName: "Project L" },
  { name: "project-m", displayName: "Project M" },
  { name: "project-n", displayName: "Project N" },
  { name: "project-o", displayName: "Project O" },
  { name: "project-p", displayName: "Project P" },
  { name: "project-q", displayName: "Project Q" },
];

const ProjectTree: React.FC = () => {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState<StaticImageData | null>(null);

  const handleMouseEnter = (projectName: string) => {
    const image = projectImages[projectName] || defaultImage;
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const handleProjectClick = (projectName: string) => {
    router.push(`/projects/${projectName}`);
  };

  return (
    <div
      className={styles.projectTree}
      style={{
        backgroundImage: hoveredImage ? `url(${hoveredImage.src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {projects.map((project) => (
        <div
          key={project.name}
          className={styles.projectCard}
          onClick={() => handleProjectClick(project.name)}
          onMouseEnter={() => handleMouseEnter(project.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={projectImages[project.name] || defaultImage}
            alt={project.displayName}
            width={300}
            height={300}
            className={styles.projectImage}
          />
          <span className={styles.projectName}>{project.displayName}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectTree;
