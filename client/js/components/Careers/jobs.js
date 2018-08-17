var jobs = [];
var job = {};

job = {duties:[],skills:[]};
job.isActive = false;
job.name = "Chief Operating Officer";
job.type = "coo";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.description = "Slate Robotics is looking for an extremely conscientious and highly industrious Chief Operating Officer to help pioneer the future of personal robots. Since we’re a startup, you will not only be involved in operations management but also its implementation; in other words, you will personally manufacture, assemble, machine, etc. Long hours and high intensity work environment. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area. Your compensation will include meaningful equity ownership.";
job.duties.push("Develop & maintain standardized work Instructions used in manufacturing and production");
job.duties.push("Oversee and implement processes required of manufacturing, production, supply-chain, and business infrastructure");
job.duties.push("Help find, screen, recruit and train job applicants, as well as organizing and administering employee-benefit programs.");
job.duties.push("Perform other duties and support other teams as required");
job.skills.push("High-level understanding of all business functions such as IT, HR, Finance, Marketing, etc");
job.skills.push("Demonstrable competency in strategic planning and business development");
job.skills.push("Understanding of data analysis and performance/operation metrics");
jobs.push(job);

job = {duties:[],skills:[]};
job.isActive = false;
job.name = "Chief Technology Officer";
job.type = "cto";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.description = "Slate Robotics is looking for an extremely industrious and highly creative Chief Technology Officer to help pioneer the future of personal robots. You must have experience designing and building complex robotic systems, and you should be able to do so in about one-third the time that most competent people think possible. Long hours and high intensity work environment. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area. Your compensation will include meaningful equity ownership.";
job.duties.push("Research and develop prototypes for new products");
job.duties.push("Improve and iterate upon designs of existing products");
job.duties.push("Support our open source community efforts via package creation, tool support, and issue tracking");
job.duties.push("Provide customer support on technical issues")
job.duties.push("Perform other duties and support other teams as required");
job.skills.push("Experience designing and building complex robotic systems");
job.skills.push("Experience designing electric circuits");
job.skills.push("Experience designing sophisticated mechanical systems")
job.skills.push("Demonstrable competancy in C++, Python, and ROS");
job.skills.push("High-level understanding of machine learning concepts");
jobs.push(job);

job = {duties:[],skills:[]};
job.isActive = true;
job.name = "Manufacturing Technician";
job.type = "technician";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.description = "Slate Robotics is looking for an industrious Manufacturing Technician to help pioneer the future of personal robots. You must be a focused, diligent worker who is excited about robots and has an eye for perfection. Must have incredibly high standards for one's work and take the initiative to improve processes where necessary. This is a demanding position, which can be high stress and requires long hours. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area.";
job.duties.push("Performs functions assoicated with all manufacturing operations.");
job.duties.push("Assembles robotic components such as arms, wheeled bases, electronics, etc.");
job.duties.push("Operates 3D printers and filament extruder systems.");
job.duties.push("Operates CNC machine.");
job.duties.push("Solders electronics and electrical components.");
job.duties.push("Builds complex mechanical structures, such as frames and chassis, from their raw materials.");
job.duties.push("Performs quality assurance testing on finished goods.");
job.duties.push("Closely follows manufacturing procedures and maintains rigorous performance-tracking records.");
job.skills.push("Experience with 3D printing, soldering, or electronics is beneficial but not required.");
jobs.push(job);

job = {duties:[],skills:[]};
job.isActive = true;
job.name = "Robotics Engineer";
job.type = "engineer";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.description = "Slate Robotics is looking for an extremely industrious and highly creative Robotics Engineer to help pioneer the future of personal robots. You must have experience designing and building complex robotic systems, and you should be able to do so in about one-third the time that most competent people think possible. Long hours and high intensity work environment. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area. Your compensation will include meaningful equity ownership.";
job.duties.push("Research and develop prototypes for new products");
job.duties.push("Improve and iterate upon designs of existing products");
job.duties.push("Support our open source community efforts via package creation, tool support, and issue tracking");
job.duties.push("Provide customer support on technical issues");
job.duties.push("Perform other duties and support other teams as required");
job.skills.push("Experience designing and building complex robotic systems");
job.skills.push("Experience designing electric circuits");
job.skills.push("Experience designing sophisticated mechanical systems");
job.skills.push("Demonstrable competancy in C++, Python, and ROS");
job.skills.push("High-level understanding of machine learning concepts");
job.skills.push("A college degree in a relevant field is beneficial, but NOT required. We mostly want to see previous projects and evidence that you can build robots!");
jobs.push(job);

job = {duties:[],skills:[]};
job.isActive = false;
job.name = "Robotics Intern";
job.type = "intern";
job.location = "Springfield, MO";
job.employmentType = "Part Time";
job.description = "Slate Robotics is looking for interns to help pioneer the future of personal robots. Through the internship program, we are looking to find the next wave of talent to drive these efforts.";
job.duties.push("Research and develop prototypes for new products");
job.duties.push("Improve and iterate upon designs of existing products");
job.duties.push("Support our open source community efforts via package creation, tool support, and issue tracking");
job.duties.push("Perform other duties and support other teams as required");
job.skills.push("Experience in some aspect of designing and building robotic systems");
job.skills.push("Experience with C++, Python, and ROS");
jobs.push(job);


job = {duties:[],skills:[]};
job.isActive = true;
job.name = "3D Printer Operator";
job.type = "technician";
job.location = "Springfield, MO";
job.employmentType = "Part Time";
job.description = "Slate Robotics is looking for a 3D Printer Operator to help pioneer the future of personal robots. Performs functions associated with 3D printers, including printer maintenance, operation, and post-processing. Uses slicer programs to turn 3D models into gcode, which is required of 3D printers. Operates filament extruder and spooling system to fabricate materials needed by 3D printers. Adheres to strict quality guidelines and standards.";
job.duties.push("Performs functions associated with 3D printers, including printer maintenance, operation, and post-processing.");
job.duties.push("Uses slicer programs to turn 3D models into gcode, which is required of 3D printers.");
job.duties.push("Operates filament extruder and spooling system to fabricate materials needed by 3D printers.");
job.duties.push("Adheres to strict quality guidelines and standards.");
job.skills.push("Experience with 3D printing is a big advantage.");
job.skills.push("Hardworking with high standards of excellence.");
jobs.push(job);

module.exports = jobs;
