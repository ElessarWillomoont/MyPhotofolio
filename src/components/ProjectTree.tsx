"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link"; // Import the Link component
import styles from "./ProjectTree.module.css";
import { useAppLanguage } from "../context/LanguageContext";

// Static image imports for the projects
import projectAImage from "../public/images/project_header/project-a.png";
import Tone_Canvas_Image from "../public/images/project_header/Tone_Canvas.jpg";
import projectBImage from "../public/images/project_header/project-b.png";
import projectCImage from "../public/images/project_header/project-c.png";
import defaultImage from "../public/images/project_header/working.webp";

// Mapping project names to images
const projectImages: { [key: string]: StaticImageData } = {
  "Tone_Canvas" : Tone_Canvas_Image,
  "project-a": projectAImage,
  "project-b": projectBImage,
  "project-c": projectCImage,
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

// Expanding the projects list
const projects = [
  { name: "Tone_Canvas" },
  { name: "project-a" },
  { name: "project-b" },
  { name: "project-c" },
  { name: "project-d" },
  { name: "project-e" },
  { name: "project-f" },
  { name: "project-g" },
  { name: "project-h" },
  { name: "project-i" },
  { name: "project-j" },
  { name: "project-k" },
  { name: "project-l" },
  { name: "project-m" },
  { name: "project-n" },
  { name: "project-o" },
  { name: "project-p" },
  { name: "project-q" },
];

interface ProjectTreeProps {
  onHoverBackgroundChange: (image: string | null) => void;
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ onHoverBackgroundChange }) => {
  const { getTranslations } = useAppLanguage();
  const [projectNames, setProjectNames] = useState<{ [key: string]: string }>({});
  const [randomLayout, setRandomLayout] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const loadProjectNames = async () => {
      const translations: { [key: string]: string } = {};

      for (const project of projects) {
        const defaultTranslations = { title: project.name };
        const projectTranslations = await getTranslations(
          `/pages/projects/${project.name}`,
          defaultTranslations
        );
        translations[project.name] = projectTranslations.title;
      }

      setProjectNames(translations);
    };

    loadProjectNames();
  }, [getTranslations]);

  useEffect(() => {
    const generateRandomLayout = () => {
      const rows: React.ReactNode[] = [];
      const columns = calculateColumns();
      let index = 0;

      while (index < projects.length) {
        const rowItems = [];
        const spaces = Math.floor(columns / 2); // Random space count per row
        const spaceIndices = Array.from(
          { length: spaces },
          () => Math.floor(Math.random() * columns)
        );

        for (let i = 0; i < columns; i++) {
          if (spaceIndices.includes(i) && index < projects.length + spaces) {
            rowItems.push(
              <div key={`space-${index}-${i}`} className={styles.spaceFiller}></div>
            );
          } else if (index < projects.length) {
            const project = projects[index++];
            rowItems.push(
              <Link
                href={`/projects/${project.name}`}
                key={project.name}
                className={styles.projectCard} // Wrap the card with Link
                onMouseEnter={() =>
                  onHoverBackgroundChange(projectImages[project.name]?.src || null)
                }
                onMouseLeave={() => onHoverBackgroundChange(null)}
              >
                <Image
                  src={projectImages[project.name] || defaultImage}
                  alt={projectNames[project.name] || project.name}
                  className={styles.projectImage}
                  width={300}
                  height={300}
                />
                <span className={styles.projectName}>
                  {projectNames[project.name] || project.name}
                </span>
              </Link>
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
    };

    setRandomLayout(generateRandomLayout());
  }, [onHoverBackgroundChange, projectNames]);

  const calculateColumns = (): number => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width <= 480) return 1;
      if (width <= 768) return 2;
      return Math.min(4, Math.floor(width / 300));
    }
    return 3; // Default for SSR
  };

  return <div className={styles.projectTreeWrapper}>{randomLayout}</div>;
};

export default ProjectTree;
