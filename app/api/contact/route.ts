import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// In Next.js (app directory), environment variables must be prefixed with NEXT_PUBLIC_ for client-side use,
// but for server-side code like this API route, you can use any variable name (e.g., RESEND_API_KEY).
// Set RESEND_API_KEY in your .env.local file like:
// RESEND_API_KEY=your-resend-api-key-here

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'work@analytixedge.io',
      to: [email], 
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This email was sent from the contact form on analytixedge.io
            </p>
            <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

This email was sent from the contact form on analytixedge.io
Submitted on: ${new Date().toLocaleString()}
      `,
    });

    console.log(data)

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
