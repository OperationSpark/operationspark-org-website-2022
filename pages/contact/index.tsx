import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import { IContact } from '@this/data/types/contact';
import { Section } from '@this/components/layout';

import { getStaticAsset } from '../api/static/[asset]';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';

const ContactForm = dynamic(() => import('@this/src/Forms/Form.Contact'));

const Contact: NextPage<IContact> = ({
  address,
  city,
  state,
  zip,
  phone,
  gMapUrl,
}) => {
  return (
    <Main>
      <ContactStyles>
        <Content>
          <div className='contact-top'>
            <h1 className='dynamic-h1'>Contact us</h1>
            <Section className='contact-info'>
              <a
                className='anchor'
                href={gMapUrl}
                target='_blank'
                rel='noreferrer'
              >
                <p>{address}</p>
                <p>
                  {city}, {state} {zip}
                </p>
              </a>
              <p>
                <a
                  className='anchor'
                  href={`tel:${phone}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  {phone}
                </a>
              </p>
            </Section>
          </div>
          <ContactForm />
        </Content>
      </ContactStyles>
    </Main>
  );
};

export default Contact;

export const getStaticProps: GetStaticProps<IContact> = async () => {
  const contact: IContact = await getStaticAsset('contact');

  return {
    props: contact,
  };
};

const ContactStyles = styled.div`
  .contact-top {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-bottom: 2rem;
  }
  .contact-info {
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    padding-bottom: 1rem;
    align-items: center;
    a {
      text-align: center;
      margin-bottom: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    .contact-top {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .contact-info {
      align-items: center;
      a {
        text-align: center;
      }
    }
  }
`;
