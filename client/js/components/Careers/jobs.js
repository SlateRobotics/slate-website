var jobs = [];
var job = {};

function Job () {
  this.duties = [];
  this.skills = [];
  this.questions = [];
}

job = new Job();
job.isActive = true;
job._id= "se";
job.name = "Software Engineer";
job.type = "software-engineer";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.payRange = "$30,000 to $40,000 per year + 0.5% to 1.0% equity";
job.description = "Slate Robotics is looking for a highly creative and extremely industrious Software Engineer to help pioneer the future of personal robots. You must have experience designing and building complex software systems, and you should be able to do so in about one-third the time that most competent people think possible. Must have incredibly high standards for one's work and take the initiative to improve processes where necessary. This is a demanding position, which can often require long hours. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area.";
job.duties.push("Support our open source community efforts via package creation, tool support, and issue tracking");
job.duties.push("Provide customer support on software-related technical issues");
job.duties.push("Develop new features and applications that we can demonstrate to potential customers");
job.skills.push("Demonstrable competancy in C++, Python, and ROS");
job.skills.push("Experience converting high-level product requirements into successful products through solid software architectures, engineering design and implementation");
job.skills.push("Strong understanding of advanced geometric and algebraic concepts");
job.skills.push("High-level understanding of machine learning concepts");
job.skills.push("Excellent problem solving and critical thinking skills");
job.questions.push({
  type: "textarea",
  name: "Explain the intricacies of desinging a movement controller for a dog robot that accepts a single 2D vector (for describing the desired direction and magnitude the robot should travel) as its input.",
});
job.questions.push({
  type: "textarea",
  name: "In what areas (i.e. layers of the stack) are machine learning techniques, such as Deep Learning and Reinforcement Learning, most effectively applied in the software of a robot like the TR1?",
});
jobs.push(job);

job = new Job();
job.isActive = true;
job._id = "vpm";
job.name = "VP of Manufacturing";
job.type = "vpmanufacturing";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.payRange = "$30,000 to $40,000 per year + 0.5% to 2.0% equity";
job.description = "Slate Robotics is looking for an industrious, highly motivated Production Manager to help pioneer the future of personal robots. The Production Manager has the responsibility of overseeing the entire manufacturing process, including equipment, inventory, raw materials, assembly, and more. The Production Manager must stick to strict delivery deadlines for our customers and be willing to do whatever it takes to get things done. The Production Manager is given a growing team of motivated workers, an operating budget, and the necessary equipment to make a great product. This is a demanding position, which can be stressful and require long hours. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area.";
job.duties.push("Manage and evaluate machine resources to ensure productivity and minimal downtime");
job.duties.push("Oversee a growing team of motivated workers");
job.duties.push("Strive to reduce expenses and increase productivity");
job.duties.push("Ensure all employees follow industry standard health and safety guidelines");
job.duties.push("Set ambitious production goals and communicate them to key personnel");
job.duties.push("Provide motivation, support and guidance to all employees");
job.duties.push("Communicate any problems or obstacles to senior management");
job.duties.push("Establish workflow policies that enhance speed and efficiency without compromising product safety or integrity");
job.duties.push("Create schedules for employees to ensure optimum staffing levels");
job.skills.push("Experience in manufacturing operations");
job.skills.push("Experience in a supervisory capacity");
job.skills.push("Excellent project management skills");
job.skills.push("Proven track record of getting things done");
job.skills.push("Working knowledge of OSHA and EPA regulations");
job.skills.push("Ability to coach and mentor employees on a one-on-one basis as well as as a group");
job.questions.push({
  type: "textarea",
  name: "Explain a time you discovered quality control issues in an operation. How did you address these issues?",
});
job.questions.push({
  type: "textarea",
  name: "Explain a time you implemented an improvement to a procedure. What was the impact of this change?",
});
jobs.push(job);

job = new Job();
job.isActive = true;
job._id= "mt";
job.name = "Manufacturing Associate - General";
job.type = "technician";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.payRange = "$24,000 to $26,000 per year";
job.description = "Slate Robotics is looking for an industrious Manufacturing Associate to help pioneer the future of personal robots. You must be a focused, diligent worker who is excited about robots and has an eye for perfection. Must have incredibly high standards for one's work and take the initiative to improve processes where necessary. This is a demanding position, which can often require long hours. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area.";
job.duties.push("Performs functions assoicated with all manufacturing operations.");
job.duties.push("Assembles robotic components such as arms, wheeled bases, electronics, etc.");
job.duties.push("Operates 3D printers and filament extruder systems.");
job.duties.push("Operates CNC machine.");
job.duties.push("Solders electronics and electrical components.");
job.duties.push("Builds complex mechanical structures, such as frames and chassis, from their raw materials.");
job.duties.push("Performs quality assurance testing on finished goods.");
job.duties.push("Closely follows manufacturing procedures and maintains rigorous performance-tracking records.");
job.skills.push("Experience with 3D printing, soldering, or electronics is beneficial but not required.");
job.questions.push({
  type: "textarea",
  name: "What would you do if you broke a part on a robot that is supposed to ship that day?",
});
job.questions.push({
  type: "textarea",
  name: "A machine is malfunctioning that you are attempting to utilize to manufacture a part. What do you do next?",
});
jobs.push(job);

job = new Job();
job.isActive = true;
job._id = "3po";
job.name = "Manufacturing Associate - 3D Printing";
job.type = "technician";
job.location = "Springfield, MO";
job.employmentType = "Full Time";
job.payRange = "$24,000 to $26,000 per year";
job.description = "Slate Robotics is looking for a 3D Printer Specialist to help pioneer the future of personal robots. You must be a focused, diligent worker who is excited about robots and has an eye for perfection. Must have incredibly high standards for one's work and take the initiative to improve processes where necessary. This is a demanding position, which can often require long hours. Expect talented, motivated and interesting co-workers. Must be willing to relocate to the Springfield area.";
job.duties.push("Performs functions associated with 3D printers, including printer maintenance, operation, and post-processing");
job.duties.push("Uses slicer programs to turn 3D models into gcode, which is required of 3D printers.");
job.duties.push("Takes ownership of print quality and speed");
job.duties.push("Debugs and improves processes and printers to attain the requisite quality and print time standards");
job.duties.push("Operates filament extruder and spooling system to fabricate materials needed by 3D printers");
job.duties.push("Adheres to strict quality guidelines and standards.");
job.skills.push("Massive amounts of experience with 3D printing");
job.skills.push("Hardworking with high standards of excellence.");
job.skills.push("Strong understanding of geometric and algebraic concepts");
job.skills.push("Excellent problem solving and critical thinking skills");
job.questions.push({
  type: "textarea",
  name: "A 3D printer enclosure is heated with a space heater that is positioned on the ceiling of the enclosure and blows hot air directly down toward the bed along the x-axis. For tall prints, the machine routinely clogs towards the top of the part. What is a potential cause of this?",
});
job.questions.push({
  type: "textarea",
  name: "A 3D printer has retraction disabled, prints at 0.5mm layer height, and prints with a zig-zag infill. At the beginning of each layer, it fails to extrude for a small portion of the new layer. What is a potential cause of this? Please explain the problem as fundamentally as you can.",
});
jobs.push(job);

module.exports = jobs;
