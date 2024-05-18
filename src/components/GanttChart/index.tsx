"use client";
import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

const GanttChart: React.FC = () => {
  const ganttRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tasks = [
      {
        id: "Task 1",
        name: "Redesign website",
        start: "2016-12-28",
        end: "2016-12-31",
        progress: 20,
        dependencies: "Task 2, Task 3",
        custom_class: "bar-milestone", // optional
      },
      // Add more tasks here...
    ];

    if (ganttRef.current) {
      new Gantt(ganttRef.current, tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        language: "en",
        // custom_popup_html: null,
      });
    }
  }, []);

  return <div ref={ganttRef} className="gantt-target dark"></div>;
};

export default GanttChart;
