import { NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import NeumorphismListCard from '@this/src/components/Cards/NeumorphismListCard';
import { BgImg } from '@this/src/components/Elements';
import GridList from '@this/src/components/Elements/GridList';

const DevShop: NextPage = () => {
  return (
    <Main style={{ paddingTop: 0 }}>
      <DevShopStyles>
        <BgImg src='/images/display/abstract-space.webp' height='18rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl'>Dev Shop</h1>
            </div>
          </Content>
        </BgImg>

        <Content className='flex-column gap-4'>
          <div className='intro-section-1'>
            <p className='dynamic-txt'>
              {`Operation Spark is a software engineering school, also known as a code school, experience, we teach people how to think like software engineers and succeed inborn and raised in New Orleans. Through an immensely immersive learning today's tech industry. Our program is adopted from San Francisco, bringing the Harvard of Code Schools and their Silicon Valley-tested curriculum to people in New Orleans. And it over-prepares our graduates for careers in software development. In fact, over 100 companies have hired our grads, including GE, PayPal, Nike, The New York Times, LinkedIn, DXC, and Entergy, just to name a few.`}
            </p>
          </div>
          <div className='intro-section-2'>
            <p className='dynamic-txt'>
              {`We want our graduates to be overly prepared, and so our Immersion program is in-depth, rigorous and demanding. In studying 6 days a week, 11 hours a day for4 months, graduates over-train for the job. Imagine training for the Olympics of software development, and you've correctly understood the Immersion experience.`}
            </p>
          </div>
        </Content>
        <Content>
          <NeumorphismListCard
            title='Who We Are'
            width='800px'
            color='primary'
            style={{ margin: '0 auto' }}
            items={[
              <p className='dynamic-txt' key='who-we-are'>
                {`Operation Spark is a software engineering school, also known as a code school, experience, we teach people how to think like software engineers and succeed inborn and raised in New Orleans. Through an immensely immersive learning today's tech industry. Our program is adopted from San Francisco, bringing the Harvard of Code Schools and their Silicon Valley-tested curriculum to people in New Orleans. And it over-prepares our graduates for careers in software development. In fact, over 100 companies have hired our grads, including GE, PayPal, Nike, The New York Times, LinkedIn, DXC, and Entergy, just to name a few.`}
              </p>,
            ]}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title='Skillset & Performance of an Immersion Grad'
            width='800px'
            color='secondary'
            style={{ margin: '0 auto' }}
            items={[
              <p className='dynamic-txt' key='skills-performance-1'>
                {`We want our graduates to be overly prepared, and so our Immersion program is in-depth, rigorous and demanding. In studying 6 days a week, 11 hours a day for4 months, graduates over-train for the job. Imagine training for the Olympics of software development, and you've correctly understood the Immersion experience.`}
              </p>,
              <p className='dynamic-txt' key='skills-performance-2'>
                {`The Immersion program is modeled on the typical working environment of a software company: In the first 6 weeks of Immersion, students must complete Sprints, each addressing problems in new domains. These Sprints provide a deep working knowledge of data-structures, classic algorithms, time complexity, relational, document and graph database development, RESTful API, web servers(Node.js and related frameworks like express.js, feathers), authentication & authorization, security, micro services and Cloud deployment, as well as test driven development (TDD) and continuous integration (CI), continuous deployment.`}
              </p>,
              <p className='dynamic-txt' key='skills-performance-2'>
                {`Client-side development includes HTML, CSS and UI/UX, along with popular JavaScript and cross-platform frameworks, including Angular, Angular 2 / TypeScript, React & React Native, Ionic / Cordova, D3, Material UI, Bootstrap and other CSS frameworks, and mobile development.`}
              </p>,
            ]}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title='How Can Operation Spark Help My Company'
            subtitle='Contract to Hire or Our Dev Shop'
            color='blue'
            width='800px'
            style={{ margin: '0 auto' }}
            items={[
              <div key='dev-shop-hire-1'>
                <h3 className='dynamic-h3 text-center' style={{ fontWeight: 900 }}>
                  Contract to Hire
                </h3>
                <p className='dynamic-txt'>
                  {`Do you need to quickly dial-up a capable software team? Working with Operation Spark's Contract-to-Hire program, Operation Spark will provide and manage the talent, and after 3 months, once you are sure your project has legs, you may hire our contractors as full-time employees.  This is sometimes called a temp-to-perm program and can help your company try-before-you-buy.Let us talk to you about resources need and our hourly rate.`}
                </p>
              </div>,
              <div key='dev-shop-hire-2'>
                <h3 className='dynamic-h3 text-center' style={{ fontWeight: 900 }}>
                  Our Dev Shop - Hire Us
                </h3>
                <p className='dynamic-txt'>
                  {`Operation Spark writes software of any kind, including video games, so you can hire us to build and maintain your project.  Even better - we cost an uncompromising fraction of the going market rates! Our past client projects range in complexity:
                  -a two-year project for the USDA;
                  -logistics applications for the shipping industry;
                  -the French Quarter Fest's mobile app.`}
                </p>
                <p className='dynamic-txt text-center' style={{ marginTop: '1.5rem' }}>
                  <b>
                    <i>{`We can design, build, deploy and maintain pretty much anything!`}</i>
                  </b>
                </p>
              </div>,
              <p className='dynamic-txt' key='dev-shop-hire-3'>
                {`So, scale your workforce as needed with our flexible hiring programs: Companies can elect to hire graduates directly, work with us on our contractor-to-hire model, or bring on remote team members as needed, and we'll house and support them. Having access to an immediate and solid talent pipeline also reduces hiring costs.`}
              </p>,
              <p className='dynamic-txt' key='dev-shop-hire-4'>
                <b className='dynamic-txt text-center' style={{ fontWeight: 900 }}>
                  {`Partner with Operation Spark for the following benefits to your company:`}
                </b>
                <GridList
                  items={[
                    `Easy, cost-effective way to acquire high quality talent`,
                    `Increase the diversity of your workforce`,
                    `Access to solid talent pipeline reduces hiring costs`,
                    `Great public relations opportunity`,
                    `Scale your talent as needed with our flexible hiring programs`,
                  ]}
                />
              </p>,
              <p className='dynamic-txt' key='dev-shop-hire-5'>
                <b className='dynamic-txt text-center' style={{ fontWeight: 900 }}>
                  {`For more information on our hiring programs`}
                </b>
                <div>
                  <b>Contact:</b>
                </div>
                <div className='contact-info'>
                  <div>Sterling Henry</div>
                  <div>Director of Business Development</div>
                  <div>Operation Spark</div>
                  <div>
                    <a className='anchor' href='tel:5042202089'>
                      504-220-2089
                    </a>
                  </div>
                  <a className='anchor' href='mailto:sterling@operationspark.org'>
                    sterling@operationspark.org
                  </a>
                </div>
              </p>,
            ]}
          />
        </Content>
      </DevShopStyles>
    </Main>
  );
};

export default DevShop;

const DevShopStyles = styled.div`
  .__content-container {
    padding-bottom: 0;
  }

  .contact-info {
    padding: 0.5rem;
    padding-left: 1rem;
    border-left: 3px solid ${({ theme }) => theme.rgb('primary.700', 1)};
    line-height: 1.25;
    font-size: 0.9rem;
  }

  .intro-section-1,
  .intro-section-2 {
    max-width: 80%;
    box-shadow: ${({ theme }) => {
      const lm = theme.isLightMode;
      return `
        0 0 0px 2px ${theme.rgb('bg', 1)},
        0 0 4px 1px ${theme.rgb(lm ? 'primary' : 'secondary', 0.5)},
        0 0 4px 2px inset ${theme.rgb(lm ? 'primary' : 'secondary', 0.25)}
    `;
    }};
    background: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary.700', 0.1) : theme.rgb('secondary.900', 0.1)};
    box-shadow: 0 0 3px 1px inset
      ${({ theme }) => theme.rgb(theme.isLightMode ? 'primary' : 'secondary.100', 0.5, 1)};
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;

    p {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.rgb('primary.900', 0.75) : theme.rgb('secondary.100', 0.75)};
    }
  }
  .intro-section-1 {
    align-self: flex-start;
    text-align: left;
  }
  .intro-section-2 {
    align-self: flex-end;
    text-align: right;
  }
`;
