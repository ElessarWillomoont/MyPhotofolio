"use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // 从 next/navigation 导入 useRouter
import Image, { StaticImageData } from "next/image"; // 使用 next/image 提供的组件
import styles from "./ProjectTree.module.css";

// 使用 import 静态导入图片
import projectAImage from "../public/images/project_header/project-a.png";
import projectBImage from "../public/images/project_header/project-b.png";
import projectCImage from "../public/images/project_header/project-c.png";
// 从 D 到 Q 如果没有图片，用 defaultImage 替代
import defaultImage from "../public/images/project_header/working.webp";
import React from "react";

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

interface ProjectTreeProps {
    onHoverBackgroundChange: (image: string | null) => void;
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ onHoverBackgroundChange }) => {
    const calculateColumns = (): number => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            return Math.min(4, Math.floor(width / 300));
        }
        return 3; // Default for SSR
    };

    const [columns] = React.useState<number>(calculateColumns()); // 确保只计算一次列数
    const [randomLayout] = React.useState(() => generateRandomLayout(columns)); // 确保随机排布只生成一次

    function generateRandomLayout(columns: number) {
        const rows: React.ReactNode[] = [];
        const itemsPerRow = columns;
        let index = 0;

        while (index < projects.length) {
            const rowItems = [];
            const spaces = Math.floor(columns / 2); // 每行随机空格数量
            const spaceIndices = Array.from({ length: spaces }, () => Math.floor(Math.random() * columns));

            for (let i = 0; i < itemsPerRow; i++) {
                if (spaceIndices.includes(i) && index < projects.length + spaces) {
                    rowItems.push(<div key={`space-${index}-${i}`} className={styles.spaceFiller}></div>);
                } else if (index < projects.length) {
                    const project = projects[index++];
                    rowItems.push(
                        <div
                            key={project.name}
                            className={styles.projectCard}
                            onMouseEnter={() =>
                                onHoverBackgroundChange(projectImages[project.name]?.src || null)
                            }
                            onMouseLeave={() => onHoverBackgroundChange(null)}
                        >
                            <Image
                                src={projectImages[project.name] || defaultImage}
                                alt={project.displayName}
                                className={styles.projectImage}
                                width={300}
                                height={300}
                            />
                            <span className={styles.projectName}>{project.displayName}</span>
                        </div>
                    );
                }
            }

            rows.push(
                <div key={`row-${rows.length}`} className={styles.projectTreeRow}>
                    {rowItems}
                </div>
            );
        }

        return rows;
    }

    return <div className={styles.projectTreeWrapper}>{randomLayout}</div>;
};

export default ProjectTree;
