import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return (
    <main className="min-h-screen max-w-7xl mx-auto lg:py-24 md:py-20 py-14 px-3 flex items-center justify-center">
      {children}
    </main>
  );
}

export default FormContainer;
