import * as nodemailer from 'nodemailer';
import { statistics } from '../managers/statistics';

export const verification = async (recipient: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Dark theme email verification button
  const html = `
        <div>
            <h1>Email Verification</h1>
            <p>Click the button below to verify your email address.</p>
            <a href="http://mezmerizxd.net/verify-email?code=${code}">Verify Email</a>
            <style>
            @import url("https://fonts.googleapis.com/css2?family=Quicksand");
            * {
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-family: "Quicksand", sans-serif;
                font-weight: normal;
                color: white;
            }
            div {
                text-align: center;
                padding: 20px;
                background: rgb(35, 35, 35);
                width: 80%;
                margin: auto;
            }
            h1 {
                font-size: 2rem;
                font-weight: normal;
            }
            p {
                font-size: 1.2rem;
                font-weight: normal;
                margin-top: 10px;
                margin-bottom: 20px;
            }
            a {
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                color: rgb(0, 0, 0);
                border-radius: 3px;
                font-size: 1.2rem;
                font-weight: normal;
                background-color: rgb(240, 240, 240);
                outline: none;
                border: none;
                padding: 10px;
            }
            </style>
        </div>
        `;

  const mailOptions = {
    from: '"No Reply" <no-reply@mezmerizxd.net>',
    to: recipient,
    subject: 'Email Verification',
    html: html,
  };
  try {
    transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        return;
      }
    });
  } catch (error) {
    return;
  }
};

export const passwordReset = async (recipient: string, code: string) => {};

export const serverStarted = async (recipient: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div>
    <h1>Server Started</h1>
    <a href="http://mezmerizxd.net">Live Website</a>
    <a href="http://statistics.mezmerizxd.net">Statistics Website</a>
    <p>Statistics Access Code: ${statistics.accessToken}</p>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Quicksand');
      * {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Quicksand', sans-serif;
        font-weight: normal;
        color: white;
      }
      div {
        text-align: center;
        padding: 20px;
        background: rgb(35, 35, 35);
        width: 80%;
        height: 100%;
        margin: auto;
      }
      h1 {
        font-size: 2rem;
        font-weight: normal;
        margin-bottom: 20px;
      }
      p {
        font-size: 1.2rem;
        font-weight: normal;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      a {
        margin-top: 20px;
        margin-bottom: 20px;
        text-decoration: none;
        color: rgb(0, 0, 0);
        border-radius: 3px;
        font-size: 1.2rem;
        font-weight: normal;
        background-color: rgb(240, 240, 240);
        outline: none;
        border: none;
        padding: 10px;
      }
    </style>
  </div>
  `;

  const mailOptions = {
    from: '"No Reply" <no-reply@mezmerizxd.net>',
    to: recipient,
    subject: 'Server Started',
    html: html,
  };
  try {
    transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        return;
      }
    });
  } catch (error) {
    return;
  }
};
