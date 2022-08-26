import styled from 'styled-components';

const ToggleStyles = styled.label.attrs(({ sliderImg }: { sliderImg?: string }) => ({ sliderImg }))`
  position: relative;

  width: 56px;
  height: 30px;
  margin: 0 0.25rem;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primary[700]};
    box-shadow: 0 0 2px 0px ${(p) => p.theme.purple[900]} inset;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 30px;
    outline: 2px solid transparent;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border-radius: 50%;
    background: ${(p) => (p.sliderImg ? 'none' : p.theme.yellow[900])};
    background-image: url(${(p) => p.sliderImg});
  }

  input:focus-visible + .slider {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const Toggle = ({
  onClick,
  value,
  sliderImg,
  title,
  label,
}: {
  onClick: () => void;
  value: boolean;
  sliderImg: string;
  title?: string;
  label?: string;
}) => {
  return (
    <ToggleStyles sliderImg={sliderImg || 'none'} aria-label={label ?? ''} title={title || ''}>
      <input
        type='checkbox'
        checked={value}
        onChange={onClick}
        onKeyPress={({ key }) => key === 'Enter' && onClick()}
      />
      <span className='slider round'></span>
    </ToggleStyles>
  );
};

export default Toggle;
