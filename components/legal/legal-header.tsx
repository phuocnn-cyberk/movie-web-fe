interface LegalHeaderProps {
  title: string;
  className?: string;
}

export const LegalHeader = ({ title }: LegalHeaderProps) => {
  return (
    <div className="relative w-full border-b-1 border-grey-300 dark:border-helix-blue  py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-accent dark:text-white text-center mb-4">
          {title}
        </h1>
      </div>
    </div>
  );
};
