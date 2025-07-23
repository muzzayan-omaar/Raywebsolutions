import { useLocation } from "react-router-dom";

const RegisterProject = () => {
  const location = useLocation();
  const { plan, templateTitle, demoUrl } = location.state || {};

  return (
    <div className="min-h-screen pt-28 px-6 text-white bg-dark">
      <h2 className="text-2xl font-bold mb-4">Project Registration</h2>
      <p><strong>Plan:</strong> {plan}</p>
      <p><strong>Template:</strong> {templateTitle}</p>
      <p>
        <strong>Demo:</strong>{" "}
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          View Demo
        </a>
      </p>

      {/* Your full form and payment logic will go here next */}
    </div>
  );
};

export default RegisterProject;
