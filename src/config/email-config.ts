// Email configuration for multiple websites
export const EMAIL_CONFIG = {
  // Common verified domain for all projects
  SENDER_DOMAIN: 'sagar.rytclick',
  SENDER_EMAIL: 'info@sagar.rytclick',
  
  // Website-specific configurations
  WEBSITES: {
    admissioncampus: {
      name: 'Admission Campus',
      recipientEmail: process.env.ADMISSION_CAMPUS_EMAIL || 'sagarbisht409@gmail.com',
      branding: {
        primaryColor: '#3b82f6',
        logo: '/logo.jpg'
      }
    },
    website2: {
      name: 'Your Second Website',
      recipientEmail: process.env.WEBSITE2_EMAIL || 'your-email@gmail.com',
      branding: {
        primaryColor: '#10b981',
        logo: '/logo2.jpg'
      }
    }
  }
}

// Usage in API route
export const getEmailConfig = (website: keyof typeof EMAIL_CONFIG.WEBSITES) => {
  const config = EMAIL_CONFIG.WEBSITES[website];
  return {
    from: EMAIL_CONFIG.SENDER_EMAIL,
    to: [config.recipientEmail],
    subject: `New Enquiry from ${config.name}`,
    branding: config.branding
  }
}
