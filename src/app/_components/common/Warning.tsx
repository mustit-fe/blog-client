import LinkButton from '@/app/_components/common/LinkButton';
import { ReactNode } from 'react';

const Warning = ({
                   title,
                   content,
                   buttonHref,
                   buttonText,
                   classes,
                 }: {
  title: string;
  content?: ReactNode;
  buttonHref: string;
  buttonText: string;
  classes?: string;
}) => {
  const className = classes ? `text-center p-6 ${classes}` : 'text-center p-6';

  return (
    <section className={className}>
      <p className="text-2xl font-semibold text-themeBlue-500">
        {title}
        <br />
        {content}
      </p>
      <LinkButton href={buttonHref} classes="mt-8 px-4 text-themeBlue-100 text-xl">
        {buttonText}
      </LinkButton>
    </section>
  );
};

export default Warning;