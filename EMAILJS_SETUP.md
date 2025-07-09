# EmailJS Configuration Guide

This project uses EmailJS to handle contact form submissions. Follow these steps to set up EmailJS for your portfolio.

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Setup Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use these template variables in your email template:
   - `{{to_name}}` - Your name (recipient)
   - `{{to_email}}` - Your email address
   - `{{from_name}}` - Sender's name
   - `{{user_email}}` - Sender's email address
   - `{{message}}` - Message content
   - `{{reply_to}}` - Reply-to email address

### Example Template:
```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{user_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## 5. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_CONTACT_NAME=Your Name
```

## 6. Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message
5. Check the browser console for any errors

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.example` file is safe to commit as it contains no real credentials
- EmailJS public keys are meant to be used on the frontend
- Consider setting up EmailJS usage limits to prevent abuse

## Troubleshooting

### Form not sending emails:
1. Check browser console for errors
2. Verify all environment variables are set correctly
3. Ensure EmailJS service is properly configured
4. Check EmailJS dashboard for usage limits

### Template not rendering correctly:
1. Verify template variable names match the code
2. Test the template in EmailJS dashboard
3. Check for typos in variable names

### Rate limiting:
1. Check EmailJS dashboard for usage limits
2. Consider implementing client-side rate limiting
3. Add proper error handling for rate limit responses
