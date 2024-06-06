import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { Section } from '@this/components/layout';
import { IContact } from '@this/data/types/contact';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import { BgImg } from '@this/src/components/Elements';
import Map from '@this/src/components/Elements/Map';
import { FiMapPin, FiPhone } from 'react-icons/fi';
const ContactForm = dynamic(() => import('@this/src/Forms/Form.Contact'));

const Contact: NextPage<IContact> = ({ address, city, state, zip, phone, gMapUrl }) => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <ContactStyles>
        <BgImg
          src='/images/display/contact.webp'
          height='calc(20rem + 20vw)'
          overlay={{ opacity: 0 }}
        >
          <div className='contact-top'>
            <h1 className='dynamic-xl primary-secondary'>Contact Us</h1>
          </div>
        </BgImg>
        <Content>
          <div className='contact-top'>
            <Section className='contact-info'>
              <p>
                <span className='contact-icon'>
                  <FiMapPin size={28} className='primary-secondary' />
                </span>
                <a className='anchor' href={gMapUrl} target='_blank' rel='noreferrer'>
                  <div className='text-center'>{address}</div>
                  <div className='text-center'>
                    {city}, {state} {zip}
                  </div>
                </a>
              </p>
              <p>
                <span className='contact-icon'>
                  <FiPhone size={28} className='primary-secondary' />
                </span>
                <a className='anchor' href={`tel:${phone}`} target='_blank' rel='noreferrer'>
                  {phone}
                </a>
              </p>
            </Section>
          </div>
          <ContactForm />
          <div className='map'>
            <Map href={gMapUrl} address={`${address}, ${city}, ${state} ${zip}`} />
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
    justify-content: flex-end;
    height: 100%;
    h1 {
      padding: 1rem 0;
    }
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
