import Input, { TextInputProps } from './Input';

const ZipCode = ({ onChange, ...props }: TextInputProps) => {
  const zipOnly = (value: string) => value.replaceAll(/^\D/g, '').slice(0, 5);
  const isZipCode = (value: string) => zipOnly(value).length === 5;

  return (
    <Input
      {...props}
      type='text'
      onChange={(value) => onChange(zipOnly(value), isZipCode(value))}
    />
  );
};

export default ZipCode;
