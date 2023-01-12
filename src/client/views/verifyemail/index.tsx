import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Api from '../../classes/Api';
import './styles.scss';

export default function VerifyEmail() {
    const [query] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(async () => {
            const r = await Api.Post({
                api: `/account/verify-email?code=${query.get('code')}`,
                body: null,
            });
            if (r && r.success === false) {
                setError(r.error);
            } else {
                setIsVerified(true);
            }
        }, 1000);
    }, []);

    return (
        <div className="VerifyEmail-container">
            <title>Email Verification</title>
            <div className="VerifyEmail-card">
                <div className="VerifyEmail">
                    <h1>Email Verification</h1>
                    {error && <p>{error}</p>}
                    {!isVerified && !error && <p>Verifying...</p>}
                    {isVerified === true && <p>Successfully Verified</p>}
                </div>
            </div>
        </div>
    );
}
