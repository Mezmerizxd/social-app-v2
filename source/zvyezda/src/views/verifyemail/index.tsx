import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Api from '../../classes/Api';
import {Card, Container, Verify} from './styled';

export default () => {
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
    <Container>
      <title>Email Verification</title>
      <Card>
        <Verify>
          <h1>Email Verification</h1>
          {error && <p>{error}</p>}
          {!isVerified && !error && <p>Verifying...</p>}
          {isVerified === true && <p>Successfully Verified</p>}
        </Verify>
      </Card>
    </Container>
  );
};
