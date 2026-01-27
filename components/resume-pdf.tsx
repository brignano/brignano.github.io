import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";

// Register fonts (optional - using built-in fonts for simplicity)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
    { src: "Helvetica-Oblique", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  contactInfo: {
    fontSize: 9,
    marginBottom: 4,
    color: "#555",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobPosition: {
    fontSize: 12,
    fontWeight: "bold",
  },
  jobCompany: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  jobLocation: {
    fontSize: 9,
    color: "#555",
  },
  jobDates: {
    fontSize: 9,
    color: "#555",
    textAlign: "right",
  },
  jobSummary: {
    fontSize: 9,
    fontStyle: "italic",
    marginBottom: 4,
    color: "#444",
  },
  highlightsList: {
    marginLeft: 12,
    marginBottom: 4,
  },
  highlight: {
    fontSize: 9,
    marginBottom: 2,
    flexDirection: "row",
  },
  bullet: {
    width: 8,
    marginRight: 4,
  },
  highlightText: {
    flex: 1,
  },
  techList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  techItem: {
    fontSize: 8,
    backgroundColor: "#f0f0f0",
    padding: "2 6",
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
  },
  institution: {
    fontSize: 10,
    color: "#333",
  },
  educationDetails: {
    fontSize: 9,
    color: "#555",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skillCategory: {
    width: "48%",
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  skillItems: {
    fontSize: 9,
    color: "#444",
  },
  projectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  projectItem: {
    width: "48%",
    marginBottom: 10,
  },
  projectName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    marginBottom: 4,
    color: "#444",
  },
  certificationItem: {
    marginBottom: 6,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  certificationIssuer: {
    fontSize: 9,
    color: "#555",
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          {personalInfo.email && (
            <Text style={styles.contactInfo}>Email: {personalInfo.email}</Text>
          )}
          {personalInfo.phone && (
            <Text style={styles.contactInfo}>Phone: {personalInfo.phone}</Text>
          )}
          {personalInfo.location && (
            <Text style={styles.contactInfo}>
              Location: {personalInfo.location}
            </Text>
          )}
          {personalInfo.website && (
            <Text style={styles.contactInfo}>
              Website: {personalInfo.website}
            </Text>
          )}
          {personalInfo.linkedin && (
            <Text style={styles.contactInfo}>
              LinkedIn: {personalInfo.linkedin}
            </Text>
          )}
          {personalInfo.github && (
            <Text style={styles.contactInfo}>
              GitHub: {personalInfo.github}
            </Text>
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobPosition}>{job.position}</Text>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                    {job.location && (
                      <Text style={styles.jobLocation}>{job.location}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.jobDates}>
                      {job.startDate} - {job.endDate}
                    </Text>
                  </View>
                </View>
                {job.summary && (
                  <Text style={styles.jobSummary}>{job.summary}</Text>
                )}
                <View style={styles.highlightsList}>
                  {job.highlights.map((highlight, i) => (
                    <View key={i} style={styles.highlight}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
                {job.technologies && job.technologies.length > 0 && (
                  <View style={styles.techList}>
                    {job.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techItem}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                {edu.field && (
                  <Text style={styles.institution}>{edu.field}</Text>
                )}
                <Text style={styles.institution}>{edu.institution}</Text>
                {(edu.startDate || edu.endDate) && (
                  <Text style={styles.educationDetails}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                )}
                {edu.gpa && (
                  <Text style={styles.educationDetails}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skills.map((skillGroup, index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    {skillGroup.category}
                  </Text>
                  <Text style={styles.skillItems}>
                    {skillGroup.items.join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.projectsGrid}>
              {projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                  <View style={styles.techList}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techItem}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certificationName}>{cert.name}</Text>
                <Text style={styles.certificationIssuer}>
                  {cert.issuer}
                  {cert.date && ` • Issued: ${cert.date}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
