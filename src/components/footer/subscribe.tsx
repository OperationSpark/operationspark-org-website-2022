import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading, HStack } from '@chakra-ui/react';

import { Input } from '@this/components/Form';
import useSubscribe from '@this/hooks/useSubscribe';
import Button from '@this/components/Elements/Button';

const SubscribeStyles = styled.div`
  background: ${({ theme }) => theme.secondary[600]};
  .subscribe-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

    color: rgba(25, 25, 25, 1);
    .subscribe-input {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[600] : theme.secondary[600]};
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      flex-flow: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .subscribe-inputs {
      flex-flow: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .subscribe-inputs {
      flex-flow: column;
      width: 100%;
      > button {
        margin-top: 1rem;
        justify-content: center;
      }
    }

    .info {
      width: 50%;
      max-width: 300px;
      :focus-visible {
        outline: 2px solid ${({ theme }) => theme.primary[800]} !important;
      }
    }
  }
`;

const Subscribe = () => {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [subscribe, isErr, setIsErr] = useSubscribe(() => setEmail(''));

  const handleChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsErr(false);
    setIsValid(isValid);
  };
  return (
    <SubscribeStyles aria-label='Subscribe to newsletter'>
      <div className='content subscribe-content'>
        <Heading as='h3' m='1' ml='0' size='md' flex={3}>
          See what all the buzz is about:
        </Heading>
        <HStack flex={4} className='subscribe-inputs' alignItems='center'>
          <div className='subscribe-input' style={{ width: '100%' }}>
            <Input.Email
              aria-label='Email for newsletter'
              label='Sign up for our newsletter!'
              name='user-email'
              placeholder='yer@awesome.com'
              value={email}
              style={{ marginBottom: 0 }}
              onChange={handleChange}
              type='email'
              isErr={isErr}
              isValid={isValid}
              onEnter={() => subscribe(email)}
              testId='input-subscribe-email'
            />
          </div>
          <Button
            style={{
              padding: '0.75rem',
              height: '100%',
              display: 'flex',
            }}
            className='info'
            onClick={() => subscribe(email)}
            aria-label='Submit Email'
            title='Submit Email'
            color='yellow'
            data-test-id='button-subscribe-email'
          >
            Subscribe
          </Button>
        </HStack>
      </div>
    </SubscribeStyles>
  );
};

export default Subscribe;
