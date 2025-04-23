interface FormTitleProps {
  title: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return <p className="text-2xl font-medium mt-6 mb-3">{title}</p>;
};
