import dynamic from 'next/dynamic';
import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import { IContact } from '@this/data/types/contact';
import { Section } from '@this/components/layout';

import { getStaticAsset } from '@this/pages-api/static/[asset]';
import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import Map from '@this/src/components/Elements/Map';
import { FiPhone, FiMapPin } from 'react-icons/fi';
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
            <h1 className='dynamic-h1 primary-secondary'>Contact us</h1>
            <Section className='contact-info'>
              <p>
                <span className='contact-icon'>
                  <FiMapPin size={28} />
                </span>
                <a
                  className='anchor'
                  href={gMapUrl}
                  target='_blank'
                  rel='noreferrer'
                >
                  <span>{address}</span>
                  <br />
                  <span>
                    {city}, {state} {zip}
                  </span>
                </a>
              </p>
              <p>
                <span className='contact-icon'>
                  <FiPhone size={28} />
                </span>
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
          <div className='map'>
            <Map
              href={gMapUrl}
              address={`${address}, ${city}, ${state} ${zip}`}
            />
          </div>
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
  }
  .contact-info {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 2rem 0;
    align-items: center;
    width: 100%;
    a {
      text-align: center;
      margin-bottom: 1rem;
    }
    p {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .contact-icon {
      padding-bottom: 0.5rem;
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
