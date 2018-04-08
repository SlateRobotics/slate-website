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
job.isActive = true;
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
job.isActive = false;
job.name = "Manufacturing Technician";
job.type = "technician";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.description = "Slate Robotics is looking for an industrious Manufacturing Technician to help pioneer the future of personal robots. Perform functions associated with all manufacturing operations, including working with engineers in set-up and calibration tasks, as well as performing rework and quality testing related to the production of parts, components, subassemblies and final assemblies. Uses sophisticated programs to collect and evaluate operating data to conduct on-line adjustments to products, instruments or equipment. Determines and may assist in developing methods and procedures to control or modify equipment. Determines and may assist in developing methods and procedures to control or modify the manufacturing process. Works with engineers in conducting experiments. Works with engineers in conducting experiments. Works on assignments that are routine in nature, requiring limited judgment.";
job.duties.push("Performs functions assoicated with all manufacturing operations.");
job.duties.push("Uses sophisticated programs to collect and evaluate operating data to conduct on-line adjustments to products, instruments or equipment.");
job.duties.push("Determine and may assist in developing methods and procedures to control or modify the manufacturing process.");
job.duties.push("Works with engineers conducting experiments.");
job.duties.push("Perform other duties and support other teams as required");
job.skills.push("Experience with 3D printing and/or soldering is beneficial but not required.");
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
jobs.push(job);

job = {duties:[],skills:[]};
job.isActive = true;
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

module.exports = jobs;
