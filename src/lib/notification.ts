import emailjs from '@emailjs/browser';

// ============================================
// EMAILJS CONFIGURATION
// ============================================
// To enable email notifications:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service (e.g., connect your Gmail)
// 3. Create an Email Template with these variables:
//    - to_name (recipient name)
//    - message (notification message)
// 4. Replace the values below with your actual IDs
// ============================================

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Email to receive notifications
const NOTIFICATION_EMAIL = 'your-email@example.com';

interface NotificationResult {
    success: boolean;
    message: string;
}

/**
 * Sends a notification email when the user clicks "Yes"
 */
export async function sendYesNotification(): Promise<NotificationResult> {
    // Check if EmailJS is configured
    if (
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
        console.log('📧 EmailJS not configured. To enable notifications:');
        console.log('1. Create a free account at https://www.emailjs.com/');
        console.log('2. Update the configuration in src/lib/notification.ts');
        return {
            success: false,
            message: 'EmailJS not configured'
        };
    }

    try {
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: NOTIFICATION_EMAIL,
                to_name: 'Valentine',
                subject: '💕 SHE SAID YES! 💕',
                message: `Amazing news! Meethi said YES to being your Valentine! 🎉💝

Time: ${new Date().toLocaleString()}

Go celebrate! 🥳`,
            },
            EMAILJS_PUBLIC_KEY
        );

        return {
            success: true,
            message: 'Notification sent successfully!'
        };
    } catch (error) {
        console.error('Failed to send notification:', error);
        return {
            success: false,
            message: 'Failed to send notification'
        };
    }
}

/**
 * Sends a silent notification when the page is opened (optional)
 */
export async function sendPageOpenedNotification(): Promise<NotificationResult> {
    // Check if EmailJS is configured
    if (
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
        return {
            success: false,
            message: 'EmailJS not configured'
        };
    }

    try {
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: NOTIFICATION_EMAIL,
                to_name: 'Valentine',
                subject: '👀 Site Opened!',
                message: `Someone just opened your Valentine's proposal site!

Time: ${new Date().toLocaleString()}

Fingers crossed! 🤞`,
            },
            EMAILJS_PUBLIC_KEY
        );

        return {
            success: true,
            message: 'Page opened notification sent!'
        };
    } catch (error) {
        console.error('Failed to send page opened notification:', error);
        return {
            success: false,
            message: 'Failed to send notification'
        };
    }
}
