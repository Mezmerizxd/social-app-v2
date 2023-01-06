import * as nodemailer from 'nodemailer';
import Log from './Log';
import Cfg from '../cfg';

export default new (class Email {
    public EmailVerification = async (recipient: string, code: string) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Cfg.Env().emailUser,
                pass: Cfg.Env().emailPass,
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
            from: '"No Reply" <no-reply@mezmerizxd.net',
            to: recipient,
            subject: 'Email Verification',
            html: html,
        };
        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    Log.error(
                        `[Utils] [Email] Email Verification Error: ${error}`
                    );
                }
            });
        } catch (error) {
            Log.error(`[Utils] [Email] Email Verification Error: ${error}`);
        }
    };
})();
