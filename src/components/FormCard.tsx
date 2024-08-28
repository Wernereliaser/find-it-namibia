import React from "react"

interface FormCardProps {
  children: React.ReactNode;
}

function FormCard({ children }: FormCardProps) {
  return (
    <div className="card card-bordered border-gray-200 shadow-lg w-full max-w-md">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default FormCard;
