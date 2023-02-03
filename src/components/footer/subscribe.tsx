import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from '@this/components/Form';
import useSubscribe from '@this/hooks/useSubscribe';
import Button from '@this/components/Elements/Button';
import { Content } from '@this/components/layout';
import FormErr from '../Form/elements/FormErr';

const SubscribeStyles = styled.div`
  background: ${({ theme }) => theme.secondary[600]};
  .subscribe-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;

    color: rgba(25, 25, 25, 1);
  }
  h3 {
    flex: 4;
  }
  .subscribe-inputs {
    display: flex;
    flex: 5;

    .subscribe-input {
      width: 100%;
      position: relative;
      z-index: 0;
    }

    button {
      margin-left: 0.5rem;
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
      button {
        margin-top: 1.5rem;
        margin-left: 0;
        width: 50%;
        text-align: center;
      }
    }
  }
  @media print {
    display: none;
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
      <Content className='content subscribe-content'>
        <h3 className='dynamic-h3'>See what all the buzz is about:</h3>
        <div className='subscribe-inputs'>
          <div className='subscribe-input'>
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
            {isErr && (
              <FormErr
                text='Valid email required'
                style={{
                  position: 'absolute',
                  top: '100%',
                }}
              />
            )}
          </div>
          <Button
            onClick={() => subscribe(email)}
            aria-label='Submit Email'
            title='Submit Email'
            color='yellow'
            data-test-id='button-subscribe-email'
          >
            Subscribe
          </Button>
        </div>
      </Content>
    </SubscribeStyles>
  );
};

export default Subscribe;
