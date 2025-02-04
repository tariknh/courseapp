import type * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  allCoursesLink?: string;
  supportEmail?: string;
  mobileAppLink?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  allCoursesLink,
  supportEmail,
  mobileAppLink,
  socialLinks,
}) => (
  <div
    style={{
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      width="100%"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <tr>
        <td style={{ padding: "40px" }}>
          {/* Header Section */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#121212",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                display: "block",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your journey, {firstName}
            </span>
          </h1>
          <p
            style={{ fontSize: "18px", color: "#4b5563", marginBottom: "30px" }}
          >
            We're excited to have you join our community of over 100,000
            learners. Your path to mastery begins here.
          </p>

          {/* Quick Stats Section */}
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            width="100%"
            style={{
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              padding: "20px 0",
            }}
          >
            <tr>
              <td align="center" width="33%">
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#121212",
                    marginBottom: "5px",
                  }}
                >
                  5+
                </div>
                <div style={{ color: "#4b5563" }}>Expert-led courses</div>
              </td>
              <td align="center" width="33%">
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#121212",
                    marginBottom: "5px",
                  }}
                >
                  24/7
                </div>
                <div style={{ color: "#4b5563" }}>Learning support</div>
              </td>
              <td align="center" width="33%">
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#121212",
                    marginBottom: "5px",
                  }}
                >
                  98%
                </div>
                <div style={{ color: "#4b5563" }}>Satisfaction rate</div>
              </td>
            </tr>
          </table>

          {/* Next Steps Section */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#121212",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            Get Started in 3 Easy Steps
          </h2>
          <table cellPadding="0" cellSpacing="0" border={0} width="100%">
            <tr>
              <td style={{ paddingBottom: "15px" }}>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                  <tr>
                    <td width="40" valign="top">
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "hsl(234,84%,62%)",
                          color: "#ffffff",
                          textAlign: "center",
                          lineHeight: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        1
                      </div>
                    </td>
                    <td style={{ paddingLeft: "15px" }}>
                      <h3 style={{ margin: "0 0 5px 0", color: "#121212" }}>
                        Complete Your Profile
                      </h3>
                      <p style={{ margin: "0", color: "#4b5563" }}>
                        Verify your email, and get started selling and joining
                        courses
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: "15px" }}>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                  <tr>
                    <td width="40" valign="top">
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "hsl(234,84%,62%)",
                          color: "#ffffff",
                          textAlign: "center",
                          lineHeight: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        2
                      </div>
                    </td>
                    <td style={{ paddingLeft: "15px" }}>
                      <h3 style={{ margin: "0 0 5px 0", color: "#121212" }}>
                        Browse Our Courses
                      </h3>
                      <p style={{ margin: "0", color: "#4b5563" }}>
                        Explore our catalog and find the perfect courses for
                        your goals
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                  <tr>
                    <td width="40" valign="top">
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "hsl(234,84%,62%)",
                          color: "#ffffff",
                          textAlign: "center",
                          lineHeight: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        3
                      </div>
                    </td>
                    <td style={{ paddingLeft: "15px" }}>
                      <h3 style={{ margin: "0 0 5px 0", color: "#121212" }}>
                        Join the Community
                      </h3>
                      <p style={{ margin: "0", color: "#4b5563" }}>
                        Connect with fellow learners and share your journey
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          {/* CTA Section */}
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            width="100%"
            style={{ marginTop: "30px" }}
          >
            <tr>
              <td>
                <a
                  href={allCoursesLink}
                  style={{
                    display: "inline-block",
                    padding: "15px 25px",
                    backgroundColor: "#121212",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Explore Your Courses
                </a>
              </td>
            </tr>
          </table>

          {/* Additional Resources */}
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            width="100%"
            style={{
              borderTop: "1px solid #e5e7eb",
              marginTop: "30px",
              paddingTop: "20px",
            }}
          >
            <tr>
              <td>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#121212",
                    marginBottom: "15px",
                  }}
                >
                  Helpful Resources
                </h3>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                  <tr>
                    <td width="50%" style={{ paddingBottom: "10px" }}>
                      <a
                        href="#"
                        style={{
                          color: "hsl(234,84%,62%)",
                          textDecoration: "none",
                        }}
                      >
                        📚 Learning Path Guide
                      </a>
                    </td>
                    <td width="50%" style={{ paddingBottom: "10px" }}>
                      <a
                        href="#"
                        style={{
                          color: "hsl(234,84%,62%)",
                          textDecoration: "none",
                        }}
                      >
                        🎯 Goal Setting Tools
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <a
                        href="#"
                        style={{
                          color: "hsl(234,84%,62%)",
                          textDecoration: "none",
                        }}
                      >
                        💬 Community Guidelines
                      </a>
                    </td>
                    <td width="50%">
                      <a
                        href="#"
                        style={{
                          color: "hsl(234,84%,62%)",
                          textDecoration: "none",
                        }}
                      >
                        ❓ FAQs
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          {/* Footer */}
          <table
            cellPadding="0"
            cellSpacing="0"
            border={0}
            width="100%"
            style={{
              borderTop: "1px solid #e5e7eb",
              marginTop: "30px",
              paddingTop: "20px",
            }}
          >
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                  <tr>
                    <td>
                      <a
                        href={""}
                        style={{
                          color: "#4b5563",
                          textDecoration: "none",
                          marginRight: "15px",
                        }}
                      >
                        Twitter
                      </a>
                      <a
                        href={""}
                        style={{
                          color: "#4b5563",
                          textDecoration: "none",
                          marginRight: "15px",
                        }}
                      >
                        LinkedIn
                      </a>
                      <a
                        href={""}
                        style={{ color: "#4b5563", textDecoration: "none" }}
                      >
                        Instagram
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  paddingTop: "15px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                Need help? Contact us at{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  style={{ color: "hsl(234,84%,62%)", textDecoration: "none" }}
                >
                  {supportEmail}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
);
